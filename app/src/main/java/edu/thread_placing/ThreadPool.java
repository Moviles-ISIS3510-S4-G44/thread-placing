package edu.thread_placing;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Consumer;

public class ThreadPool {
  private final Thread[] threads;
  private final List<BlockingQueue<Consumer<ThreadPoolHandle>>> taskQueues;
  private final ThreadPoolHandle[] workerHandles;
  private final AtomicInteger roundRobinIndex = new AtomicInteger(0);
  private volatile boolean running = true;

  public ThreadPool(int sz) {
    if (sz <= 0) {
      throw new IllegalArgumentException("Thread pool size must be greater than 0");
    }

    threads = new Thread[sz];
    workerHandles = new ThreadPoolHandle[sz];
    taskQueues = new ArrayList<>(sz);

    for (int i = 0; i < sz; i++) {
      taskQueues.add(new LinkedBlockingQueue<>());
      workerHandles[i] = new ThreadPoolHandle(this, i);
      final int workerIndex = i;
      threads[i] = new Thread(() -> runWorker(workerIndex), "thread-pool-worker-" + workerIndex);
      threads[i].start();
    }
  }

  public void submit(Runnable task) {
    if (task == null) {
      throw new IllegalArgumentException("Task cannot be null");
    }
    submit(_ -> task.run());
  }

  public void submit(Consumer<ThreadPoolHandle> task) {
    if (task == null) {
      throw new IllegalArgumentException("Task cannot be null");
    }
    if (!running) {
      throw new RejectedExecutionException("Thread pool is shutdown");
    }

    final var worker = Math.floorMod(roundRobinIndex.getAndIncrement(), taskQueues.size());
    taskQueues.get(worker).offer(task);
  }

  public int size() {
    return threads.length;
  }

  void submitToWorker(int workerIndex, Consumer<ThreadPoolHandle> task) {
    if (task == null) {
      throw new IllegalArgumentException("Task cannot be null");
    }
    if (workerIndex < 0 || workerIndex >= threads.length) {
      throw new IllegalArgumentException("Worker id out of range: " + workerIndex);
    }
    if (!running) {
      throw new RejectedExecutionException("Thread pool is shutdown");
    }
    taskQueues.get(workerIndex).offer(task);
  }

  public void shutdown() {
    running = false;
    for (final var t : threads) {
      t.interrupt();
    }
  }

  public void awaitTermination() throws InterruptedException {
    for (final var t : threads) {
      t.join();
    }
  }

  private void runWorker(int workerIndex) {
    final var queue = taskQueues.get(workerIndex);
    final var handle = workerHandles[workerIndex];

    while (running || !queue.isEmpty()) {
      try {
        final var task = queue.poll(200, TimeUnit.MILLISECONDS);
        if (task != null) {
          task.accept(handle);
        }
      } catch (InterruptedException e) {
        if (!running) {
          Thread.currentThread().interrupt();
          break;
        }
      } catch (RuntimeException e) {
        System.err.println("Task failed on worker " + workerIndex + ": " + e.getMessage());
      }
    }
  }
}

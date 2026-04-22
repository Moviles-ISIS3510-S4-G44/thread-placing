package edu.thread_placing;

import java.util.function.Consumer;

public final class ThreadPoolHandle {
  private final ThreadPool pool;
  private final int threadId;

  ThreadPoolHandle(ThreadPool pool, int threadId) {
    this.pool = pool;
    this.threadId = threadId;
  }

  public int getThreadId() {
    return threadId;
  }

  public int getPoolSize() {
    return pool.size();
  }

  public void transferTo(int targetThreadId, Consumer<ThreadPoolHandle> task) {
    pool.submitToWorker(targetThreadId, task);
  }

  public void transferTo(int targetThreadId, Runnable task) {
    if (task == null) {
      throw new IllegalArgumentException("Task cannot be null");
    }
    pool.submitToWorker(targetThreadId, _ -> task.run());
  }
}

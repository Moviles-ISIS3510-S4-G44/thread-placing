package edu.thread_placing;

import java.util.Scanner;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class App {

  public static Scanner sc;

  public static void main(String[] args) {
    sc = new Scanner(System.in);

    System.out.println("Thread placing");

    ThreadPool pool = new ThreadPool(4);
    CountDownLatch done = new CountDownLatch(4);

    pool.submit(
        handle -> {
          int currentWorker = handle.getThreadId();
          int targetWorker = (currentWorker + 1) % handle.getPoolSize();

          System.out.println("Task A running on worker " + currentWorker);
          handle.transferTo(
              targetWorker,
              transferredHandle -> {
                System.out.println("Task A moved to worker " + transferredHandle.getThreadId());
                done.countDown();
              });
          done.countDown();
        });

    pool.submit(
        handle -> {
          System.out.println("Task B running on worker " + handle.getThreadId());
          done.countDown();
        });

    try {
      if (!done.await(3, TimeUnit.SECONDS)) {
        System.out.println("Timed out while waiting for demo tasks.");
      }
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      System.out.println("Main thread interrupted while waiting.");
    } finally {
      pool.shutdown();
      try {
        pool.awaitTermination();
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        System.out.println("Main thread interrupted during shutdown.");
      }
    }

    System.out.println("\nWork finished!!!");
    System.out.print("Press enter to finish...");
    sc.nextLine();
  }
}

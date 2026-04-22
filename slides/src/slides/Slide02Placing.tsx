import { Slide } from '@revealjs/react'

export function Slide02Placing() {
    return (
        <Slide>
            <section>
                <h2>Bad practice</h2>
                <p>
                    In modern software development,
                    we rarely manage threads directly. Instead,
                    most platforms provide high-level APIs that abstract execution into "tasks",
                    allowing the system to handle the underlying complexity of concurrency.
                </p>
            </section>
            <section>
                <h2>Android</h2>
                <p>
                    Both Flutter (Dart) and Android (Kotlin) have moved away from manual thread management
                    in favor of Task-based and Coroutine-based abstractions.
                    These allow you to write asynchronous code that looks and behaves like synchronous code.
                </p>
            </section>
            <section>
                <h2>Flutter</h2>
                Dart is single-threaded by nature, running on an Event Loop.
                Instead of managing threads, you work with Futures.
            </section>
            <section>
                <h2>Dart Abstraction</h2>
                <p>
                    <strong>The abstraction:</strong> Future and async/await.
                </p>
                <p>
                    <strong>How it works:</strong> When you call an async function, Dart schedules a task on
                    the event loop. The thread is not blocked; it moves on to the next event (like UI
                    rendering) until the task completes.
                </p>
                <p>
                    <strong>Parallelism:</strong> For massive computational tasks, you use Isolates. These are
                    separate workers with their own memory heaps, abstracting away the complexities of
                    shared-memory multi-threading.
                </p>
            </section>
            <section>
                <h2>Flutter Isolates</h2>
                <p>
                    An Isolate is an abstracted unit of concurrency in Dart.
                    Each Isolate has its own memory and event loop, allowing for true parallelism without the risks of shared state.
                    Also known as <strong>Shared-nothing architecture</strong>
                    <br />
                    Communication is done via <strong>Message Passing</strong>
                </p>
            </section>
            <section>
                <h2>Note</h2>
                As said before the isolate is how dart abstracts concurrency,
                underneath the isolate can be mapped onto an thread pool (Desktop/Mobile)
                or onto an web worker (Web).
            </section>
            <section>
                <h2>Android</h2>
                <p>
                    In the past, Android developers used AsyncTask or manual Threads.
                    Today, Kotlin Coroutines are the standard.
                </p>
            </section>
            <section>
                <p>
                    <strong>The abstraction:</strong> suspend functions and Dispatchers.
                </p>
            </section>
            <section>
                <h2>How it works</h2>
                <p>
                    <strong>How it works:</strong> Coroutines are stateless continuations multiplexed over a
                    shared thread pool. Instead of mapping one task to one OS thread, the Kotlin runtime
                    treats a coroutine as logic that can detach from and reattach to any available thread.
                    You do not "run on a thread"; you request a Dispatcher to schedule your code's next
                    state on its managed pool.
                </p>
            </section>
            <section>
                <h2>Suspension</h2>
                <p>
                    <strong>Suspension (the non-blocking magic):</strong> The compiler transforms suspend
                    functions into a state machine.
                </p>
            </section>
            <section>
                <p>
                    <strong>The pause:</strong> At a suspension point (like I/O), it does not pause the
                    thread. It saves execution state to the heap and vacates the thread.
                    <br />
                    <strong>The yield:</strong> That thread is immediately free for other work (UI rendering
                    or other coroutines).
                    <br />
                    <strong>The resume:</strong> When data returns, the Dispatcher schedules the
                    continuation, restores the saved state, and resumes exactly where it left off,
                    potentially on a different physical thread.
                </p>
            </section>
            <section>
                <h2>C++ coroutines are 🥵</h2>
                <p>
                    For the brave of heart
                </p>
            </section>
            <section>
                <p>
                    In short, C++ 20 gives you the tools for build coroutines from scratch
                    <br />
                    And that really can be cumbersome but superb
                </p>
            </section>
        </Slide>
    )
}

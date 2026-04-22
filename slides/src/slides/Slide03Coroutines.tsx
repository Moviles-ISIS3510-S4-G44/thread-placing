import { Slide } from '@revealjs/react'
import coro from '../assets/coro.png'

export function Slide03Coroutines() {
    return (
        <Slide>
            <section>
                <h2>Coroutines</h2>
                <p>
                    In simple words, just think it as an function that can be paused and resumed later.
                </p>
            </section>
            <section>
                <img src={coro} alt="coroutines diagram" data-preview-image />
            </section>
            <section>
                <p>
                    Usually the coroutine infrastructure is provided by the language
                    with special <strong>compiler support</strong>.
                    <br />
                    Underneath it transform the function into a state machine,
                    allowing it to pause at certain points (like I/O operations) without blocking the thread,
                    and resume later when the data is ready.
                </p>
            </section>
            <section>
                <h2>
                    Demo caveat
                </h2>
                <p>
                    The demo implements an thread pool where I can choose where to submit the task.
                    And also to choose to transfer work to another thread.
                    <br />
                    The whole task cannot be transferred due to the nature of an function.
                    To perform it we must use coroutines, so it is suspended and later
                    resumed on another thread.
                </p>
            </section>
        </Slide>
    )
}

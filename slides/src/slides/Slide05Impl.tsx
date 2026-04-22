import { Slide } from '@revealjs/react'
import impl from '../assets/impl.png'

export function Slide05Impl() {
  return (
    <Slide>
      <section>
        <h2>Implementation</h2>
        The demo implements an simple thread pool where you can choose where to submit the task.
        And also to choose to transfer work to another thread.
        <br />
        <a href="https://github.com/Moviles-ISIS3510-S4-G44/thread-placing" target="_blank">
          GitHub Repository
        </a>
      </section>
      <section>
        <img src={impl} alt="Implementation" data-preview-image />
      </section>
    </Slide>
  )
}

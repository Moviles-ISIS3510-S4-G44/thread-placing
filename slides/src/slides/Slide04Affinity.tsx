import { Slide } from '@revealjs/react'
import ws1 from '../assets/WorkStealing_1.png'
import ws2 from '../assets/WorkStealing_2.png'

export function Slide04Affinity() {
  return (
    <Slide>
      <section>
        This might be an misc section
      </section>
      <section>
        <h2>Thread Affinity</h2>
        <p>
          Well... on desktop platforms you can define where your code runs by using thread affinity.

          And also you can pin threads to specific CPU cores,
          which can improve performance for certain workloads by reducing context switching and improving cache locality.
        </p>
      </section>
      <section>
        <h2>Preemption</h2>
        <p>
          Thread scheduling is typically preemptive,
          meaning that the operating system can interrupt a running thread to allow another thread to run.
          <br />
          In raw words, any task can be interrupted without consultation.
        </p>
      </section>
      <section>
        <h2>Thread pool impl and beyond</h2>
        <p>
          Work stealing is a common technique used in thread pool implementations
          to improve load balancing and reduce idle time among worker threads.
        </p>
      </section>
      <section>
        <img src={ws1} alt="Work Stealing 1" data-preview-image />
      </section>
      <section>
        <img src={ws2} alt="Work Stealing 2" data-preview-image />
      </section>
    </Slide>
  )
}

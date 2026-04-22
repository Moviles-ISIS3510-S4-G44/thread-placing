import { Deck } from '@revealjs/react'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/dracula.css'
import { Slide01Title } from './slides/Slide01Title'
import { Slide02Placing } from './slides/Slide02Placing'
import { Slide03Coroutines } from './slides/Slide03Coroutines'
import { Slide04Affinity } from './slides/Slide04Affinity'
import { Slide05Impl } from './slides/Slide05Impl'

export function Presentation() {
  return (
    <Deck>
      <Slide01Title />
      <Slide02Placing />
      <Slide03Coroutines />
      <Slide04Affinity />
      <Slide05Impl />
    </Deck>
  )
}

import { Deck } from '@revealjs/react'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/dracula.css'
import { Slide01Title } from './slides/Slide01Title'

export function Presentation() {
  return (
    <Deck>
      <Slide01Title />
    </Deck>
  )
}

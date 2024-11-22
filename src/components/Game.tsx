import { createEffect } from 'solid-js'
import styles from './Game.module.css'
import { Game as GameObject } from '~/game/Game'

export function Game() {
  let rootRef!: HTMLDivElement

  createEffect(async () => {
    const response = await fetch('/map/simplified/Level_0/data.json')
    const levelData = await response.json()

    await new GameObject().start()

    // littlejs creates 3 canvases. Move them under our root element
    const canvasEls = document.querySelectorAll('canvas')!

    document.body.replaceChildren(rootRef)
    rootRef.append(...canvasEls)
  })

  return (
    <div ref={rootRef} class={styles.Game}>
      Game
    </div>
  )
}

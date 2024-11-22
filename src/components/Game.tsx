import { createEffect } from 'solid-js'
import styles from './Game.module.css'
import { Game as GameObject } from '~/game/Game'

export function Game() {
  let rootRef!: HTMLDivElement

  createEffect(async () => {
    const response = await fetch('/Level_0/data.json')
    const levelData = await response.json()

    await new GameObject().start(rootRef)
  })

  return (
    <div ref={rootRef} class={styles.Game}>
      Game
    </div>
  )
}

import { createEffect } from 'solid-js'
import styles from './Game.module.css'
import { Game as GameObject } from '~/game/Game'

export function Game() {
  let rootRef!: HTMLDivElement

  createEffect(async () => {
    await GameObject.start('level-0')
  })

  return (
    <div ref={rootRef} class={styles.Game}>
      Game
    </div>
  )
}

import { createEffect, onCleanup } from 'solid-js'
import styles from './Game.module.css'
import { Game as GameObject } from '~/game/Game'
import { engineObjectsDestroy } from 'littlejsengine'

export function Game() {
  let rootRef!: HTMLDivElement

  createEffect(async () => {
    await GameObject.start('level-0', rootRef)
  })

  onCleanup(() => {
    engineObjectsDestroy()
  })

  return (
    <div ref={rootRef} class={styles.Game}>
      Game
    </div>
  )
}

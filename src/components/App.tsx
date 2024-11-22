import type { Component } from 'solid-js'

import styles from './App.module.css'
import { Game } from './Game'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Game />
    </div>
  )
}

export default App

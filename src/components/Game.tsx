import styles from './Game.module.css'

export interface GameProps {}

export function Game(props: GameProps) {
  return <div class={styles.Game}>Game</div>
}

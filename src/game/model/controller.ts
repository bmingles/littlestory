import type { Vector2 } from 'littlejsengine'
import type { Direction } from './sprite'

export interface IMovementController {
  isAttacking: boolean
  isRunning: boolean

  update(): void

  nextAnimation(): string
  nextDirection(): Direction
  nextVelocity(): Vector2
}

import type { Vector2 } from 'littlejsengine'
import type { Direction } from './sprite'

export interface IMovementController {
  update(): void

  nextAnimation(): string
  nextDirection(): Direction
  nextVelocity(): Vector2
}

import type { Vector2 } from 'littlejsengine'
import type { Direction } from './sprite'

export interface IMovementController {
  nextAnimation(): string
  nextDirection(): Direction
  nextVelocity(): Vector2
}

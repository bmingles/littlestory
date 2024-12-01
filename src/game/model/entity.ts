import type { EngineObject, Vector2 } from 'littlejsengine'
import type { AnimationID, Direction } from './sprite'
import type { EntityData } from './level'
import type { IMovementController } from './controller'

export type EntityType = 'gem' | 'heart' | 'player' | 'scorpion'

export interface IEntity extends EngineObject {
  animation: AnimationID
  animationFrame: number
  direction: Direction
  drawOffset?: Vector2
  entity: EntityData
}

export interface ICharacter extends IEntity {
  isRunning: boolean
  movementController?: IMovementController
}

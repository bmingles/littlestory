import type { EngineObject } from 'littlejsengine'
import type { AnimationID, Direction } from './sprite'
import type { EntityData } from './level'
import type { IMovementController } from './controller'

export type EntityType = 'gem' | 'heart' | 'player' | 'scorpion'

export interface IEntity extends EngineObject {
  animation: AnimationID
  animationFrame: number
  direction: Direction
  entity: EntityData
}

export interface ICharacter extends IEntity {
  isRunning: boolean
  movementController?: IMovementController
}

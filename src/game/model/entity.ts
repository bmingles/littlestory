import type { EngineObject, Vector2 } from 'littlejsengine'
import type { AnimationID, Direction } from './sprite'
import type { EntityData } from './level'
import type { IMovementController } from './controller'

export type EntityType = 'gem' | 'heart' | 'player' | 'scorpion' | 'sword'

export interface IEntity extends EngineObject {
  readonly animationSpeed: number
  animation: AnimationID
  animationFrame: number
  direction: Direction
  drawOffset?: Vector2
  entity: EntityData
}

export interface ICharacter extends IEntity {
  readonly attack: number
  readonly defense: number
  life: number
  movementController?: IMovementController
  damage(force?: Vector2): void
}

export interface IEnemy extends ICharacter {}

export interface IPlayer extends ICharacter {}

export interface IWeapon extends IEntity {
  isActive: boolean
}

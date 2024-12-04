import { abs, type EngineObject, type Vector2 } from 'littlejsengine'
import type { Direction, IEntity, IMovementController } from '../model'
import { getDirection8, snapToDirection } from '../util'

export class FollowTargetMovementController implements IMovementController {
  constructor(entity: IEntity, target: EngineObject) {
    this.entity = entity
    this.target = target
  }

  isAttacking = false
  isRunning = false
  maxVelocity = 0.05
  minTargetGap = 0.05
  entity: IEntity
  target: EngineObject

  update(): void {}

  nextAnimation(): string {
    return this.entity.animation
  }

  nextDirection(): Direction {
    return getDirection8(this.entity.velocity, this.entity.direction)
  }

  nextVelocity(): Vector2 {
    const posDelta = this.target.pos.subtract(this.entity.pos)
    const direction8 = snapToDirection(posDelta)
    const velocity = direction8.clampLength(this.maxVelocity)

    if (abs(posDelta.x) < this.minTargetGap) {
      velocity.x = 0
    }
    if (abs(posDelta.y) < this.minTargetGap) {
      velocity.y = 0
    }

    return velocity
  }
}

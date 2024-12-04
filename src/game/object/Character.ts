import { Entity } from './Entity'
import type {
  AnimationID,
  EntityData,
  ICharacter,
  IMovementController,
} from '../model'
import { getDirectionAngle } from '../util'
import type { Vector2 } from 'littlejsengine'

export class Character extends Entity implements ICharacter {
  constructor(type: string, entity: EntityData, animation?: AnimationID) {
    super(type, entity, animation)
    this.setCollision(true, true)
  }

  movementController?: IMovementController
  orientCollisionBoxWithDirection: boolean = true

  takeDamage(force?: Vector2): void {
    if (force == null) {
      return
    }

    this.applyForce(force)
  }

  update() {
    super.update()

    if (this.movementController) {
      this.movementController.update()

      this.velocity = this.movementController.nextVelocity()
      this.direction = this.movementController.nextDirection()
      this.animation = this.movementController.nextAnimation()

      if (this.orientCollisionBoxWithDirection) {
        this.angle = getDirectionAngle(this.direction)
      }
    }
  }
}

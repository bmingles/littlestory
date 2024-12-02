import { vec2 } from 'littlejsengine'
import { Entity } from './Entity'
import type {
  AnimationID,
  EntityData,
  ICharacter,
  IMovementController,
} from '../model'
import { getDirectionAngle } from '../util'

export class Character extends Entity implements ICharacter {
  constructor(entity: EntityData, animation?: AnimationID) {
    super(entity, animation)
    this.setCollision(true, true)
  }

  isRunning: boolean = false
  movementController?: IMovementController
  orientCollisionBoxWithDirection: boolean = true

  update() {
    super.update()

    if (this.movementController) {
      this.velocity = this.movementController.nextVelocity()
      this.direction = this.movementController.nextDirection()
      this.animation = this.movementController.nextAnimation()

      if (this.orientCollisionBoxWithDirection) {
        this.angle = getDirectionAngle(this.direction)
      }
    }
  }
}

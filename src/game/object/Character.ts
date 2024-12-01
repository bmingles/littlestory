import { Entity } from './Entity'
import type {
  AnimationID,
  EntityData,
  ICharacter,
  IMovementController,
} from '../model'

export class Character extends Entity implements ICharacter {
  constructor(entity: EntityData, animation?: AnimationID) {
    super(entity, animation)
    this.setCollision(true, true)
  }

  isRunning: boolean = false
  movementController?: IMovementController

  update() {
    super.update()

    if (this.movementController) {
      this.velocity = this.movementController.nextVelocity()
      this.direction = this.movementController.nextDirection()
    }
  }
}

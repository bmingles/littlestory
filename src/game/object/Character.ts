import { Entity } from './Entity'
import type { ICharacter, IMovementController } from '../model'

export class Character extends Entity implements ICharacter {
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

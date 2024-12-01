import { Entity } from './Entity'
import type { MovementController } from './model'

export class Character extends Entity {
  isRunning: boolean = false
  movementController?: MovementController

  update() {
    super.update()

    if (this.movementController) {
      this.velocity = this.movementController.nextVelocity()
      this.direction = this.movementController.nextDirection()
    }
  }
}

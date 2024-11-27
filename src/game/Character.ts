import { abs, clamp, vec2, type Vector2 } from 'littlejsengine'
import { Entity } from './Entity'
import { getDirectionFromVelocity } from './util'
import { Settings } from './Settings'

export class Character extends Entity {
  isRunning: boolean = false
  moveInput: Vector2 = vec2()
  velocity: Vector2 = vec2()

  get maxVelocity() {
    return this.isRunning
      ? Settings.character.velocityRunMax
      : Settings.character.velocityWalkMax
  }

  update() {
    super.update()

    const accel = this.moveInput.clampLength().scale(Settings.accelerationRate)
    this.velocity = this.velocity.add(accel).clampLength(this.maxVelocity)

    if (abs(this.velocity.x) < Settings.character.velocityMin) {
      this.velocity.x = 0
    }
    if (abs(this.velocity.y) < Settings.character.velocityMin) {
      this.velocity.y = 0
    }

    this.direction = getDirectionFromVelocity(this.velocity, this.direction)
  }
}

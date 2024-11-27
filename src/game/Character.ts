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

  velocityScalar(axis: 'x' | 'y'): number {
    const scalar = clamp(
      this.velocity[axis] + this.moveInput[axis] * Settings.accelerationRate,
      -this.maxVelocity,
      this.maxVelocity,
    )

    if (abs(scalar) < Settings.character.velocityMin) {
      return 0
    }

    return scalar
  }

  update() {
    super.update()

    this.velocity.x = this.velocityScalar('x')
    this.velocity.y = this.velocityScalar('y')

    this.direction = getDirectionFromVelocity(this.velocity, this.direction)
  }
}

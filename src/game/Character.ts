import { abs, clamp, vec2, type Vector2 } from 'littlejsengine'
import { Entity } from './Entity'
import { getDirectionFromVelocity } from './util'

const MIN_CHARACTER_VELOCITY = 0.005
const MAX_CHARACTER_VELOCITY = 0.12

export class Character extends Entity {
  moveInput: Vector2 = vec2()
  velocity: Vector2 = vec2()
  speed = 0.02

  update() {
    super.update()

    this.velocity.x = clamp(
      this.velocity.x + this.moveInput.x * this.speed,
      -MAX_CHARACTER_VELOCITY,
      MAX_CHARACTER_VELOCITY,
    )
    if (abs(this.velocity.x) < MIN_CHARACTER_VELOCITY) {
      this.velocity.x = 0
    }

    this.velocity.y = clamp(
      this.velocity.y + this.moveInput.y * this.speed,
      -MAX_CHARACTER_VELOCITY,
      MAX_CHARACTER_VELOCITY,
    )
    if (abs(this.velocity.y) < MIN_CHARACTER_VELOCITY) {
      this.velocity.y = 0
    }

    this.direction = getDirectionFromVelocity(this.velocity, this.direction)
  }
}

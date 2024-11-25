import { abs, clamp, vec2, type Vector2 } from 'littlejsengine'
import { Entity } from './Entity'
import { getDirectionFromVelocity } from './util'

const MAX_CHARACTER_SPEED = 0.2

export class Character extends Entity {
  moveInput: Vector2 = vec2()
  velocity: Vector2 = vec2()

  update() {
    super.update()

    this.velocity.x = clamp(
      this.velocity.x + this.moveInput.x * 0.022,
      -MAX_CHARACTER_SPEED,
      MAX_CHARACTER_SPEED,
    )
    if (abs(this.velocity.x) < 0.02) {
      this.velocity.x = 0
    }

    this.velocity.y = clamp(
      this.velocity.y + this.moveInput.y * 0.022,
      -MAX_CHARACTER_SPEED,
      MAX_CHARACTER_SPEED,
    )
    if (abs(this.velocity.y) < 0.02) {
      this.velocity.y = 0
    }

    this.direction = getDirectionFromVelocity(this.velocity, this.direction)
  }
}

import { vec2, type Vector2 } from 'littlejsengine'
import { Entity } from './Entity'
import { getDirectionFromVelocity } from './util'

export class Character extends Entity {
  velocity: Vector2 = vec2()

  update() {
    super.update()

    this.direction = getDirectionFromVelocity(this.velocity, this.direction)
  }
}

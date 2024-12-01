import {
  abs,
  keyIsDown,
  vec2,
  type EngineObject,
  type Vector2,
} from 'littlejsengine'
import type { Direction, HasDirection, MovementController } from './model'
import { Settings } from './Settings'
import { getDirection8, snapToDirection } from './util'

export class PlayerMovementController implements MovementController {
  constructor(player: EngineObject & HasDirection) {
    this.player = player
  }

  player: EngineObject & HasDirection

  nextDirection(): Direction {
    return getDirection8(this.player.velocity, this.player.direction, true)
  }

  nextVelocity(): Vector2 {
    const isRunning = keyIsDown('ShiftLeft')
    const moveInput = vec2(
      Number(keyIsDown('ArrowRight')) - Number(keyIsDown('ArrowLeft')),
      Number(keyIsDown('ArrowUp')) - Number(keyIsDown('ArrowDown')),
    )

    const maxVelocity = isRunning
      ? Settings.character.velocityRunMax
      : Settings.character.velocityWalkMax

    const accel = moveInput.clampLength().scale(Settings.accelerationRate)
    const velocity = this.player.velocity.add(accel).clampLength(maxVelocity)

    if (abs(velocity.x) < Settings.character.velocityMin) {
      velocity.x = 0
    }
    if (abs(velocity.y) < Settings.character.velocityMin) {
      velocity.y = 0
    }

    return velocity
  }
}

export class FollowTargetMovementController implements MovementController {
  constructor(object: EngineObject & HasDirection, target: EngineObject) {
    this.object = object
    this.target = target
  }

  maxVelocity = 0.05
  minTargetGap = 0.05
  object: EngineObject & HasDirection
  target: EngineObject

  nextDirection(): Direction {
    return getDirection8(this.object.velocity, this.object.direction)
  }

  nextVelocity(): Vector2 {
    const posDelta = this.target.pos.subtract(this.object.pos)
    const direction8 = snapToDirection(posDelta)
    const velocity = direction8.clampLength(this.maxVelocity)

    if (abs(posDelta.x) < this.minTargetGap) {
      velocity.x = 0
    }
    if (abs(posDelta.y) < this.minTargetGap) {
      velocity.y = 0
    }

    return velocity
  }
}

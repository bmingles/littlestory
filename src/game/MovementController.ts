import {
  abs,
  keyIsDown,
  vec2,
  type EngineObject,
  type Vector2,
} from 'littlejsengine'
import type {
  Direction,
  ICharacter,
  IEntity,
  IMovementController,
} from './model'
import { Settings } from './Settings'
import { getDirection8, snapToDirection } from './util'

export class PlayerMovementController implements IMovementController {
  constructor(player: ICharacter) {
    this.player = player
  }

  player

  nextAnimation(): string {
    return this.player.animation
  }

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

export class FollowTargetMovementController implements IMovementController {
  constructor(entity: IEntity, target: EngineObject) {
    this.entity = entity
    this.target = target
  }

  maxVelocity = 0.05
  minTargetGap = 0.05
  entity: IEntity
  target: EngineObject

  nextAnimation(): string {
    return this.entity.animation
  }

  nextDirection(): Direction {
    return getDirection8(this.entity.velocity, this.entity.direction)
  }

  nextVelocity(): Vector2 {
    const posDelta = this.target.pos.subtract(this.entity.pos)
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

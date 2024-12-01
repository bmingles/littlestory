import { abs, keyIsDown, vec2, type Vector2 } from 'littlejsengine'
import type { Direction, ICharacter, IMovementController } from '../model'
import { Settings } from '../global'
import { getDirection8 } from '../util'

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

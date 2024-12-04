import { abs, keyIsDown, vec2, type Vector2 } from 'littlejsengine'
import type { Direction, ICharacter, IMovementController } from '../model'
import { Settings } from '../global'
import { getDirection8 } from '../util'

export class PlayerMovementController implements IMovementController {
  constructor(player: ICharacter) {
    this.player = player
  }

  isAttacking: boolean = false
  isRunning: boolean = false
  player

  update(): void {
    this.isAttacking = keyIsDown('Space')
    this.isRunning = keyIsDown('ShiftLeft')
  }

  nextAnimation(): string {
    if (this.isAttacking) {
      return 'attack'
    }

    if (this.player.velocity.length() === 0) {
      return 'idle'
    }

    if (this.isRunning) {
      return 'run'
    }

    return 'walk'
  }

  nextDirection(): Direction {
    return getDirection8(this.player.velocity, this.player.direction, true)
  }

  nextVelocity(): Vector2 {
    const moveInput = vec2(
      Number(keyIsDown('ArrowRight')) - Number(keyIsDown('ArrowLeft')),
      Number(keyIsDown('ArrowUp')) - Number(keyIsDown('ArrowDown')),
    )

    const maxVelocity = this.isRunning
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

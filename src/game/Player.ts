import { keyIsDown, vec2 } from 'littlejsengine'
import { Character } from './Character'
import { Settings } from './Settings'

export class Player extends Character {
  get maxVelocity(): number {
    return this.isRunning
      ? Settings.character.velocityRunMax
      : Settings.character.velocityWalkMax
  }

  update() {
    this.isRunning = keyIsDown('ShiftLeft')
    this.moveInput = vec2(
      Number(keyIsDown('ArrowRight')) - Number(keyIsDown('ArrowLeft')),
      Number(keyIsDown('ArrowUp')) - Number(keyIsDown('ArrowDown')),
    )

    super.update()

    if (this.velocity.length() === 0) {
      this.animation = 'idle'
    } else if (this.isRunning) {
      this.animation = 'run'
    } else {
      this.animation = 'walk'
    }
  }
}

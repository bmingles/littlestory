import { keyIsDown, vec2 } from 'littlejsengine'
import { Character } from './Character'

export class Player extends Character {
  update() {
    this.isRunning = keyIsDown('ShiftLeft')
    this.moveInput = vec2(
      Number(keyIsDown('ArrowRight')) - Number(keyIsDown('ArrowLeft')),
      Number(keyIsDown('ArrowUp')) - Number(keyIsDown('ArrowDown')),
    )

    if (this.moveInput.length() !== 0) {
      this.moveInput = this.moveInput.normalize()
    }

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

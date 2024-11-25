import { keyIsDown, vec2 } from 'littlejsengine'
import { Character } from './Character'

export class Player extends Character {
  update() {
    this.moveInput = vec2(
      Number(keyIsDown('ArrowRight')) - Number(keyIsDown('ArrowLeft')),
      Number(keyIsDown('ArrowUp')) - Number(keyIsDown('ArrowDown')),
    ) //.normalize()

    super.update()

    if (this.velocity.length() === 0) {
      this.animation = 'idle'
    } else {
      this.animation = 'walk'
    }
  }
}

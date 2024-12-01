import { Character } from './Character'

export class Player extends Character {
  update() {
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

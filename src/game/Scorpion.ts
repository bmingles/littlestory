import { mod, PI, vec2 } from 'littlejsengine'
import { Character } from './Character'
import type { AnimationID, EntityData } from './model'
import type { Player } from './Player'

export class Scorpion extends Character {
  constructor(
    entity: EntityData,
    player: Player,
    animation: AnimationID = 'idle',
  ) {
    super(entity, animation)

    this.player = player
  }

  player: Player

  get maxVelocity() {
    return 0.05
  }

  update() {
    this.moveInput = vec2(
      this.player.pos.x - this.pos.x,
      this.player.pos.y - this.pos.y,
    )

    super.update()

    // console.log(
    //   this.velocity.angle(),
    //   Math.floor(mod((this.velocity.angle() * 4) / PI, 8)),
    // )
    // this.velocity = vec2()
  }
}

import { Color, engineObjects, vec2, type Vector2 } from 'littlejsengine'
import type { AnimationID, EntityData, IEnemy } from '../model'
import { Character } from './Character'
import { isColliding, isPlayer } from '../util'

export class Enemy extends Character implements IEnemy {
  constructor(entity: EntityData, animation?: AnimationID) {
    super('enemy', entity, animation, new Color(1, 0, 0))
  }

  update(): void {
    super.update()

    const player = engineObjects.find(isPlayer)

    if (player && isColliding(this, player)) {
      const force = vec2().setAngle(this.angle, this.attack)
      player.damage(force)
    }
  }
}

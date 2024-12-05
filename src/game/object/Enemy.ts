import {
  Color,
  engineObjects,
  isOverlapping,
  vec2,
  type Vector2,
} from 'littlejsengine'
import type { AnimationID, EntityData, IEnemy } from '../model'
import { Character } from './Character'
import { isColliding, isPlayer } from '../util'

export class Enemy extends Character implements IEnemy {
  constructor(entity: EntityData, animation?: AnimationID) {
    super('enemy', entity, animation, new Color().setHex('#f00'))
  }

  update(): void {
    super.update()

    const player = engineObjects.find(isPlayer)

    // TODO: figure out why isColliding doesn't work (seems to be bug with custom sizes)
    if (player && isOverlapping(this.pos, vec2(1), player.pos, vec2(1))) {
      const force = vec2().setAngle(this.angle, 2)
      player.takeDamage(force)
    }
  }
}

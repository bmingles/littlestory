import { Color, vec2, type EngineObject } from 'littlejsengine'
import type { AnimationID, EntityData, IEnemy } from '../model'
import { Character } from './Character'
import { isPlayer } from '../util'

export class Enemy extends Character implements IEnemy {
  constructor(entity: EntityData, animation?: AnimationID) {
    super('enemy', entity, animation, new Color(1, 0, 0))
  }

  collideWithObject(object: EngineObject): boolean {
    if (isPlayer(object)) {
      const force = vec2().setAngle(this.angle, this.attack)
      object.damage(force)
    }

    return super.collideWithObject(object)
  }
}

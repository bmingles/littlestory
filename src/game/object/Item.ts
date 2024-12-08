import type { EngineObject } from 'littlejsengine'
import type { AnimationID, EntityData } from '../model'
import { Entity } from './Entity'
import { isPlayer } from '../util'

export class Item extends Entity {
  constructor(entity?: EntityData, animation?: AnimationID) {
    super('item', entity, animation)
    this.setCollision(true, true)
  }

  collideWithObject(object: EngineObject): boolean {
    if (isPlayer(object)) {
      this.destroy()
      return super.collideWithObject(object)
    }

    return false
  }
}

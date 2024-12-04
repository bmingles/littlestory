import type { Vector2 } from 'littlejsengine'
import type { AnimationID, EntityData, IEnemy } from '../model'
import { Character } from './Character'

export class Enemy extends Character implements IEnemy {
  constructor(entity: EntityData, animation?: AnimationID) {
    super('enemy', entity, animation)
  }
}

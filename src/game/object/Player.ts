import { vec2 } from 'littlejsengine'
import { Character } from './Character'
import type { AnimationID, EntityData, IPlayer, IWeapon } from '../model'

import { Weapon } from './Weapon'

export class Player extends Character implements IPlayer {
  constructor(entity: EntityData, animation?: AnimationID) {
    super('player', entity, animation)

    this.weapon = new Weapon('weapon')
    this.addChild(this.weapon)
    this.weapon.localPos = vec2(0, 0.5)
  }

  weapon: IWeapon

  update(): void {
    super.update()

    this.weapon.isActive = this.movementController?.isAttacking ?? false
  }
}

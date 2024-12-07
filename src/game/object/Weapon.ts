import { Color, engineObjects, vec2, Vector2 } from 'littlejsengine'
import { Entity } from './Entity'
import { isColliding, isEnemy } from '../util'
import type { IWeapon } from '../model'
import type { Character } from './Character'

export class Weapon extends Entity implements IWeapon {
  constructor(type: string) {
    super(type)
    // this.color = new Color(1, 1, 1, 0.5)
  }

  isActive = false

  get owner(): Character {
    return this.parent
  }

  update(): void {
    super.update()

    if (this.isActive) {
      const force = vec2().setAngle(this.angle, this.owner.attack)

      for (const entity of engineObjects) {
        if (isEnemy(entity) && isColliding(this, entity)) {
          entity.damage(force)
        }
      }
    }
  }

  render() {
    //   if (this.isActive) {
    //     super.render()
    //   }
  }
}

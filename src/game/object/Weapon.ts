import { engineObjects, vec2, Vector2 } from 'littlejsengine'
import { Entity } from './Entity'
import { isColliding, isEnemy } from '../util'
import type { IWeapon } from '../model'

export class Weapon extends Entity implements IWeapon {
  isActive = false

  update(): void {
    super.update()

    if (this.isActive) {
      const force = vec2().setAngle(this.angle, 2)

      for (const entity of engineObjects) {
        if (isEnemy(entity) && isColliding(this, entity)) {
          entity.takeDamage(force)
        }
      }
    }
  }

  render() {
    if (this.isActive) {
      super.render()
    }
  }
}
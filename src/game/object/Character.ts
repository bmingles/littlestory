import { Entity } from './Entity'
import type {
  AnimationID,
  EntityData,
  ICharacter,
  IMovementController,
} from '../model'
import { getDirectionAngle } from '../util'
import { Color, Timer, type Vector2 } from 'littlejsengine'
import { Healthbar } from './Healthbar'

export class Character extends Entity implements ICharacter {
  constructor(
    type: string,
    entity: EntityData,
    animation?: AnimationID,
    healthBarColor?: Color,
  ) {
    super(type, entity, animation)
    this.setCollision(true, true)

    this.color = new Color(1, 1, 1)
    this.hitTimer = new Timer()
    this.life = 1

    this.healthBar = new Healthbar(healthBarColor)
    this.addChild(this.healthBar)
  }

  healthBar: Healthbar
  hitTimer: Timer
  life: number
  movementController?: IMovementController
  orientCollisionBoxWithDirection: boolean = true

  get attack(): number {
    return this.entity.customFields?.attack ?? 1
  }

  get defense(): number {
    return this.entity.customFields?.defense ?? 1
  }

  damage(force?: Vector2): void {
    if (force == null || this.hitTimer.active()) {
      return
    }

    const damage = force.length() / this.defense

    this.life = Math.max(0, this.life - damage)
    this.healthBar.value = this.life

    this.applyForce(force)

    this.hitTimer.set(0.6)

    if (this.life < 0.01) {
      this.destroy()
    }
  }

  update() {
    super.update()

    if (this.hitTimer.active()) {
      const bit = Math.floor(this.hitTimer.getPercent() * 10) % 2
      this.color.a = bit ? 0.3 : 1
    } else {
      this.color.a = 1
    }

    if (this.movementController) {
      this.movementController.update()

      this.velocity = this.movementController.nextVelocity()
      this.direction = this.movementController.nextDirection()
      this.animation = this.movementController.nextAnimation()

      if (this.orientCollisionBoxWithDirection) {
        this.angle = getDirectionAngle(this.direction)
      }
    }
  }
}

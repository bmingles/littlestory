import { EngineObject, mod, tileSizeDefault, vec2 } from 'littlejsengine'
import type { AnimationID, Direction, EntityData } from './model'
import { Sprite } from './Sprite'

export class Entity extends EngineObject {
  constructor(entity: EntityData, animation: AnimationID = 'idle') {
    super(
      vec2(
        entity.x / tileSizeDefault.x + 0.5,
        entity.y / tileSizeDefault.y - 0.5,
      ),
      vec2(1),
    )
    this.animation = animation
    this.animationFrame = 0
    this.direction = 'S'
    this.entity = entity
  }

  animation: AnimationID
  animationFrame: number
  direction: Direction
  entity: EntityData

  update() {
    super.update()

    const speed = 0.2
    this.animationFrame = this.animationFrame + speed
  }

  render() {
    super.render()

    this.tileInfo = Sprite.tileInfo(
      this.entity.id,
      this.animation,
      this.direction,
      Math.floor(this.animationFrame),
    )
  }
}

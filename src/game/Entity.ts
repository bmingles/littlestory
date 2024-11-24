import { EngineObject, mod, tileSizeDefault, vec2 } from 'littlejsengine'
import type { AnimationID, EntityData } from './model'
import { TileCache } from './TileCache'

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
    this.entity = entity
  }

  animation: AnimationID
  animationFrame: number
  entity: EntityData

  update() {
    super.update()

    const speed = 0.2
    const frames =
      TileCache.get(this.entity.id, this.animation).data.frames ?? 1
    this.animationFrame = mod(this.animationFrame + speed, frames)
  }

  render() {
    super.render()

    this.tileInfo = TileCache.get(this.entity.id, this.animation).info.frame(
      Math.floor(this.animationFrame),
    )
  }
}

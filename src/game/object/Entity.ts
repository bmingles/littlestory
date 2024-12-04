import {
  drawTile,
  EngineObject,
  tileSizeDefault,
  vec2,
  type Vector2,
} from 'littlejsengine'
import type { AnimationID, Direction, EntityData, IEntity } from '../model'
import { Sprite } from '../global'

export class Entity extends EngineObject implements IEntity {
  constructor(
    type: string,
    entity: EntityData = { x: 0, y: 0 },
    animation: AnimationID = 'idle',
  ) {
    super(
      vec2(
        entity.x / tileSizeDefault.x + 0.5,
        entity.y / tileSizeDefault.y - 0.5,
      ),
      vec2(1),
    )
    this.type = type
    this.animation = animation
    this.animationFrame = 0
    this.direction = 'S'
    this.entity = entity
    this.renderAngle = 0
  }

  type: string
  animation: AnimationID
  animationFrame: number
  direction: Direction
  entity: EntityData
  drawOffset?: Vector2
  renderAngle?: number

  update() {
    super.update()

    const speed = 0.3
    this.animationFrame = this.animationFrame + speed

    this.renderOrder = 1000 - this.pos.y
  }

  render() {
    const drawPos = this.drawOffset ? this.pos.add(this.drawOffset) : this.pos

    // Copy / modified drawTile call from base EngineObject render implementation.
    drawTile(
      drawPos,
      this.drawSize || this.size,
      this.tileInfo,
      this.color,
      this.renderAngle ?? this.angle,
      this.mirror,
      this.additiveColor,
    )

    if (this.entity.id) {
      this.tileInfo = Sprite.tileInfo(
        this.entity.id,
        this.animation,
        this.direction,
        Math.floor(this.animationFrame),
      )
    }
  }
}

import { EngineObject, vec2 } from 'littlejsengine'
import type { EntityData } from './model'
import { TileCache } from './TileCache'

export class Entity extends EngineObject {
  constructor(entity: EntityData) {
    super(
      vec2(entity.x / 16 - 7.5, -entity.y / 16 + 7.5),
      vec2(1),
      TileCache.get(entity.id),
    )
    this.entity = entity
  }

  entity: EntityData
}

import { EngineObject, tileSizeDefault, vec2 } from 'littlejsengine'
import type { EntityData } from './model'
import { TileCache } from './TileCache'

export class Entity extends EngineObject {
  constructor(entity: EntityData) {
    super(
      vec2(
        entity.x / tileSizeDefault.x + 0.5,
        entity.y / tileSizeDefault.y - 0.5,
      ),
      vec2(1),
      TileCache.get(entity.id),
    )
    this.entity = entity
  }

  entity: EntityData
}

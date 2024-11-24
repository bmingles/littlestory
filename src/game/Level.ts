import { EngineObject, tile, tileSizeDefault, vec2 } from 'littlejsengine'
import type { LevelData } from './model'
import { Entity } from './Entity'
import { getTextureIndex } from './util'

export class Level extends EngineObject {
  constructor({ x, y, width, height, entities, imageUrl }: LevelData) {
    super(
      vec2(width / tileSizeDefault.x / 2, height / tileSizeDefault.y / 2),
      vec2(16),
      tile(vec2(x, y), vec2(width, height), getTextureIndex(imageUrl.pathname)),
    )

    for (const entity of Object.values(entities).flat()) {
      const animation = entity.id === 'player' ? 'walk' : 'idle'
      new Entity(entity, animation)
    }
  }
}

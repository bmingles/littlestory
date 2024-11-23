import { EngineObject, tile, vec2 } from 'littlejsengine'
import type { LevelData } from './model'
import { Entity } from './Entity'

export class Level extends EngineObject {
  constructor({ x, y, width, height, entities }: LevelData) {
    super(vec2(), vec2(16), tile(vec2(x, y), vec2(width, height), 1))

    for (const entity of Object.values(entities).flat()) {
      console.log(entity)
      new Entity(entity)
    }
  }
}

import { EngineObject, tile, vec2 } from 'littlejsengine'
import type { LevelData } from './model'

export class Level extends EngineObject {
  constructor({ x, y, width, height }: LevelData) {
    super(vec2(), vec2(16), tile(vec2(x, y), vec2(width, height)))
  }
}

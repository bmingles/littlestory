import { mod, tile, type TileInfo } from 'littlejsengine'
import type {
  AnimationID,
  SpriteInit,
  SpriteAnimationID,
  SpriteID,
  Direction,
} from './model'
import { getTextureIndex } from './util'

export class Sprite {
  private constructor() {}

  private static readonly _spriteData = new Map<SpriteID, SpriteInit>()

  private static readonly _tileInfoCache = new Map<
    SpriteAnimationID,
    TileInfo
  >()

  /**
   * Initialize the cache with tile indices.
   */
  static init = (config: Record<SpriteID, SpriteInit>) => {
    for (const [id, data] of Object.entries(config)) {
      Sprite._spriteData.set(id as SpriteID, data)
    }
  }

  /**
   * Get TileInfo.
   */
  static tileInfo = (
    id: SpriteID,
    animationId: AnimationID,
    direction: Direction,
    frame: number,
  ): TileInfo => {
    const animation = this._spriteData.get(id)?.[animationId]?.[direction]

    if (animation == null) {
      throw new Error(
        `No sprite animation data found for '${id}', '${animationId}', '${direction}'`,
      )
    }

    const cacheId: SpriteAnimationID = `${id}_${animationId}_${direction}`

    if (!this._tileInfoCache.has(cacheId)) {
      const { textureMatch, pos, size, padding } = animation

      const textureIndex =
        textureMatch == null ? 0 : getTextureIndex(textureMatch)

      this._tileInfoCache.set(cacheId, tile(pos, size, textureIndex, padding))
    }

    const totalFrames =
      animation.frames == null
        ? 1
        : typeof animation.frames === 'number'
        ? animation.frames
        : animation.frames.length

    return this._tileInfoCache.get(cacheId)!.frame(mod(frame, totalFrames))
  }
}

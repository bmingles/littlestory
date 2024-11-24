import { tile, type TileInfo } from 'littlejsengine'
import type {
  AnimationID,
  TileAndAnimationID,
  TileData,
  TileDataRecord,
  TileID,
} from './model'
import { getTextureIndex } from './util'

export class TileCache {
  private constructor() {}

  private static readonly _cache: Map<TileAndAnimationID, TileInfo> = new Map()
  private static readonly _tileData: Map<TileID, TileDataRecord> = new Map()

  /**
   * Initialize the cache with tile indices.
   */
  static init = (tileData: Record<TileID, TileDataRecord>) => {
    for (const [id, data] of Object.entries(tileData)) {
      TileCache._tileData.set(id as TileID, data)
    }
  }

  /**
   * Get TileInfo for a given id.
   */
  static get = (
    id: TileID,
    animationId: AnimationID,
  ): { info: TileInfo; data: TileData } => {
    const tileData = this._tileData.get(id)?.[animationId]
    if (tileData == null) {
      throw new Error(`No tile data found for '${id}' '${animationId}'`)
    }

    const cacheId: TileAndAnimationID = `${id}_${animationId}`

    if (!this._cache.has(cacheId)) {
      const { textureMatch, pos, size, padding } = tileData

      const textureIndex =
        textureMatch == null ? 0 : getTextureIndex(textureMatch)

      this._cache.set(cacheId, tile(pos, size, textureIndex, padding))
    }

    return { info: this._cache.get(cacheId)!, data: tileData }
  }
}

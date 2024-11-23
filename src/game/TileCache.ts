import { tile, type TileInfo } from 'littlejsengine'
import type { EntityType, TileData } from './model'

export type TileCacheID = EntityType

export class TileCache {
  private constructor() {}

  private static readonly _cache: Map<TileCacheID, TileInfo> = new Map()
  private static readonly _tileData: Map<TileCacheID, TileData> = new Map()

  /**
   * Initialize the cache with tile indices.
   */
  static init = (tileData: Record<TileCacheID, TileData>) => {
    for (const [id, data] of Object.entries(tileData)) {
      TileCache._tileData.set(id as TileCacheID, data)
    }
  }

  /**
   * Get TileInfo for a given id.
   */
  static get = (id: TileCacheID): TileInfo => {
    if (!this._cache.has(id)) {
      const [pos, size, textureIndex, padding] =
        TileCache._tileData.get(id) ?? []

      console.log(pos, size, textureIndex, padding)
      this._cache.set(id, tile(pos, size, textureIndex, padding))
    }

    return this._cache.get(id)!
  }
}

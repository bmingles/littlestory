import type { Vector2 } from 'littlejsengine'

export type EntityType = 'gem' | 'heart' | 'player'

export type AnimationID = string
export type TileID = EntityType
export type TileAndAnimationID = `${TileID}_${AnimationID}`

export type TileData = {
  textureMatch: string
  pos?: number | Vector2
  size?: number | Vector2
  frames?: number
  padding?: number
}

export type TileDataRecord = Record<AnimationID, TileData>

/* LDTK entity data */
export interface EntityData {
  id: EntityType
  iid: string
  layer: string
  x: number
  y: number
  width: number
  height: number
  color: number
  customFields: {}
}

/* LDTK level data */
export interface LevelData {
  identifier: string
  uniqueIdentifer: string
  x: number
  y: number
  width: number
  height: number
  bgColor: `#${string}`
  neighbourLevels: []
  customFields: {}
  layers: string[]
  entities: Record<string, EntityData[]>
  imageUrl: URL
}

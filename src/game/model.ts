import type { EngineObject, Vector2 } from 'littlejsengine'

export type EntityType = 'gem' | 'heart' | 'player' | 'scorpion'

export type AnimationID = string
export type Direction = 'S' | 'SW' | 'W' | 'NW' | 'N' | 'NE' | 'E' | 'SE'
export type SpriteID = EntityType
export type SpriteAnimationID = `${SpriteID}_${AnimationID}_${Direction}`

export interface HasDirection {
  direction: Direction
}

export type TileData = {
  textureMatch: string
  pos?: number | Vector2
  size?: number | Vector2

  padding?: number
}

export type SpriteAnimation = TileData & { frames?: number | number[] }

/*
 * South animation is always required. All other directions are optional.
 */
export type SpriteData = { S: SpriteAnimation } & {
  [D in Direction]?: SpriteAnimation
}

export type SpriteInit = Record<AnimationID, SpriteData>

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

export interface MovementController {
  nextDirection(): Direction
  nextVelocity(): Vector2
}

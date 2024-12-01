import type { Vector2 } from 'littlejsengine'
import type { EntityType } from './entity'

export type AnimationID = string
export type Direction = 'S' | 'SW' | 'W' | 'NW' | 'N' | 'NE' | 'E' | 'SE'
export type SpriteID = EntityType
export type SpriteAnimationID = `${SpriteID}_${AnimationID}_${Direction}`

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

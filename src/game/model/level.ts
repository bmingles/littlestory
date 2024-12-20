import type { EntityType } from './entity'

/* LDTK entity data */
export interface EntityData {
  id?: EntityType
  iid?: string
  layer?: string
  x: number
  y: number
  width?: number
  height?: number
  color?: number
  customFields?: {
    animationSpeed?: number
    attack?: number
    defense?: number
  }
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

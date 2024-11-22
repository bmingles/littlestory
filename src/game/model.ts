/* LDTK entity data */
export interface EntityData {
  id: string
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

import {
  textureInfos,
  vec2,
  type TextureInfo,
  type Vector2,
} from 'littlejsengine'
import type {
  Direction,
  EntityData,
  LevelData,
  SpriteAnimation,
  SpriteData,
} from './model'

/**
 * Create 8 direction animation SpriteData.
 */
export function createCharacterSpriteData(
  animationTemplate: Omit<SpriteAnimation, 'pos'>,
): SpriteData {
  let y = 0
  return {
    S: { ...animationTemplate, pos: vec2(0, y++) },
    SW: { ...animationTemplate, pos: vec2(0, y++) },
    W: { ...animationTemplate, pos: vec2(0, y++) },
    NW: { ...animationTemplate, pos: vec2(0, y++) },
    N: { ...animationTemplate, pos: vec2(0, y++) },
    NE: { ...animationTemplate, pos: vec2(0, y++) },
    E: { ...animationTemplate, pos: vec2(0, y++) },
    SE: { ...animationTemplate, pos: vec2(0, y++) },
  }
}

/**
 * Get level data for given id.
 * @param id level id
 */
export async function fetchLevelData(id: string): Promise<LevelData> {
  const storageUrl = new URL(`levels/${id}/`, location.href)
  const dataUrl = new URL('data.json', storageUrl)
  const response = await fetch(dataUrl)
  const levelData: LevelData = await response.json()

  // Flip y values of entities.
  levelData.entities = Object.keys(levelData.entities).reduce(
    (entities, type) => {
      entities[type] = levelData.entities[type].map(
        flipEntityYAxis(levelData.height),
      )
      return entities
    },
    {} as typeof levelData.entities,
  )

  return {
    ...levelData,
    imageUrl: new URL('_composite.png', storageUrl),
  }
}

/**
 * The y axis direction is opposite between LDTK and littlejs, so flip the entity
 * positions.
 * @param levelHeight
 */
export function flipEntityYAxis(levelHeight: number) {
  /**
   * Flip the y position based on level height.
   */
  return (entity: EntityData): EntityData => {
    return { ...entity, y: levelHeight - entity.y }
  }
}

/**
 * Determine direction from velocity.
 */
export function getDirectionFromVelocity(
  velocity: Vector2,
  currentDirection: Direction,
): Direction {
  if (velocity.length() === 0) {
    return currentDirection
  }

  const a = velocity.y === 0 ? '' : velocity.y < 0 ? 'S' : 'N'
  const b = velocity.x === 0 ? '' : velocity.x < 0 ? 'W' : 'E'

  return `${a}${b}` as Direction
}

/**
 * Get the texture index for the given url.
 */
export function getTextureIndex(match: string): number {
  const index = textureInfos.findIndex((t: TextureInfo) =>
    t.image.src.includes(match),
  )

  if (index < 0) {
    throw Error(`Texture not found for: '${match}'`)
  }

  return index
}

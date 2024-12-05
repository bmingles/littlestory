import {
  isOverlapping,
  mod,
  PI,
  textureInfos,
  vec2,
  type EngineObject,
  type TextureInfo,
  type Vector2,
} from 'littlejsengine'
import type {
  Direction,
  EntityData,
  IEnemy,
  IEntity,
  IPlayer,
  LevelData,
  SpriteAnimation,
  SpriteData,
} from './model'

const DIRECTIONS_8 = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const
const DIRECTIONS_VECTOR_8 = [
  vec2(0, 1),
  vec2(1, 1),
  vec2(1, 0),
  vec2(1, -1),
  vec2(0, -1),
  vec2(-1, -1),
  vec2(-1, 1),
  vec2(-1, 1),
] as const

const DIRECTION_ANGLE = {
  N: 0,
  NE: PI / 4,
  E: PI / 2,
  SE: (3 * PI) / 4,
  S: PI,
  SW: (-3 * PI) / 4,
  W: -PI / 2,
  NW: -PI / 4,
}

export function absTuple({ x, y }: Vector2): [x: number, y: number] {
  return [Math.abs(x), Math.abs(y)]
}

export function clampVector(vector: Vector2, max: Vector2): Vector2 {
  const [avx, avy] = absTuple(vector)
  const [amx, amy] = absTuple(max)
  if (avx <= amx && avy <= amy) {
    return vector
  }

  const diff = max.subtract(vector)
  const [adx, ady] = absTuple(diff)

  if (adx > ady) {
    return vector.scale(diff.y / vector.y)
  }

  return vector.scale(diff.x / vector.x)
}

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
    return { ...entity, y: levelHeight - (entity.y ?? 0) }
  }
}

/**
 * Assuming a circle is broken into 8 pieces, get the octant index for a given
 * vector.
 */
export function getAngleOctantIndex(vec2: Vector2): number {
  return Math.floor(mod((vec2.angle() * 4) / PI, 8))
}

/**
 * Get the angle in radians corresponding to a given direction.
 */
export function getDirectionAngle(direction: Direction): number {
  return DIRECTION_ANGLE[direction]
}

/**
 * Determine 1 of a 8 directions from vector.
 * @param vector Velocity to calculate direction from.
 * @param currentDirection Current direction will be returned if vector is zero.
 * @param diagonalIfNonZero If true, N, S, E, and W will only be returned if vector
 * is exactly the direction, and diagonal directions get more weight. If false
 * (the default), all directions get equal weight.
 */
export function getDirection8(
  vector: Vector2,
  currentDirection: Direction,
  diagonalIfNonZero = false,
): Direction {
  if (vector.length() === 0) {
    return currentDirection
  }

  if (diagonalIfNonZero) {
    const a = vector.y === 0 ? '' : vector.y < 0 ? 'S' : 'N'
    const b = vector.x === 0 ? '' : vector.x < 0 ? 'W' : 'E'
    return `${a}${b}` as Direction
  }

  const i = getAngleOctantIndex(vector)
  return DIRECTIONS_8[i]
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

/**
 * Return true if 2 objects are colliding.
 */
export function isColliding(a: EngineObject, b: EngineObject) {
  return isOverlapping(a.pos, a.size, b.pos, b.size)
}

/**
 * Determine if given EngineObject is an enemy.
 */
export function isEnemy(
  engineObject: EngineObject | IEntity,
): engineObject is IEnemy {
  return 'entity' in engineObject && engineObject.entity.id === 'scorpion'
}

/**
 * Determine if given EngineObject is a player.
 */
export function isPlayer(
  engineObject: EngineObject | IEntity,
): engineObject is IPlayer {
  return 'entity' in engineObject && engineObject.entity.id === 'player'
}

/**
 * Adjust vector to closest direction vector.
 */
export function snapToDirection(vector: Vector2): Vector2 {
  const i = getAngleOctantIndex(vector)
  return DIRECTIONS_VECTOR_8[i].copy()
}

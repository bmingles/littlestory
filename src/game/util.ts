import { textureInfos, type TextureInfo } from 'littlejsengine'
import type { EntityData, EntityType, LevelData } from './model'

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
 * Get the texture index for the given url.
 */
export function getTextureIndex(imageURL: URL): number {
  const index = textureInfos.findIndex(
    (t: TextureInfo) => t.image.src === imageURL.href,
  )

  if (index < 0) {
    throw Error(`Texture not found for url: ${imageURL.href}`)
  }

  return index
}

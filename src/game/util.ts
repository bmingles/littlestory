import type { LevelData } from './model'

/**
 * Get level data for given id.
 * @param id level id
 */
export async function fetchLevelData(id: string): Promise<LevelData> {
  const storageUrl = new URL(`levels/${id}/`, location.href)
  const dataUrl = new URL('data.json', storageUrl)
  const response = await fetch(dataUrl)
  const levelData: LevelData = await response.json()

  return {
    ...levelData,
    imageUrl: new URL('_composite.png', storageUrl),
  }
}

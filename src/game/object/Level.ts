import { EngineObject, tile, tileSizeDefault, vec2 } from 'littlejsengine'
import type { LevelData } from '../model'
import { Character } from './Character'
import { Entity } from './Entity'
import { Player } from './Player'
import { getTextureIndex } from '../util'
import {
  FollowTargetMovementController,
  PlayerMovementController,
} from '../controller'

export class Level extends EngineObject {
  constructor({ x, y, width, height, entities, imageUrl }: LevelData) {
    super(
      vec2(width / tileSizeDefault.x / 2, height / tileSizeDefault.y / 2),
      vec2(16),
      tile(vec2(x, y), vec2(width, height), getTextureIndex(imageUrl.pathname)),
    )

    const flatEntities = Object.values(entities).flat()

    const playerData = flatEntities.find((e) => e.id === 'player')
    if (playerData == null) {
      throw new Error('No player data found in level.')
    }

    const player = new Player(playerData, 'idle')
    player.movementController = new PlayerMovementController(player)
    player.size = vec2(2)

    for (const entity of flatEntities.filter((e) => e.id !== 'player')) {
      switch (entity.id) {
        case 'scorpion':
          const scorpion = new Character(entity, 'walk')
          scorpion.movementController = new FollowTargetMovementController(
            scorpion,
            player,
          )
          scorpion.size = vec2(2)
          break

        default:
          new Entity(entity)
      }
    }
  }
}

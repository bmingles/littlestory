import { engineInit, setCameraPos, tileSizeDefault, vec2 } from 'littlejsengine'
import { Level } from './Level'
import { fetchLevelData } from './util'
import type { LevelData } from './model'
import { TileCache } from './TileCache'

export class Game {
  static start = async (startLevelId: string, rootEl?: HTMLElement) => {
    const startLevelData = await fetchLevelData(startLevelId)

    TileCache.init({
      gem: { idle: { pos: 1719, textureMatch: 'tileset' } },
      heart: { idle: { pos: 3052, textureMatch: 'tileset' } },
      player: {
        idle: { pos: 0, size: 128, textureMatch: 'hero-idle' },
        walk: { pos: 0, size: 128, textureMatch: 'hero-walk', frames: 8 },
      },
    })

    const { init, update, updatePost, render, renderPost } = new Game(
      startLevelData,
    )

    engineInit(
      init,
      update,
      updatePost,
      render,
      renderPost,
      [
        '/tileset.png',
        '/animations/hero-walk.png',
        startLevelData.imageUrl.href,
      ],
      rootEl,
    )
  }

  private constructor(startLevelData: LevelData) {
    this._startLevelData = startLevelData
  }

  private readonly _startLevelData: LevelData

  init = () => {
    setCameraPos(
      vec2(
        this._startLevelData.width / tileSizeDefault.x,
        this._startLevelData.height / tileSizeDefault.y,
      ).scale(0.5),
    )
    new Level(this._startLevelData)
  }

  update = () => {}

  updatePost = () => {}

  render = () => {}

  renderPost = () => {
    // drawTextScreen('Hello World!', mainCanvasSize.scale(0.5), 80)
  }
}

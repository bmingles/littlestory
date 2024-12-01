import {
  engineInit,
  setCameraPos,
  setObjectDefaultDamping,
  setObjectDefaultFriction,
  tileSizeDefault,
  vec2,
} from 'littlejsengine'
import { Level } from './Level'
import { createCharacterSpriteData, fetchLevelData } from './util'
import type { LevelData } from './model'
import { Settings, Sprite } from './global'

export class Game {
  static start = async (startLevelId: string, rootEl?: HTMLElement) => {
    const startLevelData = await fetchLevelData(startLevelId)

    Sprite.init({
      gem: { idle: { S: { pos: 1719, textureMatch: 'tileset' } } },
      heart: { idle: { S: { pos: 3052, textureMatch: 'tileset' } } },
      player: {
        idle: createCharacterSpriteData({
          size: 128,
          textureMatch: 'hero-walk', // TODO: idle
          frames: 1, // [2, 2, 2, 2, 4, 4, 4, 4],
        }),
        walk: createCharacterSpriteData({
          size: 128,
          textureMatch: 'hero-walk',
          frames: 8,
        }),
        run: createCharacterSpriteData({
          size: 128,
          textureMatch: 'hero-run',
          frames: 8,
        }),
      },
      scorpion: {
        walk: createCharacterSpriteData({
          size: 128,
          textureMatch: 'scorpion-walk',
          frames: 8,
        }),
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
        '/animations/hero-run.png',
        '/animations/scorpion-walk.png',
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
    setObjectDefaultDamping(Settings.accelerationRate)
    setObjectDefaultFriction(0)

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

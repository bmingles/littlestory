import { cameraPos, engineInit, setCameraPos, vec2 } from 'littlejsengine'
import { Level } from './Level'
import { fetchLevelData } from './util'
import type { LevelData } from './model'
import { TileCache } from './TileCache'

export class Game {
  static start = async (startLevelId: string, rootEl?: HTMLElement) => {
    const startLevelData = await fetchLevelData(startLevelId)

    TileCache.init({
      gem: [1719, 16],
      heart: [3052, 16],
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
      ['/tileset.png', startLevelData.imageUrl.href],
      rootEl,
    )
  }

  private constructor(startLevelData: LevelData) {
    this._startLevelData = startLevelData
  }

  private readonly _startLevelData: LevelData

  init = () => {
    // setCameraPos(
    //   vec2(
    //     this._startLevelData.width / 16,
    //     this._startLevelData.height / 16,
    //   ).scale(0.5),
    // )
    new Level(this._startLevelData)
  }

  update = () => {}

  updatePost = () => {}

  render = () => {}

  renderPost = () => {
    // drawTextScreen('Hello World!', mainCanvasSize.scale(0.5), 80)
  }
}

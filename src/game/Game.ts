import { engineInit, tile, vec2 } from 'littlejsengine'
import { Level } from './Level'
import { fetchLevelData } from './util'
import type { LevelData } from './model'

export class Game {
  static start = async (startLevelId: string, rootEl?: HTMLElement) => {
    const startLevelData = await fetchLevelData(startLevelId)

    const { init, update, updatePost, render, renderPost } = new Game(
      startLevelData,
    )

    engineInit(
      init,
      update,
      updatePost,
      render,
      renderPost,
      [startLevelData.imageUrl.href],
      rootEl,
    )
  }

  private constructor(startLevelData: LevelData) {
    this._startLevelData = startLevelData
  }

  private readonly _startLevelData: LevelData

  init = () => {
    new Level(this._startLevelData)
  }

  update = () => {}

  updatePost = () => {}

  render = () => {}

  renderPost = () => {
    // drawTextScreen('Hello World!', mainCanvasSize.scale(0.5), 80)
  }
}

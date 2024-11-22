import { engineInit } from 'littlejsengine'
import { Level } from './Level'

const level = new Level()

export class Game {
  init() {
    level.init()
  }

  update() {}

  updatePost() {}

  render() {
    level.render()
  }

  renderPost() {
    // drawTextScreen('Hello World!', mainCanvasSize.scale(0.5), 80)
  }

  async start(rootEl?: HTMLElement) {
    engineInit(
      this.init,
      this.update,
      this.updatePost,
      this.render,
      this.renderPost,
      ['/map/simplified/Level_0/Tiles.png'],
      //['tiles.png'], //'tilesLevel.png'],
      rootEl,
    )
  }
}

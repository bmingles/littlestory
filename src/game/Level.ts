import {
  Color,
  drawRect,
  drawTile,
  mainContext,
  textureInfos,
  tile,
  tileCollisionSize,
  TileLayer,
  TileLayerData,
  vec2,
} from 'littlejsengine'

export class Level {
  init() {
    // drawTile(vec2(), vec2(256), tile(0, 256))
    // const tileLayer = new TileLayer(vec2(), tileCollisionSize)
    // const tileImage = textureInfos[0].image
    // mainContext.drawImage(tileImage, 0, 0)
    // tileLayer.redraw()
    // const levelSize = vec2(16, 16)
    // const tileLayer = new TileLayer(vec2(), levelSize, tile(0, vec2(16, 16), 0))
    // for (let y = 0; y < levelSize.y; ++y) {
    //   for (let x = 0; x < levelSize.x; ++x) {
    //     const tileI = 2
    //     const data = new TileLayerData(tileI - 1)
    //     tileLayer.setData(vec2(x, y), data)
    //   }
    // }
    // tileLayer.redraw()
  }

  render() {
    drawRect(vec2(), vec2(16), new Color(105 / 255, 106 / 255, 121 / 255))
    drawTile(vec2(), vec2(16), tile(0, 256))
  }
}

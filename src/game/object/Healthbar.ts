import { Color, drawTile, EngineObject, vec2 } from 'littlejsengine'

export class Healthbar extends EngineObject {
  constructor() {
    super()
    this.value = 1
  }

  value: number

  render() {
    drawTile(
      this.pos.add(vec2(0.5, 1.2)),
      vec2(this.value, 0.2),
      undefined,
      this.color,
    )
  }
}

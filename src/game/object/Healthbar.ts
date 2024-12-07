import { Color, drawTile, EngineObject, PI, vec2 } from 'littlejsengine'

const HEALTH_BAR_OFFSET = vec2(0.5, 1.2)

export class Healthbar extends EngineObject {
  constructor(color?: Color) {
    super()
    this.isVisible = false // don't show health bar until first update
    this.value = 1

    if (color) {
      this.color = color
    }
  }

  isVisible: boolean
  value: number

  update() {
    super.update()

    this.isVisible = true
    this.localPos = HEALTH_BAR_OFFSET.rotate(this.parent.angle + PI * 2)
  }

  render() {
    if (!this.isVisible) {
      return
    }

    drawTile(this.pos, vec2(this.value, 0.2), undefined, this.color)
  }
}

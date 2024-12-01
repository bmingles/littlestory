interface CharacterSettings {
  velocityMin: number
  velocityWalkMax: number
  velocityRunMax: number
}

export class Settings {
  static accelerationRate = 0.7
  static character: CharacterSettings = {
    velocityMin: 0.005,
    velocityWalkMax: 0.1,
    velocityRunMax: 0.16,
  }
}

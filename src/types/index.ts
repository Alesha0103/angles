export type CheckersState = {
  whiteCheckers: string[],
  blackCheckers: string[],
  memorizedChecker: MemorizedChecker | null,
  savedStep: string | null,
  savedCheckers: string[],
  whoseTurn: string,
  rotate: boolean,
  tips: boolean,
  victory: string,
}
export type MemorizedChecker = {
  type: string,
  coordinate: string,
}
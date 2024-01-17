export type CheckersState = {
  whiteCheckers: string[],
  blackCheckers: string[],
  memorizedChecker: MemorizedChecker | null,
  whoseTurn: string,
}
export type MemorizedChecker = {
  type: string,
  coordinate: string,
}
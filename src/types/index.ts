export type CheckersState = {
  whiteCheckers: string[],
  blackCheckers: string[],
  memorizedChecker: MemorizedChecker | null,
  savedStep: string | null,
  savedCheckers: string[],
  whoseTurn: string,
}
export type MemorizedChecker = {
  type: string,
  coordinate: string,
}
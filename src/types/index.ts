export type CheckersState = {
  whiteCheckers: string[],
  blackCheckers: string[],
  memorizedChecker: MemorizedChecker | null,
}
export type MemorizedChecker = {
  type: string,
  coordinate: string,
}
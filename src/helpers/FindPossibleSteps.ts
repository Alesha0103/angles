import { store } from "../store";

const checkNextCoordinateX = (possibleCoords: string[], coord: string, firstStep: boolean = true) => {
  let result = [];
  const alphabetToNumber = (letter: string) => letter.charCodeAt(0) - 64;
  const numberToAlphabet = (number: number) => String.fromCharCode(number + 64);

  const targetAlphabetNumericValue = alphabetToNumber(coord);

  const previousElement = possibleCoords.find(coord => coord[0] === numberToAlphabet(targetAlphabetNumericValue - 1));
  const beforePreviousElement = possibleCoords.find(coord => coord[0] === numberToAlphabet(targetAlphabetNumericValue - 2));
  const nextElement = possibleCoords.find(coord => coord[0] === numberToAlphabet(targetAlphabetNumericValue + 1));
  const afterNextElement = possibleCoords.find(coord => coord[0] === numberToAlphabet(targetAlphabetNumericValue + 2));

  if (previousElement && firstStep) {
    result.push(previousElement);
  }
  if (!previousElement && beforePreviousElement) {
    result.push(beforePreviousElement);
  }
  if (nextElement && firstStep) {
    result.push(nextElement);
  }
  if (!nextElement && afterNextElement) {
    result.push(afterNextElement);
  }
  return result;
}

const checkNextCoordinateY = (possibleCoords: string[], coord: string, firstStep: boolean = true) => {
  const result = [];
  const targetNumericPart = Number(coord);
  const previousElement = possibleCoords.find(coord => parseInt(coord.slice(1)) === targetNumericPart - 1);
  const beforePreviousElement = possibleCoords.find(coord => parseInt(coord.slice(1)) === targetNumericPart - 2);
  const nextElement = possibleCoords.find(coord => parseInt(coord.slice(1)) === targetNumericPart + 1);
  const afterNextElement = possibleCoords.find(coord => parseInt(coord.slice(1)) === targetNumericPart + 2);

  if (previousElement && firstStep) {
    result.push(previousElement);
  }
  if (!previousElement && beforePreviousElement) {
    result.push(beforePreviousElement);
  }
  if (nextElement && firstStep) {
    result.push(nextElement);
  }
  if (!nextElement && afterNextElement) {
    result.push(afterNextElement);
  }
  return result;
}

export const findPossibleSteps = (coordinate: string, firstStep?: boolean) => {
  if (!coordinate) {
    return [];
  }

  let gridRaw = [];
  let gridColumn = [];
  let possibleStepsX = [];
  let possibleStepsY = [];

  const whiteCheckers = store.getState().generalReducer.whiteCheckers;
  const blackCheckers = store.getState().generalReducer.blackCheckers;

  const allCheckers = [...whiteCheckers, ...blackCheckers];

  const coordinateX = coordinate.split("")[0];
  const coordinateY = coordinate.split("")[1];

  for (let i = 65; i <= 72; i++) { // ASCII code for 'A' to 'H'
    let letter = String.fromCharCode(i); // Convert ASCII code to letter
    gridRaw.push(letter + coordinateY);
  }
  for (let i = 1; i <= 8; i++) {
    gridColumn.push(coordinateX + i);
  }

  const indexCoordinateX = gridRaw.indexOf(coordinate)
  const indexCoordinateY = gridColumn.indexOf(coordinate);

  const resultX = [
    gridRaw[indexCoordinateX - 2],
    gridRaw[indexCoordinateX - 1],
    gridRaw[indexCoordinateX],
    gridRaw[indexCoordinateX + 1],
    gridRaw[indexCoordinateX + 2],
  ]
  const resultY = [
    gridColumn[indexCoordinateY - 2],
    gridColumn[indexCoordinateY - 1],
    gridColumn[indexCoordinateY],
    gridColumn[indexCoordinateY + 1],
    gridColumn[indexCoordinateY + 2],
  ]
  possibleStepsX = resultX
    .filter(element => !!element)
    .filter(coord => !allCheckers.includes(coord));

  possibleStepsY = resultY
    .filter(element => !!element)
    .filter(coord => !allCheckers.includes(coord));

  const result = [
    ...checkNextCoordinateX(possibleStepsX, coordinateX, firstStep),
    ...checkNextCoordinateY(possibleStepsY, coordinateY, firstStep)
  ];

  return result;
}

/// Сделать чтоб не только следующий шаг возвращался, но и следующий и следующий...
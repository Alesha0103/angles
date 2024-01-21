import React from 'react';

export const usePrevious = (value: any) => {
  const currentRef = React.useRef(value)
  const previousRef = React.useRef()
  if (currentRef.current !== value) {
      previousRef.current = currentRef.current
      currentRef.current = value
  }
  return previousRef.current
}
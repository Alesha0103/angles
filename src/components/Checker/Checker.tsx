import React from 'react'
import './Checker.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

type CheckerProps = {
  checkerColor: string,
}
export const Checker:React.FC<CheckerProps> = ({checkerColor}) => {

  return (
    <div
      className="checker"
      style={{backgroundColor: checkerColor}}
    />
  )
}

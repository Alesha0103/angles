import React from "react";
import { BLACK, DRAW, WHITE } from "../../helpers/constants";
import { useAppSelector } from "../../hooks/redux";

import "./Indicator.scss";

export const Indicator: React.FC = () => {
  const [ hover, setHover ] = React.useState(false);
  const { whoseTurn, victory } = useAppSelector(state => state.generalReducer);

  const onMouseEnter = () => {
    setHover(true);
  }
  const onMouseLeave = () => {
    setHover(false);
  }
  const onClick = () => {
    setHover(!hover)
  }

  const checkBG = () => {
    let bg: string = "";
    if (whoseTurn === WHITE) {
      bg = "white";
     }
     if (whoseTurn === BLACK) {
      bg = "grey";
     }
    if (victory === DRAW) {
      bg = "linear-gradient(to right, white 50%, grey 50%)";
    }
    if (victory && victory !== DRAW) {
      bg = victory === WHITE ? "white" : "grey";
     }
    return bg;
  }

  return (
    <>
      <div className="indicator__wrapp"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {hover && !victory && (
          <label className="indicator__turns">
            {whoseTurn === WHITE ? "White's turn" : "Black's turn"}
          </label>
        )}
        <div className="indicator" style={{ background: checkBG() }}/>
      </div>
    </>
  )
}
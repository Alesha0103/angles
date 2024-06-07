import React from "react";
import { WHITE } from "../../helpers/constants";
import { useAppSelector } from "../../hooks/redux";

import "./Indicator.scss";

export const Indicator: React.FC = () => {
  const [ hover, setHover ] = React.useState(false);
  const { whoseTurn } = useAppSelector(state => state.generalReducer);

  const onMouseEnter = () => {
    setHover(true);
  }
  const onMouseLeave = () => {
    setHover(false);
  }
  const onClick = () => {
    setHover(!hover)
  }

  return (
    <>
      <div className="indicator__wrapp"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {hover && (
          <label className="indicator__turns">
            {whoseTurn === WHITE ? "White's turn" : "Black's turn"}
          </label>
        )}
        <div className="indicator" style={{ backgroundColor: whoseTurn === WHITE ? "white" : "grey" }}/>
      </div>
    </>
  )
}
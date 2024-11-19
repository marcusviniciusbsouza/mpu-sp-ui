import React, { ReactNode, FC } from "react";

interface GridProps {
  children: ReactNode;
  columns?: number; 
  gap?: string; 
}

const Grid: FC<GridProps> = ({ children, columns = 2, gap = "16px" }) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
  };

  return <div style={gridStyle}>{children}</div>;
};

export default Grid;

import { twMerge } from "tailwind-merge";
import {
  END_TILE_STYLE,
  MAX_ROWS,
  PATH_TILE_STYLE,
  START_TILE_STYLE,
  TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE,
} from "../utils/constants";

interface MouseFunction {
  (row: number, col: number): void;
}

export function Tile({
  row,
  col,
  isStart,
  isEnd,
  isTraversed,
  isWall,
  isPath,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}: {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isTraversed: boolean;
  isWall: boolean;
  isPath: boolean;
  handleMouseDown: MouseFunction;
  handleMouseUp: MouseFunction;
  handleMouseEnter: MouseFunction;
}) {
  let tileTyleStyle;
  let inlineStyle = {};

  if (isStart) {
    tileTyleStyle = START_TILE_STYLE;
    inlineStyle = { backgroundColor: '#10b981' }; // green-500
  } else if (isEnd) {
    tileTyleStyle = END_TILE_STYLE;
    inlineStyle = { backgroundColor: '#dc2626' }; // red-600
  } else if (isWall) {
    tileTyleStyle = WALL_TILE_STYLE;
    inlineStyle = { backgroundColor: '#9ca3af' }; // gray-400
  } else if (isPath) {
    tileTyleStyle = PATH_TILE_STYLE;
    inlineStyle = { backgroundColor: '#16a34a' }; // green-600
  } else if (isTraversed) {
    tileTyleStyle = TRAVERSED_TILE_STYLE;
    inlineStyle = { backgroundColor: '#06b6d4' }; // cyan-500
  } else {
    tileTyleStyle = TILE_STYLE;
  }

  const borderStyle =
    row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  // Generate aria-label based on tile state
  const getAriaLabel = () => {
    let label = `Tile at row ${row + 1}, column ${col + 1}`;
    if (isStart) label += ", start position";
    else if (isEnd) label += ", end position";
    else if (isWall) label += ", wall";
    else if (isPath) label += ", part of solution path";
    else if (isTraversed) label += ", explored during search";
    return label;
  };

  return (
    <div
      role="gridcell"
      aria-label={getAriaLabel()}
      tabIndex={0}
      className={twMerge(tileTyleStyle, borderStyle, edgeStyle)}
      style={inlineStyle}
      id={`${row}-${col}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    />
  );
}

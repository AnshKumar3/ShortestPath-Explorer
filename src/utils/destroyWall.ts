import { SPEEDS, TILE_STYLE } from "./constants";
import { sleep } from "./helpers";
import { GridType, SpeedType } from "./types";

export const destroyWall = async (
  grid: GridType,
  row: number,
  col: number,
  isRight: number,
  speed: SpeedType
) => {
  if (isRight && grid[row][col + 1]) {
    grid[row][col + 1].isWall = false;
    const element = document.getElementById(`${row}-${col + 1}`);
    if (element) {
      element.className = TILE_STYLE;
      element.style.backgroundColor = ''; // Remove background color
    }
    await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
  } else if (grid[row + 1]) {
    grid[row + 1][col].isWall = false;
    const element = document.getElementById(`${row + 1}-${col}`);
    if (element) {
      element.className = TILE_STYLE;
      element.style.backgroundColor = ''; // Remove background color
    }
    await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
  } else {
    grid[row][col].isWall = false;
    const element = document.getElementById(`${row}-${col}`);
    if (element) {
      element.className = TILE_STYLE;
      element.style.backgroundColor = ''; // Remove background color
    }
    await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
  }
};

import {
  EXTENDED_SLEEP_TIME,
  PATH_TILE_STYLE,
  SLEEP_TIME,
  SPEEDS,
  TRAVERSED_TILE_STYLE,
} from "./constants";
import { isEqual } from "./helpers";
import { SpeedType, TileType } from "./types";

export const animatePath = (
  traversedTiles: TileType[],
  path: TileType[],
  startTile: TileType,
  endTile: TileType,
  speed: SpeedType
) => {
  for (let i = 0; i < traversedTiles.length; i++) {
    setTimeout(() => {
      const tile = traversedTiles[i];
      if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
        const element = document.getElementById(`${tile.row}-${tile.col}`);
        if (element) {
          element.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
          element.style.backgroundColor = '#06b6d4'; // cyan-500 for traversed
        }
      }
    }, SLEEP_TIME * i * SPEEDS.find((s) => s.value === speed)!.value);
  }

  setTimeout(() => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const tile = path[i];
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
          const element = document.getElementById(`${tile.row}-${tile.col}`);
          if (element) {
            element.className = `${PATH_TILE_STYLE} animate-path`;
            element.style.backgroundColor = '#16a34a'; // green-600 for path
          }
        }
      }, EXTENDED_SLEEP_TIME * i * SPEEDS.find((s) => s.value === speed)!.value);
    }
  }, SLEEP_TIME * traversedTiles.length * SPEEDS.find((s) => s.value === speed)!.value);
};

import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import {
  EXTENDED_SLEEP_TIME,
  MAZES,
  PATHFINDING_ALGORITHMS,
  SLEEP_TIME,
  SPEEDS,
} from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { useSpeed } from "../hooks/useSpeed";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    isGraphVisualized,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
  } = usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze === "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }

    setMaze(maze);
    setIsDisabled(true);
    runMazeAlgorithm({
      maze,
      grid,
      startTile,
      endTile,
      setIsDisabled,
      speed,
    });
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  const handlerRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }

    const { traversedTiles, path } = runPathfindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile,
    });

    animatePath(traversedTiles, path, startTile, endTile, speed);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;
    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(true);
      setIsDisabled(false);
      isVisualizationRunningRef.current = false;
    }, SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value === speed)!.value);
  };

  return (
    <nav 
      role="navigation"
      aria-label="Pathfinding visualizer controls"
      className="flex items-center justify-between min-h-[4.5rem] border-b shadow-gray-600 px-6"
    >
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-white">
          Pathfinding Visualizer
        </h1>
      </div>
      <div className="flex items-center justify-end space-x-4">
        <Select
          label="Maze"
          value={maze}
          options={MAZES}
          isDisabled={isDisabled}
          onChange={(e) => {
            handleGenerateMaze(e.target.value as MazeType);
          }}
        />
        <Select
          label="Graph"
          value={algorithm}
          isDisabled={isDisabled}
          options={PATHFINDING_ALGORITHMS}
          onChange={(e) => {
            setAlgorithm(e.target.value as AlgorithmType);
          }}
        />
        <Select
          label="Speed"
          value={speed}
          options={SPEEDS}
          isDisabled={isDisabled}
          onChange={(e) => {
            setSpeed(parseInt(e.target.value) as SpeedType);
          }}
        />
        <PlayButton
          isDisabled={isDisabled}
          isGraphVisualized={isGraphVisualized}
          handlerRunVisualizer={handlerRunVisualizer}
        />
      </div>
    </nav>
  );
}

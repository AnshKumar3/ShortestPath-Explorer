import { useRef } from "react";
import { Grid } from "./components/Grid";
import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";
import { Nav } from "./components/Nav";

function App() {
  const isVisualizationRunningRef = useRef(false);

  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col bg-[#131416]">
            <header>
              <Nav isVisualizationRunningRef={isVisualizationRunningRef} />
            </header>
            <main role="main" aria-label="Pathfinding visualizer grid">
              <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
            </main>
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  );
}

export default App;

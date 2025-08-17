# Pathfinding Visualizer - Test Documentation

## Test Suite Overview

This project includes comprehensive test coverage for:

### Unit Tests
- **Helper Functions** (`src/test/utils/helpers.test.ts`)
  - Grid creation and manipulation
  - Tile equality checks
  - Queue and stack operations
  - Random number generation

- **Algorithm Tests** (`src/test/utils/algorithms.test.ts`)
  - BFS (Breadth-First Search)
  - DFS (Depth-First Search)
  - Dijkstra's Algorithm
  - A* Algorithm
  - Path validation and algorithm comparison

### Component Tests
- **Tile Component** (`src/test/components/Tile.test.tsx`)
  - Rendering with different states
  - Event handling (mouse events)
  - Style application based on props
  - Priority of tile states

- **PlayButton Component** (`src/test/components/PlayButton.test.tsx`)
  - Play/Reset icon rendering
  - Event handling
  - Disabled state behavior
  - CSS class application

### Context Tests
- **PathfindingContext** (`src/test/context/PathfindingContext.test.tsx`)
  - Default value provision
  - Error handling outside provider
  - State management

### Integration Tests
- **App Integration** (`src/test/integration/App.test.tsx`)
  - Complete application rendering
  - Component interaction
  - Grid initialization with start/end tiles
  - Control functionality (algorithm, maze, speed selection)

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests with UI
```bash
npm run test:ui
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Specific Test File
```bash
npm test -- helpers.test.ts
```

## Test Coverage Goals

- **Unit Tests**: 90%+ coverage for utility functions and algorithms
- **Component Tests**: 80%+ coverage for React components
- **Integration Tests**: Core user workflows and component interactions
- **Edge Cases**: Error handling and boundary conditions

## Test Structure

Each test file follows the pattern:
- `describe` blocks for grouping related tests
- `it` blocks for individual test cases
- `expect` assertions for verification
- Mock functions for external dependencies
- Setup and teardown with `beforeEach`/`afterEach`

## Mocking Strategy

- DOM manipulation functions are mocked to avoid JSDOM limitations
- Algorithm functions are mocked in integration tests to focus on UI behavior
- Context providers are tested with real implementations
- External dependencies (like React Icons) are mocked when needed

## Continuous Integration

Tests are designed to run in CI environments with:
- Headless browser testing
- Deterministic results (no flaky tests)
- Fast execution times
- Clear error reporting

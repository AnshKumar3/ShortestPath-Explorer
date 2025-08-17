import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import App from '../../App'

// Mock all utility functions that use DOM manipulation and timeouts
vi.mock('../../utils/createWall', () => ({
  createWall: vi.fn(() => Promise.resolve())
}))

vi.mock('../../utils/destroyWall', () => ({
  destroyWall: vi.fn(() => Promise.resolve())
}))

vi.mock('../../utils/animatePath', () => ({
  animatePath: vi.fn(() => Promise.resolve())
}))

vi.mock('../../utils/runMazeAlgorithm', () => ({
  runMazeAlgorithm: vi.fn(() => Promise.resolve())
}))

vi.mock('../../utils/runPathfindingAlgorithm', () => ({
  runPathfindingAlgorithm: vi.fn(() => Promise.resolve())
}))

vi.mock('../../utils/runPathfindingAlgorithm', () => ({
  runPathfindingAlgorithm: vi.fn(() => ({
    traversedTiles: [],
    path: []
  }))
}))

describe('App Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render main components', () => {
    render(<App />)
    
    // Check if main heading is present
    expect(screen.getByText('Pathfinding Visualizer')).toBeInTheDocument()
    
    // Check if controls are present
    expect(screen.getByLabelText('Maze')).toBeInTheDocument()
    expect(screen.getByLabelText('Graph')).toBeInTheDocument()
    expect(screen.getByLabelText('Speed')).toBeInTheDocument()
    
    // Check if play button is present
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should allow selecting different algorithms', () => {
    render(<App />)
    
    const algorithmSelect = screen.getByLabelText('Graph')
    
    fireEvent.change(algorithmSelect, { target: { value: 'DIJKSTRA' } })
    expect(algorithmSelect).toHaveValue('DIJKSTRA')
    
    fireEvent.change(algorithmSelect, { target: { value: 'A_STAR' } })
    expect(algorithmSelect).toHaveValue('A_STAR')
    
    fireEvent.change(algorithmSelect, { target: { value: 'DFS' } })
    expect(algorithmSelect).toHaveValue('DFS')
  })

  it('should allow selecting different mazes', () => {
    render(<App />)
    
    const mazeSelect = screen.getByLabelText('Maze')
    
    fireEvent.change(mazeSelect, { target: { value: 'BINARY_TREE' } })
    expect(mazeSelect).toHaveValue('BINARY_TREE')
    
    fireEvent.change(mazeSelect, { target: { value: 'RECURSIVE_DIVISION' } })
    expect(mazeSelect).toHaveValue('RECURSIVE_DIVISION')
    
    fireEvent.change(mazeSelect, { target: { value: 'NONE' } })
    expect(mazeSelect).toHaveValue('NONE')
  })

  it('should allow selecting different speeds', () => {
    render(<App />)
    
    const speedSelect = screen.getByLabelText('Speed')
    
    // Test that we can change speed values
    fireEvent.change(speedSelect, { target: { value: '2' } })
    expect(speedSelect).toHaveValue('2')
    
    fireEvent.change(speedSelect, { target: { value: '1' } })
    expect(speedSelect).toHaveValue('1')
    
    // The speed select should exist and be functional
    expect(speedSelect).toBeInTheDocument()
  })

  it('should render grid with start and end tiles', () => {
    render(<App />)
    
    // Check if start tile exists (should have green background)
    const startTile = document.getElementById('1-1')
    expect(startTile).toBeInTheDocument()
    expect(startTile).toHaveStyle({ backgroundColor: 'rgb(16, 185, 129)' })
    
    // Check if end tile exists (should have red background)
    const endTile = document.getElementById('37-47')
    expect(endTile).toBeInTheDocument()
    expect(endTile).toHaveStyle({ backgroundColor: 'rgb(220, 38, 38)' })
  })

  it('should handle play button click', async () => {
    render(<App />)
    
    const playButton = screen.getByRole('button')
    
    // Should not be disabled initially
    expect(playButton).not.toBeDisabled()
    
    // Click the play button and handle any async operations
    await act(async () => {
      fireEvent.click(playButton)
      vi.runAllTimers()
    })
    
    // Button should still exist after clicking
    expect(playButton).toBeInTheDocument()
  })
})

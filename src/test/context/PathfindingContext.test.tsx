import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PathfindingProvider, PathfindingContext } from '../../context/PathfindingContext'
import { usePathfinding } from '../../hooks/usePathfinding'
import { useContext } from 'react'

const TestComponent = () => {
  const context = useContext(PathfindingContext)
  
  if (!context) {
    return <div>No context</div>
  }
  
  const { algorithm, maze, grid, isGraphVisualized } = context
  
  return (
    <div>
      <div data-testid="algorithm">{algorithm}</div>
      <div data-testid="maze">{maze}</div>
      <div data-testid="grid-length">{grid.length}</div>
      <div data-testid="graph-visualized">{isGraphVisualized ? 'true' : 'false'}</div>
    </div>
  )
}

describe('PathfindingContext', () => {
  it('should provide default values', () => {
    render(
      <PathfindingProvider>
        <TestComponent />
      </PathfindingProvider>
    )
    
    expect(screen.getByTestId('algorithm')).toHaveTextContent('BFS')
    expect(screen.getByTestId('maze')).toHaveTextContent('NONE')
    expect(screen.getByTestId('grid-length')).toHaveTextContent('39')
    expect(screen.getByTestId('graph-visualized')).toHaveTextContent('false')
  })

  it('should throw error when used outside provider', () => {
    // Suppress console error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const TestComponent = () => {
      usePathfinding()
      return <div>Should not render</div>
    }
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('usePathfinding must be used within a PathfindingProvider')
    
    consoleSpy.mockRestore()
  })
})

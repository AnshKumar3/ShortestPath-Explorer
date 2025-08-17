import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Tile } from '../../components/Tile'

describe('Tile Component', () => {
  const mockHandleMouseDown = vi.fn()
  const mockHandleMouseUp = vi.fn()
  const mockHandleMouseEnter = vi.fn()

  const defaultProps = {
    row: 5,
    col: 10,
    isStart: false,
    isEnd: false,
    isTraversed: false,
    isWall: false,
    isPath: false,
    handleMouseDown: mockHandleMouseDown,
    handleMouseUp: mockHandleMouseUp,
    handleMouseEnter: mockHandleMouseEnter,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with correct id', () => {
    render(<Tile {...defaultProps} />)
    const tile = document.getElementById('5-10')
    expect(tile).toBeInTheDocument()
  })

  it('should apply start tile styles when isStart is true', () => {
    render(<Tile {...defaultProps} isStart={true} />)
    const tile = document.getElementById('5-10')
    expect(tile).toHaveStyle({ backgroundColor: 'rgb(16, 185, 129)' }) // green-500
  })

  it('should apply end tile styles when isEnd is true', () => {
    render(<Tile {...defaultProps} isEnd={true} />)
    const tile = document.getElementById('5-10')
    expect(tile).toHaveStyle({ backgroundColor: 'rgb(220, 38, 38)' }) // red-600
  })

  it('should apply wall tile styles when isWall is true', () => {
    render(<Tile {...defaultProps} isWall={true} />)
    const tile = document.getElementById('5-10')
    expect(tile).toHaveStyle({ backgroundColor: 'rgb(156, 163, 175)' }) // gray-400
  })

  it('should apply path tile styles when isPath is true', () => {
    render(<Tile {...defaultProps} isPath={true} />)
    const tile = document.getElementById('5-10')
    expect(tile).toHaveStyle({ backgroundColor: 'rgb(22, 163, 74)' }) // green-600
  })

  it('should apply traversed tile styles when isTraversed is true', () => {
    render(<Tile {...defaultProps} isTraversed={true} />)
    const tile = document.getElementById('5-10')
    expect(tile).toHaveStyle({ backgroundColor: 'rgb(6, 182, 212)' }) // cyan-500
  })

  it('should call handleMouseDown when clicked', () => {
    render(<Tile {...defaultProps} />)
    const tile = document.getElementById('5-10')
    
    fireEvent.mouseDown(tile!)
    expect(mockHandleMouseDown).toHaveBeenCalledWith(5, 10)
  })

  it('should call handleMouseUp when mouse is released', () => {
    render(<Tile {...defaultProps} />)
    const tile = document.getElementById('5-10')
    
    fireEvent.mouseUp(tile!)
    expect(mockHandleMouseUp).toHaveBeenCalledWith(5, 10)
  })

  it('should call handleMouseEnter when mouse enters', () => {
    render(<Tile {...defaultProps} />)
    const tile = document.getElementById('5-10')
    
    fireEvent.mouseEnter(tile!)
    expect(mockHandleMouseEnter).toHaveBeenCalledWith(5, 10)
  })

  it('should prioritize start tile styles over other states', () => {
    render(<Tile {...defaultProps} isStart={true} isWall={true} isPath={true} />)
    const tile = document.getElementById('5-10')
    expect(tile).toHaveStyle({ backgroundColor: 'rgb(16, 185, 129)' }) // green-500 for start
  })

  it('should prioritize end tile styles over wall and path states', () => {
    render(<Tile {...defaultProps} isEnd={true} isWall={true} isPath={true} />)
    const tile = document.getElementById('5-10')
    expect(tile).toHaveStyle({ backgroundColor: 'rgb(220, 38, 38)' }) // red-600 for end
  })
})

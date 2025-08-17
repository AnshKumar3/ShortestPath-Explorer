import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { PlayButton } from '../../components/PlayButton'

describe('PlayButton Component', () => {
  const mockHandler = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render play icon when not visualized', () => {
    render(
      <PlayButton 
        handlerRunVisualizer={mockHandler}
        isDisabled={false}
        isGraphVisualized={false}
      />
    )
    
    const playIcon = document.querySelector('.w-8.h-8')
    expect(playIcon).toBeInTheDocument()
  })

  it('should render reset icon when visualized', () => {
    render(
      <PlayButton 
        handlerRunVisualizer={mockHandler}
        isDisabled={false}
        isGraphVisualized={true}
      />
    )
    
    const resetIcon = document.querySelector('.w-8.h-8')
    expect(resetIcon).toBeInTheDocument()
  })

  it('should call handler when clicked', () => {
    render(
      <PlayButton 
        handlerRunVisualizer={mockHandler}
        isDisabled={false}
        isGraphVisualized={false}
      />
    )
    
    const button = document.querySelector('button')
    fireEvent.click(button!)
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when isDisabled is true', () => {
    render(
      <PlayButton 
        handlerRunVisualizer={mockHandler}
        isDisabled={true}
        isGraphVisualized={false}
      />
    )
    
    const button = document.querySelector('button')
    expect(button).toBeDisabled()
  })

  it('should not call handler when disabled and clicked', () => {
    render(
      <PlayButton 
        handlerRunVisualizer={mockHandler}
        isDisabled={true}
        isGraphVisualized={false}
      />
    )
    
    const button = document.querySelector('button')
    fireEvent.click(button!)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('should have correct CSS classes', () => {
    render(
      <PlayButton 
        handlerRunVisualizer={mockHandler}
        isDisabled={false}
        isGraphVisualized={false}
      />
    )
    
    const button = document.querySelector('button')
    expect(button).toHaveClass('bg-green-500')
    expect(button).toHaveClass('rounded-full')
    expect(button).toHaveClass('p-4')
  })
})

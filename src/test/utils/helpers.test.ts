import { describe, it, expect } from 'vitest'
import { 
  createGrid, 
  checkIfStartOrEnd, 
  createNewGrid, 
  isEqual, 
  isRowColEqual,
  sleep,
  getRandInt,
  checkStack,
  dropFromQueue 
} from '../../utils/helpers'
import { START_TILE_CONFIGURATION, END_TILE_CONFIGURATION } from '../../utils/constants'
import { TileType } from '../../utils/types'

describe('Helper Functions', () => {
  describe('createGrid', () => {
    it('should create a grid with correct dimensions', () => {
      const grid = createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION)
      expect(grid).toHaveLength(39) // MAX_ROWS
      expect(grid[0]).toHaveLength(49) // MAX_COLS
    })

    it('should set start and end tiles correctly', () => {
      const grid = createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION)
      const startTile = grid[1][1]
      const endTile = grid[37][47]
      
      expect(startTile.isStart).toBe(true)
      expect(startTile.isEnd).toBe(false)
      expect(startTile.distance).toBe(0)
      
      expect(endTile.isEnd).toBe(true)
      expect(endTile.isStart).toBe(false)
    })

    it('should initialize tiles with default values', () => {
      const grid = createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION)
      const regularTile = grid[10][10]
      
      expect(regularTile.isWall).toBe(false)
      expect(regularTile.isPath).toBe(false)
      expect(regularTile.isTraversed).toBe(false)
      expect(regularTile.parent).toBe(null)
      expect(regularTile.distance).toBe(Infinity)
    })
  })

  describe('checkIfStartOrEnd', () => {
    it('should return true for start tile position', () => {
      expect(checkIfStartOrEnd(1, 1)).toBe(true)
    })

    it('should return true for end tile position', () => {
      expect(checkIfStartOrEnd(37, 47)).toBe(true)
    })

    it('should return false for other positions', () => {
      expect(checkIfStartOrEnd(5, 5)).toBe(false)
      expect(checkIfStartOrEnd(0, 0)).toBe(false)
      expect(checkIfStartOrEnd(20, 20)).toBe(false)
    })
  })

  describe('createNewGrid', () => {
    it('should toggle wall state of a tile', () => {
      const grid = createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION)
      const originalState = grid[10][10].isWall
      
      const newGrid = createNewGrid(grid, 10, 10)
      expect(newGrid[10][10].isWall).toBe(!originalState)
    })

    it('should not modify the original grid', () => {
      const grid = createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION)
      const originalState = grid[10][10].isWall
      
      createNewGrid(grid, 10, 10)
      expect(grid[10][10].isWall).toBe(originalState)
    })
  })

  describe('isEqual', () => {
    it('should return true for tiles with same coordinates', () => {
      const tile1: TileType = { row: 5, col: 10, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const tile2: TileType = { row: 5, col: 10, isEnd: true, isWall: true, isPath: true, distance: 5, isStart: true, isTraversed: true, parent: tile1 }
      
      expect(isEqual(tile1, tile2)).toBe(true)
    })

    it('should return false for tiles with different coordinates', () => {
      const tile1: TileType = { row: 5, col: 10, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const tile2: TileType = { row: 5, col: 11, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      
      expect(isEqual(tile1, tile2)).toBe(false)
    })
  })

  describe('isRowColEqual', () => {
    it('should return true when row and col match tile coordinates', () => {
      const tile: TileType = { row: 5, col: 10, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      expect(isRowColEqual(5, 10, tile)).toBe(true)
    })

    it('should return false when coordinates do not match', () => {
      const tile: TileType = { row: 5, col: 10, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      expect(isRowColEqual(5, 11, tile)).toBe(false)
      expect(isRowColEqual(6, 10, tile)).toBe(false)
    })
  })

  describe('sleep', () => {
    it('should resolve after specified time', async () => {
      const start = Date.now()
      await sleep(100)
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(90) // Allow for some timing variance
    })
  })

  describe('getRandInt', () => {
    it('should return integer within range', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandInt(5, 10)
        expect(result).toBeGreaterThanOrEqual(5)
        expect(result).toBeLessThan(10)
        expect(Number.isInteger(result)).toBe(true)
      }
    })
  })

  describe('checkStack', () => {
    it('should return true if tile is in stack', () => {
      const tile1: TileType = { row: 5, col: 10, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const tile2: TileType = { row: 6, col: 11, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const stack = [tile1, tile2]
      
      expect(checkStack(tile1, stack)).toBe(true)
    })

    it('should return false if tile is not in stack', () => {
      const tile1: TileType = { row: 5, col: 10, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const tile2: TileType = { row: 6, col: 11, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const tile3: TileType = { row: 7, col: 12, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const stack = [tile1, tile2]
      
      expect(checkStack(tile3, stack)).toBe(false)
    })
  })

  describe('dropFromQueue', () => {
    it('should remove tile from queue', () => {
      const tile1: TileType = { row: 5, col: 10, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const tile2: TileType = { row: 6, col: 11, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const queue = [tile1, tile2]
      
      dropFromQueue(tile1, queue)
      expect(queue).toHaveLength(1)
      expect(queue[0]).toBe(tile2)
    })

    it('should not modify queue if tile not found', () => {
      const tile1: TileType = { row: 5, col: 10, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const tile2: TileType = { row: 6, col: 11, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const tile3: TileType = { row: 7, col: 12, isEnd: false, isWall: false, isPath: false, distance: 0, isStart: false, isTraversed: false, parent: null }
      const queue = [tile1, tile2]
      
      dropFromQueue(tile3, queue)
      expect(queue).toHaveLength(2)
    })
  })
})

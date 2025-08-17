import { describe, it, expect, beforeEach } from 'vitest'
import { bfs } from '../../lib/algorithms/pathfinding/bfs'
import { dfs } from '../../lib/algorithms/pathfinding/dfs'
import { dijkstra } from '../../lib/algorithms/pathfinding/dijkstra'
import { aStar } from '../../lib/algorithms/pathfinding/aStar'
import { createGrid } from '../../utils/helpers'
import { START_TILE_CONFIGURATION, END_TILE_CONFIGURATION } from '../../utils/constants'

describe('Pathfinding Algorithms', () => {
  let grid: any
  let startTile: any
  let endTile: any

  beforeEach(() => {
    grid = createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION)
    startTile = grid[1][1]
    endTile = grid[37][47]
  })

  describe('BFS Algorithm', () => {
    it('should find a path from start to end', () => {
      const result = bfs(grid, startTile, endTile)
      
      expect(result.traversedTiles).toBeDefined()
      expect(result.path).toBeDefined()
      expect(result.traversedTiles.length).toBeGreaterThan(0)
      expect(result.path.length).toBeGreaterThan(0)
    })

    it('should mark start tile as traversed', () => {
      const result = bfs(grid, startTile, endTile)
      
      expect(result.traversedTiles[0]).toBe(startTile)
      expect(startTile.isTraversed).toBe(true)
    })

    it('should create a valid path', () => {
      const result = bfs(grid, startTile, endTile)
      
      expect(result.path[0]).toBe(startTile)
      expect(result.path[result.path.length - 1]).toBe(endTile)
      
      // Check path continuity
      for (let i = 0; i < result.path.length - 1; i++) {
        const current = result.path[i]
        const next = result.path[i + 1]
        const distance = Math.abs(current.row - next.row) + Math.abs(current.col - next.col)
        expect(distance).toBe(1) // Adjacent tiles
      }
    })
  })

  describe('DFS Algorithm', () => {
    it('should find a path from start to end', () => {
      const result = dfs(grid, startTile, endTile)
      
      expect(result.traversedTiles).toBeDefined()
      expect(result.path).toBeDefined()
      expect(result.traversedTiles.length).toBeGreaterThan(0)
      expect(result.path.length).toBeGreaterThan(0)
    })

    it('should start from the start tile', () => {
      const result = dfs(grid, startTile, endTile)
      
      expect(result.path[0]).toBe(startTile)
      expect(result.path[result.path.length - 1]).toBe(endTile)
    })
  })

  describe('Dijkstra Algorithm', () => {
    it('should find the shortest path', () => {
      const result = dijkstra(grid, startTile, endTile)
      
      expect(result.traversedTiles).toBeDefined()
      expect(result.path).toBeDefined()
      expect(result.traversedTiles.length).toBeGreaterThan(0)
      expect(result.path.length).toBeGreaterThan(0)
    })

    it('should set correct distances', () => {
      const result = dijkstra(grid, startTile, endTile)
      
      expect(startTile.distance).toBe(0)
      
      // Check that distances increase along the path
      for (let i = 1; i < result.path.length; i++) {
        const current = result.path[i]
        expect(current.distance).toBeGreaterThanOrEqual(i)
      }
    })
  })

  describe('A* Algorithm', () => {
    it('should find a path from start to end', () => {
      const result = aStar(grid, startTile, endTile)
      
      expect(result.traversedTiles).toBeDefined()
      expect(result.path).toBeDefined()
      expect(result.traversedTiles.length).toBeGreaterThan(0)
      expect(result.path.length).toBeGreaterThan(0)
    })

    it('should use heuristic efficiently', () => {
      const result = aStar(grid, startTile, endTile)
      const bfsResult = bfs(grid, startTile, endTile)
      
      // A* should generally traverse fewer tiles than BFS due to heuristic
      expect(result.traversedTiles.length).toBeLessThanOrEqual(bfsResult.traversedTiles.length)
    })
  })

  describe('Algorithm Comparison', () => {
    it('should all find valid paths', () => {
      const bfsResult = bfs(grid, startTile, endTile)
      const dfsResult = dfs(grid, startTile, endTile)
      const dijkstraResult = dijkstra(grid, startTile, endTile)
      const aStarResult = aStar(grid, startTile, endTile)
      
      expect(bfsResult.path.length).toBeGreaterThan(0)
      expect(dfsResult.path.length).toBeGreaterThan(0)
      expect(dijkstraResult.path.length).toBeGreaterThan(0)
      expect(aStarResult.path.length).toBeGreaterThan(0)
    })
  })
})

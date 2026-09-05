import fs from 'fs';
import { REAL_INDIA_STATES } from './src/data/realIndiaSvgPaths.js';

let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

REAL_INDIA_STATES.forEach(s => {
  if (s.bounds) {
    if (s.bounds.minX < minX) minX = s.bounds.minX;
    if (s.bounds.minY < minY) minY = s.bounds.minY;
    if (s.bounds.maxX > maxX) maxX = s.bounds.maxX;
    if (s.bounds.maxY > maxY) maxY = s.bounds.maxY;
  }
});

console.log(`India Geographic Bounding Box: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);
console.log(`Width = ${maxX - minX}, Height = ${maxY - minY}`);

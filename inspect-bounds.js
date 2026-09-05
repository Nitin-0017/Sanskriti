import { REAL_INDIA_STATES } from './src/data/realIndiaSvgPaths.js';

REAL_INDIA_STATES.forEach(s => {
  console.log(`${s.name} (${s.id}): cx=${s.cx}, cy=${s.cy}, minX=${s.bounds.minX}, maxX=${s.bounds.maxX}, minY=${s.bounds.minY}, maxY=${s.bounds.maxY}`);
});

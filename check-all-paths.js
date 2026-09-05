import { REAL_INDIA_STATES } from './src/data/realIndiaSvgPaths.js';

console.log("Checking all states for rogue polygons outside [0, 1000] x [0, 1100]:");

REAL_INDIA_STATES.forEach(state => {
  // Check numbers in path string d
  const matches = state.d.match(/-?\d+/g);
  if (!matches) return;
  let min = Infinity, max = -Infinity;
  for (let numStr of matches) {
    const n = parseInt(numStr, 10);
    if (n < min) min = n;
    if (n > max) max = n;
  }
  if (min < 0 || max > 1100) {
    console.log(`⚠️ STATE ${state.name} (${state.id}) has out-of-range coordinates! min=${min}, max=${max}`);
  }
});
console.log("Check complete.");

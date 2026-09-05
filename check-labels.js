import { REAL_INDIA_STATES } from './src/data/realIndiaSvgPaths.js';

console.log("Checking all state label coordinates and potential overlaps:");
const labels = REAL_INDIA_STATES.map(s => ({
  id: s.id,
  name: s.name,
  cx: s.cx,
  cy: s.cy
}));

labels.sort((a, b) => a.cy - b.cy);

labels.forEach(l => {
  console.log(`${l.name} (${l.id}): x=${l.cx}, y=${l.cy}`);
});

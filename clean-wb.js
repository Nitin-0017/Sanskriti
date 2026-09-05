import fs from 'fs';

const raw = fs.readFileSync('./src/data/realIndiaSvgPaths.js', 'utf8');

// The rogue polygon in West Bengal starts with M2807,-3172 or ZM2807,-3172 and ends with 2807,-3172Z
// Let's remove any sub-path containing 2807 or -5738
const cleaned = raw.replace(/Z?M2807,-3172[\s\S]*?2807,-3172Z/g, '');

fs.writeFileSync('./src/data/realIndiaSvgPaths.js', cleaned);
console.log('Removed rogue polygon from West Bengal in realIndiaSvgPaths.js!');

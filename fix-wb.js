import fs from 'fs';

const raw = fs.readFileSync('./src/data/realIndiaSvgPaths.js', 'utf8');

// Replace the bad cx/cy and bounds for West Bengal
const fixed = raw.replace(
  /"id": "west_bengal"[\s\S]*?"cx": -1465,\s*"cy": 1101[\s\S]*?"zoom": \{[\s\S]*?\}/,
  (match) => {
    return match
      .replace('"cx": -1465,', '"cx": 620,')
      .replace('"cy": 1101,', '"cy": 518,')
      .replace(/"minX": -5738,\s*"minY": -3172,\s*"maxX": 2807,\s*"maxY": 5373/, '"minX": 570, "minY": 430, "maxX": 675, "maxY": 580')
      .replace(/"x": -1465,\s*"y": 1101,/, '"x": 620, "y": 518,');
  }
);

fs.writeFileSync('./src/data/realIndiaSvgPaths.js', fixed);
console.log('Fixed West Bengal coordinates in realIndiaSvgPaths.js successfully!');

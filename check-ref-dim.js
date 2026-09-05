import fs from 'fs';

const buf = fs.readFileSync('./public/assets/full_map_reference.jpg');
// Find dimensions from JPEG SOF0 or SOF2
let offset = 2;
while (offset < buf.length) {
  const marker = buf.readUInt16BE(offset);
  offset += 2;
  if (marker === 0xFFC0 || marker === 0xFFC2) {
    const height = buf.readUInt16BE(offset + 3);
    const width = buf.readUInt16BE(offset + 5);
    console.log(`full_map_reference.jpg dimensions: ${width} x ${height}`);
    break;
  }
  const len = buf.readUInt16BE(offset);
  offset += len;
}

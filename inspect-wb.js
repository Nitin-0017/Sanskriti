import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

const geojson = JSON.parse(fs.readFileSync('./src/data/india-states.geojson', 'utf8'));

const wbFeature = geojson.features.find(f => 
  (f.properties.NAME_1 || f.properties.name || f.properties.st_nm) === 'West Bengal'
);

console.log('WB geometry type:', wbFeature?.geometry.type);
console.log('WB coordinates length:', wbFeature?.geometry.coordinates.length);

const projection = geoMercator()
  .center([82.8, 22.2])
  .scale(1360)
  .translate([500, 560]);

const pathGenerator = geoPath().projection(projection);

if (wbFeature) {
  wbFeature.geometry.coordinates.forEach((poly, idx) => {
    // Check if poly has valid longitude/latitude (between 80° and 90° E, 20° and 30° N)
    const ring = Array.isArray(poly[0][0]) ? poly[0] : poly;
    const lons = ring.map(p => p[0]);
    const lats = ring.map(p => p[1]);
    const minLon = Math.min(...lons), maxLon = Math.max(...lons);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    console.log(`Poly ${idx}: minLon=${minLon}, maxLon=${maxLon}, minLat=${minLat}, maxLat=${maxLat}, len=${ring.length}`);
  });
}

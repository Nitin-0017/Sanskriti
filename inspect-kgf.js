import https from 'https';

https.get('https://raw.githubusercontent.com/india-in-data/kashmir/master/kashmir_geo_final.geojson', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const gj = JSON.parse(data);
      console.log('Features count:', gj.features.length);
      gj.features.forEach(f => {
        console.log('Props:', f.properties);
      });
    } catch (e) {
      console.error(e);
    }
  });
});

import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

const geojsonRaw = fs.readFileSync('./src/data/india-states.geojson', 'utf8');
const geojson = JSON.parse(geojsonRaw);

// 1024 x 597 viewBox matching full_map_reference.jpg
// Ratio of 1024/1644 = 0.62287
// Scale: 1580 * 0.62287 = 984
// Translate: [735 * 0.62287, 475 * 0.62287] = [457.8, 295.8]
const projection = geoMercator()
  .center([80.8, 24.2])
  .scale(985)
  .translate([458, 296]);

const pathGenerator = geoPath().projection(projection);

const STATE_METADATA = {
  'Haryana': {
    devanagari: 'हरियाणा',
    tagline: 'Land of Folk Traditions',
    desc: 'Vedic heartland of Kurukshetra where the Bhagavad Gita was sung. Rich in ancient archaeological sites like Rakhigarhi, vibrant Saang folk theatre, and agricultural traditions.',
    monuments: 'Kurukshetra, Jyotisar, Brahma Sarovar, Pinjore Gardens, Rakhigarhi',
    folkArts: 'Saang, Ragini, Dhamal Dance, Phulkari Embroidery',
    scriptures: 'Bhagavad Gita, Saraswati Rigvedic Hymns',
    highlights: ['Temples', 'Folk Arts', 'Literature', 'Scriptures', 'Key Persons'],
    featured: true,
    exactCenter: { x: 398, y: 178 },
  },
  'Rajasthan': {
    devanagari: 'राजस्थान',
    tagline: 'Land of Forts & Chivalry',
    desc: 'Golden desert sands crowned by majestic hill forts, vibrant Ghoomar folk dances, miniature paintings, and ballads of Rajput chivalry.',
    monuments: 'Mehrangarh, Amer Fort, Kumbhalgarh, Jaisalmer, Dilwara Temples',
    folkArts: 'Ghoomar, Kalbelia, Kathputli Puppetry, Blue Pottery, Pichwai Paintings',
    scriptures: 'Prithviraj Raso, Meera Bai Bhajans',
    highlights: ['Hill Forts', 'Folk Music', 'Miniatures', 'Palaces', 'Crafts'],
    exactCenter: { x: 275, y: 235 },
  },
  'Punjab': {
    devanagari: 'पंजाब',
    tagline: 'Land of Five Rivers & Devotion',
    desc: 'Fertile heartland of Bhangra rhythm, Sufi poetry of Bulleh Shah, and golden architectural splendor of the Harmandir Sahib.',
    monuments: 'Golden Temple (Harmandir Sahib), Qila Mubarak, Wagah Border',
    folkArts: 'Bhangra, Giddha, Sufiana Kalam, Phulkari',
    scriptures: 'Guru Granth Sahib, Waris Shah Heer Ranjha',
    highlights: ['Sacred Gurdwaras', 'Folk Music', 'Sufi Poetry', 'Folk Dances'],
    exactCenter: { x: 330, y: 155 },
  },
  'Gujarat': {
    devanagari: 'गुजरात',
    tagline: 'Cradle of Maritime Trade & Crafts',
    desc: 'Ancient Indus Valley port of Lothal, sacred Dwarkadhish & Somnath temples, exquisite Rani ki Vav stepwells, and lively Garba.',
    monuments: 'Somnath, Dwarka, Rani ki Vav, Sun Temple Modhera, Lothal',
    folkArts: 'Garba, Bhavai Theatre, Rogan Art, Bandhani, Patola Weaving',
    scriptures: 'Narsinh Mehta Bhakti Verses, Dayaram Poetry',
    highlights: ['Stepwells', 'Coastal Temples', 'Garba & Raas', 'Handicrafts'],
    exactCenter: { x: 238, y: 300 },
  },
  'Uttar Pradesh': {
    devanagari: 'उत्तर प्रदेश',
    tagline: 'Spiritual Heartland & Epics',
    desc: 'The eternal ghats of Kashi (Varanasi), sacred Ayodhya & Mathura, classical Kathak dance, and syncretic cultural heritage of Awadh.',
    monuments: 'Kashi Vishwanath, Sarnath, Ram Janmabhoomi, Rumi Darwaza',
    folkArts: 'Kathak, Raslila, Nautanki, Chikankari Embroidery, Brassware',
    scriptures: 'Ramcharitmanas, Valmiki Ramayana, Kabir Dohe, Sur Sagar',
    highlights: ['Kashi Ghats', 'Ramayana & Mahabharata', 'Kathak', 'Chikankari'],
    exactCenter: { x: 492, y: 246 },
  },
  'Madhya Pradesh': {
    devanagari: 'मध्य प्रदेश',
    tagline: 'Heart of India & Ancient Sculptures',
    desc: 'Carved stone temples of Khajuraho, Sanchi Buddhist stupas, prehistoric Bhimbetka caves, and tribal Gond artworks.',
    monuments: 'Khajuraho, Sanchi Stupa, Gwalior Fort, Mahakaleshwar Ujjain',
    folkArts: 'Gond Painting, Pithora Art, Matki Dance, Chanderi Weaving',
    scriptures: 'Kalidasa Dramas (Meghaduta, Shakuntala)',
    highlights: ['Khajuraho Temples', 'Sanchi Stupa', 'Tribal Gond Art', 'Bhimbetka'],
    exactCenter: { x: 380, y: 288 },
  },
  'Maharashtra': {
    devanagari: 'महाराष्ट्र',
    tagline: 'Forts of the Marathas & Rock-Cut Caves',
    desc: 'Impregnable Sahyadri hill forts of Shivaji Maharaj, rock-cut Ajanta & Ellora cave sculptures, and devotional Varkari Abhangas.',
    monuments: 'Ellora Kailasa Temple, Ajanta Caves, Raigad Fort, Sindhudurg Fort',
    folkArts: 'Lavani, Warli Painting, Powada Ballads, Paithani Silk',
    scriptures: 'Jnaneshwari, Tukaram Gatha, Eknathi Bhagavata',
    highlights: ['Ajanta & Ellora', 'Maratha Forts', 'Warli Art', 'Lavani'],
    exactCenter: { x: 325, y: 365 },
  },
  'Tamil Nadu': {
    devanagari: 'तमिलनाडु',
    tagline: 'Sanctuary of Grand Dravidian Temples',
    desc: 'Towering stone Gopurams of Thanjavur & Madurai, millennia-old Sangam classical literature, Bharatanatyam dance, and Carnatic music.',
    monuments: 'Brihadeeswara Thanjavur, Meenakshi Madurai, Shore Temple Mahabalipuram',
    folkArts: 'Bharatanatyam, Tanjore Painting, Kanchipuram Silk',
    scriptures: 'Tirukkural, Silappadikaram, Tevaram, Divya Prabandham',
    highlights: ['Brihadeeswara Temple', 'Bharatanatyam', 'Sangam Literature', 'Carnatic Music'],
    exactCenter: { x: 448, y: 520 },
  },
  'Karnataka': {
    devanagari: 'कर्नाटक',
    tagline: 'Legacy of Vijayanagara & Hoysalas',
    desc: 'Breathtaking ruins of Hampi with its stone chariot, ornate Hoysala carvings at Belur & Halebidu, Mysore Palace, and Yakshagana theatre.',
    monuments: 'Hampi Stone Chariot, Belur-Halebidu, Gol Gumbaz, Mysore Palace',
    folkArts: 'Yakshagana, Dollu Kunitha, Bidriware, Mysore Silk',
    scriptures: 'Vachana Sahitya of Basavanna, Pampa Bharata',
    highlights: ['Hampi Ruins', 'Hoysala Carvings', 'Yakshagana', 'Mysore Heritage'],
    exactCenter: { x: 355, y: 450 },
  },
  'Kerala': {
    devanagari: 'केरल',
    tagline: 'God\'s Own Country & Ancient Ayurveda',
    desc: 'Dramatic Kathakali & Theyyam ritual dances, Kalaripayattu martial art, wooden temple architecture, spice trade history, and backwaters.',
    monuments: 'Padmanabhaswamy Temple, Bekal Fort, Mattancherry Palace',
    folkArts: 'Kathakali, Mohiniyattam, Theyyam, Panchavadyam',
    scriptures: 'Ezhuthachan Adhyatma Ramayanam, Narayaneeyam',
    highlights: ['Kathakali & Theyyam', 'Kalaripayattu', 'Ayurveda', 'Mural Paintings'],
    exactCenter: { x: 355, y: 515 },
  },
  'Odisha': {
    devanagari: 'ओडिशा',
    tagline: 'Land of Jagannath & Sun Temple',
    desc: 'Architectural chariot wheel of Konark Sun Temple, sacred Puri Jagannath Rath Yatra, classical Odissi dance, and Pattachitra paintings.',
    monuments: 'Konark Sun Temple, Puri Jagannath Temple, Lingaraj Temple',
    folkArts: 'Odissi Classical Dance, Pattachitra Painting, Sambalpuri Ikat',
    scriptures: 'Gita Govinda of Jayadeva, Sarala Mahabharata',
    highlights: ['Konark Sun Temple', 'Jagannath Puri', 'Odissi Dance', 'Pattachitra'],
    exactCenter: { x: 555, y: 384 },
  },
  'West Bengal': {
    devanagari: 'पश्चिम बंगाल',
    tagline: 'Renaissance of Literature, Arts & Baul',
    desc: 'Vibrant Durga Puja artistry, Rabindrasangeet, mystical Baul song traditions, terracotta temples of Bishnupur, and Bengal literature.',
    monuments: 'Bishnupur Terracotta Temples, Hazarduari Palace, Dakshineswar Kali',
    folkArts: 'Baul Sangeet, Chhau Dance, Patachitra Scroll Painting, Kantha',
    scriptures: 'Gitanjali, Chaitanya Charitamrita, Mangalkavya',
    highlights: ['Durga Puja Art', 'Rabindranath Tagore', 'Terracotta Temples', 'Baul Song'],
    exactCenter: { x: 655, y: 325 },
  },
  'Bihar': {
    devanagari: 'बिहार',
    tagline: 'Fountainhead of Ancient Knowledge',
    desc: 'Ancient seat of Nalanda & Vikramshila universities, Bodh Gaya Mahabodhi tree where Buddha attained enlightenment, and Madhubani folk art.',
    monuments: 'Nalanda Ruins, Mahabodhi Temple, Barabar Caves, Vikramshila',
    folkArts: 'Madhubani / Mithila Painting, Manjusha Art, Sujani Embroidery',
    scriptures: 'Aryabhatiya, Chanakya Arthashastra, Vidyapati Padavali',
    highlights: ['Nalanda University', 'Bodh Gaya', 'Madhubani Art', 'Ashoka Pillars'],
    exactCenter: { x: 598, y: 246 },
  },
  'Assam': {
    devanagari: 'असम',
    tagline: 'Gateway to Northeast & Sattriya Art',
    desc: 'Sacred Kamakhya temple on Nilachal hill, world\'s largest river island Majuli, classical Sattriya dance of Sankardev, and golden Muga silk.',
    monuments: 'Kamakhya Temple, Rang Ghar Sibsagar, Majuli Satras',
    folkArts: 'Sattriya Dance, Bihu Dance, Muga & Eri Silk Weaving',
    scriptures: 'Kirtan Ghosha by Sankardev, Buranjis Chronicles',
    highlights: ['Kamakhya Temple', 'Majuli Island', 'Sattriya Dance', 'Muga Silk'],
    exactCenter: { x: 748, y: 230 },
  },
  'Jammu & Kashmir': {
    devanagari: 'जम्मू और कश्मीर',
    tagline: 'Crown of Himalayas & Sacred Mysticism',
    desc: 'Ancient Martand Sun Temple, Shankaracharya Hill, intricate Pashmina shawls, Papier-mâché craft, and Shaivite philosophical treatises.',
    monuments: 'Martand Sun Temple, Shankaracharya Temple, Pari Mahal, Vaishno Devi',
    folkArts: 'Kani Shawl Weaving, Papier-mâché, Rouf Dance',
    scriptures: 'Rajatarangini of Kalhana, Shiva Sutras, Lal Ded Vakhs',
    highlights: ['Martand Sun Temple', 'Kashmir Shaivism', 'Pashmina Shawls'],
    exactCenter: { x: 333, y: 78 },
  },
  'Ladakh': {
    devanagari: 'लद्दाख',
    tagline: 'Land of High Passes & Ancient Monasteries',
    desc: 'Ancient Buddhist gompas of Hemis & Thiksey perched on rocky Himalayan cliffs, prayer flags, and Silk Route heritage.',
    monuments: 'Hemis Monastery, Thiksey Gompa, Leh Palace, Alchi Monastery',
    folkArts: 'Thangka Painting, Cham Sacred Mask Dance, Wood Carving',
    scriptures: 'Tibetan Buddhist Canonical Treatises & Manuscripts',
    highlights: ['Hemis Monastery', 'Thiksey Gompa', 'Thangka Art', 'Silk Route'],
    exactCenter: { x: 398, y: 81 },
  },
  'Himachal Pradesh': {
    devanagari: 'हिमाचल प्रदेश',
    tagline: 'Devbhoomi — Valley of the Gods',
    desc: 'Ancient wooden pagoda temples, Buddhist monasteries of Spiti, Kangra miniature painting school, and sacred apple valleys.',
    monuments: 'Tabo Monastery, Hadimba Temple Manali, Masroor Rock Temples',
    folkArts: 'Kangra Miniature Painting, Nati Folk Dance, Chamba Rumal',
    scriptures: 'Himachali Pahari Folk Ballads & Devotional Stutis',
    highlights: ['Wooden Temples', 'Kangra Miniatures', 'Spiti Monasteries'],
    exactCenter: { x: 386, y: 125 },
  },
  'Uttarakhand': {
    devanagari: 'उत्तराखंड',
    tagline: 'Source of Sacred Rivers & Char Dham',
    desc: 'The sacred Char Dham pilgrimage (Kedarnath, Badrinath, Gangotri, Yamunotri), ancient Hemkund Sahib, and Vedic ashrams of Rishikesh.',
    monuments: 'Kedarnath Temple, Badrinath Temple, Jageshwar Temples',
    folkArts: 'Aipan Ritual Art, Chholiya Dance, Garhwali & Kumaoni Folk Songs',
    scriptures: 'Kedarkhand & Manaskhand of Skanda Purana',
    highlights: ['Kedarnath & Badrinath', 'Char Dham', 'Aipan Art'],
    exactCenter: { x: 439, y: 168 },
  },
  'Telangana': {
    devanagari: 'तेलंगाना',
    tagline: 'Land of Kakatiyas & Ramappa Temple',
    desc: 'UNESCO World Heritage Ramappa Temple with floating bricks, Thousand Pillar Temple of Warangal, Golconda Fort, and Cheriyal scroll paintings.',
    monuments: 'Ramappa Temple (UNESCO), Warangal Fort, Thousand Pillar Temple, Golconda Fort',
    folkArts: 'Cheriyal Scroll Painting, Perini Sivatandavam Dance, Bidriware',
    scriptures: 'Pothana Bhagavatam, Vemana Satakam',
    highlights: ['Ramappa Temple', 'Warangal Kakatiya Heritage', 'Cheriyal Art'],
    exactCenter: { x: 426, y: 402 },
  },
  'Andhra Pradesh': {
    devanagari: 'आंध्र प्रदेश',
    tagline: 'Sacred Tirupati & Kuchipudi Classical Art',
    desc: 'Sacred Tirumala Tirupati Venkateswara Temple, Lepakshi hanging pillar, classical Kuchipudi dance, and Kalamkari hand-painted textiles.',
    monuments: 'Tirupati Balaji, Lepakshi Temple, Amaravati Stupa, Undavalli Caves',
    folkArts: 'Kuchipudi Classical Dance, Kalamkari Painting, Kondapalli Toys',
    scriptures: 'Andhra Mahabharatam, Annamacharya Kirtanas',
    highlights: ['Tirupati Temple', 'Kuchipudi Dance', 'Lepakshi Heritage', 'Kalamkari'],
    exactCenter: { x: 464, y: 424 },
  },
  'Chhattisgarh': {
    devanagari: 'छत्तीसगढ़',
    tagline: 'Ancient Tribal Lore & Bastar Dhokra Art',
    desc: 'Ancient Sirpur Buddhist & Lakshmana brick temples, prehistoric cave paintings of Kanker, and metal bell craft (Dhokra).',
    monuments: 'Sirpur Lakshmana Temple, Bhoramdeo Temple, Bastar Palace, Chitrakote Falls',
    folkArts: 'Bastar Dhokra Brass Casting, Raut Nacha Dance, Pandwani Ballads',
    scriptures: 'Teejan Bai Pandwani Epics, Gondi Folk Ballads',
    highlights: ['Dhokra Metal Art', 'Sirpur Temples', 'Pandwani Folk Lore'],
    exactCenter: { x: 498, y: 305 },
  },
  'Jharkhand': {
    devanagari: 'झारखंड',
    tagline: 'Sacred Baidyanath & Sohrai Tribal Art',
    desc: 'Sacred Baidyanath Jyotirlinga in Deoghar, ancient terracotta temples of Maluti, and Sohrai-Khovar tribal wall murals.',
    monuments: 'Baidyanath Jyotirlinga Deoghar, Maluti Terracotta Temples, Parasnath Hill',
    folkArts: 'Sohrai & Khovar Mural Art, Chhau Dance, Dokra Metalcraft',
    scriptures: 'Santhali Folk Lore, Birsa Munda Ballads',
    highlights: ['Baidyanath Jyotirlinga', 'Sohrai Painting', 'Maluti Temples'],
    exactCenter: { x: 582, y: 299 },
  },
  'Goa': {
    devanagari: 'गोवा',
    tagline: 'Confluence of Konkan Traditions & Heritage',
    desc: 'Ancient Shanta Durga and Mangueshi rock temples, baroque heritage churches, and Konkani folk music.',
    monuments: 'Mangueshi Temple, Shanta Durga, Basilica of Bom Jesus, Aguada Fort',
    folkArts: 'Fugdi Dance, Dhalo, Dekhni, Konkani Natak',
    scriptures: 'Konkani Bhakti Poetry of Soiroba Ambiye',
    highlights: ['Mangueshi Temple', 'Konkan Heritage', 'Fugdi Dance'],
    exactCenter: { x: 274, y: 402 },
  }
};

function roundPath(d) {
  if (!d) return '';
  return d.replace(/([0-9]+\.[0-9]+)/g, (m) => Math.round(Number(m)));
}

const output = [];

geojson.features.forEach((feature) => {
  const name = feature.properties.NAME_1 || feature.properties.name || feature.properties.st_nm || feature.properties.NAME || 'Region';
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const rawD = pathGenerator(feature);
  
  if (!rawD) return;

  const d = roundPath(rawD);
  const centroid = pathGenerator.centroid(feature);
  const bounds = pathGenerator.bounds(feature);

  const meta = STATE_METADATA[name] || {
    devanagari: name,
    tagline: `Heritage & Culture of ${name}`,
    desc: `Ancient traditions, historic landmarks, and living folk culture of ${name}.`,
    monuments: 'Historic Temples, Forts, and Heritage Monuments',
    folkArts: 'Traditional Folk Dances, Music, and Handcrafts',
    scriptures: 'Regional folklore and ancient literary manuscripts',
    highlights: ['Heritage Monuments', 'Folk Traditions', 'Handicrafts'],
    exactCenter: { x: Math.round(centroid[0] || 450), y: Math.round(centroid[1] || 300) }
  };

  const cx = meta.exactCenter?.x || Math.round(centroid[0] || 450);
  const cy = meta.exactCenter?.y || Math.round(centroid[1] || 300);

  output.push({
    id,
    name,
    devanagari: meta.devanagari,
    tagline: meta.tagline,
    desc: meta.desc,
    monuments: meta.monuments,
    folkArts: meta.folkArts,
    scriptures: meta.scriptures,
    highlights: meta.highlights,
    featured: meta.featured || (name === 'Haryana'),
    d,
    cx,
    cy,
    zoom: {
      x: cx,
      y: cy,
      scale: name === 'Haryana' ? 3.6 : (bounds[1][0] - bounds[0][0] < 55 ? 3.8 : 2.8),
    }
  });
});

console.log(`Generated calibrated 1024x597 atlas states: ${output.length}`);

const fileContent = `/**
 * VINTAGE ATLAS INTERACTIVE STATE OVERLAY DATA (1024 x 597 ViewBox)
 * Perfectly calibrated with /assets/full_map_reference.jpg
 */

export const VINTAGE_ATLAS_STATES = ${JSON.stringify(output, null, 2)};
`;

fs.writeFileSync('./src/data/vintageAtlasStates.js', fileContent);
console.log('Saved to ./src/data/vintageAtlasStates.js');

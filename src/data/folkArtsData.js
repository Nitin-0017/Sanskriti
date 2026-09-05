/**
 * Comprehensive Dataset for Folk Arts of Haryana
 * Curated authentic traditions, tailored journeys, motif specimens, and Surajkund Crafts Mela
 */

export const HARYANA_FOLK_CHAPTERS = [
  {
    id: 'phulkari',
    num: '01',
    accession: 'HR-FA-01',
    archetype: 'THE THREAD',
    title: 'PHULKARI',
    vernacular: 'फुलकारी • Flower Work',
    subtitle: 'TEXTILES, EMBROIDERY & WOMEN’S SACRED CRAFT',
    tagline: '“Stories woven into colour and thread, counted stitch by unwritten stitch.”',
    image: '/assets/haryana_phulkari.jpg',
    secondaryImage: '/assets/haryana_folk_hero.jpg',
    region: 'Rohtak, Hissar, Ambala, Jind & Karnal',
    period: '15th Century CE – Living Heritage',
    medium: 'Untwisted Pat Silk on Handspun Khaddar',
    shortDesc: 'The monumental geometric textile tradition where vibrant unspun silk floss is embroidered entirely from the reverse of homespun cotton cloth without stencils or charts.',
    overview: 'Practiced as a labour of maternal blessing across rural Haryana, Phulkari (literally “flower work”) represents an extraordinary geometric tradition. Village women embroidered complex silk tapestries (Baghs) on coarse madder-dyed cotton cloth, counting threads from the reverse side without drawing designs. Each finished cloth served as a protective mantle gifted to daughters at weddings.',
    
    originHistory: 'Mentions of floral embroidery on coarse cloth date back to northern medieval folk poetry and oral wedding bards. In Haryana, Phulkari evolved not inside royal workshops or court karkhanas, but within rural courtyards where women gathered on winter afternoons. It was never conceived for commercial trade; every stitch was imbued with prayers for fertility, longevity, and familial protection.',
    
    culturalMeaning: 'When a daughter was born into an agrarian household, maternal grandmothers began setting aside raw silk skeins. Phulkari was an unwritten emotional testament: every completed Bagh chronicled seasonal cycles, family memories, village birds, and philosophical prayers woven directly into the fabric.',
    
    materials: [
      { name: 'Handspun Khaddar', desc: 'Woven on rural pit-looms from indigenous coarse Desi cotton, hand-dyed in warm madder red, indigo, or earth brown.', source: 'Rohtak & Hissar Handloom Weavers' },
      { name: 'Untwisted Pat Silk', desc: 'Glossy, unspun natural silk filament sourced through historic northern trade corridors, reflecting light in prismatic facets.', source: 'Historic Silk Caravans' },
      { name: 'Natural Pigment Dyes', desc: 'Madder roots (Manjistha), turmeric (Haldi), and pomegranate rind (Anar) yielding deep, resilient rustic hues.', source: 'Indigenous Herbal Extractors' },
    ],

    techniqueProcess: 'The master technique of Phulkari is the counted darning stitch worked exclusively from the wrong side of the cloth. The artisan counts the micro-threads of the khaddar weave with her needle tip. Because the silk floss floats across the front and anchors on tiny reverse threads, the finished front shines with continuous satin luster without bulky thread knots.',

    motifs: [
      {
        name: 'Mor (The Sacred Peacock)',
        vernacular: 'मोर रूपांकन • The Sacred Peacock',
        image: '/assets/motif_phulkari_mor.jpg',
        symbolism: 'Rain blessings, grace, spiritual watchfulness, and monsoon joy.',
        significance: 'The peacock is revered in rural Haryana as the divine messenger of monsoonal renewal and celestial protection. Embroidering the Mor is believed to shield newly married daughters from malice and ensure domestic bliss.',
        context: 'Embroidered into Sainchi Phulkari and bridal shawls; positioned prominently along the pallu border.',
        execution: 'Rendered in stepped diamond stitches with deep green, gold, and vermilion raw pat silk floss without pre-drawn stencils.',
        materials: 'Pure untwisted Pat silk floss in emerald, vermilion & amber gold on handspun madder-dyed cotton Khaddar',
      },
      {
        name: 'Suraj (The Solar Eye)',
        vernacular: 'सूर्य चक्र • The Solar Eye',
        image: '/assets/motif_phulkari_suraj.jpg',
        symbolism: 'Cosmic vitality, masculine protection, solar harvest cycle, and truth.',
        significance: 'In northern agrarian cosmology, Surya is the supreme witness (Sakshi) and the source of life over ripening wheat and mustard fields. Placing the solar medallion at the garment’s center sanctifies the wearer’s body as a cosmic temple.',
        context: 'Central medallion of ceremonial Chope and Subhar mantles worn during wedding fire circumambulations.',
        execution: 'Radiating concentric geometric diamond stitches anchored from the reverse on micro-threads of homespun cotton.',
        materials: 'Golden amber, saffron, and crimson untwisted silk threads on indigo-tinted handspun cotton canvas',
      },
      {
        name: 'Chirri (The Village Sparrow)',
        vernacular: 'चिड़ी • The Village Sparrow',
        image: '/assets/motif_phulkari_chirri.jpg',
        symbolism: 'Feminine freedom, domestic abundance, and maternal affection.',
        significance: 'The sparrow represents the village daughter who pecks grain in her father’s courtyard before flying away to her marital home. It is a tender emblem of transition, freedom, and maternal blessing.',
        context: 'Scattered across village domestic Baghs, children’s swaddling wraps, and celebratory festive waistcloths.',
        execution: 'Minimalist triangle stitch with elongated wing lines executed in contrasting turquoise and golden pat silk.',
        materials: 'Turquoise-green, saffron & orange silk floss with counted reverse darning stitches',
      },
      {
        name: 'Lehariya (The River Wave)',
        vernacular: 'लहरिया • The River Wave',
        image: '/assets/motif_phulkari_lehariya.jpg',
        symbolism: 'The flow of the sacred Saraswati and Yamuna rivers through agrarian soil.',
        significance: 'Representing life-giving river currents, Lehariya symbolizes continuous abundance, resilience through change, and seasonal monsoonal fertility.',
        context: 'Continuous perimeter frame borders running along the outer edges of the Khaddar mantle.',
        execution: 'Continuous running zigzag darning stitches flanked by golden silk florets.',
        materials: 'Glossy multi-hued silk bands of golden-yellow, cobalt-blue, and madder-red on unbleached homespun Khaddar',
      },
    ],

    usageSetting: 'Draped as a sacred canopy (Chope) held by four brothers over the bride during wedding circumambulations around the holy fire, and gifted during child naming ceremonies (Namkaran).',

    communityContext: 'Embroidered collectively in village courtyards during winter afternoons. Women shared songs, stories, and generational darning techniques without written textbooks.',

    artisan: {
      name: 'Vidya Devi & Sunita Devi',
      role: 'Master Bagh & Sainchi Phulkari Embroiderers',
      location: 'Rohtak Women’s Silk Collective',
      quote: '“When the needle pierces the khaddar from beneath, our eyes do not count threads; our fingers feel the heartbeat of the weave.”',
      narrative: 'Sisters-in-law Vidya and Sunita lead a collective of thirty-five women across four agrarian hamlets in Rohtak. They specialize in rare, lost geometries: the Panchranga Bagh and the sacred Shishadar Phulkari, rejecting synthetic threads to keep alive raw tussar silk and root-dyed madder canvas.',
    },

    todayPractice: 'Haryana Phulkari holds statutory Geographical Indication (GI) protection. Contemporary design institutions collaborate with village collectives, ensuring authentic hand-darning standards are preserved against industrial machine imitations.',

    relatedArts: ['saanjhi', 'textiles', 'motifs'],
  },

  {
    id: 'saanjhi',
    num: '02',
    accession: 'HR-FA-02',
    archetype: 'THE SACRED WALL',
    title: 'SAANJHI',
    vernacular: 'सांझी • Sacred Wall Murals',
    subtitle: 'RITUAL CLAY APPLIQUÉ & MOTHER GODDESS SHRINES',
    tagline: '“Moulded in clay upon courtyard walls, invoking twilight blessings for the home.”',
    image: '/assets/haryana_folk_hero.jpg',
    secondaryImage: '/assets/haryana_heritage_pavilion.jpg',
    region: 'Kurukshetra, Kaithal, Karnal, Sonipat & Jind',
    period: 'Ancient Agrarian Roots – Living Domestic Ritual',
    medium: 'Terracotta Clay Appliqué, Straw, Cow Dung Base, Natural Chalk',
    shortDesc: 'The autumnal ritual mural tradition where young women sculpt bas-relief terracotta images of the Mother Goddess Saanjhi directly upon cow-dung plastered mud walls during Navratri.',
    overview: 'During the nine nights of autumnal Navratri, rural courtyards across Haryana become sanctuaries of earth sculpture. Unmarried girls sculpt intricate geometric terracotta figurines from wet canal clay, affixing them with straw and natural gum onto the cow-dung plastered facade of their homes. Crowned with ornamental jewellery and mirrored eyes, the Saanjhi deity is worshipped with dusk songs and immersed in local village ponds on Dussehra.',

    originHistory: 'Saanjhi traces back to prehistoric goddess cults and Vedic twilight (Sandhya) rites. For millennia, northern agrarian communities honoured the earth’s regenerative power before the winter rabi sowing season by raising clay embodiments of cosmic motherhood.',

    culturalMeaning: 'Saanjhi represents cosmic protection, female camaraderie, and agrarian fertility. Through ten days of daily additions, girls mould stars, birds, cows, and ornamental combs, learning domestic geometry and sacred architecture through tactile earth.',

    materials: [
      { name: 'Ganga-Yamuna Alluvial Silt', desc: 'Fine, cohesive riverbed silt collected from village irrigation canals and cured under wet hessian.', source: 'Local Village Canals' },
      { name: 'Cow-Dung Mud Plaster', desc: 'Antiseptic, insulating base layer providing a rich earthy charcoal-brown canvas for clay appliqué.', source: 'Rural Cattle Barns' },
      { name: 'Natural Lime & Ochre', desc: 'White lime (Khadia) and red geru chalk used to paint celestial eyes, jewelry, and planetary halos.', source: 'Regional Mineral Pits' },
    ],

    techniqueProcess: 'First, the outer wall is coated with a freshly prepared layer of mud and cow dung. Figurines are hand-pinched into disc-like stars (Sitara), jewellery garlands, and limbs. While still pliable, each terracotta element is pressed into the damp wall, dried under the autumn sun, and painted with lime and vermilion.',

    motifs: [
      {
        name: 'Saanjhi Ka Mukut (The Crown)',
        vernacular: 'सांझी मुकुट • The Divine Diadem',
        image: '/assets/motif_saanjhi_mukut.jpg',
        symbolism: 'Sovereignty of the cosmic Mother Goddess and celestial guardianship.',
        significance: 'Positioned at the highest point of the courtyard mud facade, the Mukut crowns the goddess with star-studded tiers, radiating divine energy over the home and warding off ill fortune during the auspicious nine nights of Navratri.',
        context: 'Apex of the wall mural, crowned with peacock feathers, star discs, and sun rays.',
        execution: 'Tiered terracotta discs pinched from canal silt, adorned with star studs and lime borders.',
        materials: 'Yamuna alluvial clay, wheat straw binders, white chalk lime & red geru mineral pigment',
      },
      {
        name: 'Chand-Suraj (Sun and Moon)',
        vernacular: 'चांद-सूरज • The Celestial Pair',
        image: '/assets/motif_saanjhi_chand_suraj.jpg',
        symbolism: 'Eternal balance of day and night, masculine and feminine cosmic forces.',
        significance: 'Placed beside the goddess’s shoulders, the sun and moon remind rural families of cosmic time, the eternal harvest rhythm, and the protective gaze of the heavens over their crops and lineage.',
        context: 'Flanking both shoulders of the deity at the entrance portal of the rural Deodhi.',
        execution: 'Pair of round clay medallions incised with radiating lines and highlighted with lime chalk dots.',
        materials: 'Pure canal silt clay relief with cow-dung base plaster and natural red mineral slip',
      },
      {
        name: 'Bichhwa & Payal (Anklets)',
        vernacular: 'बिछुआ एवं पायल • Sacred Foot Ornaments',
        image: '/assets/motif_saanjhi_mukut.jpg',
        symbolism: 'Marital grace, maternal auspiciousness, and sacred rhythm of footsteps.',
        significance: 'Representing the arrival of the divine mother into the agrarian household, the clay anklets celebrate the sacred presence of daughters and brides whose footsteps bring prosperity.',
        context: 'Lower hem of the clay mural framing the goddess’s feet at the threshold line.',
        execution: 'Continuous bead-like clay nodules brushed with powdered mica and natural plant gum.',
        materials: 'Porous terracotta beads, natural gum binder, and sparkling powdered river mica',
      },
    ],

    usageSetting: 'Created on the exterior mud-brick walls flanking the main courtyard doorway (Deodhi), visible to everyone entering the domestic threshold.',

    communityContext: 'Practiced exclusively by adolescent girls and village elder women who gather each evening at dusk to sing the traditional Saanjhi Geets accompanied by Dholak rhythms.',

    artisan: {
      name: 'Shanti Devi & Courtyard Matriarchs',
      role: 'Master Clay Muralist & Folk Singer',
      location: 'Kaithal District',
      quote: '“The wall is not stone; when we touch it with wet clay, it breathes our ancestors’ blessings.”',
      narrative: 'Shanti Devi has crafted over sixty annual Saanjhi shrines. She trains young village daughters to knead clay with fine wheat chaff so the figurines do not crack as the dry autumn winds sweep through Haryana.',
    },

    todayPractice: 'Urbanisation has replaced mud walls with cement plaster, prompting preservation trusts and folk academies to document Saanjhi on portable wooden panels and terracotta tiles for museum exhibits.',

    relatedArts: ['chowk-purana', 'wall-art', 'motifs'],
  },

  {
    id: 'chowk-purana',
    num: '03',
    accession: 'HR-FA-03',
    archetype: 'THE SACRED THRESHOLD',
    title: 'CHOWK PURANA',
    vernacular: 'चौक पूरना • Ceremonial Floor Sanctification',
    subtitle: 'COSMIC DIAGRAMS, DRY PIGMENTS & THRESHOLD BLESSINGS',
    tagline: '“Drawing the universe at the doorway with flour and turmeric at sunrise.”',
    image: '/assets/haryana_folk_hero_cinematic.jpg',
    secondaryImage: '/assets/haryana_phulkari.jpg',
    region: 'Throughout Rural Haryana (Bhiwani, Mahendragarh, Rohtak, Gurugram)',
    period: 'Vedic Roots – Living Daily Ritual',
    medium: 'Stone-Ground Wheat Flour, Turmeric, Vermilion, Cow Dung Wash',
    shortDesc: 'The sacred ephemeral floor art of rural Haryana, where women draw intricate geometric mandalas and protective signs on washed thresholds using dry natural powders.',
    overview: 'Chowk Purana (literally “filling the sacred square”) is the daily and ritual sanctification of domestic thresholds across Haryana. Before sunrise and during weddings, births, and harvests, matriarchs wash the courtyard floor with fresh cow dung water. Between their index finger and thumb, they release controlled streams of white flour and yellow turmeric to construct complex geometrical mandalas that invite Lakshmi and ward off negative energies.',

    originHistory: 'Originating from Vedic Yajna altar diagrams (Vastu Mandalas), Chowk Purana transitioned into the domestic realm as an essential women’s sacred duty. The four-cornered square symbolizes the four directions of the cosmos anchored to the home.',

    culturalMeaning: 'The threshold (Deodhi) is the liminal boundary between the outer wilderness and the inner domestic hearth. Drawing the Chowk purifies this portal daily, affirming hospitality, harmony with nature, and reverence for visiting ancestors.',

    materials: [
      { name: 'Atta (Dry Wheat Flour)', desc: 'Coarsely ground whole wheat flour providing pure white geometric contour lines.', source: 'Domestic Stone Chakki' },
      { name: 'Haldi (Natural Turmeric)', desc: 'Brilliant yellow powder symbolizing auspicious vitality, warmth, and solar purification.', source: 'Home-Cured Turmeric Rhizomes' },
      { name: 'Sindoor (Vermilion)', desc: 'Deep red mineral pigment denoting divine feminine energy, protection, and festive joy.', source: 'Sacred Mineral Bazaars' },
    ],

    techniqueProcess: 'The floor is swept and purified with water. Without measuring cords or pre-drawn pencil marks, the matriarch bends from the waist, steadily releasing dry powders through a pinched funnel of fingers to lay down symmetrical diamond grids and sacred quadrants in minutes.',

    motifs: [
      {
        name: 'Chowk (The Cosmic Quadrant)',
        vernacular: 'चौकोर मंडप • The Cosmic Square',
        image: '/assets/sacred_mandala.jpg',
        symbolism: 'Cosmic order, stability of the household, and the four Cardinal Directions.',
        significance: 'The core grid represents the balanced universe anchored to the domestic threshold, ensuring that peace, sustenance, and hospitality reign inside the homestead.',
        context: 'Core central lattice of all ritual floor drawings executed during dawn and festivals.',
        execution: 'Intersecting double white flour lines enclosing central turmeric and vermilion dots.',
        materials: 'Stone-ground Desi wheat flour, fresh turmeric powder, and sacred red sindoor',
      },
      {
        name: 'Paglya (Auspicious Footprints)',
        vernacular: 'पगलिया • The Sacred Footprints',
        image: '/assets/pathway_start_closeup.jpg',
        symbolism: 'Arrival of Goddess Lakshmi and the spiritual homecoming of newlywed brides.',
        significance: 'Drawn leading inward from the outer gateway to the interior granary, Paglya invokes the eternal arrival of divine blessings, abundant grain stores, and gentle domestic harmony.',
        context: 'Leading inward from the main village road across the threshold into the courtyard.',
        execution: 'Pair of stylized miniature footprints drawn in powdered rice flour flanked by auspicious dots.',
        materials: 'Fine rice powder, turmeric wash, and mineral cinnabar red',
      },
      {
        name: 'Kamal Pushp (Sacred Lotus)',
        vernacular: 'कमल पुष्प • The Blossoming Lotus',
        image: '/assets/sacred_mandala.jpg',
        symbolism: 'Spiritual purity blossoming from earthly soil, self-realization.',
        significance: 'The lotus serves as the seat of divine grace. In Haryana floor art, its petals radiate outward toward the cardinal directions, symbolizing the continuous unfolding of spiritual awareness.',
        context: 'Corner accents anchoring the four cardinal points of the Chowk.',
        execution: 'Eight radiating curved petal lines drawn in alternating flour and red sindoor.',
        materials: 'Coarse flour contours with vibrant herbal turmeric and red lead fills',
      },
    ],

    usageSetting: 'Executed daily at dawn at the courtyard threshold, around the Tulsi vrindavan, and surrounding the bride and groom’s wooden seating low stool (Patra).',

    communityContext: 'An unwritten matriarchal art form passed silently by observation from mothers-in-law to newly arrived brides as an emblem of taking custodianship of the household hearth.',

    artisan: {
      name: 'Chanderpati Sharma',
      role: 'Master Threshold Ritualist',
      location: 'Bhiwani District',
      quote: '“When the morning bird sings, the floor must be pure before feet touch the earth.”',
      narrative: 'For over seventy years, Chanderpati has begun each morning before dawn by drawing the Chowk. She knows over eighty variations of ceremonial grids: for weddings, harvests, Govardhan Puja, and child naming.',
    },

    todayPractice: 'While modern ceramic floors and commercial sticker stencils proliferate, rural Haryana communities adamantly preserve authentic hand-drawn flour Chowks for marriage sanctums and holy festivals.',

    relatedArts: ['saanjhi', 'wall-art', 'motifs'],
  },

  {
    id: 'wall-art',
    num: '04',
    accession: 'HR-FA-04',
    archetype: 'THE OCHRE SURFACE',
    title: 'FOLK PAINTING & WALL ART',
    vernacular: 'भित्ति चित्र • Haveli & Village Murals',
    subtitle: 'NATURAL MINERAL PIGMENTS, RUSTIC FRESCOES & DEVGHARS',
    tagline: '“Ochre and chalk whispering tales of epics and village life across plaster walls.”',
    image: '/assets/haryana_illustrated_hero.jpg',
    secondaryImage: '/assets/haryana_folk_hero.jpg',
    region: 'Jhajjar, Rewari, Mahendragarh, Shekhawati Fringe & Rohtak',
    period: '16th Century CE – Living Craft',
    medium: 'Lime Plaster (Chuna), Geru (Red Ochre), Indigo, Soot Black, Gum Arabic',
    shortDesc: 'The vibrant tradition of vernacular mural painting adorning village temples, inner domestic shrines (Devghars), and grand merchant Havelis across southern and central Haryana.',
    overview: 'Haryana possesses a distinguished mural tradition bridging raw domestic folk drawings with sophisticated fresco techniques. In village homes, mud-and-lime walls are washed with red ochre (Geru) and painted with scenes from the Mahabharata, Ramayana, local warriors, and joyful wedding processions using animal hair brushes. In historic trading towns like Jhajjar and Narnaul, merchant havelis preserve centuries-old fresco ceilings depicting astronomical maps and pastoral episodes.',

    originHistory: 'Stemming from prehistoric rock shelters in the Aravalli hills and blooming during the medieval era when Haryana served as the vital cultural corridor connecting Delhi with Rajasthan and Punjab.',

    culturalMeaning: 'Murals transformed domestic walls into educational and devotional scrolls. In an era before printing, illustrated epics on haveli walls taught village children about chivalry, cosmology, flora, and seasonal rhythms.',

    materials: [
      { name: 'Slaked Lime (Chuna)', desc: 'Aged limestone paste mixed with curd and marble dust for luminous white backgrounds.', source: 'Aravalli Lime Kilns' },
      { name: 'Geru (Red Ochre)', desc: 'Natural iron-rich clay rock ground finely into deep rust and terracotta red washes.', source: 'Southern Haryana Mineral Ridges' },
      { name: 'Kajjal (Lampblack)', desc: 'Soot collected from pure mustard oil lamps for bold, indelible black contour brushwork.', source: 'Domestic Oil Lamps' },
    ],

    techniqueProcess: 'In folk homes, paintings are executed Fresco Secco on dry plaster. In merchant havelis, the Fresco Buono technique incorporates natural pigments directly into wet lime plaster, followed by polishing with agate stones until the surface glows like polished marble.',

    motifs: [
      {
        name: 'Gaja (The Auspicious Elephant)',
        vernacular: 'गजराज • The Royal Tusker',
        image: '/assets/motif_wall_gaja.jpg',
        symbolism: 'Royal majesty, strength, rain cloud representation, and good fortune.',
        significance: 'Painted on haveli torana arches, the elephant invokes Airavata, welcoming divine blessings, agricultural rain, and defensive fortitude.',
        context: 'Flanking both sides of grand arched gateways (Torana).',
        execution: 'Bold ochre outlines with decorative floral saddlecloths.',
        materials: 'Red ochre (Geru), slaked lime (Chuna), and natural gum arabic binder',
      },
      {
        name: 'Barasingha (The Antlered Deer)',
        vernacular: 'बारहसिंगा • Forest Antlered Stag',
        image: '/assets/haryana_illustrated_hero.jpg',
        symbolism: 'Swiftness, harmony with forest life, and wilderness sanctity.',
        significance: 'Celebrates the wildlife of the Aravalli hills, symbolizing alertness, grace, and reverence for wilderness ecosystems.',
        context: 'Outer courtyard friezes depicting forest episodes of Rama.',
        execution: 'Delicate sweeping black linework filled with yellow ochre.',
        materials: 'Fine lamp soot black, natural yellow clay, and goat-hair brushes',
      },
      {
        name: 'Gopi Krishna Rasa',
        vernacular: 'रासलीला • Celestial Circle',
        image: '/assets/haryana_folk_hero.jpg',
        symbolism: 'Divine ecstasy, seasonal harmony, and Braj cultural intimacy.',
        significance: 'Depicts the eternal cosmic dance of the soul with the divine, uniting agrarian life with metaphysical devotion.',
        context: 'Ceiling roundels and central niche wall paintings.',
        execution: 'Concentric circular procession of figures holding hands under blossoming trees.',
        materials: 'Lapis lazuli blue, vegetable madder red, and polished lime plaster',
      },
    ],

    usageSetting: 'Inner family sanctums (Devghar), prayer niches, outer facades of havelis, and roadside village wells (Kuan/Panghat).',

    communityContext: 'Executed by the Chiteras (traditional artisan painter caste) working in dialogue with village elder women who directed the narrative scenes.',

    artisan: {
      name: 'Rameshwar Chitera',
      role: 'Master Haveli Restorer & Fresco Painter',
      location: 'Narnaul Heritage Corridor',
      quote: '“A lime wall holds memory for three hundred years if you grind the stone with reverence.”',
      narrative: 'Rameshwar represents the fourth generation of master Chiteras. He spends months restoring collapsing haveli frescoes using only crushed semi-precious stones, natural gum, and aged slaked lime.',
    },

    todayPractice: 'Heritage conservation trusts and local university art faculties are cataloguing disappearing wall murals in Rohtak and Jhajjar, reviving natural lime fresco workshops for modern eco-architecture.',

    relatedArts: ['saanjhi', 'motifs', 'chowk-purana'],
  },

  {
    id: 'folk-music',
    num: '05',
    accession: 'HR-FA-05',
    archetype: 'THE BARDIC VOICE',
    title: 'FOLK MUSIC & RAGINI',
    vernacular: 'लोक संगीत एवं रागिनी • Bardic Epics',
    subtitle: 'METERED BALLADS, SARANGI RESONANCE & ORAL LIBRARIES',
    tagline: '“High-pitched vocal acrobatics carrying philosophy across moonlit mustard fields.”',
    image: '/assets/haryana_folk_hero.jpg',
    secondaryImage: '/assets/haryana_saang_theatre.jpg',
    region: 'Panipat, Sonipat, Rohtak, Jind, Karnal & Jhajjar',
    period: 'Ancient Bardic Roots – Flourishing Living Continuum',
    medium: 'Human Vocal Cadence, Sarangi, Been, Dholak, Chimta, Ghada',
    shortDesc: 'The extraordinary acoustic oral tradition of Haryana, characterized by powerful high-register vocal delivery, complex rhythmic improvisations, and metered verse compositions.',
    overview: 'Haryana’s folk music is an acoustic titan of northern India. It is defined by the Ragini—a poetic verse ballad combining metered couplets with dramatic melodic narrative. Performed at village chaupals, bards sing complex moral, romantic, and heroic epics without written paper. The signature musical instruments—the 36-string Sarangi, the double-flute Been, the earthen Ghada, and the resonant Dholak—create an earthy acoustic drone that carries across miles of open fields.',

    originHistory: 'Traces back to classical northern bards and Sufi mendicants. Haryana folk music preserves an intricate blend of semiclassical ragas (Bhairavi, Pilu, Kafi, Sorath) adapted into earthy agrarian folk rhythms (Dhamal, Keherwa).',

    culturalMeaning: 'Music in Haryana is not mere entertainment; it is the living newspaper and moral university of the village. Raginis debate justice, familial duty, historical resistance against invasions, and existential philosophy.',

    materials: [
      { name: 'Sheesham & Tun Wood', desc: 'Dense indigenous seasoned woods hollowed out for Sarangi and Dholak acoustic resonance chambers.', source: 'Northern Haryana Timber Yards' },
      { name: 'Cured Goatskin Parchment', desc: 'Hand-scraped parchment stretched over clay and wooden bellies, tuned with mustard paste.', source: 'Village Drum Makers' },
      { name: 'Brass & Steel Bells (Ghungroos)', desc: 'Tied around the master singer’s ankles and chimta rods to mark sharp syncopated beats.', source: 'Jagadhri Brass Guilds' },
    ],

    techniqueProcess: 'Performers use open-throat chest voice projection with sudden soaring octave shifts (Pukaar). The lead singer commands rhythm changes using a metallic chimta, while the Sarangi reproduces the vocal modulations with acoustic nuance.',

    motifs: [
      {
        name: 'The Been & Naad (The Snake Charmer’s Drone)',
        vernacular: 'बीन वादन • Mystic Reed Drone',
        image: '/assets/haryana_folk_hero.jpg',
        symbolism: 'Mystic trance, wild elemental power, and spiritual absorption.',
        significance: 'The resonant drone represents the primordial vibration (Nada Brahma), played by itinerant Jogis to calm dangerous wilderness creatures.',
        context: 'Folk Holi gatherings and nomadic pastoral camps.',
        execution: 'Dual reed pipes encased in a dried bottle gourd.',
        materials: 'Dried bottle gourd (Tumba), bamboo reed pipes, and natural beeswax sealant',
      },
      {
        name: 'Alghoza (Double Flute Harmony)',
        vernacular: 'अलगोज़ा • Twin Shepherd Flutes',
        image: '/assets/surajkund_folk_performance.jpg',
        symbolism: 'Shepherd romance, pastoral nostalgia, and desert wind.',
        significance: 'Blown simultaneously using continuous circular breathing, the twin pipes carry melody and drone across vast mustard fields.',
        context: 'Open grazing pastures of southern Haryana.',
        execution: 'Twin bamboo pipes blown simultaneously in circular breathing.',
        materials: 'Seasoned mountain bamboo, brass binding rings, and natural oil cure',
      },
    ],

    usageSetting: 'All-night harvest celebrations, post-monsoon melas, wedding sangeet assemblies, and communal chaupal recitals.',

    communityContext: 'Practiced by specialized bardic lineages (Bhats, Mirasis, and Jogis) as well as agrarian farmers who sing spontaneously during tube-well irrigation shifts.',

    artisan: {
      name: 'Pandit Ramphal Sharma',
      role: 'Master Sarangi Player & Classical Bard',
      location: 'Jind District',
      quote: '“The Sarangi does not sing; it weeps and rejoices with the farmer’s heart.”',
      narrative: 'Pandit Ramphal has played the 36-string Sarangi for forty-five years. He can recite over three hundred traditional raginis entirely from memory, accompanied by his handcrafted wooden instrument.',
    },

    todayPractice: 'Ragini competitions (Ragini Dangal) draw crowds of ten thousand in rural stadiums. Contemporary artists are fusing traditional folk bards with modern digital audio archives.',

    relatedArts: ['folk-theatre', 'seasonal-arts', 'motifs'],
  },

  {
    id: 'folk-theatre',
    num: '06',
    accession: 'HR-FA-06',
    archetype: 'THE OPEN STAGE',
    title: 'SAANG FOLK THEATRE',
    vernacular: 'सांग • Open-Air Verse Theatre',
    subtitle: 'CHAUPAL OPERA, ALL-NIGHT DRAMA & VERSE DIALOGUE',
    tagline: '“Where wooden takhats become empires under the starry night sky.”',
    image: '/assets/haryana_saang_theatre.jpg',
    secondaryImage: '/assets/haryana_heritage_pavilion.jpg',
    region: 'Sonipat, Rohtak, Jhajjar, Panipat & Jind',
    period: '18th Century CE – Living Performing Tradition',
    medium: 'Acoustic Verse Dialogue, Raised Chaupal Platform, Folk Ensemble',
    shortDesc: 'The supreme open-air folk theatre of rural Haryana, where troupes of master bards, actors, and instrumentalists perform overnight mythological and romantic epics without curtains.',
    overview: 'Saang is the supreme open-air community theatre of rural Haryana. Erected on raised wooden platforms in the center of village chaupals, Saang troupes perform without stage curtains or recorded sound. A master Saangi leads the performance through metered rhymed dialogue, rapid-fire humor, and musical climaxes that keep thousands of village spectators spellbound under starry skies until the morning azaan or temple bells.',

    originHistory: 'Tracing roots back to early Sanskrit theatre and 18th-century Swang bards like Kishan Lal Bhat, Saang was elevated into a monumental art form by Pandit Lakhmi Chand (1903–1945), known as the "Shakespeare of Haryana."',

    culturalMeaning: 'Saang is the democratic voice of agrarian northern India. It dismantles social barriers: landlords and labourers sit together side by side on ground dhurries to witness moral tales of duty, sacrifice, and divine justice.',

    materials: [
      { name: 'Takhat (Solid Wood Platform)', desc: 'Raised timber bedstead assembled in the center of the village chaupal without curtain dividers.', source: 'Village Carpentry Guild' },
      { name: 'Natural Mineral Make-up', desc: 'Turmeric, zinc white, and vermilion used by male actors playing historical kings and queens.', source: 'Traditional Herbal Apothecaries' },
      { name: 'Zari Turbans & Angarkhas', desc: 'Opulent traditional costumes adorned with gold tinsel and pleated skirts.', source: 'Panipat Heritage Costumiers' },
    ],

    techniqueProcess: 'Performed in the round. Actors change turbans and sip tea in full view of the audience. The master Saangi leads with improvised rhymed dohas, engaging directly with spectators.',

    motifs: [
      {
        name: 'The Chaupal Takhat (Stage Center)',
        vernacular: 'चौपाल तख्त • The Unadorned Platform',
        image: '/assets/haryana_saang_theatre.jpg',
        symbolism: 'Cosmic throne where kings, beggars, and gods meet on equal ground.',
        significance: 'The rustic wooden takhat serves as court, battlefield, and home without curtains, breaking all social barriers beneath the open night sky.',
        context: 'The exact center of the open-air theater in the round.',
        execution: 'Unadorned rustic timber platform framed by oil torches.',
        materials: 'Solid sheesham planks, hand-forged iron spikes, and mustard oil torches',
      },
    ],

    usageSetting: 'Post-harvest autumn and spring nights when farmers have leisure time to assemble after the crops are brought into granaries.',

    communityContext: 'Entire villages sponsor troupes, providing food and grain tributes to the traveling master bards.',

    artisan: {
      name: 'Ustad Mahabir Singh',
      role: 'Master Saang Librettist & Chaupal Singer',
      location: 'Sonipat Chaupal Guild',
      quote: '“A Saangi never reads from a script. The verses belong to the open sky, the soil, and the evening breeze.”',
      narrative: 'For over fifty-two years, Ustad Mahabir Singh has held the central takht of Sonipat’s harvest chaupals. He memorized sixty-four classical Haryana folk epics from his master beneath a village peepal tree.',
    },

    todayPractice: 'State cultural academies and universities run annual Saang festivals, revitalizing student productions while preserving original archival recordings of Pandit Lakhmi Chand’s compositions.',

    relatedArts: ['folk-music', 'seasonal-arts', 'puppetry'],
  },

  {
    id: 'puppetry',
    num: '07',
    accession: 'HR-FA-07',
    archetype: 'THE SHADOW & STRING',
    title: 'PUPPETRY / KATHPUTLI',
    vernacular: 'कठपुतली • Wood & String Marionettes',
    subtitle: 'NARRATIVE MARIONETTES, RUSTIC SATIRE & TRAVELING BARDS',
    tagline: '“Carved mango-wood marionettes satirizing kings and praising honest tillers.”',
    image: '/assets/haryana_phulkari.jpg',
    secondaryImage: '/assets/haryana_folk_hero_cinematic.jpg',
    region: 'Southern Haryana, Gurugram, Rewari, Mahendragarh & Sirsa',
    period: 'Medieval Folklore – Living Travelling Puppet Theatre',
    medium: 'Carved Mango Wood, Recycled Brocade Textiles, Black Strings, Bamboo Whistle',
    shortDesc: 'The itinerant string-puppetry tradition of Haryana, where master puppeteers manipulate hand-carved wooden marionettes with invisible horsehair strings behind a makeshift cloth booth.',
    overview: 'Kathputli in Haryana is an expressive vehicle of biting satire, moral education, and chivalric history. Carved out of lightweight mango and sheesham wood, each puppet is adorned with vibrant pleated skirts and metallic zari turbans. From behind a mobile cloth booth (Tajia), the puppeteer manipulates multiple black strings tied to his fingers, communicating through the sharp, piercing metallic whistle of the Boli (reed-and-bamboo whistle).',

    originHistory: 'Carried through nomadic bardic communities (Bhats) who traversed the trade highways connecting the Aravalli hills with northern royal courts, adapting royal courtly dramas into rustic village parables.',

    culturalMeaning: 'Puppetry was the ultimate uncensored political and social critique. Under the guise of wooden dolls, puppeteers could freely mock greedy moneylenders, oppressive rulers, and domestic hypocrisies with sharp humor.',

    materials: [
      { name: 'Kachi Aam Wood (Mango Wood)', desc: 'Soft, fibrous seasoned wood easy to chisel into expressive facial features.', source: 'Village Orchards' },
      { name: 'Recycled Phulkari & Gota Cloth', desc: 'Vibrant remnants of discarded wedding skirts used to fashion billowing puppet costumes.', source: 'Village Domestic Looms' },
      { name: 'Boli Whistle', desc: 'Bamboo sliver casing vibrating metal reeds to produce the puppet’s high-pitched speech.', source: 'Master Instrument Crafters' },
    ],

    techniqueProcess: 'No stage nails or glue; heads and torsos are carved as a single block. The puppeteer uses subtle wrist flicks to make marionettes dance, duel with swords, and spin rapidly.',

    motifs: [
      {
        name: 'Amar Singh Rathore',
        vernacular: 'अमर सिंह राठौड़ • Chivalric Marionette',
        image: '/assets/haryana_phulkari.jpg',
        symbolism: 'Unyielding Rajput honor, agrarian defiance, and swordsmanship.',
        significance: 'The central folk hero of puppet epics, demonstrating unbending integrity in the face of tyranny.',
        context: 'The climactic battle sequence of traditional Kathputli performance.',
        execution: 'Two-handed marionette holding carved wooden sabres.',
        materials: 'Carved mango wood, recycled zari borders, and twisted black cotton strings',
      },
    ],

    usageSetting: 'Fairs, seasonal harvest squares, temple courtyards, and school playgrounds.',

    communityContext: 'Practiced by itinerant family clans where husbands manipulate the strings, wives sing and play the dholak, and children manage the lighting and props.',

    artisan: {
      name: 'Ramu & Bimla Bhat',
      role: 'Master String Puppeteers',
      location: 'Rewari Itinerant Camp',
      quote: '“The strings are tied to our fingers, but the soul belongs to the wood.”',
      narrative: 'Ramu’s family has performed puppet theatre for seven generations. His trunk contains sixty antique puppets hand-carved by his great-grandfather over a century ago.',
    },

    todayPractice: 'Contemporary NGOs and health foundations deploy traditional Kathputli troupes for public literacy, sanitation, and female education campaigns across rural Haryana.',

    relatedArts: ['folk-theatre', 'textiles', 'motifs'],
  },

  {
    id: 'textiles',
    num: '08',
    accession: 'HR-FA-08',
    archetype: 'THE VILLAGE LOOM',
    title: 'TRADITIONAL TEXTILE & WEAVING',
    vernacular: 'दरी एवं खेस • Handloom Heritage',
    subtitle: 'PANJA DURRIES, KHES BLANKETS & CHARKHA HOMESPUN',
    tagline: '“Rhythmic clatter of the pit loom weaving geometric warmth for rural winters.”',
    image: '/assets/haryana_phulkari.jpg',
    secondaryImage: '/assets/haryana_illustrated_hero.jpg',
    region: 'Panipat (The City of Weavers), Rohtak, Jhajjar & Hissar',
    period: 'Ancient Indus Basin Weaving Roots – Modern Living Loom',
    medium: 'Indigenous Cotton Yarn, Coarse Wool, Panja Hand Combs, Pit Looms',
    shortDesc: 'The master flat-weave rug and blanket heritage of Haryana, renowned for heavyweight geometric Panja durries and dense double-cloth Khes blankets woven on traditional pit looms.',
    overview: 'Haryana is internationally celebrated for its monumental flat-woven textiles. Center of historic handloom commerce, Panipat and its surrounding villages weave the famous Panja Durrie—a sturdy cotton rug where thick weft threads are beaten down firmly using a heavy clawed metal comb (Panja). Alongside durries, village weavers craft the Khes, a traditional double-cloth cotton blanket with geometric damask checks that provided warmth during severe northern agrarian winters.',

    originHistory: 'Panipat has been a legendary weaving and dyeing depot since the Mahabharata era. Haryana’s agrarian households grew their own coarse cotton, spun it on charkhas, and commissioned village pit-loom weavers to produce heirloom furnishings.',

    culturalMeaning: 'Textiles in Haryana were symbols of hospitality and marital honour. A stack of ten hand-beaten Panja durries and indigo-dyed Khes blankets formed the bedrock of a bride’s trousseau (Dahej), built to endure fifty years of daily courtyard life.',

    materials: [
      { name: 'Desi Cotton Slub Yarn', desc: 'Heavyweight hand-spun cotton yarn carrying natural texture and warmth.', source: 'Indigenous Ginning Mills' },
      { name: 'Pure Bikaner & Local Wool', desc: 'Resilient coarse fleece for winter rugs, dyed in deep forest green, indigo, and terracotta.', source: 'Northern Pastoral Corridors' },
      { name: 'Iron Panja Comb', desc: 'Heavy cast-iron beating claw used to pack weft threads into dense, indestructible weave structures.', source: 'Panipat Iron Smiths' },
    ],

    techniqueProcess: 'Woven on horizontal pit looms. The weaver interlocks distinct colored weft threads by hand (Dhurrie tapestry technique), beating down each thread with the heavy Panja comb to create perfectly reversible flat weaves.',

    motifs: [
      {
        name: 'Dabbakhani (Checkered Grid)',
        vernacular: 'डब्बाखानी • Interlocking Fields',
        image: '/assets/motif_textile_panja.jpg',
        symbolism: 'Interlocking agricultural fields seen from above, harvest abundance.',
        significance: 'Mirroring the geometry of plowed wheat quadrants, this reversible pattern provides warmth and ancestral protection in northern winters.',
        context: 'Traditional double-cloth Khes blankets.',
        execution: 'Alternating square blocks of indigo and natural unbleached cotton.',
        materials: 'Heavy unbleached slub cotton yarn and fermented natural indigo',
      },
      {
        name: 'Chaukadi & Teer (Arrowhead Diamonds)',
        vernacular: 'चौकड़ी एवं तीर • Stepped Chevron Guard',
        image: '/assets/motif_textile_panja.jpg',
        symbolism: 'Protection of the perimeter, solar rays, and directional harmony.',
        significance: 'Placed on durrie borders to create a sacred boundary line warding off malevolent influences from entering the resting mat.',
        context: 'Border margins of heavy Panja durries.',
        execution: 'Stepped chevron lines in contrasting rust and charcoal.',
        materials: 'Dense hand-spun wool dyed with madder root and iron gall ink',
      },
    ],

    usageSetting: 'Laid across wooden charpais for guests, spread across village chaupals for community councils, and used as ceremonial prayer mats.',

    communityContext: 'Woven by the Julaha weaving communities in partnership with agrarian women who spun the raw cotton yarn on village charkhas.',

    artisan: {
      name: 'Dharambir Weaver & Collective',
      role: 'Master Panja Durrie Weaver',
      location: 'Panipat Heritage Handloom Quarter',
      quote: '“A machine can weave fast, but it cannot pack the earth’s density into the cotton like a ten-pound iron Panja.”',
      narrative: 'Dharambir has sat at his sunken pit loom for forty years. He still creates complex reversible geometric rugs without graphs, calculating color shifts purely in his head.',
    },

    todayPractice: 'While power looms dominate mass export, Panipat’s authentic hand-beaten Panja durries are treasured by architectural interior designers and global craft connoisseurs.',

    relatedArts: ['phulkari', 'motifs', 'wall-art'],
  },

  {
    id: 'motifs',
    num: '09',
    accession: 'HR-FA-09',
    archetype: 'THE SACRED SYMBOL',
    title: 'HARYANVI MOTIFS & SACRED SYMBOLS',
    vernacular: 'पारंपरिक रूपांकन • Geometric Language',
    subtitle: 'THE VISUAL THREAD CONNECTING ALL HARYANA CRAFTS',
    tagline: '“The unwritten graphic language connecting thread, clay, timber and threshold.”',
    image: '/assets/haryana_phulkari.jpg',
    secondaryImage: '/assets/haryana_illustrated_hero.jpg',
    region: 'Universal Across All Districts of Haryana',
    period: 'Harappan Origins – Living Visual Language',
    medium: 'Cross-Discipline Graphic Vocabulary (Embroidery, Clay, Wood, Metal, Floor)',
    shortDesc: 'The shared sacred geometric symbolic vocabulary of Haryana, where identical motifs reappear across textiles, wall paintings, pottery, floor art, and architectural carvings.',
    overview: 'Haryana’s folk arts are unified by a profound, unwritten graphic language. The same stylized Peacock (Mor) embroidered on a bridal Phulkari appears incised into terracotta storage urns, carved into haveli doorway brackets, and drawn in rice flour on ceremonial thresholds. These motifs are not arbitrary ornaments; they are sacred visual archetypes carrying memories of ancient rivers, seasonal solar cycles, protective talismans, and agrarian gratitude.',

    originHistory: 'Many motifs—such as the stepped lozenge, the horned cattle, and the intersecting circle—show direct unbroken morphological lineage dating back to Indus Valley Civilization pottery fragments unearthed at Rakhigarhi in Hisar district.',

    culturalMeaning: 'The motifs form a visual shield against misfortune (Nazar) while invoking fertility and cosmic order. When an artisan inscribes a motif, she connects her domestic craft to the broader celestial and natural universe.',

    materials: [
      { name: 'Pat Silk Thread', desc: 'Translating symbols into tactile satin luster upon homespun cloth.', source: 'Embroidery Medium' },
      { name: 'Wet Silt & Ochre', desc: 'Translating symbols into volumetric bas-relief upon courtyard walls.', source: 'Clay & Mural Medium' },
      { name: 'Chiselled Sheesham', desc: 'Translating symbols into deep relief upon doors, brackets, and grain chests.', source: 'Woodcraft Medium' },
    ],

    techniqueProcess: 'Motifs are stylized and abstracted rather than photographic. Forms are resolved into bold geometric primitives: triangles, diamonds, stepped zigzags, and radiating dots.',

    motifs: [
      {
        name: 'Mor (The Peacock Motif)',
        vernacular: 'मोर • The Auspicious Rain Bird',
        image: '/assets/motif_phulkari_mor.jpg',
        symbolism: 'Rain blessings, monsoon ecstasy, purity, and spiritual vigilance.',
        significance: 'Connecting agrarian fertility with celestial beauty, the peacock heralds monsoon clouds and protects grain stores.',
        context: 'Appears in Phulkari shawls, Saanjhi crowns, Haveli frescoes, and Sarangi pegs.',
        execution: 'Stepped diamond torso with radiating crowned head and fan tail.',
        materials: 'Untwisted Pat floss silk, lime wash, and carved Sheesham wood',
      },
      {
        name: 'Surya & Chakra (The Solar Disc)',
        vernacular: 'सूर्य चक्र • The Cosmic Sun Disc',
        image: '/assets/motif_phulkari_suraj.jpg',
        symbolism: 'Cosmic vitality, masculine protection, solar harvest cycle, and truth.',
        significance: 'The celestial life-giver worshipped across Haryana since Vedic times, ensuring the ripening of golden wheat.',
        context: 'Central medallion of Chowk Purana, Chope mantles, and wooden haveli ceilings.',
        execution: 'Radiating concentric circles and eight-pointed geometric stars.',
        materials: 'Bright turmeric yellow silk, vermilion powder, and chiseled stone',
      },
      {
        name: 'Lehariya (The Flowing Stream)',
        vernacular: 'लहरिया • The River Waves',
        image: '/assets/motif_phulkari_lehariya.jpg',
        symbolism: 'Life force of ancient rivers, seasonal flow, and agrarian rhythm.',
        significance: 'Represents the sacred underground flow of the Vedic Saraswati river nurturing the soil of Haryana.',
        context: 'Chevron diagonal bands on wedding mantles and floor borders.',
        execution: 'Continuous stepped zig-zag stitches in alternating golden and scarlet silk.',
        materials: 'Pat silk floss, madder root dye, and unbleached cotton base',
      },
      {
        name: 'Chirri (The Field Sparrow)',
        vernacular: 'चिड़ी • The Courtyard Companion',
        image: '/assets/motif_phulkari_chirri.jpg',
        symbolism: 'Courtyard warmth, agrarian bounty, domestic joy, and maternal blessing.',
        significance: 'The sparrow is the beloved companion of village courtyards, signaling harvest abundance and familial peace.',
        context: 'Embroidered in pairs across Phulkari odhnis and painted on grain silos.',
        execution: 'Triangular geometric bird silhouettes with outstretched wings.',
        materials: 'Brilliant yellow and scarlet silk floss on coarse khaddar',
      },
    ],

    usageSetting: 'Present on all surfaces of traditional rural life: bridal garments, clay walls, wooden lintels, copper grain vessels, and floor sanctification.',

    communityContext: 'Shared across all castes and communities of Haryana, creating a unified cultural visual identity across agrarian villages.',

    artisan: {
      name: 'Dr. Savita Malik & Rural Art Scholars',
      role: 'Folklorist & Motif Archivist',
      location: 'Kurukshetra University Heritage Center',
      quote: '“To read a Haryana motif is to read the diary of an agrarian civilisation that has survived five thousand years.”',
      narrative: 'Dr. Malik has spent thirty years documenting disappearing indigenous motifs across 400 rural villages, creating digital vector archives of ancestral symbols.',
    },

    todayPractice: 'Contemporary Indian fashion and graphic designers actively draw inspiration from Haryana’s geometric motifs, integrating them into modern sustainable design and architectural facades.',

    relatedArts: ['phulkari', 'saanjhi', 'chowk-purana', 'wall-art', 'textiles'],
  },

  {
    id: 'seasonal-arts',
    num: '10',
    accession: 'HR-FA-10',
    archetype: 'THE RHYTHM OF SOIL',
    title: 'SEASONAL & RITUAL DANCE',
    vernacular: 'फाग एवं धमाल • Harvest Celebrations',
    subtitle: 'THE ANCIENT CELEBRATIONS OF SPRING, WARRIORS & FERTILITY',
    tagline: '“The mighty boom of the Daf drum celebrating the arrival of golden wheat.”',
    image: '/assets/haryana_folk_hero_cinematic.jpg',
    secondaryImage: '/assets/haryana_folk_hero.jpg',
    region: 'Mahendragarh, Jhajjar, Rohtak, Bhiwani & Hissar',
    period: 'Mahabharata Antiquity – Living Seasonal Celebration',
    medium: 'Daf (Frame Drum), Dhol, Flutes, Manjira, Brass Plates',
    shortDesc: 'The thunderous communal harvest dances of Haryana, including the ancient circular warrior dance Dhamal and the vernal Holi celebration dance Phag.',
    overview: 'Haryana’s folk dances are explosive expressions of communal ecstasy rooted in the rhythm of the soil. Primary among them is Dhamal, an ancient dance tracing directly to the Mahabharata, performed exclusively by men holding the large one-sided Daf frame drum under moonlit skies when the winter harvest is ripe. In springtime, the Phag dance brings together village men and women in joyful, energetic circles celebrating the blooming mustard and ripening wheat.',

    originHistory: 'Dhamal is traditionally believed to celebrate victory in agrarian and chivalric battles dating back thousands of years. It preserves the ancient circular formation (Chakra) mirroring the celestial planetary orbits.',

    culturalMeaning: 'These seasonal arts dissolve the exhaustion of harsh winter farming labour. When the Daf resounds, the entire village gathers as one body to thank the elements of sun, rain, and soil for sustained life.',

    materials: [
      { name: 'Daf (Giant Goatskin Frame Drum)', desc: 'Large circular wooden frame drum played with a wooden stick and bare hands.', source: 'Rural Master Drum Builders' },
      { name: 'Brass Thali & Chimta', desc: 'Beaten rapidly with sticks to generate thrilling metallic syncopation.', source: 'Village Utensil Artisans' },
      { name: 'Peacock Feather Crests', desc: 'Worn on turbans by lead dancers invoking monsoon fertility.', source: 'Local Avian Sanctuaries' },
    ],

    techniqueProcess: 'Dancers begin with a slow rhythmic sway to the deep drone of the Daf. Gradually, the tempo accelerates into breathtaking leaps, synchronized knee drops, and circular spins ending in thunderous collective cheers.',

    motifs: [
      {
        name: 'The Daf Rhythm Circle',
        vernacular: 'डफ चक्र • The Cosmic Drum Ring',
        image: '/assets/surajkund_folk_performance.jpg',
        symbolism: 'The unending cycle of seasons, community solidarity, and solar joy.',
        significance: 'Reflects the circular cosmological movement of the sun and seasons, uniting the village as one living rhythmic organism.',
        context: 'The circular formation of dancers moving around the central musicians.',
        execution: 'Unbroken ring of dancers holding hands and beating rhythmic sticks.',
        materials: 'Stretched cured goatskin, timber rim, and brass jingling discs',
      },
    ],

    usageSetting: 'Moonlit village chaupals, post-harvest threshing grounds, and spring Holi festivals.',

    communityContext: 'A democratic collective practice where every able-bodied villager participates regardless of rank or wealth.',

    artisan: {
      name: 'Balwant Singh & The Ahirwal Dancers',
      role: 'Master Dhamal Troupe Leader',
      location: 'Mahendragarh District',
      quote: '“When the Daf sounds under the harvest moon, no feet in Haryana can stay still.”',
      narrative: 'Balwant Singh has led the Ahirwal Dhamal troupe for thirty-eight years, performing across India and at the Surajkund International Crafts Mela.',
    },

    todayPractice: 'Featured prominently at national cultural festivals and state celebrations, keeping the acoustic warrior and harvest spirit vibrantly alive.',

    relatedArts: ['folk-music', 'folk-theatre', 'motifs'],
  },
];

// Alias for backwards compatibility if needed
export const HARYANA_FOLK_TRADITIONS = HARYANA_FOLK_CHAPTERS;

export const SURAJKUND_EXPERIENCE = {
  title: 'SURAJKUND INTERNATIONAL CRAFTS MELA',
  vernacular: 'सूरजकुंड अंतर्राष्ट्रीय शिल्प मेला',
  subtitle: 'LIVING HERITAGE, ARTISAN BAZAARS & CULTURAL EXCHANGE',
  tagline: '“Where rural master craftspeople, performers, and world audiences meet beneath ancient sunlit rocks.”',
  quote: '“Where rural master craftspeople, performers, and world audiences meet beneath ancient sunlit rocks.”',
  location: 'Surajkund Amphitheatre Grounds, Faridabad, Haryana',
  period: 'Held Annually Every February Since 1987',
  epoch: 'Held Annually Every February Since 1987',
  overview: 'The Surajkund International Crafts Mela is India’s premier celebration of living folk arts, handicrafts, and cultural heritage. Situated beside the 10th-century sun temple reservoir built by King Surajpal of the Tomar dynasty, the mela transforms rural woodland into a vibrant thatched-roof village where thousands of traditional artisans, weavers, and performers from every corner of India and over 40 partner nations gather to demonstrate living crafts directly to millions of visitors.',
  journeyStages: [
    {
      num: '01',
      title: 'THE MELA',
      heading: 'An Ancient Sun Basin Transformed into a Living Craft Village',
      desc: 'Set against the historic amphitheatre of Surajkund, the fair was founded in 1987 to revive threatened indigenous craft traditions by giving artisans direct, unmediated access to patrons without commercial middlemen.',
      image: '/assets/haryana_heritage_pavilion.jpg',
      quote: '“Traditions do not live in museum display vitrines; they live in the hands of the artisan shaping clay under the winter sun.”',
    },
    {
      num: '02',
      title: 'THE ARTISANS',
      heading: 'Meeting the Living National Masters & Lineages',
      desc: 'Over 1,200 national award-winning master craftspeople, Padma Shri awardees, and hereditary guild masters set up working studios in traditional thatched mud huts (Apna Ghar). Visitors can sit beside weavers, potters, and metal carvers, watching centuries of ancestral memory flow into tangible art.',
      image: '/assets/haryana_folk_hero.jpg',
      quote: '“Every visitor who watches me throw clay or embroider silk takes a piece of our ancestral spirit home with them.”',
    },
    {
      num: '03',
      title: 'THE CRAFTS',
      heading: 'A Tapestry of India’s Indigenous Material Mastery',
      desc: 'From Haryana’s own counted-stitch Phulkari and Jhajjar terracotta surahis to Kashmiri Pashmina, Chanderi silks, Dhokra bronze casting, Madhubani paintings, and Saharanpur woodcraft, the mela represents the most comprehensive living material survey in Asia.',
      image: '/assets/haryana_phulkari.jpg',
      quote: '“Cotton, silk, iron, bronze, earth, and wood: all transformed into sacred beauty.”',
    },
    {
      num: '04',
      title: 'THE PERFORMANCES',
      heading: 'Chaupal Stages, Saang Opera & Strolling Folk Troupes',
      desc: 'As visitors walk the shaded forest pathways, acoustic folk music echoes from every corner: Sarangi bards reciting Pandit Lakhmi Chand’s Saangs, Kachhi Ghodi dancers on dummy horses, Been players, and open-air Chaupal stages hosting energetic Dhamal and Ghoomar performances.',
      image: '/assets/haryana_saang_theatre.jpg',
      quote: '“The beat of the Dholak and Nagara brings the dust of the village square to life.”',
    },
    {
      num: '05',
      title: 'THE CULTURAL EXCHANGE',
      heading: 'Connecting Haryana’s Rural Soul with Global Traditions',
      desc: 'With a nominated Theme State and over 40 participating nations from Africa, Latin America, Central Asia, and Europe, Surajkund represents a democratic intercultural meeting point where rural traditions converse across linguistic and continental boundaries.',
      image: '/assets/haryana_countryside.jpg',
      quote: '“When a weaver from Rohtak shakes hands with a ceramicist from Uzbekistan, human craftsmanship speaks a universal language.”',
    },
    {
      num: '06',
      title: 'THE LIVING MARKETPLACE',
      heading: 'Crafts Demonstrated, Experienced and Sustained',
      desc: 'Surajkund is not a static exhibition; it is an active economic lifeline. Millions of craft lovers buy directly from makers, ensuring that master weavers, potters, and sculptors can earn dignified livelihoods and train the next generation of village apprentices.',
      image: '/assets/haryana_illustrated_hero.jpg',
      quote: '“Economic dignity is the true foundation of cultural preservation.”',
    },
    {
      num: '07',
      title: 'PRESERVING THE TRADITION',
      heading: 'Safeguarding Unwritten Heritage for Generations to Come',
      desc: 'Through interactive workshops, university student internships, and heritage documentation, the mela serves as an active living school where ancient methods of handloom weaving, vegetable dyeing, and clay throwing are documented and sustained.',
      image: '/assets/haryana_folk_hero_cinematic.jpg',
      quote: '“A culture that remembers its hands will never lose its soul.”',
    },
    {
      num: '08',
      title: 'TODAY & THE FUTURE',
      heading: 'Contemporary Resonance of Sacred Heritage',
      desc: 'Surajkund proves that far from being obsolete relics of the past, traditional Indian handcrafts offer ecological, aesthetic, and spiritual answers for contemporary life: handmade, sustainable, communal, and profoundly human.',
      image: '/assets/haryana_heritage_pavilion.jpg',
      quote: '“The living tradition continues — from the ancient kiln to the modern world.”',
    },
  ],
  milestones: [
    {
      num: '01',
      title: 'The Sun Pool Antiquity',
      desc: 'Founded upon the sacred 10th-century stepped solar reservoir built by Tomar monarch Suraj Pal, embodying the ancient sun-worshipping roots of the region.',
    },
    {
      num: '02',
      title: 'The Rural Thatch Pavilion Architecture',
      desc: 'The entire fairground is constructed using sustainable rural materials—bamboo, unbaked clay, straw thatch, and madder cotton canopy cloths.',
    },
    {
      num: '03',
      title: 'Direct Artisan Commerce & Dignity',
      desc: 'Craftspeople sell directly to visitors without middlemen, receiving fair remuneration, national visibility, and prestigious UNESCO-supported master awards.',
    },
    {
      num: '04',
      title: 'Global Cultural Dialogue',
      desc: 'Over forty partner countries and selected Indian theme states exchange ancestral craft methodologies, weaving traditions, and musical vocabularies.',
    },
    {
      num: '05',
      title: 'Chaupal Living Theatre & Open Stages',
      desc: 'Two massive open-air amphitheaters host non-stop daily recitals of Saang, Ragini, Dhamal, Been Jogi music, and international folk dances.',
    },
    {
      num: '06',
      title: 'Living Demonstrations & Tactile Workspaces',
      desc: 'Visitors witness potters throwing Yamuna clay on kick-wheels, women darning Phulkari baghs, and iron smiths tempering damascened blades live.',
    },
    {
      num: '07',
      title: 'Indigenous Culinary Heritage',
      desc: 'Authentic regional culinary pavilions serving Bajra Khichdi with hand-churned white butter, Gur-Roti, and northern herbal winter delicacies.',
    },
    {
      num: '08',
      title: 'The Living Continuum Manifesto',
      desc: 'Surajkund proves that traditional handmade craft remains a vibrant, sustainable, and economically viable alternative to industrial consumerism.',
    },
  ],
};

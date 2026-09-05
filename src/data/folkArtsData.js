/**
 * Comprehensive Dataset for Folk Arts of Haryana
 * Curated authentic traditions, tailored journeys, motif specimens, and Surajkund Crafts Mela
 */

export const HARYANA_FOLK_TRADITIONS = [
  {
    id: 'phulkari',
    num: '01',
    accession: 'HR-FA-01',
    title: 'PHULKARI',
    vernacular: 'फुलकारी • Flower Work',
    subtitle: 'TEXTILES, EMBROIDERY & WOMEN’S SACRED CRAFT',
    tagline: '“Stories woven into colour and thread, counted stitch by unwritten stitch.”',
    image: '/assets/haryana_phulkari.jpg',
    secondaryImage: '/assets/haryana_folk_hero.jpg',
    region: 'Rohtak, Hissar, Ambala, Jind & Karnal',
    period: '15th Century CE – Living Craft',
    medium: 'Untwisted Pat Silk on Handspun Khaddar',
    shortDesc: 'The monumental geometric textile tradition where vibrant unspun silk floss is embroidered entirely from the reverse of homespun cotton cloth without stencils.',
    overview: 'Practiced as a labour of maternal blessing across rural Haryana, Phulkari (literally “flower work”) represents an extraordinary geometric tradition. Village women embroidered complex silk tapestries (Baghs) on coarse madder-dyed cotton cloth, counting threads from the reverse side without drawing designs. Each finished cloth served as a protective mantle gifted to daughters at weddings.',
    
    // Tailored Story Sections
    sections: [
      {
        id: 'origins',
        title: '01 — ORIGINS & CONTINUUM',
        heading: 'An Unbroken Lineage of Domestic Devotion',
        text: 'Mentions of floral embroidery on coarse cloth date back to northern medieval folk poetry and oral wedding bards. In Haryana, Phulkari evolved not inside royal workshops or court karkhanas, but within rural courtyards where women gathered on winter afternoons. It was never conceived for commercial trade; every stitch was imbued with prayers for fertility, longevity, and familial protection.',
      },
      {
        id: 'living-tradition',
        title: '02 — THE LIVING TRADITION',
        heading: 'Communal Gatherings in the Courtyard',
        text: 'The creation of a Bagh or Chope was a communal rite. When a granddaughter was born, maternal grandmothers would begin selecting dyed silk skeins. Neighbors gathered in the inner chaupal, singing celebratory suhaag folk verses as needles moved in unison across the textured warp and weft.',
      },
      {
        id: 'materials',
        title: '03 — MATERIALS EMBEDDED IN THE EARTH',
        heading: 'From Cotton Fields to Radiant Silk Floss',
        items: [
          {
            name: 'Handspun Khaddar',
            desc: 'Woven on rural pit-looms from indigenous coarse Desi cotton, hand-dyed in warm madder red, indigo, or earth brown.',
          },
          {
            name: 'Untwisted Pat Silk',
            desc: 'Glossy, unspun natural silk filament sourced through historic northern trade corridors, reflecting light in prismatic facets.',
          },
          {
            name: 'Natural Pigment Dyes',
            desc: 'Madder roots (Manjistha), turmeric (Haldi), and pomegranate rind (Anar) yielding deep, resilient rustic hues.',
          },
        ],
      },
      {
        id: 'techniques',
        title: '04 — THE COUNTED DARNING STITCH',
        heading: 'Working From the Hidden Reverse',
        text: 'The master technique of Phulkari is the counted darning stitch worked exclusively from the wrong side of the cloth. The artisan counts the micro-threads of the khaddar weave with her needle tip. Because the silk floss floats across the front and anchors on tiny reverse threads, the finished front shines with continuous satin luster without bulky thread knots.',
      },
      {
        id: 'motifs',
        title: '05 — THE LANGUAGE OF MOTIFS',
        heading: 'Geometry, Nature and Protective Talismans',
        hasMotifSpecimens: true,
      },
      {
        id: 'artisans',
        title: '06 — ARTISANS & LIVING MASTERS',
        heading: 'Custodians of Oral Precision',
        masterArtisan: {
          name: 'Kaushalya Devi & Village Cooperatives',
          location: 'Rohtak District',
          quote: '“When the needle pierces the khaddar from beneath, the memory of our grandmothers guides the hand.”',
          bio: 'For over sixty years, master embroiderers like Kaushalya Devi have safeguarded the unwritten counted stitch. Today, women’s village self-help cooperatives in Rohtak and Hissar train rural girls to revive the authentic Bagh craft.',
        },
      },
      {
        id: 'rituals',
        title: '07 — RITUALS & WEDDINGS',
        heading: 'The Sacred Bridal Canopy',
        text: 'At the moment a bride departs her parental home (Vidai), her maternal uncle drapes the Chope or Subhar over her head. The red cloth acts as a spiritual fortress, guarding her transitions into matrimony with ancestral blessings embroidered into every corner.',
      },
      {
        id: 'today',
        title: '08 — PHULKARI TODAY',
        heading: 'From Heirloom Chests to Contemporary Runways',
        text: 'While synthetic printed imitations dominate mass markets, authentic hand-counted Haryana Phulkari is experiencing a renaissance through cultural archives, ethical craft foundations, and exhibitions like the Surajkund Crafts Mela, ensuring this ancient geometry remains a living identity.',
      },
    ],

    // Dedicated Motif Specimen Archive
    motifs: [
      {
        name: 'Mor (The Sacred Peacock)',
        vernacular: 'मोर रूपांकन',
        symbolism: 'Rain blessings, grace, spiritual watchfulness, and monsoon joy.',
        context: 'Embroidered into Sainchi Phulkari and bridal shawls; positioned near the pallu border.',
        execution: 'Rendered in stepped diamond stitches with deep green, gold, and vermilion pat silk.',
      },
      {
        name: 'Mirchi (Chili Talisman)',
        vernacular: 'मिर्ची • Nazar Battu',
        symbolism: 'Protection against the evil eye (Buri Nazar) and harbinger of vitality.',
        context: 'A single asymmetrical red or green chili motif deliberately placed to break symmetry.',
        execution: 'Dense elongated diamond chevron worked in contrasting scarlet thread.',
      },
      {
        name: 'Chandan Haar (Sandalwood Garland)',
        vernacular: 'चंदन हार',
        symbolism: 'Festive celebration, marital harmony, and auspicious fragrant adornment.',
        context: 'Central repeat pattern in celebratory Baghs worn during Karwa Chauth and Teej.',
        execution: 'Concentric radiating diamond stepped lozenges resembling linked golden necklaces.',
      },
      {
        name: 'Bel & Phul (Floral Vine)',
        vernacular: 'फूल एवं बेल',
        symbolism: 'Fertility of the soil, generational renewal, and familial lineage.',
        context: 'Frame borders running along the perimeter of the khaddar mantle.',
        execution: 'Continuous running zigzag darning stitches flanked by golden silk florets.',
      },
      {
        name: 'Karela & Gheea (Gourd Motifs)',
        vernacular: 'करेला एवं ककड़ी',
        symbolism: 'Gratitude for agrarian harvest, vegetable gardens, and domestic abundance.',
        context: 'Domestic folk baghs celebrating rural village agricultural harvest.',
        execution: 'Textured lozenges with serrated borders mirroring the ribbed skin of bitter gourds.',
      },
    ],
  },

  {
    id: 'saang',
    num: '02',
    accession: 'HR-FA-02',
    title: 'SAANG',
    vernacular: 'सांग • Open-Air Folk Theatre',
    subtitle: 'FOLK OPERA, COMMUNITY PERFORMANCE & LIVING DRAMA',
    tagline: '“Where open wooden platforms turn chaupals into starry theatres until dawn.”',
    image: '/assets/haryana_saang_theatre.jpg',
    secondaryImage: '/assets/haryana_heritage_pavilion.jpg',
    region: 'Sonipat, Rohtak, Jhajjar, Panipat & Jind',
    period: '18th Century CE – Present Living Theatre',
    medium: 'Acoustic Verse, Wooden Chaupal Platform, Live Folk Orchestra',
    shortDesc: 'The monumental open-air folk theatre of Haryana, where troupes of master bards, actors, and instrumentalists perform overnight mythological and romantic epics without curtains.',
    overview: 'Saang is the supreme open-air community theatre of rural Haryana. Erected on raised wooden platforms in the center of village chaupals, Saang troupes perform without stage curtains or recorded sound. A master Saangi leads the performance through metered rhymed dialogue, rapid-fire humor, and musical climaxes that keep thousands of village spectators spellbound under starry skies until the morning azaan or temple bells.',

    sections: [
      {
        id: 'origins',
        title: '01 — ORIGINS & THE LINEAGE OF LAKHMI CHAND',
        heading: 'The Shakespeare of Haryana Folk Poetry',
        text: 'Tracing roots back to early Sanskrit theatre and 18th-century Swang bards like Kishan Lal Bhat, Saang was elevated into a monumental art form by Pandit Lakhmi Chand (1903–1945). Known as the "Surdas of Haryana," his poetic compositions seamlessly weaved high Vedantic philosophy with earthy rustic vernacular humor.',
      },
      {
        id: 'folk-theatre',
        title: '02 — THE OPEN-AIR CHAUPAL ARENA',
        heading: 'Theatre in the Round Without Barriers',
        text: 'The performance space has no proscenium or backstage. Spectators sit on all four sides of a simple wooden chaupal platform. Actors dress and change turbans right beside the harmonium master, creating an intimate, transparent theatrical dialogue between performer and audience.',
      },
      {
        id: 'performers',
        title: '03 — THE MASTER SAANGI & ACTORS',
        heading: 'Voice, Mime, and Male Dramatic Personae',
        text: 'Traditionally performed by all-male troupes, actors specialize in female roles through expressive cosmetics, vocal modulation, and ghunghat gestures. The lead Saangi commands the entire troupe with subtle taps of his chimta, improvising couplets responding to current local village happenings.',
      },
      {
        id: 'music',
        title: '04 — MUSIC & INSTRUMENTS OF THE SAANG',
        heading: 'Sarangi, Nagara and the Rhythm of the Earth',
        items: [
          { name: 'Sarangi', desc: 'Bowed cedar wood fiddle echoing the emotional cadences of the human singing voice.' },
          { name: 'Nagara & Dholak', desc: 'Dual kettledrums sounding dramatic scene changes and battle sequences.' },
          { name: 'Harmonium & Chimta', desc: 'Sustained melodic drones punctuated by sharp metallic rhythmic chiming.' },
        ],
      },
      {
        id: 'stories',
        title: '05 — STORIES & CLASSICAL THEMES',
        heading: 'Epics of Chivalry, Truth and Folk Romances',
        text: 'The repertoire encompasses classical moral allegories like Raja Harishchandra (the sacrifice for truth), Satyavan Savitri, and Nala Damayanti, alongside regional historical romances such as Sorath, Jamal, and Heera-Ranjha.',
      },
      {
        id: 'today',
        title: '06 — SAANG TODAY',
        heading: 'Preserving Oral Dramatic Vitality',
        text: 'In the era of digital screens, master troupes still draw vast audiences during post-harvest fairs and annual folk assemblies like Surajkund, proving that live oral community storytelling retains an unshakeable place in Haryana’s cultural soul.',
      },
    ],
  },

  {
    id: 'ragini',
    num: '03',
    accession: 'HR-FA-03',
    title: 'RAGINI',
    vernacular: 'रागिनी • Metered Folk Ballads',
    subtitle: 'ORAL POETRY, CLASSICAL METER & PHILOSOPHICAL SONG',
    tagline: '“Songs carrying memory, rural philosophy, and oral historical libraries.”',
    image: '/assets/haryana_heritage_pavilion.jpg',
    secondaryImage: '/assets/haryana_folk_hero_warm_bg_1788616551562.jpg',
    region: 'All Districts across Haryana',
    period: 'Timeless Living Oral Tradition',
    medium: 'Classical Raga Meter, Dholak, Sarangi, Oral Memory',
    shortDesc: 'Poetic, metered oral singing composed in rigorous classical ragas such as Bhairavi and Asavari, narrating historical chivalry, pastoral philosophy, and harvest joy.',
    overview: 'Far from simple folk chants, Haryanvi Ragini represents a sophisticated synthesis of northern classical Indian raga structures and vernacular rustic poetry. Legendary bards like Pandit Lakhmi Chand, Dhanpat Singh, and Baje Bhagat composed thousands of quatrains touching on agricultural wisdom, Upanishadic contemplation, and bravery, transmitted entirely by ear.',

    sections: [
      {
        id: 'origins',
        title: '01 — ORIGINS & BARDIC TRADITION',
        heading: 'The Singing Poets of the Northern Plains',
        text: 'The Ragini tradition evolved from ancient Charan and Bhat bardic genealogists who traveled between royal encampments and rural settlements. By the 19th century, it became the preeminent vehicle for moral instruction and cultural debate across Haryana.',
      },
      {
        id: 'musical-style',
        title: '02 — CLASSICAL RIGOR IN RUSTIC METERS',
        heading: 'Bhairavi, Kafi, Pilu and Asavari',
        text: 'Every authentic Ragini is anchored in a defined classical melodic framework (raga) adapted to the high vocal projection needed in open pastoral landscapes. Singers master intense staccato rhythms and breath-holding vocal runs that leave audiences mesmerized.',
      },
      {
        id: 'themes',
        title: '03 — THEMES & ORAL PHILOSOPHY',
        heading: 'From the Bhagavad Gita to Agrarian Life',
        text: 'Ragini texts bridge celestial dilemmas and mundane agrarian truths: the moral duties of Arjuna at Kurukshetra, the agony of a farmer whose crops were ruined by hailstorms, the loyalty of rural soldiers, and humor celebrating village feasts.',
      },
      {
        id: 'today',
        title: '04 — RAGINI TODAY',
        heading: 'Digital Archiving & Modern Stage Contests',
        text: 'Ragini competitions (Dangal) continue to draw tens of thousands of rural fans. Universities and folk institutes now archive old gramophone records and oral manuscripts to preserve dialectical nuances for future generations.',
      },
    ],
  },

  {
    id: 'pottery',
    num: '04',
    accession: 'HR-FA-04',
    title: 'TRADITIONAL POTTERY',
    vernacular: 'मिट्टी शिल्प • Earth & Terracotta Craft',
    subtitle: 'ALLUVIAL SILT, POROUS SURAHIS & 4000-YEAR CONTINUUM',
    tagline: '“Clay harvested from river floodplains, shaped by human hands on the kick wheel.”',
    image: '/assets/haryana_countryside.jpg',
    secondaryImage: '/assets/haryana_folk_hero.jpg',
    region: 'Jhajjar, Rewari, Gurugram, Rohtak & Bhiwani',
    period: 'Harappan Epoch (2500 BCE) – Living Continuum',
    medium: 'Yamuna Alluvial Sediment, Red Ochre Slip, Wood Kiln Firing',
    shortDesc: 'Ancient earthenware craft utilizing local alluvial silt to sculpt naturally cooling water surahis, ceremonial dipas, grain storage urns, and sacred terracotta roof finials.',
    overview: 'Connecting directly to the archaeological strata of Rakhigarhi, Bhirrana, and Mitathal, Haryana’s pottery tradition embodies an unbroken continuum of earth craft spanning four millennia. Jhajjar is universally renowned for its porous surahis that chill summer water through natural evaporation without electrical power.',

    sections: [
      {
        id: 'origins',
        title: '01 — AN ARCHAEOLOGICAL CONTINUUM',
        heading: 'From Ancient Indus Kilns to Modern Courtyards',
        text: 'Excavations in Haryana reveal red and black slipped terracotta urns whose wheel-marks and burnished slips match those thrown today by village Kumhars. The craft has survived centuries of political conquest, remaining the quiet foundation of rural domestic survival.',
      },
      {
        id: 'clay-and-land',
        title: '02 — CLAY & THE SACRED RIVERBEDS',
        heading: 'Harvesting Yamuna Sediment After the Monsoon',
        text: 'The best pottery clay is dug from dry village ponds (Johads) and dried floodplains of the Yamuna. Potters cure this clay under wet jute sacks for months, hand-kneading it with fine desert sand and organic chaff to achieve optimal porosity.',
      },
      {
        id: 'materials',
        title: '03 — MATERIALS & TOOLS',
        heading: 'Earth, Water, and Wood Ash',
        items: [
          { name: 'Alluvial River Silt', desc: 'Fine-grain dense sediment that retains water without chemical additives.' },
          { name: 'Red Ochre Slip (Geru)', desc: 'Natural iron-oxide mineral slip applied before firing for a rich burnished terracotta sheen.' },
          { name: 'Stone Burnishing Tools', desc: 'Smooth river pebbles used to polish the leather-hard clay surfaces to a silky waterproof finish.' },
        ],
      },
      {
        id: 'vessels',
        title: '04 — ICONIC VESSELS & LIVING OBJECTS',
        heading: 'The Porous Jhajjar Surahi and Ceremonial Kalash',
        text: 'The iconic Jhajjar Surahi features a slender neck, bulbous body, and micro-pores that allow water to slowly transpire to the exterior, cooling contents by up to 10°C in 45°C summer heat. In sacred rites, the Kalash remains central to wedding havans and harvest festivals.',
      },
      {
        id: 'today',
        title: '05 — POTTERY TODAY',
        heading: 'Sustainable Living & Terracotta Artistry',
        text: 'In an era seeking alternatives to plastic and refrigeration, Haryana’s terracotta makers are finding renewed appreciation among urban eco-conscious communities and cultural craft expos.',
      },
    ],
  },

  {
    id: 'folk-music',
    num: '05',
    accession: 'HR-FA-05',
    title: 'FOLK MUSIC & INSTRUMENTS',
    vernacular: 'लोक वाद्य • Soundscapes of the Chaupal',
    subtitle: 'SARANGI, NAGARA, DERU, BEEN & RURAL ORCHESTRAS',
    tagline: '“The resonant timbers, hollow gourds, and goatskin heads that give voice to the land.”',
    image: '/assets/haryana_folk_hero_warm_bg_1788616551562.jpg',
    secondaryImage: '/assets/haryana_saang_theatre.jpg',
    region: 'Jind, Rohtak, Kaithal, Mahendragarh & Sonipat',
    period: 'Ancient Folk Acoustic Tradition',
    medium: 'Handmade Sheesham Wood, Dried Gourds, Brass, Stretched Goatskin',
    shortDesc: 'A rich ensemble of acoustic folk instruments crafted from local timber, clay, and animal skins, driving the rhythms of harvest dances, oral epics, and pastoral ceremonies.',
    overview: 'The acoustic landscape of Haryana is vigorous, resonant, and deeply linked to nature. Instrument makers hand-carve Sheesham wood soundboxes, hollow bitter gourds for Been wind instruments, and stretch goatskin over earthenware bodies to create instruments capable of projecting across vast open fields without amplifiers.',

    sections: [
      {
        id: 'origins',
        title: '01 — ACOUSTIC ROOTS OF THE COUNTRYSIDE',
        heading: 'Instruments Born of Field and Hearth',
        text: 'Unlike palace instruments designed for intimate chamber concerts, Haryanvi instruments were crafted to cut through the howling winds of northern plains and the cheers of festive village crowds. They require intense physical stamina and breath control.',
      },
      {
        id: 'instruments',
        title: '02 — THE ICONIC INSTRUMENT GALLERY',
        heading: 'Timbers, Strings and Membranes',
        items: [
          { name: 'Sarangi', desc: 'Carved from a single block of Sheesham or Tun wood with 33 sympathetic steel and gut strings.' },
          { name: 'Nagara & Tasha', desc: 'Heavy copper and clay kettledrums beaten with wooden sticks to announce festival commencements.' },
          { name: 'Deru', desc: 'Hourglass-shaped friction drum played with knotted cords during Gugga Pir rituals.' },
          { name: 'Been (Pungi)', desc: 'Dual bamboo reed pipes fitted into a dried bottle gourd, iconic to snake charmer and pastoral songs.' },
          { name: 'Khartal & Chimta', desc: 'Wooden clappers with brass jingles and blacksmith tongs providing sharp syncopation.' },
        ],
      },
      {
        id: 'rituals',
        title: '03 — RITUAL & SEASONAL CONTEXTS',
        heading: 'Music for Every Turn of the Season',
        text: 'Each instrument belongs to a seasonal rhythm: the Been sounds at Holi celebrations, the Dholak and flute during monsoon Teej swings, and the Deru during autumn Gugga Pir night vigils.',
      },
      {
        id: 'today',
        title: '04 — HERITAGE SOUND TODAY',
        heading: 'Master Luthiers and Contemporary Soundscapes',
        text: 'Village instrument makers continue passing acoustic lutherie skills to apprentices, ensuring that the authentic timbre of raw wood and animal hide never gets replaced by digital synthesizers.',
      },
    ],
  },

  {
    id: 'wall-floor-art',
    num: '06',
    accession: 'HR-FA-06',
    title: 'TRADITIONAL WALL & FLOOR ART',
    vernacular: 'साँझी एवं चौक पूरना • Sacred Living Design',
    subtitle: 'SANJHI MUD RELIEF, CHOWK PURNA & SACRED GEOMETRY',
    tagline: '“Transforming mud courtyards and clay walls into temporary starry altars.”',
    image: '/assets/haryana_illustrated_hero.jpg',
    secondaryImage: '/assets/haryana_countryside.jpg',
    region: 'Rural Courtyards across Kurukshetra, Ambala, Karnal & Rohtak',
    period: 'Ancient Seasonal & Ritual Practice',
    medium: 'Alluvial Clay, Cow Dung Mud Slip, Rice Flour, Natural Pigments',
    shortDesc: 'The domestic visual canvas of rural women: from ephemeral geometric Chowk Purna drawn with ground rice paste on thresholds, to high-relief Sanjhi clay figurines sculpted during autumn Navratri.',
    overview: 'In traditional Haryana villages, sacred art was not restricted to temple sanctums; every home was treated as a living shrine. Women transformed mud-plastered walls and stone thresholds using ephemeral, biodegradable mediums: fresh clay, river sand, rice flour, and natural ochres, renewing domestic harmony with each seasonal festival.',

    sections: [
      {
        id: 'origins',
        title: '01 — THE DOMESTIC SACRED CANVAS',
        heading: 'Art Preserved Without Pencils or Stencils',
        text: 'Passed directly from mothers to daughters through observation, wall and floor designs represent intuitive sacred geometry. They welcome deities, mark auspicious wedding processions, and sanctify thresholds against negative omens.',
      },
      {
        id: 'sanjhi',
        title: '02 — SANJHI MUD RELIEF WALL SHRINES',
        heading: 'The Autumn Navratri Clay Goddess',
        text: 'On the first evening of autumn Navratri, rural girls gather wet clay from the pond to mold high-relief figures of Goddess Sanjhi on courtyard walls. Adorned with mirror work, silver paper jewelry, and geometric stars, the wall is sung to every evening for nine nights before ritual immersion.',
      },
      {
        id: 'chowk-purna',
        title: '03 — CHOWK PURNA: RICE GEOMETRY ON THE FLOOR',
        heading: 'The Sacred Threshold Diagram',
        text: 'Before wedding ceremonies, births, or Diwali, women wash courtyard thresholds with fresh cow dung wash, drawing intricate intersecting geometric grids using rice paste (Aipan) applied with ring fingers. Each square holds symbolic blessings for longevity and prosperity.',
      },
      {
        id: 'motifs',
        title: '04 — THE LANGUAGE OF SACRED MOTIFS',
        heading: 'Sun, Moon, Lotus and Sacred Kalash',
        hasMotifSpecimens: true,
      },
      {
        id: 'today',
        title: '05 — LIVING RELEVANCE TODAY',
        heading: 'Preserving Ephemeral Courtyard Art',
        text: 'Even as concrete homes replace mud architecture, women continue sculpting Sanjhi on portable terracotta plaques, keeping alive this sacred sisterhood ritual in contemporary Haryana.',
      },
    ],

    motifs: [
      {
        name: 'Sanjhi Mukut (The Celestial Crown)',
        vernacular: 'साँझी मुकुट',
        symbolism: 'Cosmic authority, divine maternal grace, and celestial light.',
        context: 'Sculpted at the top of the mud relief shrine; studded with micro-mirrors.',
        execution: 'Tiered triangular clay reliefs pressed with seed impressions.',
      },
      {
        name: 'Chowk Purna Padam (Sacred Eight-Petal Lotus)',
        vernacular: 'अष्टदल कमल',
        symbolism: 'The eight directions of the universe, purity, and spiritual fortune.',
        context: 'Drawn at the exact center of wedding mandap floor diagrams with rice paste.',
        execution: 'Continuous rhythmic line drawn freehand using thumb and forefinger.',
      },
      {
        name: 'Suraj-Chanda (Sun & Moon Guardians)',
        vernacular: 'सूर्य-चंद्रमा',
        symbolism: 'Eternal time, cosmic balance, and uninterrupted familial continuum.',
        context: 'Flanking the upper corners of domestic entrance lintels.',
        execution: 'Circular clay medallion with radiating relief rays washed in yellow turmeric.',
      },
      {
        name: 'Mangal Kalash (Auspicious Water Urn)',
        vernacular: 'मंगल कलश',
        symbolism: 'Abundance, agrarian harvests, and ceremonial purity.',
        context: 'Bordering wedding entrance paths and Diwali prayer altars.',
        execution: 'Geometric outline filled with red geru earth powder and white rice powder.',
      },
    ],
  },

  {
    id: 'folk-dance',
    num: '07',
    accession: 'HR-FA-07',
    title: 'FOLK DANCE & CELEBRATIONS',
    vernacular: 'लोक नृत्य • Rhythms of Celebration',
    subtitle: 'DHAMAL, GHOOMAR, KHORIA & MONSOON HARVEST CELEBRATIONS',
    tagline: '“The joyful, vigorous movement of community bodies celebrating earth, crop and union.”',
    image: '/assets/haryana_folk_hero.jpg',
    secondaryImage: '/assets/haryana_saang_theatre.jpg',
    region: 'Ahirwal, Mewat, Rohtak, Sirsa & Yamunanagar',
    period: 'Ancient Folk Expression',
    medium: 'Traditional Costumes, Brass Thalis, Dhol Beats, Footwork',
    shortDesc: 'Vibrant communal dance forms expressing the muscular vigor, agrarian joy, and domestic humor of rural communities during harvest, Holi, Teej, and weddings.',
    overview: 'Haryana’s folk dances are rooted in the physical rhythm of rural agrarian life: the swing of the scythe at harvest, the joyous arrival of monsoon showers after scorching heat, and the playful teasing of bridal gatherings. Unlike classical dances designed for courts, these dances are communal celebrations where the entire village joins the circle.',

    sections: [
      {
        id: 'origins',
        title: '01 — VIGOROUS ROOTS OF THE DANCE',
        heading: 'Physical Vitality and Agrarian Jubilation',
        text: 'Mentioned in folklore dating back to the Mahabharata era, dances like the Dhamal reflect the martial and pastoral heritage of Ahir, Jat, and Gujjar communities. Dancers leap with energetic jumps accompanied by the rhythmic beat of large Daf tambourines.',
      },
      {
        id: 'forms',
        title: '02 — THE DIVERSE FORMS OF HARYANA DANCE',
        heading: 'From Martial Circles to Playful Courtyard Teasing',
        items: [
          { name: 'Dhamal', desc: 'Vigorous celebratory dance performed by men on moonlit nights celebrating crop harvesting.' },
          { name: 'Ghoomar', desc: 'Graceful circular swirling dance of women wearing voluminous twirling skirts (Ghaghras).' },
          { name: 'Khoria', desc: 'Humorous, theatrical dance performed exclusively by women at the groom’s house while the wedding party is away.' },
          { name: 'Loor', desc: 'Spring dance performed around Holi where young women sing witty rhyming questions and answers.' },
        ],
      },
      {
        id: 'costumes',
        title: '03 — TRADITIONAL ADORNMENT',
        heading: 'Damaan, Kurti, Chundri and Silver Ornaments',
        text: 'Dancers don heavy handspun skirts called Damaan, featuring dozens of flared pleats, paired with embroidered Kurtis and silver Hasli collars. The visual swirl of heavy textiles and jangling silver bells creates an unforgettable spectacle.',
      },
      {
        id: 'today',
        title: '04 — DANCE TODAY',
        heading: 'Living Pulse of Fairs and Festivals',
        text: 'From Republic Day national stages to rural melas like Surajkund, Haryana folk dance troupes remain energetic cultural ambassadors celebrating community resilience.',
      },
    ],
  },

  {
    id: 'woodcraft',
    num: '08',
    accession: 'HR-FA-08',
    title: 'TRADITIONAL WOODCRAFT',
    vernacular: 'काष्ठ कला • Woodcarving & Rural Craft',
    subtitle: 'SHEESHAM CARVING, PUPPETCRAFT & CHAUPAL ARCHITECTURE',
    tagline: '“Dense timbers sculpted into resonant instruments, chaupal pillars and animated puppets.”',
    image: '/assets/haryana_saang_theatre.jpg',
    secondaryImage: '/assets/haryana_heritage_pavilion.jpg',
    region: 'Yamunanagar, Jagadhri, Rewari & Jhajjar',
    period: 'Centuries-Old Rural Woodcraft',
    medium: 'Locally Sourced Sheesham, Tun, Mango Wood, Natural Lacquer',
    shortDesc: 'Artisanal woodworking encompassing master architectural carving of village chaupal pillars, hand-carved folk puppets (Katputli), and acoustic bodies for Sarangi and Dholak.',
    overview: 'Surrounded by the timber-rich foothills of the Shivalik range and ancient Sheesham groves, Haryana developed a proud woodworking tradition. Craftsmen transformed dense hardwood into utilitarian and sacred objects: heavy intricately carved courtyard doorways, spinning charkhas, decorative bullock carts, and expressive folk puppets.',

    sections: [
      {
        id: 'origins',
        title: '01 — THE CRAFT OF THE CARPENTER (TARKHAN)',
        heading: 'Architects of Rural Communal Spaces',
        text: 'Village Tarkhans held high respect in rural society. They not only fashioned plows and seed drills essential for agriculture, but also sculpted the majestic carved pillars and ceiling beams that anchored the village chaupal gathering halls.',
      },
      {
        id: 'objects',
        title: '02 — WOODEN TREASURES OF THE COUNTRYSIDE',
        heading: 'From Soundboxes to Animated Storytelling',
        items: [
          { name: 'Chaupal Pillars & Lintel Beams', desc: 'Carved with auspicious lotus medallions, geometric chains, and protective lion crests.' },
          { name: 'Folk Puppetry (Katputlis)', desc: 'Articulated wooden doll heads carved from light Mango wood and painted with natural lacquers.' },
          { name: 'Spinning Charkhas & Peedhas', desc: 'Domestic low wooden chairs with turned Sheesham legs woven with braided jute.' },
          { name: 'Acoustic Soundboxes', desc: 'Hollowed resonant blocks for Sarangi, Dhol, and Ektara.' },
        ],
      },
      {
        id: 'materials',
        title: '03 — TIMBER VARIETIES',
        heading: 'Dense Grain and Enduring Toughness',
        text: 'Sheesham (Indian Rosewood) is prized for its interlocking grain and termite resistance, while Tun is chosen for its lightweight resonance in musical instrument soundboards.',
      },
      {
        id: 'today',
        title: '04 — WOODCRAFT TODAY',
        heading: 'From Village Chaupals to Heritage Interiors',
        text: 'Master woodcarvers in Yamunanagar and Jagadhri continue keeping alive traditional joinery and hand-chisel carving, celebrated at national craft exhibitions across India.',
      },
    ],
  },
];

/**
 * Surajkund International Crafts Mela Dedicated Experience Dataset
 */
export const SURAJKUND_EXPERIENCE = {
  title: 'SURAJKUND INTERNATIONAL CRAFTS MELA',
  vernacular: 'सूरजकुंड अंतर्राष्ट्रीय शिल्प मेला',
  subtitle: 'LIVING HERITAGE, ARTISAN BAZAARS & CULTURAL EXCHANGE',
  tagline: '“Where rural master craftspeople, performers, and world audiences meet beneath ancient sunlit rocks.”',
  location: 'Surajkund Amphitheatre Grounds, Faridabad, Haryana',
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
      image: '/assets/haryana_folk_hero_warm_bg_1788616551562.jpg',
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
};

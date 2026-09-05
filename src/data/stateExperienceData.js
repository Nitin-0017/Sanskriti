/**
 * Reusable State Experience & Heritage Archive Data Engine
 * Expandable to all 28 Indian States & 8 Union Territories.
 * Flagship deep-dive: Haryana (Land of Folk Traditions & Vedic Chariots)
 */

export const STATE_EXPERIENCES = {
  haryana: {
    id: 'haryana',
    name: 'HARYANA',
    devanagari: 'हरियाणा',
    subtitle: 'Land of Folk Traditions',
    tagline: 'Dharmakshetra Kurukshetra & Sacred Vedic Hymns',
    poeticIntro: 'Where ancient traditions live through song, story, devotion and the rhythms of everyday life.',
    soundAmbiance: {
      ambientType: 'rural_pastoral', // wind, birds, soft tanpura, distant temple gong
    },
    colorAtmosphere: {
      primary: '#D4A72C',
      accent: '#8A2E22',
      glow: '#FFD27D',
      badgeBg: 'rgba(56, 30, 16, 0.88)',
    },
    landscape: {
      hero: '/assets/haryana_countryside.jpg',
      gateway: '/assets/haryana_heritage_pavilion.jpg',
      caption: 'Dawn over the Haryanvi Countryside — Mustard fields, sacred banyans, and rural pathways',
    },
    culturalMotifs: [
      {
        id: 'saang-ragini',
        title: 'Saang & Ragini Ballads',
        subtitle: 'The Soul of Village Theater',
        desc: 'Open-air operatic bards performing moral folklore, heroism, and philosophical wisdom beneath village banyans.',
        glyph: '♫',
      },
      {
        id: 'kurukshetra-gita',
        title: 'Dharmakshetra Kurukshetra',
        subtitle: 'The Song Divine Revealed',
        desc: 'The sacred land where the Bhagavad Gita was spoken to Arjuna on the cosmic battlefield at Jyotisar.',
        glyph: '☸',
      },
      {
        id: 'phulkari-craft',
        title: 'Phulkari Silk Needlecraft',
        subtitle: 'Heirloom Geometric Blooms',
        desc: 'Vibrant untwisted silk floss embroidered by women onto coarse homespun khaddar to bless brides with prosperity.',
        glyph: '✿',
      },
      {
        id: 'rural-choupal',
        title: 'Ancient Village Choupal',
        subtitle: 'Elders Gathering & Shared Lore',
        desc: 'The central communal hearth where rural councils deliberate timeless customary ethics over shared hukkas.',
        glyph: '🏛',
      }
    ],
    heritage: {
      overview: 'Haryana represents a quintessential synthesis of agricultural agrarian vitality, vibrant folk performing arts, and five millennia of foundational Indian philosophical scholarship.',
      temples: [
        {
          id: 'sthaneshwar-mahadev',
          name: 'Sthaneshwar Mahadev Temple',
          location: 'Thanesar, Kurukshetra, Haryana',
          period: 'Ancient Vedic / Harsha Vardhana Era (c. 7th Cent. CE)',
          desc: 'Where the Pandavas prayed to Lord Shiva for victory in the Mahabharata war. Its sacred water tank is believed to hold purifying waters blessed by Sage Dadhichi.',
          significance: 'One of the oldest surviving Shiva sanctums in Northern India and imperial patron shrine of Emperor Harshavardhana.',
          atAGlance: {
            period: 'Ancient / 7th Century CE (Pushyabhuti dynasty) & 1761 CE (Maratha reconstruction)',
            location: 'Thanesar, Kurukshetra, Haryana (29.98° N, 76.82° E)',
            tradition: 'Shaivism (Pashupata & Linga worship)',
            significance: 'Kuladevata (presiding patron deity) of Emperor Harshavardhana; traditional Pandava blessing sanctum',
            architecture: 'Regional North Indian Nagara shikhara with domed sanctum and ancient holy water sarovar tank'
          },
          whyItMatters: 'Sthaneshwar was the political and spiritual heart of Emperor Harshavardhana’s vast 7th-century North Indian empire. It marks an extraordinary convergence where Vedic myth, classical imperial history, and 18th-century Maratha resilience remain preserved in living worship.',
          theStory: [
            'Standing in the ancient citadel of Thanesar, Sthaneshwar Mahadev is one of the most venerated Shiva temples in northern India. In the 7th century CE, it served as the royal guardian shrine of the Pushyabhuti dynasty, whose greatest ruler, Harshavardhana, governed most of Northern India from this very soil.',
            'Surrounding the temple is a sacred kund (sarovar) whose waters have drawn pilgrims for over two millennia. Legend and recorded history intertwine here: the ancient tank was celebrated for its mineral healing properties, visited by travelling mendicants, royal retinues, and pilgrims circumambulating the sacred 48-kos circuit of Kurukshetra.',
            'The current temple structure reflects the architectural restoration by Sadashivrao Bhau, the Maratha general who encamped at Thanesar in 1761 CE before the Third Battle of Panipat, praying here for courage and divine victory.'
          ],
          historicalRecord: 'Xuanzang (Hiuen Tsang), the Chinese Buddhist monk who visited Thanesar in the 630s CE, recorded dozens of thriving Deva temples, identifying Sthaneshwar as the nucleus of royal Shaivite devotion. Archaeological excavations around Thanesar mound (Harsh-ka-Tila) substantiate continuous habitation from post-Gupta through medieval and Mughal eras. The existing stone and brick superstructure was reconstructed in the 18th century under Maratha military patronage.',
          traditionLegend: 'According to regional Puranic tradition, the Pandava brothers, accompanied by Lord Krishna, performed an elaborate Rudra Abhishek at this very spot before entering the Mahabharata war. Another enduring legend asserts that Sage Dadhichi offered his mortal bones to Lord Indra at this sanctum to forge the thunderbolt (Vajra) against Vritrasura.',
          research: {
            title: 'Archaeological Survey of India (ASI) - Chandigarh Circle / Thanesar Archaeological Monograph',
            source: 'Archaeological Survey of India',
            url: 'https://asi.nic.in'
          },
          intro: {
            heroImage: '/assets/pathway_start_closeup.jpg',
            tagline: 'One of the sacred places where the legends of Kurukshetra still live.',
            memoryPoints: [
              {
                number: '01',
                title: 'ANCIENT THANESAR',
                text: 'The region around Thanesar has been associated with sacred Vedic traditions and imperial learning for millennia.'
              },
              {
                number: '02',
                title: 'THE MAHABHARATA TRADITION',
                text: 'Local memory directly connects this sanctum with the Pandavas seeking divine fortitude on the eve of the Kurukshetra war.'
              },
              {
                number: '03',
                title: 'SHAIVITE HERITAGE',
                text: 'The temple remains a primordial bastion of northern Shaivite worship and meditative continuity.'
              },
              {
                number: '04',
                title: 'A LIVING PLACE',
                text: 'This is not merely a frozen historical monument — it breathes daily through continuous rituals and evening sarovar aratis.'
              }
            ]
          },
          visualJourney: {
            heroTagline: 'Where legends of Kurukshetra meet living worship.',
            sections: [
              {
                step: '01',
                title: 'THE SACRED LAND',
                leadQuote: 'Before the temple became a monument, this land was already sacred.',
                text: 'Long before stone plinths rose beside the Sarovar, ancient mendicants recognized Thanesar as a cosmic threshold where the Saraswati once nurtured primordial Vedic hermitages and forest austerities.',
                image: '/assets/haryana_countryside.jpg',
                layout: 'image-left'
              },
              {
                step: '02',
                title: 'THE TEMPLE SANCTUM',
                leadQuote: 'Imperial stone consecrated by Emperor Harshavardhana.',
                text: 'The curvilinear Nagara shikhara rises majestically over the subterranean lingam, preserving the 7th-century Pushyabhuti architectural heritage where royal patron devotions were permanently etched in masonry.',
                image: '/assets/haryana_illustrated_hero.jpg',
                layout: 'text-left'
              },
              {
                step: '03',
                title: 'THE EPIC LEGEND',
                leadQuote: 'Where the Pandavas prayed on the eve of the Kurukshetra war.',
                text: 'Tradition whispers that Lord Krishna guided the Pandava brothers to this sanctum before the battle, performing Rudra Abhishek while Sage Dadhichi surrendered his mortal bones to forge Indra’s cosmic vajra.',
                image: '/assets/pathway_start_closeup.jpg',
                layout: 'full-width'
              },
              {
                step: '04',
                title: 'THE LIVING TRADITION',
                leadQuote: 'Unbroken worship across two millennia.',
                text: 'Today, the holy sarovar waters still draw pilgrims circumambulating the 48-kos pilgrimage circuit, releasing floating earthen lamps at twilight in an unbroken chain of living northern Shaivite memory.',
                image: '/assets/heritage_hero_bg.jpg',
                layout: 'image-left'
              }
            ],
            timeline: [
              { era: '7th CENTURY CE', title: 'Harshavardhana & Pushyabhuti Dynasty', detail: 'Thanesar serves as imperial capital; monk Xuanzang records thriving royal Shaivite devotions.' },
              { era: '11th–14th CENTURY', title: 'Medieval Transition & Resilience', detail: 'Sanctuary endures northern invasion campaigns, guarded by local wandering ascetics and pilgrims.' },
              { era: '1761 CE', title: 'Maratha Restoration', detail: 'Commander Sadashivrao Bhau encamps before the Third Battle of Panipat, restoring the sacred temple structure.' },
              { era: 'LIVING TRADITION', title: 'Continuous Pilgrimage Today', detail: 'Central sanctum in the sacred 48-kos Kurukshetra cultural circuit with daily evening aratis.' }
            ]
          }
        },
        {
          id: 'bhima-devi',
          name: 'Bhima Devi Temple Complex',
          location: 'Pinjore, Panchkula, Haryana',
          period: '8th–11th Century CE (Gurjara-Pratihara)',
          desc: 'Acclaimed as the "Khajuraho of North India" for its exquisite sculptures, tiered granite plinths, and classical pantheon reliefs nestled in the Shivalik foothills.',
          significance: 'UNESCO-recognized archaeological landmark of medieval temple architecture and North Indian sculptural art.',
          atAGlance: {
            period: '8th–11th Century CE (Gurjara-Pratihara Dynasty)',
            location: 'Pinjore, Panchkula District, Haryana (Shivalik Foothills)',
            tradition: 'Panchayatana Hindu Temple (Shakti, Shiva, Vishnu, Surya, Ganesha)',
            significance: 'Acclaimed as the "Khajuraho of North India" for its monumental sculptural wealth and classical stone masonry',
            architecture: 'Gurjara-Pratihara Panchayatana style with molded plinths (adhishthana), carved friezes, and pantheon reliefs'
          },
          whyItMatters: 'Bhima Devi is the most structurally magnificent archaeological temple site in Haryana. Its hundreds of surviving sculptures provide conclusive proof of a flourishing classical stone-carving tradition in the Shivalik foothills, bridging the sculptural idioms of Kashmir, Rajasthan, and the Gangetic plains.',
          theStory: [
            'Nestled at the base of the Shivalik hills in Pinjore, the Bhima Devi temple complex represents a pinnacle of Gurjara-Pratihara temple architecture. Built between the 8th and 11th centuries CE, the sanctuary was planned in the classic Panchayatana format: a principal sanctum surrounded by four auxiliary corner shrines.',
            'Although destroyed during early medieval conquests, meticulous excavation by Haryana state archaeologists between 1974 and 1977 unearthed hundreds of breathtaking sandstone sculptures, including depictions of Shiva-Parvati, Vishnu, Ganesha, Mahishasuramardini, and apsaras capturing graceful dance mudras.',
            'Today, the open-air archaeological museum at Pinjore preserves these stone masterworks, allowing visitors to walk directly amidst the carved sandstone plinths where royal sculptors once celebrated cosmic and earthly beauty.'
          ],
          historicalRecord: 'Epigraphic and numismatic evidence links the complex to the imperial Gurjara-Pratihara monarchs who controlled the trade routes through the Himalayan foothills. Architectural analysis reveals affinities with the Osian temples of Rajasthan and Bateshwar in Madhya Pradesh. Excavations in the 1970s verified the original five-shrine foundation layout and recovered over a thousand sculptural fragments now conserved under Haryana heritage protection.',
          traditionLegend: 'Local folklore associates Pinjore (historically recorded as Panchapura) with the Pandavas during their twelve-year forest exile (Vanvas). Regional lore asserts that Bhima defeated the demon Hidimb in the pine groves here and subsequently married the forest princess Hidimba, lending his name to the sacred sanctuary.',
          research: {
            title: 'Department of Archaeology & Museums, Haryana - Pinjore Excavation Reports',
            source: 'Department of Archaeology & Museums, Haryana',
            url: 'https://archaeologyharyana.gov.in/'
          },
          intro: {
            heroImage: '/assets/heritage_hero_bg.jpg',
            tagline: 'The magnificent stone carving renaissance of the northern Shivalik foothills.',
            memoryPoints: [
              {
                number: '01',
                title: 'HIMALAYAN FOOTHILLS',
                text: 'Pinjore stood at the confluence of forested Himalayan pathways and ancient northern trade routes.'
              },
              {
                number: '02',
                title: 'GURJARA-PRATIHARA ART',
                text: 'The stone masonry demonstrates a classical peak of sculpture rivaling Khajuraho and Osian.'
              },
              {
                number: '03',
                title: 'PANDAVA EXILE LORE',
                text: 'Legend links the dense pine slopes to Bhima and the Pandava vanvas in ancient Panchapura.'
              },
              {
                number: '04',
                title: 'A LIVING GALLERY',
                text: 'Today, the open-air archaeological complex stands as a timeless open museum under mountain skies.'
              }
            ]
          },
          visualJourney: {
            heroTagline: 'The Khajuraho of North India amidst the Shivalik foothills.',
            sections: [
              {
                step: '01',
                title: 'THE SHIVALIK CRADLE',
                leadQuote: 'Where forested mountain streams met classical trade routes.',
                text: 'Perched in the lush green foothills of Pinjore, ancient stone masons recognized this Himalayan threshold as a sacred sanctuary where cool mountain breezes greeted pilgrims.',
                image: '/assets/pathway_start_closeup.jpg',
                layout: 'image-left'
              },
              {
                step: '02',
                title: 'THE PANCHAYATANA SANCTUM',
                leadQuote: 'Five shrines aligned to the cosmic compass.',
                text: 'The grand central sanctum was surrounded by four auxiliary shrines, standing upon tiered granite and sandstone plinths carved with divine friezes of Ganesha, Surya, and Mahishasuramardini.',
                image: '/assets/heritage_hero_bg.jpg',
                layout: 'text-left'
              },
              {
                step: '03',
                title: 'THE EXILE OF BHIMA',
                leadQuote: 'Legends of the Pandavas in the pine groves of Panchapura.',
                text: 'Folk memory recounts that during their forest exile, the Pandava hero Bhima wandered these slopes, subduing wilderness spirits and leaving his heroic namesake upon the valley.',
                image: '/assets/haryana_illustrated_hero.jpg',
                layout: 'full-width'
              },
              {
                step: '04',
                title: 'RESURRECTION IN STONE',
                leadQuote: 'Rescued from centuries of silence by archaeologists.',
                text: 'Excavations in 1974 brought thousands of masterwork sculptural fragments into the sunlight, creating an open-air stone gallery where the medieval renaissance lives again.',
                image: '/assets/haryana_countryside.jpg',
                layout: 'image-left'
              }
            ],
            timeline: [
              { era: '8th CENTURY CE', title: 'Foundation under Gurjara-Pratiharas', detail: 'Construction of the Panchayatana stone temple complex alongside northern Himalayan trade arteries.' },
              { era: '11th CENTURY CE', title: 'Peak Sculptural Synthesis', detail: 'Elaboration of erotic-spiritual panels, apsara reliefs, and classical pantheon plinths.' },
              { era: '1974–1977 CE', title: 'Archaeological Rediscovery', detail: 'Haryana State Archaeology excavates the buried complex, recovering over 1,000 carved sculptures.' },
              { era: 'PRESENT DAY', title: 'Protected Archaeological Museum', detail: 'Preserved as an open-air sculpture museum celebrating Northern classical sculpture.' }
            ]
          }
        },
        {
          id: 'agroha-dham',
          name: 'Agroha Dham',
          location: 'Agroha, Hisar District, Haryana',
          period: 'Ancient Agreya Republic (c. 1000 BCE) & Modern Memorial',
          desc: 'The spiritual and civilizational center founded by Maharaja Agrasen, dedicated to Goddess Mahalaxmi, Saraswati, and non-violence.',
          significance: 'Historic capital of the ancient Agreya republic and fountainhead of the commercial-cooperative tradition in India.',
          atAGlance: {
            period: 'Ancient Agreya Janapada (c. 1000 BCE–2nd Century BCE) / Modern Monument (1976–1984 CE)',
            location: 'Agroha, Hisar District, Haryana (NH-9)',
            tradition: 'Vaishnavism, Shakta worship & Agrasen Dharmic Philosophy',
            significance: 'Civilizational capital of the Agreya Republic; birthplace of the egalitarian "One Brick, One Coin" social contract',
            architecture: 'Tri-partite red sandstone complex with stepped sarovar, central shrine, and ancient archaeological mound (Agroha Mound)'
          },
          whyItMatters: 'Agroha Dham honors one of the earliest recorded democratic republics in ancient Indian history. Its founding philosophy of mutual aid—where an entire city welcomed immigrants by collectively providing startup shelter and capital—stands as an enduring model of compassionate economic governance.',
          theStory: [
            'Rising majestically alongside the ancient trade corridors of Hisar, Agroha was the thriving capital of the Agreya Republic (Janapada). Established by Maharaja Agrasen, a Kshatriya king of the Solar dynasty who renounced animal sacrifice to embrace trade and non-violence, the republic flourished as a hub of commerce, metallurgy, and Vedic learning.',
            'Agrasen instituted a remarkable socio-economic charter: every new family arriving in Agroha was presented with exactly one brick and one silver coin by each resident family. This ensured that no migrant was destitute, creating immediate housing and working capital without debt or servility.',
            'The modern Agroha Dham complex, constructed between 1976 and 1984, commemorates this civilizational heritage through three towering red sandstone sanctums dedicated to Goddess Mahalaxmi (prosperity), Maharaja Agrasen (righteous rule), and Goddess Saraswati (knowledge).'
          ],
          historicalRecord: 'The historical reality of the Agreya Republic is verified by extensive archaeological excavations at the adjacent Agroha Mound. Discoveries include silver and copper coins bearing the ancient Brahmi legend "Agodaka Agacha Janapadasa" (Coins of the Agreya Janapada), Kushan-era terracottas, Roman pottery fragments showing trans-continental trade, and Buddhist plinths dating from the 3rd century BCE to the 4th century CE.',
          traditionLegend: 'According to the Agrawal Mahatmya scripture, Maharaja Agrasen was born into the line of King Mandhata. During an imperial Ashvamedha Yajna, observing the suffering of the sacrificial horse, he suffered an intense spiritual awakening, declaring non-violence (Ahimsa) and ethical commerce (Vyapar) as the supreme virtues of his people.',
          research: {
            title: 'Archaeological Survey of India - Memoir on the Excavations at Agroha, Hisar',
            source: 'Archaeological Survey of India',
            url: 'https://asi.nic.in'
          },
          intro: {
            heroImage: '/assets/heritage_hero_bg.jpg',
            tagline: 'Capital of the ancient Agreya Republic and the egalitarian social contract.',
            memoryPoints: [
              {
                number: '01',
                title: 'ANCIENT JANAPADA',
                text: 'Agroha was a sovereign mercantile republic renowned for metallurgy, commerce, and democratic governance.'
              },
              {
                number: '02',
                title: 'THE ONE BRICK CHARTER',
                text: 'Maharaja Agrasen created an egalitarian society where every citizen contributed to shelter incoming families.'
              },
              {
                number: '03',
                title: 'SACRED THREE SANCTUMS',
                text: 'A monumental red sandstone landmark dedicated to Mahalaxmi, Saraswati, and righteous governance.'
              },
              {
                number: '04',
                title: 'COINAGE & ARCHAEOLOGY',
                text: 'Excavations have uncovered ancient punch-marked coins inscribed with the ancient Brahmi legend Agodaka.'
              }
            ]
          },
          visualJourney: {
            heroTagline: 'Cradle of the ancient Agreya Republic and the egalitarian social contract.',
            sections: [
              {
                step: '01',
                title: 'THE ANCIENT JANAPADA',
                leadQuote: 'Where commerce and non-violence forged a new civilization.',
                text: 'Across the fertile plains of Hisar, Maharaja Agrasen established an ancient republic founded not on conquest, but on ethical trade, agrarian cooperation, and universal sanctuary.',
                image: '/assets/heritage_hero_bg.jpg',
                layout: 'image-left'
              },
              {
                step: '02',
                title: 'ONE BRICK, ONE COIN',
                leadQuote: 'The earliest cooperative social charter in world history.',
                text: 'Every arriving immigrant was gifted one brick and one silver coin by each resident family—ensuring shelter and honest working capital without the humiliation of debt or bondage.',
                image: '/assets/haryana_illustrated_hero.jpg',
                layout: 'text-left'
              },
              {
                step: '03',
                title: 'THE TRIPLE SANCTUM',
                leadQuote: 'Dedicated to Mahalaxmi, Saraswati, and Maharaja Agrasen.',
                text: 'Towering red sandstone shikharas mirror the ancient Agreya terracotta architecture, flanking the sacred Shakti Sarovar where devotees gather at sunrise.',
                image: '/assets/pathway_start_closeup.jpg',
                layout: 'full-width'
              },
              {
                step: '04',
                title: 'THE ARCHAEOLOGICAL MOUND',
                leadQuote: 'Ancient punch-marked coins bearing the Brahmi legend Agodaka.',
                text: 'Nearby, the ancient Agroha Dhab excavations continuously reveal trade seals, terracotta deities, and structural foundations confirming two millennia of urban mercantile life.',
                image: '/assets/haryana_countryside.jpg',
                layout: 'image-left'
              }
            ],
            timeline: [
              { era: 'c. 1000 BCE', title: 'Founding of the Agreya Republic', detail: 'Maharaja Agrasen establishes the Janapada capital with its unique social cooperative charter.' },
              { era: '3rd CENT. BCE–4th CENT. CE', title: 'Mauryan & Kushan Flourishing', detail: 'Agroha issues its own coinage in Brahmi script; trans-continental caravan trade flourishes.' },
              { era: '1976–1984 CE', title: 'Modern Monumental Rebirth', detail: 'Agroha Dham memorial complex is constructed in carved red sandstone by the community.' },
              { era: 'PRESENT DAY', title: 'National Pilgrimage & Cultural Centre', detail: 'Major spiritual and philanthropic hub welcoming pilgrims from across Bharat.' }
            ]
          }
        },
        {
          id: 'mata-mansa-devi',
          name: 'Mata Mansa Devi Shrine',
          location: 'Bilaspur, Panchkula, Haryana',
          period: '1811–1815 CE (Gopal Singh Era)',
          desc: 'A prominent Shakti shrine established by Maharaja Gopal Singh of Manimajra, famed for rare wall murals depicting mythological epics.',
          significance: 'Sacred center of the Navaratri pilgrimage in the North and prime repository of 19th-century regional wall frescoes.',
          atAGlance: {
            period: '1811–1815 CE (Main Temple) & 1840 CE (Patiala Shivala)',
            location: 'Bilaspur village, Panchkula District, Haryana',
            tradition: 'Shaktism (Mansa / Nagakanya manifestation of Adi Shakti)',
            significance: 'Pre-eminent northern pilgrimage seat for Chaitra and Ashvin Navaratri; preserves 38 rare 19th-century mythological wall frescoes',
            architecture: 'Late Nagara regional synthesis with Rajasthani-Mughal domed mandapas and frescoed circumambulatory corridors'
          },
          whyItMatters: 'Mata Mansa Devi is both an active epicenter of northern Shakta devotion and an irreplaceable artistic treasure. Its interior walls preserve 38 historical frescoes that fuse Pahari miniature brushwork with Rajasthani mural traditions, depicting the entire narrative of the Devi Mahatmya.',
          theStory: [
            'Situated along the Shivalik undulating ridges near Chandigarh, Mata Mansa Devi is one of the most revered Shakti shrines in North India. Dedicated to Goddess Mansa—the wish-fulfilling divinity associated with serpent wisdom and cosmic protection—the shrine welcomes millions of pilgrims each year during the spring and autumn Navaratri festivals.',
            'The main sanctuary was commissioned between 1811 and 1815 CE by Maharaja Gopal Singh of the princely state of Manimajra. A second temple, known as the Patiala Temple, was added in 1840 CE by Maharaja Karam Singh of Patiala, marking deep inter-princely reverence for the shrine.',
            'What elevates the shrine beyond religious pilgrimage is its extraordinary artistic corpus: the parikrama galleries and ceilings are covered with 38 exquisite early-19th-century frescoes depicting scenes from the Ramayana, Mahabharata, and Durga Saptashati, executed in natural mineral pigments.'
          ],
          historicalRecord: 'Official state archives and royal land grants confirm the construction of the primary sanctum by Raja Gopal Singh between 1811 and 1815 CE following his military victories. Inscriptions inside the temple complex attest to the patronage of the Phulkian dynasty of Patiala. The fresco murals have been documented by the Archaeological Department of Haryana as rare surviving exemplars of northern post-Mughal folk-classical wall painting.',
          traditionLegend: 'In Shakta mythology, Mansa Devi is revered as the daughter of Sage Kashyapa and Kadru, as well as the sister of the serpent king Vasuki. Pilgrims believe that the goddess manifests the supreme maternal grace to fulfill sincere heartfelt aspirations (Manasa) and safeguards the realm from pestilence and venomous afflictions.',
          research: {
            title: 'Haryana Tourism & Shri Mata Mansa Devi Shrine Board Heritage Publications',
            source: 'Shri Mata Mansa Devi Shrine Board',
            url: 'https://mansadevi.org.in/'
          },
          intro: {
            heroImage: '/assets/pathway_start_closeup.jpg',
            tagline: 'A sacred Shivalik Shakti sanctuary enveloped in 38 rare mythological wall frescoes.',
            memoryPoints: [
              {
                number: '01',
                title: 'SHIVALIK SANCTUARY',
                text: 'Elevated upon the Bilaspur ridge, welcoming northern pilgrims for centuries.'
              },
              {
                number: '02',
                title: '19th-CENTURY FRESCOES',
                text: 'The parikrama halls preserve 38 rare Pahari-Rajasthani mineral wall murals of the epics.'
              },
              {
                number: '03',
                title: 'ROYAL PATRONAGE',
                text: 'Consecrated by Maharaja Gopal Singh of Manimajra and expanded by Maharaja Karam Singh of Patiala.'
              },
              {
                number: '04',
                title: 'LIVING DEVOTION',
                text: 'A thriving spiritual epicenter attracting millions during biannual Chaitra and Ashvin Navaratris.'
              }
            ]
          },
          visualJourney: {
            heroTagline: 'A sacred Shakti seat adorned with 19th-century mythological frescoes.',
            sections: [
              {
                step: '01',
                title: 'THE SHAKTI THRESHOLD',
                leadQuote: 'Where the Shivalik hills meet northern Shakta devotion.',
                text: 'High along the Bilaspur ridges, the breeze carries the scent of incense and sacred chants, where pilgrims have climbed for centuries seeking maternal blessings.',
                image: '/assets/haryana_countryside.jpg',
                layout: 'image-left'
              },
              {
                step: '02',
                title: 'THE ROYAL CITADEL TEMPLE',
                leadQuote: 'Commissioned by Maharaja Gopal Singh in 1815.',
                text: 'The architecture blends Late Nagara spires with elegant haveli balconies and domed pavilions, flanked by the monumental Patiala Shivala built in 1840.',
                image: '/assets/heritage_hero_bg.jpg',
                layout: 'text-left'
              },
              {
                step: '03',
                title: 'THE 38 MYTHOLOGICAL FRESCOES',
                leadQuote: 'Pahari brushwork meeting Rajasthani mineral pigment traditions.',
                text: 'The parikrama circumambulatory corridors are enveloped in 38 rare early-19th-century frescoes illustrating the Devi Mahatmya, Ramayana, and Krishna pastimes.',
                image: '/assets/burnt_parchment.jpg',
                layout: 'full-width'
              },
              {
                step: '04',
                title: 'THE NAVARATRI CELEBRATION',
                leadQuote: 'Millions gathering in spring and autumn devotion.',
                text: 'Twice a year during Chaitra and Ashvin, the temple precinct transforms into a vibrant river of flowers, bells, and collective prayer echoing across the northern plains.',
                image: '/assets/sacred_mandala.jpg',
                layout: 'image-left'
              }
            ],
            timeline: [
              { era: '1811–1815 CE', title: 'Main Sanctuary Consecration', detail: 'Raja Gopal Singh of Manimajra erects the principal shrine following his regional triumphs.' },
              { era: '1840 CE', title: 'Patiala Temple Addition', detail: 'Maharaja Karam Singh of Patiala commissions the adjacent Shivala and circumambulatory corridors.' },
              { era: 'LATE 19th CENTURY', title: 'Fresco Documentation', detail: 'The 38 mythological wall paintings are noted as prime masterworks of regional wall art.' },
              { era: 'TODAY', title: 'Shri Mata Mansa Devi Shrine Board', detail: 'Managed under statutory board conservation welcoming millions during annual Navaratri fairs.' }
            ]
          }
        },
        {
          id: 'jyotisar-temple',
          name: 'Jyotisar Temple & Tirtha',
          location: 'Kurukshetra, Haryana',
          period: 'Ancient Vedic to Living Tradition',
          desc: 'The revered birthplace of the Bhagavad Gita, where Lord Krishna delivered the immortal discourse of Dharma to Arjuna beneath the sacred Akshaya Vata banyan tree.',
          significance: 'Philosophical epicenter of the Bhagavad Gita and prime sanctum on the 48-kos pilgrimage circuit.',
          image: '/assets/jyotisar_temple.jpg',
          atAGlance: {
            period: 'Ancient Vedic Era (Mahabharata tradition) & Historic Pilgrimage Sanctum',
            location: 'Kurukshetra, Haryana (5 km west on Pehowa Road)',
            tradition: 'Vaishnavism / Universal Gita Philosophy',
            significance: 'Sacred venue of the Gitopadesha (Song of the Lord) to Arjuna',
            architecture: 'Sacred kund sarovar ghats, marble Krishna-Arjuna chariot pavilion, immortal banyan tree'
          },
          whyItMatters: 'Jyotisar is the spiritual cradle of one of the world’s most profound philosophical texts. The living Akshaya Vata tree has stood as silent witness to millennia of scholars, poets, and seekers meditating upon selfless action and cosmic vision.',
          theStory: [
            'Located on the ancient battlefield path between Kurukshetra and Pehowa, Jyotisar marks the exact geographic spot revered for thousands of years as the site where Lord Krishna counseled the dejected warrior Arjuna, revealing the 700 verses of the Bhagavad Gita.',
            'At the center of the precinct stands an ancient banyan tree (Akshaya Vata), an offshoot of the sacred tree believed to have shaded Krishna and Arjuna’s chariot on the morning of the Great War.',
            'Surrounding the banyan tree is a tranquil sarovar and a white marble pavilion depicting Lord Krishna imparting the Gita from the chariot, bathed in the soft glow of evening earthen lamps.'
          ],
          historicalRecord: 'Puranic accounts in the Mahabharata and Vamana Purana celebrate Jyotisar as the premier tirtha of Dharmakshetra Kurukshetra. Epigraphic records from Adi Shankara’s northern travels and Mughal-era travelogues confirm continuous veneration. The modern marble chariot shrine was inaugurated by the Shankaracharya of Kanchi Kamakoti Peetham in 1967.',
          traditionLegend: 'Tradition affirms that it was under this banyan tree that Lord Krishna unveiled his cosmic Viswaroopa (Universal Cosmic Form) to Arjuna, demonstrating that all souls and galaxies reside within the eternal consciousness.',
          research: {
            title: 'Kurukshetra Development Board - Jyotisar Monograph',
            source: 'Kurukshetra Development Board',
            url: 'https://kurukshetra.gov.in'
          },
          intro: {
            heroImage: '/assets/jyotisar_temple.jpg',
            tagline: 'The timeless birthplace of the Bhagavad Gita beside the immortal banyan tree.',
            memoryPoints: [
              { number: '01', title: 'THE IMMORTAL BANYAN', text: 'The Akshaya Vata tree has sheltered continuous contemplation across thousands of years.' },
              { number: '02', title: 'THE GITOPADESHA', text: 'Where Lord Krishna delivered the immortal 700 verses on duty, detachment, and devotion.' },
              { number: '03', title: 'SACRED SAROVAR', text: 'A tranquil holy tank reflecting the golden evening lamps and sacred chants.' },
              { number: '04', title: 'LIVING TRADITION', text: 'Devotees gather daily for the evening Gita Maha-Arati beneath the open twilight sky.' }
            ]
          }
        },
        {
          id: 'birla-mandir-kurukshetra',
          name: 'Birla Mandir (Gita Mandir)',
          location: 'Kurukshetra, Haryana',
          period: '1952 CE (Jugal Kishore Birla)',
          desc: 'A monumental white marble Nagara shikhara sanctum overlooking the Brahm Sarovar, where all 700 verses of the Bhagavad Gita are carved onto interior stone walls.',
          significance: 'Architectural masterpiece of modern revivalist Hindu temple architecture celebrating universal Gita wisdom.',
          image: '/assets/haryana_illustrated_hero.jpg',
          atAGlance: {
            period: '1952 CE (Constructed by industrialist-philanthropist Jugal Kishore Birla)',
            location: 'Kurukshetra, Haryana (adjacent to Brahm Sarovar)',
            tradition: 'Sanatana Dharma / Vaishnavism',
            significance: 'Complete 18 chapters of Bhagavad Gita carved in marble; monumental bronze chariot on grounds',
            architecture: 'High classical Nagara marble shikhara with tiered stone pavilions and carved jali screens'
          },
          whyItMatters: 'Birla Mandir represents a magnificent modern renaissance in stone craftsmanship, transcribing the entire sacred literature of India into timeless marble so future generations can read and absorb its civilizational heritage.',
          theStory: [
            'Towering gracefully beside the expansive waters of the Brahm Sarovar, Sri Krishna Birla Mandir is one of Kurukshetra’s most awe-inspiring landmarks. Constructed in 1952 by Jugal Kishore Birla, the temple was envisioned as a living open book of Indian philosophy.',
            'Every wall of the inner sanctum is clad in polished white Rajasthani Makrana marble, meticulously hand-chiseled with the complete Sanskrit text and Hindi exposition of all 18 chapters of the Bhagavad Gita.',
            'The sprawling gardens feature a colossal life-size bronze sculpture of the chariot with four galloping horses carrying Lord Krishna and Arjuna, framed by the sacred evening reflection of the temple spire in the Sarovar.'
          ],
          historicalRecord: 'The temple was consecrated in 1952 with stone masons brought from Jaipur and Makrana. Historical records from the Birla Dharmik Trust document its role in re-establishing Kurukshetra as a premier national pilgrimage centre after the partition of 1947.',
          traditionLegend: 'Pilgrims circumambulate the marble walls, chanting each chapter of the Gita while moving from the ground level to the tiered terraces that offer panoramic views of the entire sacred 48-kos plains.',
          research: {
            title: 'Birla Education & Religious Trust Heritage Archives',
            source: 'Kurukshetra Heritage Documentation',
            url: 'https://kurukshetra.gov.in'
          },
          intro: {
            heroImage: '/assets/haryana_illustrated_hero.jpg',
            tagline: 'A monumental white marble cathedral of the Bhagavad Gita beside Brahm Sarovar.',
            memoryPoints: [
              { number: '01', title: 'MARBLE EXCELLENCE', text: 'Sculpted in pure white Makrana marble with intricate classical Nagara shikharas.' },
              { number: '02', title: 'CARVED SCRIPTURES', text: 'All 700 Sanskrit verses of the Gita are permanently inscribed upon the sanctum walls.' },
              { number: '03', title: 'MONUMENTAL CHARIOT', text: 'A colossal bronze chariot with four leaping steeds dominates the temple gardens.' },
              { number: '04', title: 'BRAHM SAROVAR PANORAMA', text: 'Overlooking the vast ancient waters where millions gather during solar eclipses.' }
            ]
          }
        }
      ],
      folkArts: [
        {
          id: 'saang-folk-theater',
          name: 'Saang Folk Theater',
          type: 'Traditional Musical Opera',
          location: 'Rural Haryana (Sonipat, Rohtak, Jhajjar)',
          period: '18th Century CE to Present',
          desc: 'A dramatic open-air performance enacted on raised wooden chaukis. It blends dialogue, couplets (Dohas), and raga melodies without theatrical curtains.',
          highlight: 'Legacy of Pt. Deep Chand & Pt. Lakhmi Chand',
          atAGlance: {
            period: 'Evolved in the 18th Century CE; perfected by early 20th century bards',
            location: 'Across village choupals of central and eastern Haryana',
            tradition: 'Open-air musical balladry & verse dialogue (Swang / Saang)',
            significance: 'Primary oral preservation engine of epic legends, moral parables, and civilizational folklore',
            architecture: 'Open-air village wooden stage (chouki) surrounded 360° by the community audience'
          },
          whyItMatters: 'Saang is the beating soul of rural Haryanvi community life. Without theatrical curtains or artificial amplification, a troupe of master singer-actors could hold thousands spellbound through the night, translating complex classical epics into accessible folk melodies.',
          theStory: [
            'Originating as an open-air theatrical form in the 18th century through pioneers like Kishan Lal Bhat and Pandit Deep Chand, Saang became the defining cultural institution of Haryana. Enacted atop an open wooden platform in the village square, the performance is completely immersive, with the audience sitting in an intimate circle around the actors.',
            'The genius of Saang lies in its linguistic vitality: classical Sanskrit epics like the Mahabharata and King Harishchandra were recomposed into vigorous Haryanvi verse, interspersing philosophical couplets with witty rustic humor.',
            'In the 20th century, Pandit Lakhmi Chand elevated Saang to its golden zenith, composing legendary operas that continue to be memorized and recited by generations of village bards.'
          ],
          historicalRecord: 'Archival records from the Sangeet Natak Akademi and Punjab/Haryana gazetteers document the institutionalization of Saang troupes across the Yamuna-Ghaggar interfluve. Troupes were invited by village panchayats for celebratory festivals, seasonal harvests, and fairs.',
          traditionLegend: 'Folk tradition revered master Saang performers as spiritual conduits. It is said that when Pt. Lakhmi Chand mounted the stage to sing, village feuds were suspended, and elders believed Saraswati herself rested upon the bard’s tongue.',
          research: {
            title: 'Sangeet Natak Akademi - Survey of Traditional Indian Theatre / Folk Forms of Haryana',
            source: 'Sangeet Natak Akademi',
            url: 'https://sangeetnatak.gov.in'
          }
        },
        {
          id: 'ragini-ballads',
          name: 'Ragini Ballads & Folk Songs',
          type: 'Storytelling Verse',
          location: 'Rural Haryana & Braj Borderlands',
          period: 'Medieval to Living Tradition',
          desc: 'Melodic metered folk songs narrating historical chivalry, family bonds, and seasonal harvests, accompanied by Sarangi, Dholak, and Harmonium.',
          highlight: 'Oral transmission across rural bards',
          atAGlance: {
            period: 'Medieval oral verse; formalized in the 19th–20th centuries',
            location: 'Across the cultural expanse of Haryana and western UP',
            tradition: 'Metered folk raga singing (Ragini)',
            significance: 'Musical chronicle of historical valor, domestic devotion, and agrarian seasons',
            architecture: 'Acoustic ensemble featuring Sarangi, Nagara, Chimta, and Harmonium'
          },
          whyItMatters: 'Ragini is the musical bloodstream of Haryana. Unlike commercial popular music, true Haryanvi Ragini is built upon complex classical raga frameworks, preserving poignant oral histories of freedom fighters, agrarian hardships, and philosophical devotion.',
          theStory: [
            'Ragini represents the supreme lyric poetry of the rural countryside. Characterized by high-register vocal delivery, complex rhythmic time cycles (taals), and the mournful resonance of the Sarangi, a single Ragini can narrate an entire epic battle or a delicate mother-daughter farewell during the monsoon.',
            'The form served as a vital oral newspaper and moral guide in pre-literate rural society, transmitting ethical ideals across centuries.',
            'Performers, known as Ragini Gayaks, undergo rigorous apprenticeship, memorizing thousands of metered verses while maintaining the spontaneous ability to improvise poetic commentary on current community events.'
          ],
          historicalRecord: 'Folklorists and musicologists at Kurukshetra University have transcribed thousands of Raginis, documenting their adherence to ragas such as Bhairavi, Kafi, and Asavari, demonstrating the sophisticated classical roots of northern folk song.',
          traditionLegend: 'Rural folklore maintains that the earliest Raginis were sung by wandering Charans and Bhats to inspire soldiers marching to defense along the historic invasion corridors of Panipat and Kurukshetra.',
          research: {
            title: 'Haryana Sahitya Akademi - Compendium of Haryanvi Folk Ballads & Oral Traditions',
            source: 'Haryana Sahitya Akademi',
            url: 'https://haryanasahitya.gov.in'
          }
        },
        {
          id: 'dhamal-loor-dance',
          name: 'Dhamal & Loor Dance',
          type: 'Harvest & Festival Celebrations',
          location: 'Ahirwal Region (Mahendragarh, Rewari, Gurugram) & Bangar',
          period: 'Ancient Mahabharata Era to Living Heritage',
          desc: 'Dhamal is danced by men beating Daf, Dholak, and Chimta celebrating harvest, while Loor is danced by women during Phalguna Holi with joyous playful repartee.',
          highlight: 'Traceable to ancient agricultural victory rituals',
          atAGlance: {
            period: 'Traceable to ancient pastoral celebrations; living tradition',
            location: 'Ahirwal (Rewari, Mahendragarh) and central Haryana',
            tradition: 'Celebratory community harvest and spring dance rituals',
            significance: 'Living link to ancient agricultural rhythm and collective social bonding',
            architecture: 'Open community circular ring under the spring full moon'
          },
          whyItMatters: 'Dhamal is celebrated as one of the oldest living folk dances of India, reputedly dating to the era of the Mahabharata. It embodies the unbridled masculine vigor of agricultural victory, while Loor represents the joyful feminine celebration of spring blossoming.',
          theStory: [
            'On moonlit nights following the golden mustard harvest, men gather in rural courtyards with massive circular drums called Dafs. To the resonant beats of Daf and Chimta, the Dhamal dance begins at a slow cadence, gradually building into an ecstatic physical crescendo of leaps, twirls, and synchronized chants.',
            'In contrast, Loor is danced exclusively by women during the festival of Holi in the Bangar region, featuring witty poetic repartee between two facing rows of dancers holding traditional dupattas.',
            'Both traditions reflect an intimate communion with the agricultural seasons, celebrating the earth’s bounty after months of rigorous labor.'
          ],
          historicalRecord: 'Documented in colonial ethnographies and contemporary cultural surveys as indigenous pastoral dances preserved primarily within the Yadav, Jat, and Gujjar agrarian communities of southern and central Haryana.',
          traditionLegend: 'Folk memory traces the Dhamal dance directly to the victorious revelry of the Pandava armies following their triumph at Kurukshetra, when warriors beat shields and drums in gratitude to the earth.',
          research: {
            title: 'Ministry of Culture, Government of India - National List of Intangible Cultural Heritage',
            source: 'Ministry of Culture',
            url: 'https://indiaculture.gov.in'
          }
        },
        {
          id: 'phulkari-needlecraft',
          name: 'Phulkari & Bagh Needlecraft',
          type: 'Traditional Textile Art',
          location: 'Ambala, Rohtak, Hissar & surrounding plains',
          period: '15th Century CE to Present',
          desc: 'Intricate geometric silk thread embroidery on coarse khadi fabric. The stitches are made from the reverse side to create dazzling floral patterns.',
          highlight: 'Cherished maternal gift passed across generations',
          atAGlance: {
            period: '15th Century CE onwards; referenced in medieval folk literature',
            location: 'Historically practiced across rural households of Haryana and Punjab',
            tradition: 'Domestic silk floss (Pat) embroidery on handspun khaddar',
            significance: 'Heirloom textile art embodying maternal blessings, matrimonial rites, and spiritual geometry',
            architecture: 'Darning stitch on the reverse face using unspun silk floss'
          },
          whyItMatters: 'Phulkari (literally "flower work") is not merely textile craft; it was a sacred emotional heirloom. Every piece was hand-embroidered by grandmothers and mothers over years for a daughter’s wedding, weaving familial memories into complex geometric mandalas.',
          theStory: [
            'In traditional Haryanvi homes, Phulkari and Bagh shawls were woven from rust-red or indigo homespun khaddar. Using unspun silk floss called Pat, women embroidered entirely from the reverse side of the fabric, counting individual warp and weft threads without using stencils.',
            'When the entire surface of the cloth was completely saturated with embroidery so that no base fabric remained visible, it was reverently called a Bagh ("garden").',
            'Motifs reflected everyday village sights: rolling waves of the river, sparrows, peacocks, rolling pins, and sacred lotus blossoms, transforming utilitarian cloth into a vibrant tapestry of agrarian life.'
          ],
          historicalRecord: 'Mentioned in Waris Shah’s 18th-century epic Heer Ranjha, and celebrated in regional bridal inventories. Contemporary master craftswomen have received National Awards for preserving indigenous Bagh patterns.',
          traditionLegend: 'Rural folklore held that an exquisitely embroidered Phulkari bestowed divine protection upon a bride departing her maternal home, with the pure silk threads thought to ward off negative gazes.',
          research: {
            title: 'National Crafts Museum & Hastkala Academy - Heritage Textile Archives',
            source: 'National Crafts Museum',
            url: 'https://nationalcraftsmuseum.nic.in'
          }
        }
      ],
      literature: [
        {
          id: 'surdas-padavali',
          title: 'Surdas Padavali',
          author: 'Sant Surdas (born in Sihi, Haryana)',
          period: '16th Century Bhakti Renaissance',
          location: 'Sihi (Faridabad District) & Braj Region',
          desc: 'Sublime Brajbhasha poetry celebrating the childhood innocence and divine pastimes of Krishna, composed by the visually impaired saint.',
          excerpt: '“मैया मोहि दाऊ बहुत खिजायौ... मोसों कहत मोल को लीन्हौ, तू जसुमति कब जायौ॥”',
          atAGlance: {
            period: '16th Century CE (c. 1478–1583 CE)',
            location: 'Born in Sihi village (Faridabad, Haryana); sang in Braj',
            tradition: 'Pushtimarga Vaishnava Bhakti Poetry',
            significance: 'Supreme monument of Vatsalya Rasa (parental divine love) in Indian literature',
            architecture: 'Metrical pads composed for Dhrupad and Raga recitation'
          },
          whyItMatters: 'Sant Surdas, born in Sihi village of Haryana, revolutionized northern Indian spiritual poetry. Despite visual impairment from birth, his poetic descriptions of Krishna’s childhood display an astonishing psychological acuity and emotional tenderness unparalleled in world devotional literature.',
          theStory: [
            'Born into a humble family in Sihi, a village near modern Faridabad in Haryana, Surdas experienced an early calling toward spiritual renunciation. Relocating to the banks of the Yamuna, he was initiated by Mahaprabhu Vallabhacharya into the Pushtimarga tradition.',
            'Surdas composed thousands of ecstatic pads that were compiled into the monumental Sur Sagar. His poetry famously articulated Vatsalya Rasa—viewing the Supreme not as a distant monarch, but as an endearing child stealing butter, teasing elders, and playing across rural pastures.',
            'His work fundamentally shaped the musical and literary landscape of northern India, establishing Brajbhasha as the premier literary idiom of the Bhakti movement.'
          ],
          historicalRecord: 'The Ain-i-Akbari of Abul Fazl mentions Surdas as a master musician of the imperial court era. The village of Sihi in Haryana is officially preserved as a commemorative literary pilgrimage site by the Haryana State Government.',
          traditionLegend: 'Devotional legend recounts that when Emperor Akbar heard Surdas sing at Mathura, he asked the blind poet to compose verses in praise of the throne. Surdas serenely responded with a pad stating his heart was irrevocably captivated only by the blue child of Yashoda.',
          research: {
            title: 'Sahitya Akademi - Makers of Indian Literature: Surdas Monograph',
            source: 'Sahitya Akademi',
            url: 'https://sahitya-akademi.gov.in'
          }
        },
        {
          id: 'katha-sahitya-lakhmi-chand',
          title: 'Katha Sahitya of Lakhmi Chand',
          author: 'Pandit Lakhmi Chand (Dada)',
          period: 'Early 20th Century (1903–1945 CE)',
          location: 'Janti Kalan, Sonipat District, Haryana',
          desc: 'Often celebrated as the Shakespeare of Haryanvi literature, he composed over 25 timeless Saangs and hundreds of philosophical raginis without formal literacy.',
          excerpt: 'Masterwork compositions including Shahi Lakkadhara, Seth Tara Chand, and Nal Damyanti.',
          atAGlance: {
            period: '1903–1945 CE (Early 20th Century)',
            location: 'Janti Kalan village, Sonipat District, Haryana',
            tradition: 'Folk Dramatic Literature & Ragini Poetics',
            significance: 'Known as "Surya Kavi" (Sun Poet) and the foundational architect of Haryanvi literary drama',
            architecture: 'Over 25 dramatic verse plays (Saangs) and hundreds of philosophical raginis'
          },
          whyItMatters: 'Pandit Lakhmi Chand achieved what formal university scholars could scarcely imagine: without formal school education, he produced an extraordinary literary corpus synthesizing Vedanta philosophy, classical Indian poetics, and earthy rustic wisdom in pure Haryanvi verse.',
          theStory: [
            'Born in 1903 in Janti Kalan village in Sonipat, Lakhmi Chand spent his early youth tending cattle in village pastures. Gifted with an astonishing memory and poetic imagination, he apprenticed under master bard Man Singh.',
            'Over four decades, he composed monumental musical plays including Shahi Lakkadhara, Harishchandra, Seth Tara Chand, and Nal Damyanti. His verses delve into profound metaphysical questions—the impermanence of mortal life, the nature of righteous karma, and the illusory facade of worldly power.',
            'His legacy was so formidable that modern universities in Haryana have established dedicated Chairs and Research Academies in his name.'
          ],
          historicalRecord: 'The Government of Haryana established the Pandit Lakhmi Chand State University of Performing and Visual Arts in Rohtak in his honor. His complete works have been compiled and published by the Haryana Sahitya Akademi.',
          traditionLegend: 'It is said in folk lore that after his passing at the young age of 42, his brain was studied by contemporary scholars who marvelled at how an unlettered villager could master classical Sanskrit prosody, meter, and philosophical allegory purely through oral intuition.',
          research: {
            title: 'Pandit Lakhmi Chand State University of Performing & Visual Arts - Research Archives',
            source: 'State University of Performing & Visual Arts, Haryana',
            url: 'https://plcsupva.ac.in'
          }
        },
        {
          id: 'haryanvi-folk-proverbs',
          title: 'Haryanvi Folk Proverbs & Wisdom',
          author: 'Oral Community Lore',
          period: 'Timeless Folk Heritage',
          location: 'Villages across Haryana',
          desc: 'A vast lexicon of witty, earthy proverbs encapsulating moral justice, weather prediction, agrarian wisdom, and resilience in everyday life.',
          excerpt: '“देसां में देस हरियाणा, जित दूध-दही का खाणा॥”',
          atAGlance: {
            period: 'Millennia of oral continuity',
            location: 'Across all 22 districts of Haryana',
            tradition: 'Oral gnomic poetry and agrarian proverbs (Lokoktiyan)',
            significance: 'Unwritten customary legal ethics, meteorology, and moral philosophy of rural Bharat',
            architecture: 'Concise rhyming couplets and earthy proverbs'
          },
          whyItMatters: 'Haryanvi proverbs are condensed masterclasses in psychological resilience, ecological awareness, and ethical integrity. They provide a transparent window into how rural communities governed their disputes, anticipated monsoon cycles, and celebrated wholesome agrarian living.',
          theStory: [
            'The oral proverb tradition of Haryana reflects the robust character of its people—direct, truthful, humorous, and deeply practical. Proverbs like "Desan mein Des Haryana, jit doodh-dahi ka khana" capture the agrarian pride in dairy prosperity and physical fortitude.',
            'Other aphorisms served as sophisticated agricultural calendars: farmers memorized couplets attributing rainfall timing to constellation transits (Nakshatras) and animal behaviors.',
            'In village panchayats, elders frequently settled complex family and land disputes by citing a single universally recognized folk proverb, demonstrating the authoritative weight of oral customary law.'
          ],
          historicalRecord: 'Linguists and sociologists, including George Grierson in the Linguistic Survey of India, have documented the syntactic precision and evocative imagery of Haryanvi folk sayings.',
          traditionLegend: 'Oral tradition believes these proverbs were distilled over five thousand years of continuous agricultural toil along the Saraswati and Yamuna basins, embodying the spirit of unyielding labor and hospitality.',
          research: {
            title: 'Linguistic Survey of India / Haryana Cultural Documentation Project',
            source: 'National Council of Educational Research and Training (NCERT)',
            url: 'https://ncert.nic.in'
          }
        }
      ],
      scriptures: [
        {
          id: 'shrimad-bhagavad-gita',
          title: 'Shrimad Bhagavad Gita',
          place: 'Jyotisar, Kurukshetra, Haryana',
          location: 'Jyotisar, Kurukshetra',
          period: 'c. 3000 BCE / Mahabharata Era',
          context: 'The Eternal Song of the Supreme',
          desc: 'The immortal 700-verse philosophical conversation between Lord Krishna and warrior Arjuna beneath the sacred Akshay Vat on duty, karma, and cosmic liberation.',
          verse: '“कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥”',
          atAGlance: {
            period: 'Mahabharata Antiquity (c. 3000 BCE–5th Century BCE textual canon)',
            location: 'Jyotisar, Kurukshetra, Haryana (Sacred Banyan Tree Akshay Vat)',
            tradition: 'Sanatana Dharma / Vedanta & Gita Shastra',
            significance: 'The foundational spiritual scripture of India, synthesizing Karma, Jnana, and Bhakti Yoga',
            architecture: '18 Chapters and 700 Sanskrit Shlokas in Anushtup meter'
          },
          whyItMatters: 'The Gita is the preeminent philosophical gift of India to global thought. Spoken on the battlefield of Kurukshetra, it addressed human existential despair with a message of fearless, selfless action and spiritual enlightenment that has inspired thinkers from Shankara to Mahatma Gandhi.',
          theStory: [
            'On the battlefields of Kurukshetra, facing his kin, teachers, and elders arrayed in opposing ranks, the warrior prince Arjuna collapsed in acute existential grief, laying down his bow Gandiva. In response, Bhagavan Krishna delivered the immortal 700 verses of the Bhagavad Gita.',
            'Rather than offering sectarian dogmas, Krishna expounded the eternal science of consciousness: the immortality of the Atman, the doctrine of Nishkama Karma (selfless action without attachment to outcomes), and the vision of the Vishwaroopa (Cosmic Universal Form).',
            'The sacred banyan tree at Jyotisar stands today as the venerated site where this dialogue took place, drawing seekers from around the world to meditate beneath its ancient branches.'
          ],
          historicalRecord: 'The Bhagavad Gita is embedded within the Bhishma Parva of the epic Mahabharata. Commentaries by Adi Shankaracharya in the 8th century CE established it as a pillar of the Prasthanatrayi (canonical triplet of Vedanta). Kurukshetra’s geographical topography mentioned in the text matches archaeological surveys of ancient Saraswati-Drishadvati valleys.',
          traditionLegend: 'Tradition holds that the Akshay Vat banyan tree at Jyotisar witnessed the cosmic manifestation of Krishna’s Vishwaroopa and will endure until the end of the cosmic cycle (Pralaya).',
          research: {
            title: 'Kurukshetra University - Institute of Sanskrit and Indological Studies',
            source: 'Kurukshetra University',
            url: 'https://kuk.ac.in'
          }
        },
        {
          id: 'rigvedic-saraswati-suktas',
          title: 'Rigvedic Saraswati Suktas',
          place: 'Saraswati River Basin (Kurukshetra & Pehowa)',
          location: 'Pehowa & Kurukshetra, Haryana',
          period: 'Vedic Antiquity (c. 1500–1000 BCE or earlier)',
          context: 'Vedic Revelation',
          desc: 'Sacred hymns of the Rigveda praising the mighty Saraswati river as the mother of rivers and inspirer of pure intellect and poetic speech.',
          verse: '“अम्बितमे नदीतमे देवितमे सरस्वति। अप्रशस्ता इव स्मसि प्रशस्तिमम्ब नस्कृधि॥”',
          atAGlance: {
            period: 'Vedic Revelation (Earliest layers of Sanskrit canon)',
            location: 'Paleochannels of Saraswati (Adi Badri, Pehowa, Sirsa, Haryana)',
            tradition: 'Rigvedic Samhita (Mandala 6 & 7 hymns)',
            significance: 'Celebrates the ancestral river that nurtured the earliest Vedic universities and urban centers',
            architecture: 'Vedic Chandas (Gayatri, Trishtubh meters)'
          },
          whyItMatters: 'The Saraswati Suktas provide irreplaceable historical and linguistic evidence that northern Haryana was the geographical epicenter where the foundational hymns of the Rigveda were chanted and preserved.',
          theStory: [
            'In the oldest poetry of humanity, the Rigveda, the Saraswati is extolled not merely as a physical river, but as "Ambitame, Naditame, Devitame" — the best of mothers, the best of rivers, and the best of goddesses.',
            'Flowing from the glacial springs of the Himalayas through Adi Badri into the fertile plains of Haryana, the river banks supported vast hermitages where rishis composed hymns and performed continuous sacrifices.',
            'When tectonic shifts and climatic changes caused the river to desiccate, its memory was immortalized as the goddess of wisdom, speech, and learning.'
          ],
          historicalRecord: 'Satellite imagery by ISRO and geological core-drilling by the Archaeological Survey of India have verified the existence of massive ancient river paleochannels corresponding directly to the Rigvedic Saraswati course in Haryana and Rajasthan.',
          traditionLegend: 'According to sacred tradition, Sage Veda Vyasa divided the single Veda into four and composed the Mahabharata on the peaceful banks of the Saraswati at Kurukshetra.',
          research: {
            title: 'Haryana Sarasvati Heritage Development Board & ISRO Paleochannel Reports',
            source: 'Haryana Sarasvati Heritage Development Board',
            url: 'https://sarasvati.haryana.gov.in'
          }
        },
        {
          id: 'brahma-purana-kurukshetra',
          title: 'Brahma Purana & Mahabharata Chapters',
          place: 'Tirtha Kshetra Kurukshetra',
          location: 'Kurukshetra, Haryana',
          period: 'Puranic Classical Era',
          context: 'Puranic Topography',
          desc: 'Extensive texts documenting the 48-kos parikrama, the sacred Brahma Sarovar, Sanhit Sarovar, and the eternal spiritual sanctum of North India.',
          verse: '“पृथिव्यां नैमिषं श्रेष्ठं दिवि पुष्करमेव च। कुरुक्षेत्रं त्रयो लोकाः प्रशंसन्ति सर्वदा॥”',
          atAGlance: {
            period: 'Classical Puranic Era (c. 4th–10th Century CE)',
            location: '48-Kos Kurukshetra Cultural Circuit (Kurukshetra, Kaithal, Karnal, Jind)',
            tradition: 'Tirtha Yatra & Puranic Geography',
            significance: 'Defines the sacred spatial geography of 360 holy water bodies and sanctuaries in Haryana',
            architecture: 'Sanskrit Puranic narrative shlokas'
          },
          whyItMatters: 'These chapters represent the earliest comprehensive sacred geography texts of India, establishing the concept of environmental conservation by sacralizing lakes, groves, and river confluences.',
          theStory: [
            'The Mahabharata’s Vana Parva and the Brahma Purana detail the sacred 48-kos circuit of Kurukshetra, declaring that even dust carried by the wind from Kurukshetra can purify the wandering pilgrim.',
            'The texts outline an elaborate pilgrimage route spanning over 360 tirthas, including Brahma Sarovar, Sannihit Sarovar, and Jyotisar.',
            'This sacred topography unified disparate communities under a shared pilgrim pathway that has been continuously walked for over two thousand years.'
          ],
          historicalRecord: 'Epigraphical records from the Gupta and Pratihara periods corroborate pilgrimage endowments to specific tirthas named in the Puranic texts.',
          traditionLegend: 'Puranic lore relates that Lord Brahma created the universe from this sacrosanct earth, conducting the cosmic yajna that birthed all living beings.',
          research: {
            title: 'Kurukshetra Development Board - Historical Survey of the 48-Kos Circuit',
            source: 'Kurukshetra Development Board',
            url: 'https://kurukshetra.gov.in'
          }
        }
      ],
      keyPersons: [
        {
          id: 'bhagavan-krishna',
          name: 'Bhagavan Krishna',
          title: 'Gitopadeshak & Cosmic Charioteer',
          role: 'Preceptor of Dharma',
          location: 'Kurukshetra, Haryana',
          period: 'Mahabharata Antiquity',
          desc: 'Steered Arjuna’s chariot on the plains of Kurukshetra, delivering the eternal spiritual wisdom of the Bhagavad Gita to humanity.',
          atAGlance: {
            period: 'Mahabharata Era (c. 3000 BCE)',
            location: 'Kurukshetra battlefield (Dharmakshetra)',
            tradition: 'Vaishnava Avatar & Preceptor of Yoga',
            significance: 'Delivered the Bhagavad Gita and guided the triumph of righteous Dharma',
            architecture: 'Depicted with golden chariot, shankha (conch), and divine sudarshana chakra'
          },
          whyItMatters: 'Krishna’s presence on the soils of Haryana transformed a bloody civil war into the world’s most celebrated exposition on human duty, non-attachment, and spiritual liberation.',
          theStory: [
            'As the charioteer of Arjuna, Krishna entered Haryana not to wage aggressive conquest, but to counsel conscience and establish moral order. His discourse at Jyotisar transcended time and clan affiliations.',
            'His role as diplomat, philosopher, and supreme friend remains the highest ideal of ethical leadership in Indian civilization.'
          ],
          historicalRecord: 'The Heliodorus Pillar inscription (c. 113 BCE) in Besnagar and early coins of Agathocles attest to the antiquity of Krishna-Vasudeva veneration across ancient India.',
          traditionLegend: 'Venerated as the Purna Avatara (complete divine manifestation) whose divine footprint sanctified every grain of Kurukshetra’s earth.',
          research: {
            title: 'Archaeological Survey of India & Bhandarkar Oriental Research Institute Publications',
            source: 'Bhandarkar Oriental Research Institute',
            url: 'https://bori.ac.in'
          }
        },
        {
          id: 'sant-surdas-person',
          name: 'Sant Surdas',
          title: 'Bhakti Saint & Divine Singer',
          role: 'Vaishnava Poet',
          location: 'Sihi (Faridabad District), Haryana',
          period: '1478–1583 CE',
          desc: 'Born in the quiet village of Sihi near modern Faridabad, his ecstatic devotional verses revolutionized medieval Indian music and poetry.',
          atAGlance: {
            period: '1478–1583 CE',
            location: 'Born in Sihi, Faridabad, Haryana',
            tradition: 'Ashtachhap Vaishnava Saint',
            significance: 'Author of the monumental Sur Sagar; champion of pure devotional music',
            architecture: 'Classical Dhrupad and Raga formulations'
          },
          whyItMatters: 'Surdas demonstrated the triumph of inner spiritual vision over physical blindness, proving that genuine devotion requires no external eyes to perceive the divine essence.',
          theStory: [
            'Born in Sihi village, Surdas overcame social isolation through musical genius. He joined the Ashtachhap collective under Vallabhacharya and sang daily at the temple of Shrinathji.',
            'His songs gave voice to millions who sought an intimate, loving relationship with the divine outside rigid ritual orthodoxy.'
          ],
          historicalRecord: 'Documented in the Chaurasi Vaishnavan ki Varta (Chronicle of 84 Vaishnavas) and contemporary Mughal annals.',
          traditionLegend: 'Believed to have possessed divine inner sight granted directly by Krishna.',
          research: {
            title: 'Central Institute of Hindi & Sahitya Akademi Biographical Archive',
            source: 'Sahitya Akademi',
            url: 'https://sahitya-akademi.gov.in'
          }
        },
        {
          id: 'pandit-lakhmi-chand-person',
          name: 'Pandit Lakhmi Chand',
          title: 'Surya Kavi of Haryana',
          role: 'Father of Modern Haryanvi Theatre',
          location: 'Janti Kalan, Sonipat, Haryana',
          period: '1903–1945 CE',
          desc: 'A towering literary and musical genius whose folk theatrical productions and raginis captured the spiritual soul of the common people.',
          atAGlance: {
            period: '1903–1945 CE',
            location: 'Sonipat District, Haryana',
            tradition: 'Folk Opera and Ragini Composition',
            significance: 'Immortal folk dramatist revered as the cultural Shakespeare of Haryana',
            architecture: 'Over 25 complete musical Saangs and hundreds of raginis'
          },
          whyItMatters: 'Lakhmi Chand proved that the vernacular folk language of Haryana possessed the same philosophical depth and aesthetic sophistication as classical Sanskrit drama.',
          theStory: [
            'Rising from illiterate agrarian roots, Lakhmi Chand became a cultural titan. His troupe travelled across North India, performing epic dramas to audiences of tens of thousands.',
            'His poetic compositions are studied today in universities for their profound metaphysical metaphors.'
          ],
          historicalRecord: 'The complete compendium of Lakhmi Chand’s compositions was officially compiled and published by the Haryana Sahitya Akademi.',
          traditionLegend: 'Regarded in folk memory as an inspired avatar of the divine muse Saraswati.',
          research: {
            title: 'Haryana Sahitya Akademi - Complete Works of Pandit Lakhmi Chand',
            source: 'Haryana Sahitya Akademi',
            url: 'https://haryanasahitya.gov.in'
          }
        },
        {
          id: 'rao-tula-ram',
          name: 'Rao Tula Ram',
          title: 'Hero of the 1857 Uprising',
          role: 'Chieftain of Rewari & Freedom Fighter',
          location: 'Rewari, Haryana',
          period: '1825–1863 CE',
          desc: 'A valiant freedom fighter who liberated Rewari and defended Delhi against British forces, martyred in Kabul while rallying international allies.',
          atAGlance: {
            period: '1825–1863 CE (1857 First War of Independence)',
            location: 'Rampura, Rewari, Haryana',
            tradition: 'Ahirwal Martial Chieftaincy & Anti-Colonial Resistance',
            significance: 'Liberated southern Haryana from British rule in 1857; martyr of the national freedom struggle',
            architecture: 'Fortified citadels of Rewari and Rampura'
          },
          whyItMatters: 'Rao Tula Ram was a visionary strategist who recognized that defeating colonial occupation required international diplomatic alliances, journeying through Iran to Russia and Afghanistan to secure military aid for India’s freedom.',
          theStory: [
            'When the 1857 revolt erupted, Rao Tula Ram seized the royal treasury at Rewari, dethroned British colonial officers, and mobilized an army of 5,000 soldiers to support the defense of Delhi.',
            'At the ferocious Battle of Nasibpur near Narnaul on November 16, 1857, his forces fought with heroic valor against superior British artillery.',
            'Refusing to surrender, he undertook a perilous clandestine journey across deserts to Iran and Kabul to negotiate Russian and Afghan support for India, passing away in Kabul in 1863.'
          ],
          historicalRecord: 'British military dispatches from 1857 describe Rao Tula Ram as the most formidable and disciplined rebel commander in the southern Punjab-Haryana region.',
          traditionLegend: 'Remembered in Ahirwal folk ballads as the lion of Haryana who never bowed his head to foreign subjugation.',
          research: {
            title: 'National Archives of India - Military Records of the 1857 Revolt in Haryana',
            source: 'National Archives of India',
            url: 'https://nationalarchives.nic.in'
          }
        }
      ]
    }
  }
};

/**
 * Reusable helper that retrieves or dynamically synthesizes
 * an immersive state experience for any state or union territory.
 */
export function getStateExperience(stateId, fallbackStateObj) {
  if (STATE_EXPERIENCES[stateId]) {
    return STATE_EXPERIENCES[stateId];
  }

  // Graceful fallback for any other state/UT using the canonical 5-pillar structure
  const state = fallbackStateObj || { id: stateId, name: stateId };
  return {
    id: state.id,
    name: (state.name || stateId).toUpperCase(),
    devanagari: state.devanagari || state.name,
    subtitle: state.tagline || 'Heritage & Cultural Traditions',
    tagline: state.tagline || 'Living Traditions & Ancient Sanctuaries',
    poeticIntro: `Where historical legacy meets the living spirit of ${state.name} through sacred architecture, folk melodies, and timeless literature.`,
    colorAtmosphere: {
      primary: '#D4A72C',
      accent: '#8A2E22',
      glow: '#FFD27D',
      badgeBg: 'rgba(56, 30, 16, 0.88)',
    },
    landscape: {
      hero: '/assets/haryana_countryside.jpg', // fallback atmospheric background
      gateway: '/assets/haryana_heritage_pavilion.jpg',
      caption: `Atmospheric scenery and living heritage of ${state.name}`,
    },
    culturalMotifs: [
      {
        id: 'monuments',
        title: 'Sacred Sanctums',
        subtitle: 'Architectural Marvels',
        desc: state.monuments || 'Ancient temples, stone fortresses, and sanctified shrines.',
        glyph: '🏛',
      },
      {
        id: 'folkArts',
        title: 'Folk Performing Arts',
        subtitle: 'Music, Dance & Crafts',
        desc: state.folkArts || 'Traditional rhythms, classical dances, and artisanal handcrafts.',
        glyph: '♫',
      },
      {
        id: 'literature',
        title: 'Ancient Literature',
        subtitle: 'Epics & Manuscripts',
        desc: state.scriptures || 'Classic poetry, royal chronicles, and regional folklore.',
        glyph: '📜',
      },
      {
        id: 'community',
        title: 'Living Traditions',
        subtitle: 'Community Lore',
        desc: 'Centuries of festive gatherings, oral memory, and culinary heritage.',
        glyph: '❖',
      }
    ],
    heritage: {
      overview: state.desc || `The historic culture of ${state.name} is celebrated across centuries of spiritual architecture, living folk arts, and timeless literary works.`,
      temples: [
        {
          name: state.monuments ? state.monuments.split(',')[0] : `${state.name} Heritage Sanctum`,
          location: state.name,
          period: 'Historic Era',
          desc: `Historic architectural monument celebrated across ${state.name}.`,
          significance: 'Sacred heritage landmark.'
        }
      ],
      folkArts: [
        {
          name: state.folkArts ? state.folkArts.split(',')[0] : `${state.name} Traditional Arts`,
          type: 'Living Heritage',
          desc: `Traditional folk arts, melodies, and dances preserving the community memories of ${state.name}.`,
          highlight: 'Living cultural tradition'
        }
      ],
      literature: [
        {
          title: `Classical Poetry of ${state.name}`,
          author: 'Ancient & Medieval Bards',
          period: 'Classical Era',
          desc: state.scriptures || `Oral verses, regional idioms, and poetic anthologies composed across ${state.name}.`,
          excerpt: `Timeless poetic heritage honoring the spirit of ${state.name}.`
        }
      ],
      scriptures: [
        {
          title: `Sacred Lore of ${state.name}`,
          place: state.name,
          context: 'Spiritual Legacy',
          desc: `Sacred texts and pilgrim chronicles commemorating the sacred geography of ${state.name}.`,
          verse: '“सत्यमेव जयते नानृतम्”'
        }
      ],
      keyPersons: [
        {
          name: `Legendary Figures of ${state.name}`,
          title: 'Pioneers of Culture',
          role: 'Historical Guardians',
          desc: `The visionaries, saints, and scholars who shaped the cultural identity of ${state.name}.`
        }
      ]
    }
  };
}

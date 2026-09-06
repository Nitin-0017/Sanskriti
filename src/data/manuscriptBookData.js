// ============================================================================
// SANSKRITI · CHAPTER 02: SCRIPTURES · SACRED MANUSCRIPT ARCHIVE DATA
// Multi-manuscript collection: Bhagavad Gita, Ramayana, Mahabharata, Vedas, Upanishads, Puranas
// ============================================================================

export const SACRED_MANUSCRIPTS_COLLECTION = [
  {
    id: 'bhagavad-gita',
    title: 'BHAGAVAD GITA',
    sanskritTitle: 'श्रीमद्भगवद्गीता',
    subtitle: 'The Song of the Divine Lord at Kurukshetra',
    shelfSubtitle: 'योग · कर्म · ज्ञान',
    shelfDate: 'c. 2nd BCE',
    description: 'Spoken by Sri Krishna to Arjuna amidst the opposing armies on the sacred plain of Haryana, the Bhagavad Gita synthesizes duty, devotion, and cosmic wisdom into an eternal counsel for human life.',
    accessionCode: 'MSS-KUR-001',
    period: 'c. 400–200 BCE',
    region: 'Kurukshetra, Haryana',
    script: 'Early Devanagari (Sharada influence)',
    substrate: 'Himalayan Birch Bark & Desi Paper',
    coverStyle: {
      bgGradient: 'linear-gradient(135deg, #2b110a 0%, #441c10 35%, #1f0b06 70%, #30140c 100%)',
      borderColor: '#c5a059',
      spineRibs: '#ffd27d',
      cordColor: 'linear-gradient(to bottom, #9e2318 0%, #63120b 50%, #380804 100%)',
      sealColor: 'radial-gradient(circle at 35% 35%, #9e1d14 0%, #68100a 60%, #380704 100%)',
      sealEmblem: 'ॐ',
      sealLabel: 'SEAL OF SRUTI',
      accentColor: '#ffd27d'
    },
    shelfBadge: 'MSS · ०१',
    folios: [
      {
        id: 'bg-01',
        folioNumber: 'FOLIO ०१ / ०५',
        title: 'MANUSCRIPT INTRODUCTION',
        sanskritTitle: 'प्रशस्ति एवं ग्रन्धारम्भ',
        artworkType: 'yantra',
        leftContent: {
          title: 'SACRED SRI YANTRA & CONSECRATION',
          sanskrit: 'ॐ नमो भगवते वासुदेवाय',
          caption: 'Consecration frontispiece inscribed with natural cinnabar and lampblack soot.',
          illuminationNote: 'Natural vermilion and gold leaf border. Kurukshetra monastic school.',
          provenanceNote: 'Preserved in the subterranean vaults of Thanesar along the sacred Saraswati.'
        },
        rightContent: {
          heading: 'THE SACRED GRANTHA',
          subheading: 'KURUKSHETRA MONASTIC REPOSITORY',
          paragraphs: [
            'Preserved within the underground monastic takhts of Kurukshetra, this birch-bark and rag-paper grantha represents centuries of philosophical inquiry along the ancient Saraswati basin.',
            'Unlike court chronicles, sacred pothis were treated as physical sanctums of divine wisdom. Generations of scribes meticulously renewed each decaying leaf with cedarwood oil before insects or humidity could claim the word.'
          ],
          verseSanskrit: 'ॐ पार्थाय प्रतिबोधितां भगवता नारायणेन स्वयं\nव्यासेन ग्रथितां पुराणमुनिना मध्येमहाभारतम्॥',
          transliteration: 'om pārthāya pratibodhitāṁ bhagavatā nārāyaṇena svayaṁ\nvyāsena grathitāṁ purāṇa-muninā madhye-mahābhāratam ||',
          translation: '“Om, which was taught to Arjuna by the Supreme Lord Narayana Himself, and recorded by the ancient sage Vyasa within the Mahabharata.”',
          archivalNote: 'This opening folium serves as the traditional Mangalacharana—an auspicious invocation consecrating the transcription before scholarly study.',
          scribeAnnotation: 'Inscribed in classical Anushtubh meter using chiseled reed kalam and carbonized lampblack ink.',
          contextExplanation: 'The verse establishes the divine lineage of the dialogue: spoken by the Divine, received by the seeker Arjuna, and preserved by Sage Vyasa.',
          archivalNotes: {
            period: 'c. 400–200 BCE',
            region: 'Kurukshetra',
            script: 'Sanskrit (Devanagari)',
            material: 'Birch Bark / Desi Paper'
          },
          interactiveWords: ['पार्थाय', 'नारायणेन', 'महाभारतम्']
        }
      },
      {
        id: 'bg-02',
        folioNumber: 'FOLIO ०२ / ०५',
        title: 'THE FIELD OF DHARMA',
        sanskritTitle: 'धर्मक्षेत्रे कुरुक्षेत्रे',
        artworkType: 'kurukshetra-map',
        imagePath: '/assets/portrait_ved_vyasa.jpg',
        leftContent: {
          title: 'THE SACRED PLAIN OF KURUKSHETRA',
          sanskrit: 'कुरुक्षेत्रे सरस्वती तीर्थे',
          caption: 'Sage Vyasa reciting the battle chronicle beside the holy Saraswati river.',
          illuminationNote: 'Mineral lapis lazuli and earth ochre pigment. Northern redaction.',
          provenanceNote: 'Historical 48-Kos pilgrimage circuit of Kurukshetra plain, Haryana.'
        },
        rightContent: {
          heading: 'BHAGAVAD GITA',
          subheading: 'CHAPTER 1 · VERSE 1',
          paragraphs: [
            'The dialogue opens with King Dhritarashtra questioning Sanjaya about the assembly of opposing forces on the sacred soil of Haryana.',
            'Kurukshetra is not designated merely as a martial battlefield (Yuddha-kshetra), but as Dharmakshetra—the cosmic field where moral order is tested and vindicated.'
          ],
          verseSanskrit: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥',
          transliteration: 'dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya ||',
          translation: '“O Sanjaya, assembled on the sacred field of Kurukshetra, eager for battle, what did my sons and the sons of Pandu do?”',
          archivalNote: 'The very first word of the text is Dharma, establishing that the entire epic is an inquiry into ethical conduct under existential crisis.',
          scribeAnnotation: 'Rubricated red punctuation marks denote the caesura of the eight-syllable hemistich.',
          contextExplanation: 'King Dhritarashtra inquires about the gathering of the armies, revealing his anxiety and internal bias toward his own sons.',
          archivalNotes: {
            period: 'c. 400–200 BCE',
            region: 'Kurukshetra',
            script: 'Sanskrit (Devanagari)',
            material: 'Birch Bark / Cedar Oil'
          },
          interactiveWords: ['धर्मक्षेत्रे', 'कुरुक्षेत्रे', 'समवेताः']
        }
      },
      {
        id: 'bg-03',
        folioNumber: 'FOLIO ०३ / ०५',
        title: 'THE SUPREME MAXIM OF ACTION',
        sanskritTitle: 'निष्काम कर्मयोग सूत्र',
        artworkType: 'chariot-miniature',
        imagePath: '/assets/literature_epic_scene.jpg',
        leftContent: {
          title: 'ŚRĪ KṚṢṆA UPADESHA TO ARJUNA',
          sanskrit: 'पार्थसारथि संवाद',
          caption: 'Illumination: Bhagavan Sri Krishna counselling Arjuna amidst opposing armies under the Jyotisar Banyan tree.',
          illuminationNote: 'Natural mineral pigments: lapis lazuli, cinnabar, and gold leaf. Kurukshetra school.',
          provenanceNote: 'Jyotisar, Kurukshetra plain, Haryana. Redacted by monastic copyists.'
        },
        rightContent: {
          heading: 'BHAGAVAD GITA',
          subheading: 'CHAPTER 2 · VERSE 47',
          paragraphs: [
            'Spoken directly on Haryana’s battlefield soil, this shloka defines the eternal core of Nishkama Karma—selfless duty performed without anxious craving for personal reward.',
            'Anxiety stems not from action itself, but from obsessive projection into an uncertain future. Liberation lies in total focus on righteous duty in the living present.'
          ],
          verseSanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
          transliteration: 'karmaṇye vādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi ||',
          translation: '“You have the right to action alone, never to the fruits of action. Let not the fruit of action be your motive, nor let your attachment be to inaction.”',
          archivalNote: 'This passage belongs to a larger philosophical dialogue concerning duty, action and detachment. Spoken on the battlefield of Kurukshetra, it defines the timeless doctrine of Nishkama Karma.',
          scribeAnnotation: 'Inscribed in classical Anushtubh meter (8 syllables per quarter) using chiseled reed kalam and carbonized lampblack soot.',
          contextExplanation: 'You have authority over your conscious action, but never unilateral ownership over outcomes. Acting without selfish clinging to results frees the mind from existential anxiety.',
          archivalNotes: {
            period: 'c. 400–200 BCE',
            region: 'Kurukshetra',
            script: 'Sanskrit (Devanagari)',
            material: 'Palm Leaf / Birch Bark'
          },
          interactiveWords: ['कर्मणि', 'मा', 'फलेषु', 'अकर्मणि']
        }
      },
      {
        id: 'bg-04',
        folioNumber: 'FOLIO ०४ / ०५',
        title: 'THE COSMIC REVELATION',
        sanskritTitle: 'विश्वरूप दर्शन योग',
        artworkType: 'cosmic-vision',
        imagePath: '/assets/scriptures_open_manuscript.jpg',
        leftContent: {
          title: 'THE VISVARUPA EPIPHANY',
          sanskrit: 'दिव्यं ददामि ते चक्षुः',
          caption: 'The grant of divine sight: the cosmos dissolving and regenerating in the infinite body of the Divine.'
        },
        rightContent: {
          heading: 'BHAGAVAD GITA',
          subheading: 'CHAPTER 11 · VERSE 32',
          paragraphs: [
            'Beyond the ethical counseling of daily life, the text ascends into metaphysical reality. Arjuna is granted the divine eye (divya-chakshu) to perceive time, space, and cosmic cycles as one unified current.',
            'The Lord declares His identity as inexorable Time (Kala), which dissolves all mortal structures while urging man to become an instrument of universal harmony.'
          ],
          verseSanskrit: 'कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्ततः।\nऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः॥',
          transliteration: 'kālo ’smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ |\nṛte ’pi tvāṁ na bhaviṣyanti sarve ye ’vasthitāḥ pratyanīkeṣu yodhāḥ ||',
          translation: '“I am Time, the destroyer of worlds, grown mature to gather in the realms. Even without you, none of the warriors stationed in opposite ranks shall live.”',
          archivalNotes: {
            period: 'c. 400–200 BCE',
            region: 'Kurukshetra',
            script: 'Sanskrit (Devanagari)',
            material: 'Gold leaf & Birch bark'
          },
          interactiveWords: ['कालः', 'लोकक्षयकृत्', 'योधाः']
        }
      },
      {
        id: 'bg-05',
        folioNumber: 'FOLIO ०५ / ०५',
        title: 'COLOPHON & ARCHIVE SUMMARY',
        sanskritTitle: 'पुष्पिका एवं संरक्षण संक्षेप',
        artworkType: 'colophon',
        imagePath: '/assets/portrait_sant_garibdas.jpg',
        leftContent: {
          title: 'COLOPHON & SCRIBE BENEDICTION',
          sanskrit: 'इति श्रीमद्भगवद्गीतासूपनिषत्सु',
          caption: 'Traditional colophon marking the completion of the grantha with ancient scribe preservation prayers.'
        },
        rightContent: {
          heading: 'THE LIVING RECORD',
          subheading: 'DIGITAL ARCHIVAL PRESERVATION',
          paragraphs: [
            'Centuries after palm leaves crumbled, dedicated monastic scribes in Thanesar and Pehowa recodified these lines character by character.',
            'Digitized at 600 DPI multispectral resolution, this grantha now preserves the living voice of Kurukshetra for generations yet unborn.'
          ],
          verseSanskrit: 'यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥',
          transliteration: 'yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ |\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama ||',
          translation: '“Wherever is Krishna, the Lord of Yoga, and wherever is Arjuna, the wielder of the bow, there will surely be fortune, victory, prosperity, and righteous counsel.”',
          archivalNotes: {
            period: 'c. 1540 CE (Redaction)',
            region: 'Thanesar Archives',
            script: 'Sanskrit (Devanagari)',
            material: 'Desi Rag Paper / Lampblack'
          },
          interactiveWords: ['योगेश्वरः', 'पार्थः', 'विजयः', 'नीतिः']
        }
      }
    ]
  },
  {
    id: 'ramayana',
    title: 'RAMAYANA',
    sanskritTitle: 'श्रीमद्वाल्मीकिरामायणम्',
    subtitle: 'The Adi Kavya: The Epic of Dharma & Righteous Life',
    shelfSubtitle: 'धर्म · मर्यादा · आदर्श',
    shelfDate: 'c. 1st BCE',
    accessionCode: 'MSS-AYO-002',
    period: 'c. 500 BCE',
    region: 'Ayodhya & Northern Recensions',
    script: 'Archaic Devanagari & Mithilakshar',
    substrate: 'Treated Palm Leaf (Tala-patra) with Vermilion',
    coverStyle: {
      bgGradient: 'linear-gradient(135deg, #152216 0%, #1e2f1f 35%, #101a11 70%, #19271a 100%)',
      borderColor: '#c4a45a',
      spineRibs: '#d5b770',
      cordColor: 'linear-gradient(to bottom, #2b4528 0%, #192e17 50%, #0d1a0c 100%)',
      sealColor: 'radial-gradient(circle at 35% 35%, #2a4727 0%, #1b3019 60%, #0d1c0c 100%)',
      sealEmblem: '🏹',
      sealLabel: 'SEAL OF DHARMA',
      accentColor: '#d5b770'
    },
    shelfBadge: 'MSS · ०२',
    folios: [
      {
        id: 'ram-01',
        folioNumber: 'FOLIO ०१ / ०४',
        title: 'THE BIRTH OF POETRY',
        sanskritTitle: 'आदिकाव्यस्य प्रादुर्भावः',
        artworkType: 'ashram-miniature',
        imagePath: '/assets/literature_manuscript_hero.jpg',
        leftContent: {
          title: 'VALMIKI ASHRAM BESIDE TAMASA',
          sanskrit: 'मा निषाद प्रतिष्ठां त्वमगमः',
          caption: 'Sage Valmiki moved by grief (Shoka) at the separation of the Krauncha birds, birthing the classical Sloka meter.'
        },
        rightContent: {
          heading: 'THE FIRST VERSE (ADI SLOKA)',
          subheading: 'BALA KANDA · CHAPTER 2',
          paragraphs: [
            'Indian literary tradition records the Ramayana as the Adi Kavya—the inaugural poetic work of human civilization. When Sage Valmiki witnessed a hunter fell an innocent crane, his spontaneous compassion crystallized into the first metrical verse.',
            'Brahma Himself descended to consecrate the discovery, commanding Valmiki to compose the life of Rama as a perpetual beacon of dharma.'
          ],
          verseSanskrit: 'मा निषाद प्रतिष्ठां त्वमगमः शाश्वतीः समाः।\nयत्क्रौञ्चमिथुनादेकमवधीः काममोहितम्॥',
          transliteration: 'mā niṣāda pratiṣṭhāṁ tvam agamaḥ śāśvatīḥ samāḥ |\nyat krauñca-mithunād ekam avadhīḥ kāma-mohitam ||',
          translation: '“May you find no peace for everlasting years, O hunter, for you have slain one of this pair of cranes while it was immersed in love.”',
          archivalNotes: {
            period: 'c. 500 BCE',
            region: 'Saraswati / Gangetic Plains',
            script: 'Early Devanagari',
            material: 'Tala-patra (Palm Leaf)'
          },
          interactiveWords: ['मा निषाद', 'प्रतिष्ठाम्', 'क्रौञ्चमिथुनात्']
        }
      },
      {
        id: 'ram-02',
        folioNumber: 'FOLIO ०२ / ०४',
        title: 'THE RESOLVE OF RAMA',
        sanskritTitle: 'पितृवाक्य परिपालनम्',
        artworkType: 'ayodhya-exile',
        imagePath: '/assets/portrait_bansidhar.jpg',
        leftContent: {
          title: 'THE EXILE TO DANDAKARANYA',
          sanskrit: 'सत्यमेवेश्वरो लोके',
          caption: 'Sri Rama voluntarily renouncing the golden throne of Ayodhya to uphold truth (Satya) and his father’s honor.'
        },
        rightContent: {
          heading: 'THE SUPREMACY OF TRUTH',
          subheading: 'AYODHYA KANDA · CHAPTER 109',
          paragraphs: [
            'Rama’s greatness does not lie in miraculous weapons, but in His steadfast adherence to Maryada—the noble boundaries of filial duty, truthfulness, and selfless sacrifice.',
            'When urged by counselors to seize the throne by force, Rama proclaims that the universe itself is grounded upon truth, and an empire built upon deceit is dust.'
          ],
          verseSanskrit: 'सत्यमेवेश्वरो लोके सत्ये धर्मः सदा श्रितः।\nसत्यमूलानि सर्वाणि सत्यान्नास्ति परं पदम्॥',
          transliteration: 'satyam eveśvaro loke satye dharmaḥ sadā śritaḥ |\nsatya-mūlāni sarvāṇi satyān nāsti paraṁ padam ||',
          translation: '“Truth alone is the sovereign of the world; in truth dharma is eternally established. All things have their roots in truth; there is no status higher than truth.”',
          archivalNotes: {
            period: 'c. 500 BCE',
            region: 'Northern Archive',
            script: 'Sanskrit (Devanagari)',
            material: 'Palm Leaf & Vermilion Ink'
          },
          interactiveWords: ['सत्यम्', 'धर्मः', 'सत्यमूलानि']
        }
      },
      {
        id: 'ram-03',
        folioNumber: 'FOLIO ०३ / ०४',
        title: 'THE OCEAN BRIDGE',
        sanskritTitle: 'सेतुबन्धन एवं पराक्रम',
        artworkType: 'ram-setu',
        imagePath: '/assets/literature_epic_scene.jpg',
        leftContent: {
          title: 'SETU BANDHANA AT RAMESHWARAM',
          sanskrit: 'नलं सेतुमकल्पयत्',
          caption: 'The oceanic bridge built stone by stone by the Vanara army inscribed with the holy name of Rama.'
        },
        rightContent: {
          heading: 'THE GREAT EXPEDITION',
          subheading: 'YUDDHA KANDA · CHAPTER 22',
          paragraphs: [
            'Facing the boundless southern sea, Rama’s army achieves the impossible through collective devotion and masterly architecture orchestrated by the divine craftsman Nala.',
            'The bridge stands as a perpetual metaphor: no chasm of despair is too vast when bridged by righteous purpose, humility, and disciplined effort.'
          ],
          verseSanskrit: 'नलेन कृतः सेतुः सागरे मकरालये।\nशुशुभे सुमहावीर्यो मेघमार्ग इवाम्बरे॥',
          transliteration: 'nalena kṛtaḥ setuḥ sāgare makarālaye |\nśuśubhe sumahā-vīryo megha-mārga ivāmbare ||',
          translation: '“The bridge built by Nala across the crocodile-abounding ocean shone with immense splendor, like a glorious path of clouds across the celestial sky.”',
          archivalNotes: {
            period: 'c. 500 BCE',
            region: 'Rameshwaram Recension',
            script: 'Grantha & Devanagari',
            material: 'Palm Leaf with Cinnabar'
          },
          interactiveWords: ['सेतुः', 'सागरे', 'सुमहावीर्यः']
        }
      },
      {
        id: 'ram-04',
        folioNumber: 'FOLIO ०४ / ०४',
        title: 'THE VISION OF RAMRAJYA',
        sanskritTitle: 'रामराज्यम् एवं लोकमङ्गलम्',
        artworkType: 'coronation',
        imagePath: '/assets/portrait_lakhmi_chand.jpg',
        leftContent: {
          title: 'THE CORONATION AT AYODHYA',
          sanskrit: 'सर्वे भवन्तु सुखिनः',
          caption: 'The restoration of cosmic balance: an ideal realm where justice, nature, and human dignity flourish in harmony.'
        },
        rightContent: {
          heading: 'RAMRAJYA: THE IDEAL POLITY',
          subheading: 'YUDDHA KANDA · CHAPTER 128',
          paragraphs: [
            'The epic concludes with the celebration of Ramrajya—a timeless social vision where no child perished prematurely, no person suffered from famine or disease, and mutual love governed civic life.',
            'Centuries later, Mahatma Gandhi took Ramrajya as the ethical north star for India’s moral renaissance.'
          ],
          verseSanskrit: 'न पर्यदेवन्विधवा न च व्यालकृतं भयम्।\nन व्याधिजं भयं वाऽपि रामे राज्यं प्रशासति॥',
          transliteration: 'na paryadevan vidhavā na ca vyāla-kṛtaṁ bhayam |\nna vyādhijaṁ bhayaṁ vā ’pi rāme rājyaṁ praśāsati ||',
          translation: '“No widow lamented in grief, nor was there any fear from wild beasts or serpents; no fear arose from disease while Rama ruled the kingdom.”',
          archivalNotes: {
            period: 'c. 450 BCE',
            region: 'Ayodhya Repository',
            script: 'Sanskrit (Devanagari)',
            material: 'Treated Tala-patra'
          },
          interactiveWords: ['रामे', 'राज्यम्', 'प्रशासति']
        }
      }
    ]
  },
  {
    id: 'mahabharata',
    title: 'MAHABHARATA',
    sanskritTitle: 'श्रीमन्महाभारतम्',
    subtitle: 'Jaya: The Hundred-Thousand Verse Epic of Civilization',
    shelfSubtitle: 'धर्म · संघर्ष · नीति',
    shelfDate: 'c. 3rd BCE',
    accessionCode: 'MSS-HAS-003',
    period: 'c. 800–400 BCE',
    region: 'Kurukshetra, Hastinapura & Indraprastha',
    script: 'Early Devanagari & Sharada',
    substrate: 'Old Desi Sanganeri Paper & Birch Bark',
    coverStyle: {
      bgGradient: 'linear-gradient(135deg, #131110 0%, #201b19 35%, #0e0c0b 70%, #181413 100%)',
      borderColor: '#bda066',
      spineRibs: '#d5ba7b',
      cordColor: 'linear-gradient(to bottom, #382d20 0%, #211911 50%, #100c07 100%)',
      sealColor: 'radial-gradient(circle at 35% 35%, #3d2f1f 0%, #211911 60%, #0d0a07 100%)',
      sealEmblem: '☸',
      sealLabel: 'SEAL OF JAYA',
      accentColor: '#d5ba7b'
    },
    shelfBadge: 'MSS · ०३',
    folios: [
      {
        id: 'mb-01',
        folioNumber: 'FOLIO ०१ / ०४',
        title: 'THE DICTATION TO GANESHA',
        sanskritTitle: 'व्यास-गणेश संवाद',
        artworkType: 'vyasa-ganesha',
        imagePath: '/assets/portrait_ved_vyasa.jpg',
        leftContent: {
          title: 'SAGE VYASA & LORD GANAPATI',
          sanskrit: 'लेखको भारतस्यास्य भव',
          caption: 'Vyasa composing the monumental epic under condition that Ganesha write without pause, while Ganesha demanded full comprehension of each word.'
        },
        rightContent: {
          heading: 'JAYA: THE COSMIC RECORD',
          subheading: 'ADI PARVA · CHAPTER 1',
          paragraphs: [
            'Containing one hundred thousand shlokas, the Mahabharata is the longest poem ever composed in human history—four times larger than the Iliad and Odyssey combined.',
            'Vyasa boldly declares: “What is found here may be found elsewhere; but what is not found here is found nowhere else.” It encompasses statecraft, philosophy, love, betrayal, and transcendence.'
          ],
          verseSanskrit: 'धर्मे चार्थे च कामे च मोक्षे च भरतर्षभ।\nयदिहास्ति तदन्यत्र यन्नेहास्ति न तत्क्वचित्॥',
          transliteration: 'dharme ca arthe ca kāme ca mokṣe ca bharatarṣabha |\nyad ihāsti tad anyatra yan nehāsti na tat kvacit ||',
          translation: '“In the realms of Dharma, wealth, desire, and spiritual liberation, O leader of Bharatas: whatever is found here exists elsewhere, but what is not found here exists nowhere on earth.”',
          archivalNotes: {
            period: 'c. 800–400 BCE',
            region: 'Kurukshetra / Naimisharanya',
            script: 'Sanskrit (Devanagari)',
            material: 'Birch Bark / Sanganeri Paper'
          },
          interactiveWords: ['धर्मे', 'अर्थे', 'कामे', 'मोक्षे']
        }
      },
      {
        id: 'mb-02',
        folioNumber: 'FOLIO ०२ / ०४',
        title: 'THE ASSEMBLY OF HASTINAPURA',
        sanskritTitle: 'द्यूतसभा एवं धर्मसङ्कट',
        artworkType: 'court-scene',
        imagePath: '/assets/literature_epic_scene.jpg',
        leftContent: {
          title: 'THE GAMBLING HALL OF DHRITARASHTRA',
          sanskrit: 'न सा सभा यत्र न सन्ति वृद्धाः',
          caption: 'The tragic failure of elder statesmen in Hastinapura to halt the humiliation of Draupadi, sealing the destiny of the Kuru clan.'
        },
        rightContent: {
          heading: 'THE COLLAPSE OF MORAL ORDER',
          subheading: 'SABHA PARVA · CHAPTER 67',
          paragraphs: [
            'The core ethical dilemma of the Mahabharata centers around the silence of the virtuous. When elders like Bhishma and Drona remain passive before injustice, the cosmic order itself fractures.',
            'Draupadi’s piercing questions in the royal court remain the eternal conscience of the epic, demanding whether righteousness is merely a tool of the powerful.'
          ],
          verseSanskrit: 'न सा सभा यत्र न सन्ति वृद्धा न ते वृद्धा ये न वदन्ति धर्मम्।\nनासौ धर्मो यत्र न सत्यमस्ति न तत्सत्यं यच्छलेनानुविद्धम्॥',
          transliteration: 'na sā sabhā yatra na santi vṛddhā na te vṛddhā ye na vadanti dharmam |\nnāsau dharmo yatra na satyam asti na tat satyaṁ yac chalēnānuviddham ||',
          translation: '“That is no council where elders are absent; those are no elders who do not speak the truth; that is no righteousness which is devoid of truth; and that is no truth which is tainted with deceit.”',
          archivalNotes: {
            period: 'c. 600 BCE',
            region: 'Hastinapura Recension',
            script: 'Sanskrit (Devanagari)',
            material: 'Aged Desi Paper'
          },
          interactiveWords: ['सभा', 'वृद्धाः', 'धर्मः', 'सत्यम्']
        }
      },
      {
        id: 'mb-03',
        folioNumber: 'FOLIO ०३ / ०४',
        title: 'BHISHMA ON RIGHTEOUS RULE',
        sanskritTitle: 'भीष्म शरशय्या एवं राजधर्म',
        artworkType: 'bhishma-bed',
        imagePath: '/assets/portrait_mange_ram.jpg',
        leftContent: {
          title: 'BHISHMA UPON THE BED OF ARROWS',
          sanskrit: 'राजधर्मानुशासनम्',
          caption: 'The grand patriarch Bhishma imparting sovereign governance and statecraft to Yudhishthira on the Kurukshetra field.'
        },
        rightContent: {
          heading: 'THE RAJADHARMA PARVA',
          subheading: 'SHANTI PARVA · CHAPTER 56',
          paragraphs: [
            'Lying on a bed of arrows awaiting the auspicious northward journey of the sun (Uttarayana), Bhishma delivers the intellectual crowning glory of the Mahabharata.',
            'He instructs that the King exists for the welfare of the people, not the people for the pleasure of the King. The sovereign’s highest dharma is the protection of the defenseless.'
          ],
          verseSanskrit: 'प्रजासुखे सुखं राज्ञः प्रजानां च हिते हितम्।\nनात्मप्रियं हितं राज्ञः प्रजानां तु प्रियं हितम्॥',
          transliteration: 'prajā-sukhe sukhaṁ rājñaḥ prajānāṁ ca hite hitam |\nnātma-priyaṁ hitaṁ rājñaḥ prajānāṁ tu priyaṁ hitam ||',
          translation: '“In the happiness of the subjects lies the ruler’s happiness; in their welfare, his welfare. Whatever pleases himself the king shall not consider as good, but whatever pleases his subjects he shall consider as good.”',
          archivalNotes: {
            period: 'c. 400 BCE',
            region: 'Kurukshetra Plain',
            script: 'Sanskrit (Devanagari)',
            material: 'Birch Bark with Soot Ink'
          },
          interactiveWords: ['प्रजासुखे', 'हितम्', 'राज्ञः']
        }
      },
      {
        id: 'mb-04',
        folioNumber: 'FOLIO ०४ / ०४',
        title: 'THE FINAL COUNSEL',
        sanskritTitle: 'भारत सावित्री सूत्र',
        artworkType: 'bharata-savitri',
        imagePath: '/assets/portrait_sant_garibdas.jpg',
        leftContent: {
          title: 'THE CLIMAX: BHARATA SAVITRI',
          sanskrit: 'ऊर्ध्वबाहुर्विरौम्येष न च कश्चिच्छृणोति मे',
          caption: 'Sage Vyasa raising his arms to heaven, crying out the eternal lament that humanity forgets dharma despite seeing all destruction.'
        },
        rightContent: {
          heading: 'THE FINAL TESTAMENT',
          subheading: 'SVARGAROHANA PARVA · CHAPTER 5',
          paragraphs: [
            'As the epic concludes, Vyasa offers His ultimate warning to humanity: neither pleasure nor fear nor ambition should ever compel a person to forsake righteousness.',
            'Dharma is eternal; the pleasures and sorrows of mortal life are fleeting like shadows.'
          ],
          verseSanskrit: 'न जातु कामान्न भयान्न लोभाद्धर्मं त्यजेज्जीवितस्यापि हेतोः।\nनित्यो धर्मः सुखदुःखे त्वनित्ये जीवो नित्यो हेतुरस्य त्वनित्यः॥',
          transliteration: 'na jātu kāmān na bhayān na lobhād dharmaṁ tyajej jīvitasyāpi hetoḥ |\nnityo dharmaḥ sukha-duḥkhe tv anitye jīvo nityo hetur asya tv anityaḥ ||',
          translation: '“Never through desire, fear, or greed, nor even for the sake of life itself, should one abandon dharma. Dharma is eternal; joy and sorrow are temporary. The soul is immortal; only its mortal condition is fleeting.”',
          archivalNotes: {
            period: 'c. 400 BCE',
            region: 'Pan-Indian Recension',
            script: 'Sanskrit (Devanagari)',
            material: 'Rag Paper / Desi Gum'
          },
          interactiveWords: ['धर्मम्', 'नित्यः', 'सुखदुःखे']
        }
      }
    ]
  },
  {
    id: 'vedas',
    title: 'THE VEDAS',
    sanskritTitle: 'ऋग्वेद संहिता · चतुर्वेद',
    subtitle: 'The Primordial Shruti: Cosmic Hymns of the Risis',
    shelfSubtitle: 'श्रुति · सूक्तज्ञान',
    shelfDate: 'c. 1500 BCE',
    accessionCode: 'MSS-SAR-004',
    period: 'c. 1500–1200 BCE',
    region: 'Saraswati Valley & Saptasindhu Plain',
    script: 'Archaic Vedic Sanskrit (Accentuated Sharada & Devanagari)',
    substrate: 'Ancient Kashmir Birch Bark (Bhurjapatra)',
    coverStyle: {
      bgGradient: 'linear-gradient(135deg, #241608 0%, #38220d 35%, #1a0f05 70%, #2a190a 100%)',
      borderColor: '#c9a454',
      spineRibs: '#e0bc6d',
      cordColor: 'linear-gradient(to bottom, #8a5e17 0%, #54390a 50%, #2d1d03 100%)',
      sealColor: 'radial-gradient(circle at 35% 35%, #94681a 0%, #593e0b 60%, #2b1c03 100%)',
      sealEmblem: '🔥',
      sealLabel: 'SEAL OF SHRU-TI',
      accentColor: '#e0bc6d'
    },
    shelfBadge: 'MSS · ०४',
    folios: [
      {
        id: 'ved-01',
        folioNumber: 'FOLIO ०१ / ०४',
        title: 'THE FIRST WORD',
        sanskritTitle: 'ऋग्वेद प्रथम मण्डलारम्भ',
        artworkType: 'fire-altar',
        imagePath: '/assets/scriptures_hero_manuscript.jpg',
        leftContent: {
          title: 'THE SACRED AGNI CHAYANA',
          sanskrit: 'अग्निमीळे पुरोहितम्',
          caption: 'The consecrated Vedic fire altar (Vedi) where heaven and earth commune through sacred speech and offering.'
        },
        rightContent: {
          heading: 'RIGVEDA MANDALA 1 · HYMN 1',
          subheading: 'THE INAUGURAL HYMN OF SCRIPTURE',
          paragraphs: [
            'The Vedas are recognized as Shruti—that which was directly heard in higher meditative consciousness by the ancient Risis along the Saraswati river in ancient Haryana.',
            'Rigveda 1.1.1 begins with Agni, the divine inner light and cosmic messenger, honoring the supreme truth that bridges human aspiration with cosmic intelligence.'
          ],
          verseSanskrit: 'ॐ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्।\nहोतारं रत्नधातमम्॥',
          transliteration: 'om agnim īḷe purohitaṁ yajñasya devam ṛtvijam |\nhotāraṁ ratna-dhātamam ||',
          translation: '“Om, I adore Agni, the foremost guardian of the sacred ceremony, the divine minister of sacrifice, the invoker who bestows the greatest spiritual treasures.”',
          archivalNotes: {
            period: 'c. 1500–1200 BCE',
            region: 'Saraswati Valley',
            script: 'Vedic Sanskrit with Accents',
            material: 'Himalayan Birch Bark'
          },
          interactiveWords: ['अग्निम्', 'पुरोहितम्', 'यज्ञस्य', 'रत्नधातमम्']
        }
      },
      {
        id: 'ved-02',
        folioNumber: 'FOLIO ०२ / ०४',
        title: 'THE GAYATRI MANTRA',
        sanskritTitle: 'सावित्री मन्त्र एवं सूर्य तेज',
        artworkType: 'solar-mandala',
        imagePath: '/assets/open_manuscript_folio.jpg',
        leftContent: {
          title: 'THE SOLAR CONSECRATION',
          sanskrit: 'तत्सवितुर्वरेण्यम्',
          caption: 'Sage Vishwamitra receiving the solar Gayatri mantra, illuminating intellect and dispelling ignorance across worlds.'
        },
        rightContent: {
          heading: 'THE SAVITRI REVELATION',
          subheading: 'RIGVEDA MANDALA 3 · HYMN 62',
          paragraphs: [
            'The most chanted prayer in human memory, the Gayatri mantra invokes the luminous solar creator (Savitur) to guide human intellect toward enlightenment.',
            'Chanted through strict phonetic accents (Udatta, Anudatta, Svarita), this verse was preserved orally for over three thousand years without the alteration of a single syllable.'
          ],
          verseSanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि।\nधियो यो नः प्रचोदयात्॥',
          transliteration: 'om bhūr bhuvaḥ svaḥ tat savitur vareṇyaṁ bhargo devasya dhīmahi |\ndhiyo yo naḥ pracodayāt ||',
          translation: '“We meditate upon the supreme adorable radiance of the Divine Sun; may that solar light illuminate and inspire our collective intellect.”',
          archivalNotes: {
            period: 'c. 1400 BCE',
            region: 'Saraswati / Brahmavarta',
            script: 'Vedic Sanskrit',
            material: 'Bhurjapatra with Gold Pigment'
          },
          interactiveWords: ['सवितुः', 'वरेण्यम्', 'भर्गः', 'प्रचोदयात्']
        }
      },
      {
        id: 'ved-03',
        folioNumber: 'FOLIO ०३ / ०४',
        title: 'THE HYMN OF CREATION',
        sanskritTitle: 'नासदीय सूक्तम् · सृष्टि विज्ञान',
        artworkType: 'nasadiya-void',
        imagePath: '/assets/portrait_ved_vyasa.jpg',
        leftContent: {
          title: 'THE NASADIYA SUKTA',
          sanskrit: 'नासदासीन्नो सदासीत्तदानीम्',
          caption: 'The profound Vedic contemplation on the cosmic dawn before existence, non-existence, space, time, or mortality began.'
        },
        rightContent: {
          heading: 'THE MYSTERY OF ORIGIN',
          subheading: 'RIGVEDA MANDALA 10 · HYMN 129',
          paragraphs: [
            'Celebrated by modern physicists and philosophers alike, the Nasadiya Sukta inquires into what existed before creation began. It questions even whether the overseer of heaven knows how the cosmos arose.',
            'This willingness to question the origin of existence reveals the extraordinary scientific depth of Vedic thought.'
          ],
          verseSanskrit: 'नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत्।\nकिमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम्॥',
          transliteration: 'nāsad āsīn no sad āsīt tadānīṁ nāsīd rajo no vyomā paro yat |\nkim āvarīvaḥ kuha kasya śarmann ambhaḥ kim āsīd gahanaṁ gabhīram ||',
          translation: '“Then was not non-existence nor existence; there was no realm of air, no sky beyond it. What covered it, and where? And what gave shelter? Was water there, unfathomed and abysmal?”',
          archivalNotes: {
            period: 'c. 1200 BCE',
            region: 'Vedic Saraswati Basin',
            script: 'Vedic Sanskrit (Sharada)',
            material: 'Birch Bark'
          },
          interactiveWords: ['नासत्', 'सत्', 'व्योम']
        }
      },
      {
        id: 'ved-04',
        folioNumber: 'FOLIO ०४ / ०४',
        title: 'UNIVERSAL CONCORD',
        sanskritTitle: 'सङ्गच्छध्वं संवदध्वम् सूत्र',
        artworkType: 'concord-circle',
        imagePath: '/assets/portrait_folk_bards.jpg',
        leftContent: {
          title: 'THE CONCLUDING BENEDICTION',
          sanskrit: 'सङ्गच्छध्वं संवदध्वम्',
          caption: 'The final shloka of the Rigveda: a collective mandate for unified assembly, unified speech, and harmonious hearts.'
        },
        rightContent: {
          heading: 'THE MANDATE OF HARMONY',
          subheading: 'RIGVEDA MANDALA 10 · HYMN 191',
          paragraphs: [
            'The final prayer of the ten thousand hymns of the Rigveda leaves humanity with an eternal anthem of peace, unity, and shared social destiny.',
            'It commands that community decisions be made with harmonious counsel, common purpose, and compassionate hearts.'
          ],
          verseSanskrit: 'सङ्गच्छध्वं संवदध्वं सं वो मनांसि जानताम्।\nदेवा भागं यथा पूर्वे सञ्जानाना उपासते॥',
          transliteration: 'saṅgacchadhvaṁ saṁvadadhvaṁ saṁ vo manāṁsi jānatām |\ndevā bhāgaṁ yathā pūrve sañjānānā upāsate ||',
          translation: '“Assemble together; speak with one voice; let your minds be of one accord, just as the ancient deities unified their purpose to receive their sacred share.”',
          archivalNotes: {
            period: 'c. 1200 BCE',
            region: 'Pehowa Monastic Vault',
            script: 'Sanskrit (Devanagari)',
            material: 'Birch Bark'
          },
          interactiveWords: ['सङ्गच्छध्वम्', 'संवदध्वम्', 'मनांसि']
        }
      }
    ]
  },
  {
    id: 'upanishads',
    title: 'THE UPANISHADS',
    sanskritTitle: 'ईशावास्योपनिषद् एवं वेदान्त',
    subtitle: 'The Secret Whispers of the Self: The Summit of Vedanta',
    shelfSubtitle: 'आत्मन् · ब्रह्म · सत्य',
    shelfDate: 'c. 800 BCE',
    accessionCode: 'MSS-NAI-005',
    period: 'c. 800–500 BCE',
    region: 'Naimisharanya, Kashi & Kurukshetra',
    script: 'Classical Devanagari',
    substrate: 'Old Kashmir Palm Leaf & Desi Vellum',
    coverStyle: {
      bgGradient: 'linear-gradient(135deg, #0e1522 0%, #172235 35%, #090e18 70%, #121b2b 100%)',
      borderColor: '#c4a559',
      spineRibs: '#dcbf72',
      cordColor: 'linear-gradient(to bottom, #1d2b45 0%, #10192b 50%, #070c17 100%)',
      sealColor: 'radial-gradient(circle at 35% 35%, #233454 0%, #131e33 60%, #080d17 100%)',
      sealEmblem: '🌳',
      sealLabel: 'SEAL OF ATMAN',
      accentColor: '#dcbf72'
    },
    shelfBadge: 'MSS · ०५',
    folios: [
      {
        id: 'upa-01',
        folioNumber: 'FOLIO ०१ / ०३',
        title: 'THE DIVINE ENVELOPE',
        sanskritTitle: 'ईशावास्योपनिषद् मन्त्र १',
        artworkType: 'ishavasya-lotus',
        imagePath: '/assets/portrait_sant_garibdas.jpg',
        leftContent: {
          title: 'ISHA UPANISHAD FRONTISPIECE',
          sanskrit: 'ईशा वास्यमिदं सर्वम्',
          caption: 'The opening revelation of the Shukla Yajurveda: all moving things in the cosmos are enveloped by the divine reality.'
        },
        rightContent: {
          heading: 'ISHA UPANISHAD',
          subheading: 'VERSE 1 · THE ETERNAL MATRIX',
          paragraphs: [
            'Consisting of only 18 verses, the Isha Upanishad sits at the pinnacle of Indian metaphysics. Mahatma Gandhi famously asserted that if all Indian scriptures were burned and only this first verse survived, Hinduism would endure intact.',
            'It commands that life must be lived and enjoyed through renunciation (tyaga), without coveting what belongs to another.'
          ],
          verseSanskrit: 'ॐ ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥',
          transliteration: 'om īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam ||',
          translation: '“All this whatsoever that moves in this moving world is enveloped by the Divine. Therefore find enjoyment through renunciation; do not covet the wealth of anyone.”',
          archivalNotes: {
            period: 'c. 800 BCE',
            region: 'Yajurvedic Recension',
            script: 'Classical Sanskrit',
            material: 'Desi Palm Leaf & Vellum'
          },
          interactiveWords: ['ईशा', 'वास्यम्', 'भुञ्जीथाः', 'मा गृधः']
        }
      },
      {
        id: 'upa-02',
        folioNumber: 'FOLIO ०२ / ०३',
        title: 'THOU ART THAT',
        sanskritTitle: 'तत्त्वमसि महावाक्य',
        artworkType: 'tat-tvam-asi',
        imagePath: '/assets/literature_manuscript_hero.jpg',
        leftContent: {
          title: 'UDDALAKA & SVETAKETU',
          sanskrit: 'तत्त्वमसि श्वेतकेतो',
          caption: 'The father teaching the son beside the sacred banyan: just as salt dissolves invisibly in water, the Atman pervades all reality.'
        },
        rightContent: {
          heading: 'CHANDOGYA UPANISHAD',
          subheading: 'CHAPTER 6 · THE MAHAVAKYA',
          paragraphs: [
            'The famous dialogue between Sage Uddalaka and his son Shvetaketu establishes the foundational identity between individual consciousness (Atman) and universal reality (Brahman).',
            'Uddalaka breaks a tiny fig seed to show that the mighty tree arises from unperceived essence. “That subtle essence is the soul of all; That is the True; That is the Atman: Tat Tvam Asi, Shvetaketu!”'
          ],
          verseSanskrit: 'स य एषोऽणिमैतदात्म्यमिदं सर्वं तत्सत्यं स आत्मा तत्त्वमसि श्वेतकेतो॥',
          transliteration: 'sa ya eṣo ’ṇimaitad-ātmyam idaṁ sarvaṁ tat satyaṁ sa ātmā tat tvam asi śvetaketo ||',
          translation: '“That which is the finest subtle essence, in That all this universe has its self. That is the Truth; That is the Atman; That thou art, O Shvetaketu!”',
          archivalNotes: {
            period: 'c. 700 BCE',
            region: 'Chandogya Tradition',
            script: 'Sanskrit (Devanagari)',
            material: 'Birch Bark'
          },
          interactiveWords: ['अणिमा', 'सत्यम्', 'आत्मा', 'तत्त्वमसि']
        }
      },
      {
        id: 'upa-03',
        folioNumber: 'FOLIO ०३ / ०३',
        title: 'THE PATH OF IMMORTALITY',
        sanskritTitle: 'कठोपनिषद् · नचिकेता संवाद',
        artworkType: 'nachiketa',
        imagePath: '/assets/portrait_bansidhar.jpg',
        leftContent: {
          title: 'NACHIKETA BEFORE YAMA',
          sanskrit: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत',
          caption: 'The young boy Nachiketa rejecting all worldly gold, maidens, and kingdoms to demand the secret of what lies beyond death.'
        },
        rightContent: {
          heading: 'KATHA UPANISHAD',
          subheading: 'CHAPTER 1 · SECTION 3',
          paragraphs: [
            'Tested with every earthly pleasure by the Lord of Death, Nachiketa remains unyielding, declaring: “Ephemeral are these pleasures, O Death! Keep thy horses, dances, and songs for thyself.”',
            'Yama then reveals the razor-edge path of wisdom, inspiring Swami Vivekananda’s immortal call: “Arise, Awake, and stop not till the goal is reached!”'
          ],
          verseSanskrit: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत।\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति॥',
          transliteration: 'uttiṣṭhata jāgrata prāpya varān nibodhata |\nkṣurasya dhārā niśitā duratyayā durgaṁ pathas tat kavayo vadanti ||',
          translation: '“Arise! Awake! Approach the great teachers and learn the truth. Sharp as the razor’s edge, difficult to cross, and hard to tread: thus the wise describe that spiritual path.”',
          archivalNotes: {
            period: 'c. 600 BCE',
            region: 'Katha Recension',
            script: 'Sanskrit (Devanagari)',
            material: 'Vellum Palm Leaf'
          },
          interactiveWords: ['उत्तिष्ठत', 'जाग्रत', 'क्षुरस्य धारा']
        }
      }
    ]
  },
  {
    id: 'puranas',
    title: 'THE PURANAS',
    sanskritTitle: 'श्रीविष्णुपुराणम् एवं महापुराणाः',
    subtitle: 'Cosmic Chronologies & Sacred Heritage of the Saraswati',
    shelfSubtitle: 'सृष्टि · वंश · स्मृति',
    shelfDate: 'c. 500 CE',
    accessionCode: 'MSS-BAD-006',
    period: 'c. 300–800 CE',
    region: 'Kurukshetra, Pehowa & Badrikashrama',
    script: 'Medieval Devanagari',
    substrate: 'Old Desi Sanganeri Paper with Ochre Rubrication',
    coverStyle: {
      bgGradient: 'linear-gradient(135deg, #260f16 0%, #3a1522 35%, #1c0a10 70%, #2b1019 100%)',
      borderColor: '#c79a52',
      spineRibs: '#dfb770',
      cordColor: 'linear-gradient(to bottom, #521827 0%, #300d16 50%, #17050a 100%)',
      sealColor: 'radial-gradient(circle at 35% 35%, #591d2c 0%, #330f18 60%, #17060b 100%)',
      sealEmblem: '🪷',
      sealLabel: 'SEAL OF PURANA',
      accentColor: '#dfb770'
    },
    shelfBadge: 'MSS · ०६',
    folios: [
      {
        id: 'pur-01',
        folioNumber: 'FOLIO ०१ / ०३',
        title: 'THE COSMIC CHURNING',
        sanskritTitle: 'समुद्रमन्थन एवं अमृत प्रादुर्भाव',
        artworkType: 'samudra-manthan',
        imagePath: '/assets/portrait_ved_vyasa.jpg',
        leftContent: {
          title: 'SAMUDRA MANTHAN ILLUMINATION',
          sanskrit: 'क्षीरोदमथनादमृतम्',
          caption: 'Devas and Asuras churning the cosmic milk ocean using Mount Mandara and Vasuki to yield the nectar of immortality.'
        },
        rightContent: {
          heading: 'VISHNU PURANA',
          subheading: 'AMSA 1 · CHAPTER 9',
          paragraphs: [
            'The Puranas preserve the vast mythological and geographic encyclopedia of ancient India, documenting dynasties, star charts, temple architectures, and cultural geography.',
            'The churning of the cosmic ocean symbolizes human inner churning: before the nectar of enlightenment emerges, the deadly poison of ego must be consumed by equanimity.'
          ],
          verseSanskrit: 'मथ्यमाने ततोऽब्धौ तु मन्दरेण सुरासुरैः।\nप्रादुरासीद्धरिक्षेमात्सर्वलोकसुखावहा॥',
          transliteration: 'mathyamāne tato ’bdhau tu mandareṇa surāsuraiḥ |\nprādurāsīd dhari-kṣemāt sarva-loka-sukhāvahā ||',
          translation: '“As the cosmic ocean was churned by the gods and demons using Mount Mandara, there arose through the grace of the Supreme Lord that which bestows happiness across all realms.”',
          archivalNotes: {
            period: 'c. 300 CE',
            region: 'Northern Puranic Vault',
            script: 'Sanskrit (Devanagari)',
            material: 'Desi Rag Paper & Soot'
          },
          interactiveWords: ['मथ्यमाने', 'सुरासुरैः', 'सुखावहा']
        }
      },
      {
        id: 'pur-02',
        folioNumber: 'FOLIO ०२ / ०३',
        title: 'THE LAND OF BHARATA',
        sanskritTitle: 'भारतवर्ष प्रशस्ति सूत्र',
        artworkType: 'bharata-varsha',
        imagePath: '/assets/portrait_mange_ram.jpg',
        leftContent: {
          title: 'THE SACRED GEOGRAPHY',
          sanskrit: 'उत्तरं यत्समुद्रस्य हिमाद्रेश्चैव दक्षिणम्',
          caption: 'The ancient geodetic definition of Bharatavarsha from the Himalayas to the Indian Ocean.'
        },
        rightContent: {
          heading: 'THE SACRED CONTINENT',
          subheading: 'VISHNU PURANA · AMSA 2 · CHAPTER 3',
          paragraphs: [
            'The Vishnu Purana contains the earliest civilizational definition of India as Bharatavarsha—the land north of the ocean and south of the snowy Himalayas, where duty and virtue pave the way to liberation.',
            'Here even celestial beings yearn to take birth, for only upon this soil can conscious action transform destiny.'
          ],
          verseSanskrit: 'उत्तरं यत्समुद्रस्य हिमाद्रेश्चैव दक्षिणम्।\nवर्षं तद्भारतं नाम भारती यत्र सन्ततिः॥',
          transliteration: 'uttaraṁ yat samudrasya himādreś caiva dakṣiṇam |\nvarṣaṁ tad bhārataṁ nāma bhāratī yatra santatiḥ ||',
          translation: '“The land that lies north of the ocean and south of the snowy Himalayas is named Bharatavarsha; there dwell the descendants of Bharata.”',
          archivalNotes: {
            period: 'c. 300 CE',
            region: 'Saraswati Valley Recension',
            script: 'Sanskrit (Devanagari)',
            material: 'Sanganeri Paper'
          },
          interactiveWords: ['उत्तरम्', 'समुद्रस्य', 'भारतम्', 'सन्ततिः']
        }
      },
      {
        id: 'pur-03',
        folioNumber: 'FOLIO ०३ / ०३',
        title: 'THE HOLY SARASWATI',
        sanskritTitle: 'सरस्वती तीर्थ माहात्म्यम्',
        artworkType: 'saraswati-stream',
        imagePath: '/assets/portrait_lakhmi_chand.jpg',
        leftContent: {
          title: 'THE GLORY OF PEHOWA & SARASWATI',
          sanskrit: 'सरस्वत्यास्तटे पुण्ये',
          caption: 'Pilgrims and ascetics bathing at the sacred Prithudaka (Pehowa) ghats in Kurukshetra, seeking liberation for ancestors.'
        },
        rightContent: {
          heading: 'VAMANA PURANA',
          subheading: 'SAROMAHATMYA · CHAPTER 34',
          paragraphs: [
            'Dedicated extensively to the sacred geography of Haryana, the Vamana and Padma Puranas praise the Saraswati river and the sacred pilgrimage towns of Pehowa, Thanesar, and Jyotisar.',
            'The text proclaims that while other sacred rivers require ritual immersion, merely meditating upon the sacred Saraswati purifies the soul of all past grief.'
          ],
          verseSanskrit: 'सरस्वत्यां निमग्नानां गङ्गायां च विशेषतः।\nपुनर्जन्म न विद्येत कुरुक्षेत्रे तनौ त्यजे॥',
          transliteration: 'sarasvatyāṁ nimagnānāṁ gaṅgāyāṁ ca viśeṣataḥ |\npunarjanma na vidyeta kuru-kṣetre tanau tyaje ||',
          translation: '“For those who bathe in the sacred Saraswati and Ganga, and those who depart their mortal coil upon the holy plain of Kurukshetra, there is no return to worldly bondage.”',
          archivalNotes: {
            period: 'c. 600 CE',
            region: 'Kurukshetra / Pehowa',
            script: 'Sanskrit (Devanagari)',
            material: 'Aged Paper / Lampblack'
          },
          interactiveWords: ['सरस्वत्याम्', 'कुरुक्षेत्रे', 'पुनर्जन्म']
        }
      }
    ]
  }
];

// ============================================================================
// COMPREHENSIVE SCRIPTURE WORDS GLOSSARY (SCHOLASTIC ETYMOLOGY)
// ============================================================================
export const SCRIPTURE_WORDS_GLOSSARY = {
  'कर्मण्येवाधिकारस्ते': {
    word: 'कर्मण्येवाधिकारस्ते',
    transliteration: 'karmaṇy evādhikāras te',
    literal: 'In action alone is your rightful claim',
    meaning: 'You have sovereignty over your duty, but not over the fruits.',
    context: 'Compound of karmaṇi (in action) + eva (alone) + adhikāraḥ (sovereign right) + te (belonging to you). The cornerstone of non-attached duty.',
    significance: 'The core thesis of the Bhagavad Gita on selfless work (Nishkama Karma).'
  },
  'कर्मण्येव': {
    word: 'कर्मण्येव',
    transliteration: 'karmaṇy eva',
    literal: 'In action alone',
    meaning: 'Exclusively in performing one’s prescribed duty.',
    context: 'Karmaṇi + eva. The indeclinable particle eva emphasizes that human agency is restricted solely to the execution of righteous work.',
    significance: 'Exclusivity of human responsibility.'
  },
  'कर्मफलहेतुर्भूर्मा': {
    word: 'कर्मफलहेतुर्भूर्मा',
    transliteration: 'mā karma-phala-hetur bhūḥ',
    literal: 'Never be motivated by the fruit of action',
    meaning: 'Let not personal reward or outcome be your driving motive.',
    context: 'Karma-phala (fruit of deed) + hetuḥ (causative motive) + bhūḥ (become) + mā (not). Advises the actor to purify the mind of transactional anxiety.',
    significance: 'Dissociation of ego from outcome.'
  },
  'सङ्गोऽस्त्वकर्मणि': {
    word: 'सङ्गोऽस्त्वकर्मणि',
    transliteration: 'mā te saṅgo ’stv akarmaṇi',
    literal: 'Nor let your attachment be to inaction',
    meaning: 'Never allow detachment to degrade into sloth, fatalism, or abandonment of duty.',
    context: 'Saṅgaḥ (attachment) + astu (let there be) + akarmaṇi (in inaction). A direct warning against escapism.',
    significance: 'Condemnation of defeatism and withdrawal from life.'
  },
  'कर्मणि': {
    word: 'कर्मणि',
    transliteration: 'karmaṇi',
    literal: 'In action / in duty',
    meaning: 'In prescribed duty, righteous deed, or ethical action.',
    context: 'From root √kṛ (to do, act). In the Gita, it signifies sacred duty undertaken without egoic thirst for personal rewards.',
    significance: 'Fundamental core of Nishkama Karma Yoga.'
  },
  'मा': {
    word: 'मा',
    transliteration: 'mā',
    literal: 'Not / never',
    meaning: 'An imperative particle of prohibition.',
    context: 'Used here to strictly forbid mental obsession with future fruits or fatalistic retreat into sloth.',
    significance: 'Absolute denial of anxiety and fatalism.'
  },
  'फलेषु': {
    word: 'फलेषु',
    transliteration: 'phaleṣu',
    literal: 'In the fruits / dividends',
    meaning: 'In the outcomes, dividends, or rewards of one’s work.',
    context: 'Locative plural of phala. The verse instructs that outcomes are governed by cosmic laws, beyond unilateral individual control.',
    significance: 'Detachment from anxiety of results.'
  },
  'अकर्मणि': {
    word: 'अकर्मणि',
    transliteration: 'akarmaṇi',
    literal: 'In inaction / inertia',
    meaning: 'In total cessation of work, fatalism, or spiritual paralysis.',
    context: 'The Gita warns against mistaking detachment for lazy abandonment of duty. Inaction is considered a moral failure.',
    significance: 'Condemnation of sloth and defeatism.'
  },
  'धर्मक्षेत्रे': {
    word: 'धर्मक्षेत्रे',
    transliteration: 'dharma-kṣetre',
    literal: 'In the field of righteousness',
    meaning: 'Upon the sacred ground where cosmic moral law is tested.',
    context: 'Signifies Kurukshetra as a spiritual laboratory where ethical dilemmas are confronted and resolved.',
    significance: 'First compound word of the Bhagavad Gita.'
  },
  'कुरुक्षेत्रे': {
    word: 'कुरुक्षेत्रे',
    transliteration: 'kuru-kṣetre',
    literal: 'In Kurukshetra',
    meaning: 'The historic plain of the Kurus in northern Haryana.',
    context: 'Sanctified by King Kuru and the Saraswati river, celebrated as the center of Vedic sacrifice.',
    significance: 'Geography of the Mahabharata dialogue.'
  },
  'समवेताः': {
    word: 'समवेताः',
    transliteration: 'samavetāḥ',
    literal: 'Assembled together',
    meaning: 'Gathered in confrontation with destiny.',
    context: 'Signifies the fateful convergence of all historical lineages at the crossroads of destiny.',
    significance: 'The tension of historic choice.'
  },
  'कालः': {
    word: 'कालः',
    transliteration: 'kālaḥ',
    literal: 'Time / the Dissolver',
    meaning: 'The inexorable flow of time that matures and dissolves worlds.',
    context: 'Spoken by Krishna in His universal form: time destroys falsehood and compels righteous action.',
    significance: 'The metaphysical cosmic dynamic.'
  },
  'मा निषाद': {
    word: 'मा निषाद',
    transliteration: 'mā niṣāda',
    literal: 'O hunter, do not!',
    meaning: 'The cry of grief and moral indignation.',
    context: 'The inaugural utterance of Valmiki upon seeing the hunter slay an innocent crane, birthing Sanskrit poetry.',
    significance: 'The birth of Indian epic verse (Adi Sloka).'
  },
  'सत्यम्': {
    word: 'सत्यम्',
    transliteration: 'satyam',
    literal: 'Truth / reality',
    meaning: 'Unchanging truth; cosmic reality aligned with righteousness.',
    context: 'In the Ramayana, truth is proclaimed as the sovereign foundation upon which even deities stand.',
    significance: 'The moral backbone of Rama’s exile.'
  },
  'धर्मः': {
    word: 'धर्मः',
    transliteration: 'dharmaḥ',
    literal: 'That which sustains',
    meaning: 'Cosmic order, righteousness, virtue, and moral duty.',
    context: 'From root √dhṛ (to hold, support). The universal matrix that prevents civilization from descending into chaos.',
    significance: 'The supreme aim of Indian civilization.'
  },
  'सेतुः': {
    word: 'सेतुः',
    transliteration: 'setuḥ',
    literal: 'The bridge / causeway',
    meaning: 'The oceanic causeway constructed by the Vanara army.',
    context: 'Represents human perseverance uniting with divine will to overcome insurmountable barriers.',
    significance: 'The triumph of collective devotion.'
  },
  'रामे': {
    word: 'रामे',
    transliteration: 'rāme',
    literal: 'In Rama / while Rama ruled',
    meaning: 'Under the sovereignty of Sri Rama.',
    context: 'The state of Ramrajya where the ruler embodies total moral integrity, leading to universal peace.',
    significance: 'The ideal model of governance.'
  },
  'अग्निम्': {
    word: 'अग्निम्',
    transliteration: 'agnim',
    literal: 'Unto Agni (the Sacred Fire)',
    meaning: 'The divine fire, inner spiritual flame, and cosmic messenger.',
    context: 'The very first word of the Rigveda, symbolizing the awakening of consciousness and human aspiration.',
    significance: 'The primordial word of human scripture.'
  },
  'पुरोहितम्': {
    word: 'पुरोहितम्',
    transliteration: 'purohitam',
    literal: 'Placed foremost / guardian',
    meaning: 'The high priest and spiritual benefactor positioned in the vanguard.',
    context: 'Agni is honored as the foremost guide who leads the community toward truth.',
    significance: 'Vedic spiritual leadership.'
  },
  'सवितुः': {
    word: 'सवितुः',
    transliteration: 'savituḥ',
    literal: 'Of the Divine Sun / Creator',
    meaning: 'Belonging to the divine solar power that generates all life.',
    context: 'In the Gayatri mantra, Savitur represents not merely the physical star, but the inner light of truth.',
    significance: 'The source of intellectual awakening.'
  },
  'प्रचोदयात्': {
    word: 'प्रचोदयात्',
    transliteration: 'pracodayāt',
    literal: 'May it inspire / illuminate',
    meaning: 'May it guide, impel, and illuminate our collective intellect.',
    context: 'The core petition of the Gayatri prayer, seeking enlightenment for all beings.',
    significance: 'The aspiration for spiritual awakening.'
  },
  'ईशा': {
    word: 'ईशा',
    transliteration: 'īśā',
    literal: 'By the Supreme Lord / Divine',
    meaning: 'By the supreme indwelling consciousness that pervades all.',
    context: 'From root √īś (to rule, pervade). Opens the Isha Upanishad with the declaration of universal divinity.',
    significance: 'The foundational premise of Advaita Vedanta.'
  },
  'वास्यम्': {
    word: 'वास्यम्',
    transliteration: 'vāsyam',
    literal: 'To be enveloped / clothed',
    meaning: 'To be covered, permeated, and perceived as holy.',
    context: 'Everything changing in the world must be seen as clothed in the divine reality.',
    significance: 'Sanctification of all existence.'
  },
  'भुञ्जीथाः': {
    word: 'भुञ्जीथाः',
    transliteration: 'bhuñjīthāḥ',
    literal: 'Enjoy through renunciation',
    meaning: 'Find true fulfillment through detachment and self-restraint.',
    context: 'Real joy arises not from possessive greed, but from selfless participation in the world.',
    significance: 'The Upanishadic art of living.'
  },
  'तत्त्वमसि': {
    word: 'तत्त्वमसि',
    transliteration: 'tat tvam asi',
    literal: 'Thou art That',
    meaning: 'You, in your innermost self, are that supreme universal reality.',
    context: 'The supreme Mahavakya of the Chandogya Upanishad, collapsing the dualism between creator and creation.',
    significance: 'The ultimate declaration of non-duality.'
  },
  'उत्तिष्ठत': {
    word: 'उत्तिष्ठत',
    transliteration: 'uttiṣṭhata',
    literal: 'Arise!',
    meaning: 'Awaken from spiritual slumber and lethargy.',
    context: 'Lord Yama’s clarion call to Nachiketa in the Katha Upanishad to tread the razor-edge path of wisdom.',
    significance: 'The universal awakening call.'
  },
  'सन्ततिः': {
    word: 'सन्ततिः',
    transliteration: 'santatiḥ',
    literal: 'Descendants / progeny',
    meaning: 'The eternal lineage of seekers dwelling in Bharatavarsha.',
    context: 'Celebrates the civilizational continuity of the people born north of the ocean and south of the snows.',
    significance: 'The definition of Indian identity.'
  }
};

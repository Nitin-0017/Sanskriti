// ============================================================================
// SANSKRITI · THE KEEPERS OF KNOWLEDGE DATA
// Cinematic Indian Archival exhibition records
// ============================================================================

export const KEEPERS_HERO_DATA = {
  eyebrow: "ARCHIVAL EXHIBITION · SACRED LINEAGE",
  titleLines: ["THE", "KEEPERS", "OF", "KNOWLEDGE"],
  subtitle: "“Those who carried wisdom across generations.”",
  supportingLine: "SCHOLARS · SAGES · POETS · TEACHERS",
  sanskritMotto: "ज्ञानधारकाः · विद्वांसः · महर्षयः · परम्परा"
};

export const KEEPERS_TIMELINE_ERAS = [
  { id: 'all', label: 'ALL ERAS', number: '✦', period: 'Antiquity to Classical' },
  { id: 'vedic', label: 'VEDIC', number: '01', period: 'c. 1500 – 800 BCE' },
  { id: 'epic', label: 'EPIC', number: '02', period: 'c. 1000 – 400 BCE' },
  { id: 'classical', label: 'CLASSICAL', number: '03', period: 'c. 600 – 200 BCE' },
  { id: 'philosophical', label: 'PHILOSOPHICAL', number: '04', period: 'c. 200 BCE – 400 CE' }
];

export const KEY_PERSONS_COLLECTION = [
  {
    id: 'vyasa',
    name: 'VYASA',
    sanskritName: 'महर्षि कृष्णद्वैपायन वेदव्यास',
    tradition: 'Epic & Vedic Tradition',
    shortTagline: 'Compiler of the great civilizational traditions',
    eraId: 'epic',
    eraLabel: 'Epic Antiquity',
    period: 'Saraswati Hermitage · Kurukshetra',
    associatedTexts: 'Mahabharata · Four Veda Samhitas · 18 Major Puranas',
    visualTags: ['VEDIC', 'EPIC', 'PURANIC'],
    shortDescription: 'Revered compiler who organized the primordial oral hymns into the four Vedas and composed the 100,000-verse Mahabharata along the sacred Saraswati in Haryana. His synthesis remains the foundational cornerstone of Indian civilizational memory.',
    story: 'On the sacred plains of Kurukshetra, Vyasa preserved humanity’s spiritual revelation against the erosion of time, ensuring that the dialogue between duty and cosmos survived in living metric verse.',
    quote: '“Whatever is found here may be found elsewhere. What is not found here will not be found anywhere.”',
    sanskritQuote: 'यद् इहास्ति तद् अन्यत्र यन् नेहास्ति न तत् क्वचित् ॥',
    portrait: '/assets/portrait_ved_vyasa.jpg',
    plateNo: 'ARCHIVE PLATE 01'
  },
  {
    id: 'valmiki',
    name: 'VALMIKI',
    sanskritName: 'आदिकवि महर्षि वाल्मीकि',
    tradition: 'Epic Tradition & Sanskrit Poetics',
    shortTagline: 'First poet who transmuted grief into metric verse',
    eraId: 'epic',
    eraLabel: 'Epic Era',
    period: 'Tamasa Hermitage · Classical Antiquity',
    associatedTexts: 'Srimad Ramayana · Seven Kandas (24,000 Verses)',
    visualTags: ['POETICS', 'RAMAYANA', 'DHARMA'],
    shortDescription: 'Revered as the Adi Kavi (First Poet) of classical Sanskrit literature, Valmiki was inspired by spontaneous compassionate grief to reveal the Anushtubh meter. His 24,000-verse Ramayana codified the timeless archetype of righteous conduct.',
    story: 'Hearing the cry of a grieving krauncha bird, Valmiki’s compassion crystallized into immortal rhythmic cadence, giving birth to classical Sanskrit poetics.',
    quote: '“As long as mountains stand and rivers flow across the earth, the sacred narrative of the Ramayana shall endure.”',
    sanskritQuote: 'यावत्स्थास्यन्ति गिरयः सरितश्च महीतले । तावद्रामायणकथा लोकेषु प्रचरिष्यति ॥',
    portrait: '/assets/portrait_valmiki.jpg',
    plateNo: 'ARCHIVE PLATE 02'
  },
  {
    id: 'yajnavalkya',
    name: 'YAJNAVALKYA',
    sanskritName: 'महर्षि याज्ञवल्क्य',
    tradition: 'Upanishadic Philosophy & Shukla Yajurveda',
    shortTagline: 'Master of Upanishadic non-dual dialectic',
    eraId: 'vedic',
    eraLabel: 'Vedic Era',
    period: 'Videha Royal Assembly · Antiquity',
    associatedTexts: 'Shukla Yajurveda · Brihadaranyaka Upanishad',
    visualTags: ['UPANISHADS', 'VEDIC', 'NETI-NETI'],
    shortDescription: 'Master of Upanishadic dialectic who received the Shukla Yajurveda and expounded the immortal nature of the non-dual Self (Neti, Neti) in King Janaka’s grand philosophical court.',
    story: 'In fearless debate against the greatest philosophers of his era, Yajnavalkya illuminated the supreme consciousness that lies beyond all conceptual definitions.',
    quote: '“This Self is ungraspable, for it cannot be grasped; indestructible, for it cannot be destroyed.”',
    sanskritQuote: 'स एष नेति नेत्यात्मा अगृह्यो न हि गृह्यते अशीर्यो न हि शीर्यते ॥',
    portrait: '/assets/literature_manuscript_hero.jpg',
    plateNo: 'ARCHIVE PLATE 03'
  },
  {
    id: 'panini',
    name: 'PANINI',
    sanskritName: 'आचार्य पाणिनि',
    tradition: 'Grammar & Linguistic Science',
    shortTagline: 'Architect of generative linguistic grammar',
    eraId: 'classical',
    eraLabel: 'Classical Era',
    period: 'c. 5th Century BCE · Gandhara & Taxila',
    associatedTexts: 'Ashtadhyayi (3,959 Sutras) · Shiva Sutras',
    visualTags: ['LINGUISTICS', 'SUTRA', 'GRAMMAR'],
    shortDescription: 'Author of the Ashtadhyayi, a generative system of 3,959 algebraic aphorisms that codified Sanskrit phonetics, morphology, and syntax with unprecedented algorithmic precision.',
    story: 'Panini engineered the world’s first formal metalanguage, creating a rigorous structural shield that preserved India’s sacred texts from linguistic drift across millennia.',
    quote: '“Speech, when disciplined by rule and precision, becomes an incorruptible vessel of supreme truth.”',
    sanskritQuote: 'अल्पाक्षरमसंदिग्धं सारवद्विश्वतोमुखम् । सूत्रं सूत्रविदो विदुः ॥',
    portrait: '/assets/literature_oral_recitation.jpg',
    plateNo: 'ARCHIVE PLATE 04'
  },
  {
    id: 'patanjali',
    name: 'PATANJALI',
    sanskritName: 'महर्षि पतञ्जलि',
    tradition: 'Classical Yoga & Sanskrit Grammar',
    shortTagline: 'Codifier of the eightfold meditative path',
    eraId: 'philosophical',
    eraLabel: 'Philosophical Era',
    period: 'c. 2nd Century BCE · Classical India',
    associatedTexts: 'Yoga Sutras (196 Aphorisms) · Mahabhashya',
    visualTags: ['YOGA', 'CONSCIOUSNESS', 'SAMADHI'],
    shortDescription: 'Synthesizer of the eightfold yogic discipline (Ashtanga Yoga) and master grammarian who charted the systematic science of mental stillness and inward liberation.',
    story: 'Patanjali formulated the anatomy of human consciousness, presenting a timeless psychological method to dissolve mental fluctuations and rest in pure awareness.',
    quote: '“Yoga is the intentional stilling of the fluctuating modifications of consciousness.”',
    sanskritQuote: 'योगश्चित्तवृत्तिनिरोधः । तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥',
    portrait: '/assets/temple_interior_walkthrough.jpg',
    plateNo: 'ARCHIVE PLATE 05'
  },
  {
    id: 'gargi',
    name: 'GARGI',
    sanskritName: 'ब्रह्मवादिनी गार्गी वाचक्नवी',
    tradition: 'Upanishadic Inquiry & Dialectic',
    shortTagline: 'Pioneering Vedic philosopher of ultimate inquiry',
    eraId: 'vedic',
    eraLabel: 'Vedic Era',
    period: 'Videha Royal Assembly · King Janaka’s Court',
    associatedTexts: 'Brihadaranyaka Upanishad (Debate with Yajnavalkya)',
    visualTags: ['DIALECTIC', 'UPANISHADS', 'INQUIRY'],
    shortDescription: 'Renowned Upanishadic dialectician who boldly challenged sage Yajnavalkya in King Janaka’s open court, demanding to know the ultimate foundation upon which reality is woven.',
    story: 'Gargi exemplifies the fearless tradition of Vedic women philosophers whose sharp metaphysical questions compelled the deepest revelations of the Upanishads.',
    quote: '“Tell me, on what is the weave of space and heaven woven back and forth?”',
    sanskritQuote: 'कस्मिन्नु खलु लोकाश्चन्द्रे ओताश्च प्रोताश्चेति ॥',
    portrait: '/assets/literature_epic_scene.jpg',
    plateNo: 'ARCHIVE PLATE 06'
  }
];

// Interactive Visual Lineage Network
export const TRANSMISSION_NETWORK_DATA = {
  root: {
    id: 'vedic-knowledge',
    title: 'VEDIC KNOWLEDGE',
    sanskrit: 'श्रुति · Primordial Revelation',
    type: 'root',
    period: 'Antiquity'
  },
  branches: [
    {
      id: 'upanishadic-stream',
      name: 'UPANISHADIC METAPHYSICS',
      personId: 'yajnavalkya',
      personName: 'YAJNAVALKYA',
      secondaryPersonId: 'gargi',
      secondaryPersonName: 'GARGI',
      coreText: 'Brihadaranyaka Upanishad',
      outcome: 'Non-Dual Philosophy (Advaita Vedanta)',
      traditionTag: 'UPANISHADIC THOUGHT',
      details: 'Metaphysical inquiry into the nature of consciousness and the indestructible Self (Atman).'
    },
    {
      id: 'epic-stream',
      name: 'EPIC & CIVILIZATIONAL TRADITION',
      personId: 'vyasa',
      personName: 'VYASA',
      secondaryPersonId: 'valmiki',
      secondaryPersonName: 'VALMIKI',
      coreText: 'Mahabharata & Ramayana',
      outcome: 'Pan-Indian Ethical Consciousness',
      traditionTag: 'EPIC TRADITION',
      details: 'Vast civilizational narratives embodying Dharma, statecraft, crisis, and universal order.'
    },
    {
      id: 'linguistic-stream',
      name: 'LINGUISTIC & GRAMMAR ARCHITECTURE',
      personId: 'panini',
      personName: 'PANINI',
      coreText: 'Ashtadhyayi (3,959 Sutras)',
      outcome: 'Algorithmic Sanskrit Preservation',
      traditionTag: 'GRAMMAR SCIENCE',
      details: 'Generative linguistic rules that preserved ancient texts uncorrupted across millennia.'
    },
    {
      id: 'yogic-stream',
      name: 'PSYCHOLOGY OF CONSCIOUSNESS',
      personId: 'patanjali',
      personName: 'PATANJALI',
      coreText: 'Yoga Sutras (196 Aphorisms)',
      outcome: 'Ashtanga Yoga & Meditative Science',
      traditionTag: 'YOGIC DARSHANA',
      details: 'Systematic discipline of the mind, ethical restraint, concentration, and samadhi.'
    }
  ]
};

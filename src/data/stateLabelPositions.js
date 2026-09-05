/**
 * Non-Overlapping Label Positions with Leader Lines for Complete India Map
 * ViewBox: 140 130 730 800
 */

export const STATE_LABEL_CONFIG = {
  // Northern Territories & Himalayan Region
  'pok-kashmir': { x: 305, y: 195, name: 'Gilgit-Baltistan (POK)', size: 8.5 },
  'aksai-chin': { x: 415, y: 210, name: 'Aksai Chin', size: 8.5 },
  'ladakh': { x: 395, y: 245, name: 'LADAKH', size: 10.5 },
  'jammu-kashmir': { x: 320, y: 245, name: 'JAMMU & KASHMIR', size: 9.5 },
  'himachal-pradesh': { x: 380, y: 305, name: 'HIMACHAL', size: 9 },
  'punjab': { x: 335, y: 330, name: 'PUNJAB', size: 9.5 },
  'chandigarh': {
    x: 310, y: 315, name: 'CHANDIGARH', size: 8,
    leader: { fromX: 370, fromY: 333, toX: 335, toY: 320 }
  },
  'uttarakhand': { x: 425, y: 348, name: 'UTTARAKHAND', size: 9 },
  'haryana': { x: 355, y: 375, name: 'HARYANA', size: 10 },
  'delhi': {
    x: 325, y: 395, name: 'DELHI (NCT)', size: 8.5,
    leader: { fromX: 378, fromY: 388, toX: 345, toY: 395 }
  },

  // Western & Central India
  'rajasthan': { x: 295, y: 440, name: 'RAJASTHAN', size: 12 },
  'gujarat': { x: 235, y: 535, name: 'GUJARAT', size: 11.5 },
  'dadra-nagar-haveli-daman-diu': {
    x: 185, y: 595, name: 'D&NH & DAMAN & DIU', size: 7.5,
    leader: { fromX: 259, fromY: 591, toX: 215, toY: 595 }
  },
  'madhya-pradesh': { x: 410, y: 520, name: 'MADHYA PRADESH', size: 12 },
  'maharashtra': { x: 355, y: 615, name: 'MAHARASHTRA', size: 12 },
  'goa': {
    x: 255, y: 715, name: 'GOA', size: 9,
    leader: { fromX: 308, fromY: 714, toX: 270, toY: 715 }
  },

  // Northern Plains & East India
  'uttar-pradesh': { x: 460, y: 435, name: 'UTTAR PRADESH', size: 12 },
  'bihar': { x: 570, y: 465, name: 'BIHAR', size: 11 },
  'jharkhand': { x: 570, y: 515, name: 'JHARKHAND', size: 10 },
  'chhattisgarh': { x: 490, y: 570, name: 'CHHATTISGARH', size: 10.5 },
  'odisha': { x: 545, y: 595, name: 'ODISHA', size: 11 },
  'west-bengal': { x: 625, y: 510, name: 'WEST BENGAL', size: 10.5 },
  'sikkim': {
    x: 636, y: 395, name: 'SIKKIM', size: 8.5,
    leader: { fromX: 636, fromY: 416, toX: 636, toY: 400 }
  },

  // Northeast States
  'assam': { x: 735, y: 445, name: 'ASSAM', size: 10.5 },
  'arunachal-pradesh': { x: 775, y: 398, name: 'ARUNACHAL PRADESH', size: 9.5 },
  'meghalaya': { x: 695, y: 468, name: 'MEGHALAYA', size: 8.5 },
  'nagaland': {
    x: 820, y: 450, name: 'NAGALAND', size: 8,
    leader: { fromX: 772, fromY: 454, toX: 815, toY: 450 }
  },
  'manipur': {
    x: 815, y: 485, name: 'MANIPUR', size: 8,
    leader: { fromX: 758, fromY: 487, toX: 810, toY: 485 }
  },
  'mizoram': { x: 735, y: 525, name: 'MIZORAM', size: 8.5 },
  'tripura': {
    x: 660, y: 518, name: 'TRIPURA', size: 8,
    leader: { fromX: 710, fromY: 512, toX: 675, toY: 518 }
  },

  // Southern India
  'telangana': { x: 425, y: 655, name: 'TELANGANA', size: 10.5 },
  'andhra-pradesh': { x: 445, y: 715, name: 'ANDHRA PRADESH', size: 11 },
  'karnataka': { x: 355, y: 730, name: 'KARNATAKA', size: 11.5 },
  'puducherry': {
    x: 465, y: 795, name: 'PUDUCHERRY', size: 8,
    leader: { fromX: 418, fromY: 795, toX: 460, toY: 795 }
  },
  'tamil-nadu': { x: 405, y: 820, name: 'TAMIL NADU', size: 11.5 },
  'kerala': { x: 350, y: 830, name: 'KERALA', size: 10 },

  // Island Union Territories
  'lakshadweep': {
    x: 215, y: 830, name: 'LAKSHADWEEP (UT)', size: 9,
    leader: { fromX: 275, fromY: 828, toX: 240, toY: 830 }
  },
  'andaman-nicobar': {
    x: 775, y: 805, name: 'ANDAMAN & NICOBAR (UT)', size: 9,
    leader: { fromX: 737, fromY: 805, toX: 770, toY: 805 }
  }
};

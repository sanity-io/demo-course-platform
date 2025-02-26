import fs from 'fs'
import path from 'path'

// Helper to create consistent references
const createRef = (type: string, id: string) => ({
  _type: type,
  _ref: `${type}-${id}`,
})

// Helper to create consistent IDs
const createId = (type: string, identifier: string) =>
  `${type}-${identifier.toLowerCase().replace(/\s+/g, '-')}`

const seedData = [
  // Presenters
  {
    _id: createId('presenter', 'john-doe'),
    _type: 'presenter',
    name: 'John Doe',
    title: [
      {_key: 'en', value: 'Master Baker'},
      {_key: 'no', value: 'Mesterbaker'},
      {_key: 'nl', value: 'Meesterbakker'},
    ],
    biography: [
      {_key: 'en', value: 'Professional baker with 20 years of experience'},
      {_key: 'no', value: 'Profesjonell baker med 20 års erfaring'},
      {_key: 'nl', value: 'Professionele bakker met 20 jaar ervaring'},
    ],
    slug: {current: 'john-doe'},
    availability: ['en', 'no', 'nl'],
  },
  {
    _id: createId('presenter', 'jane-smith'),
    _type: 'presenter',
    name: 'Jane Smith',
    title: [
      {_key: 'en', value: 'Pastry Chef'},
      {_key: 'no', value: 'Konditor'},
      {_key: 'nl', value: 'Banketbakker'},
    ],
    biography: [
      {_key: 'en', value: 'Award-winning pastry chef specializing in artisanal bread'},
      {_key: 'no', value: 'Prisbelønnet konditor som spesialiserer seg på håndverksbakst'},
      {_key: 'nl', value: 'Bekroonde banketbakker gespecialiseerd in ambachtelijk brood'},
    ],
    slug: {current: 'jane-smith'},
    availability: ['en', 'no', 'nl'],
  },

  // Lessons
  {
    _id: createId('lesson', 'ingredients'),
    _type: 'lesson',
    title: 'Essential Ingredients',
    slug: {current: 'ingredients'},
    summary: 'Learn about the basic ingredients needed for bread making',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{_type: 'span', text: 'You will need flour, water, salt, and yeast.'}],
      },
    ],
    language: 'en',
  },
  {
    _id: createId('lesson', 'ingredients-no'),
    _type: 'lesson',
    title: 'Viktige ingredienser',
    slug: {current: 'ingredienser'},
    summary: 'Lær om de grunnleggende ingrediensene som trengs til brødbaking',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{_type: 'span', text: 'Du trenger mel, vann, salt og gjær.'}],
      },
    ],
    language: 'no',
  },
  {
    _id: createId('lesson', 'ingredients-nl'),
    _type: 'lesson',
    title: 'Essentiële ingrediënten',
    slug: {current: 'ingredienten'},
    summary: 'Leer over de basisingrediënten die nodig zijn voor het maken van brood',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{_type: 'span', text: 'Je hebt bloem, water, zout en gist nodig.'}],
      },
    ],
    language: 'nl',
  },

  // Course
  {
    _id: createId('course', 'bread-baking'),
    _type: 'course',
    title: {
      en: 'How to Bake Bread',
      no: 'Hvordan bake brød',
      nl: 'Hoe bak je brood',
    },
    slug: {
      en: {current: 'how-to-bake-bread'},
      no: {current: 'hvordan-bake-brod'},
      nl: {current: 'hoe-bak-je-brood'},
    },
    presenters: [createRef('presenter', 'john-doe'), createRef('presenter', 'jane-smith')],
    lessons: [
      createRef('lesson', 'ingredients'),
      createRef('lesson', 'ingredients-no'),
      createRef('lesson', 'ingredients-nl'),
    ],
  },

  // Legal
  {
    _id: createId('legal', 'disclaimers'),
    _type: 'legal',
    title: 'Disclaimers',
    slug: {current: 'disclaimers'},
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'All recipes and techniques are provided for educational purposes only.',
            marks: [],
          },
        ],
      },
      {
        _key: 'en-content',
        _type: 'marketContent',
        market: 'en',
        content: [
          {
            _type: 'block',
            _key: 'en-block',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 'en-span',
                text: 'Please note that results may vary based on your equipment and ingredients.',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: 'no-content',
        _type: 'marketContent',
        market: 'no',
        content: [
          {
            _type: 'block',
            _key: 'no-block',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 'no-span',
                text: 'Vær oppmerksom på at resultater kan variere basert på ditt utstyr og ingredienser.',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: 'nl-content',
        _type: 'marketContent',
        market: 'nl',
        content: [
          {
            _type: 'block',
            _key: 'nl-block',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 'nl-span',
                text: 'Houd er rekening mee dat resultaten kunnen variëren afhankelijk van je apparatuur en ingrediënten.',
                marks: [],
              },
            ],
          },
        ],
      },
    ],
  },

  // Label Group
  {
    _id: 'labelGroup',
    _type: 'labelGroup',
    labels: [
      {
        _type: 'label',
        _key: 'button-add-to-cart',
        key: 'add.to.cart',
        text: {
          _type: 'localizedGoogleTranslateString',
          en: 'Add to cart',
          no: 'Legg i handlekurv',
          nl: 'In winkelwagen',
        },
      },
      {
        _type: 'label',
        _key: 'button-checkout',
        key: 'checkout',
        text: {
          _type: 'localizedGoogleTranslateString',
          en: 'Checkout',
          no: 'Til kassen',
          nl: 'Afrekenen',
        },
      },
      {
        _type: 'label',
        _key: 'button-continue-shopping',
        key: 'continue.shopping',
        text: {
          _type: 'localizedGoogleTranslateString',
          en: 'Continue Shopping',
          no: 'Fortsett å handle',
          nl: 'Verder winkelen',
        },
      },
    ],
  },

  // Translation Metadata
  {
    _id: createId('translation.metadata', 'ingredients-translations'),
    _type: 'translation.metadata',
    schemaTypes: ['lesson'],
    translations: [
      {
        _key: 'en',
        _type: 'internationalizedArrayReferenceValue',
        value: {
          _type: 'reference',
          _ref: createId('lesson', 'ingredients'),
        },
      },
      {
        _key: 'no',
        _type: 'internationalizedArrayReferenceValue',
        value: {
          _type: 'reference',
          _ref: createId('lesson', 'ingredients-no'),
        },
      },
      {
        _key: 'nl',
        _type: 'internationalizedArrayReferenceValue',
        value: {
          _type: 'reference',
          _ref: createId('lesson', 'ingredients-nl'),
        },
      },
    ],
  },
]

// Write the seed data to an NDJSON file
const outputPath = path.join(__dirname, 'seed-data.ndjson')
const ndjsonData = seedData.map((doc) => JSON.stringify(doc)).join('\n')

fs.writeFileSync(outputPath, ndjsonData)
console.log(`Seed data written to ${outputPath}`)

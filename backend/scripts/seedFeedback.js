const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');

const mongoUri =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  'mongodb://mongodb:27017/healthcompass';

const dayRangeUtc = (dateString) => {
  const start = new Date(`${dateString}T00:00:00.000Z`);
  const end = new Date(`${dateString}T23:59:59.999Z`);
  return { start, end };
};

const seedData = [
  {
    hesitation: 'Initial button hierarchy was unclear, especially the start test button.',
    completion: 'yes_easily',
    resultSense: 'The score and short summary made sense for a quick check-in.',
    mostUseful: 'Clear scoring and the calm tone of the results panel.',
    reuse: 'Yes, I would use it for my parents after the UI is polished.',
    pay: 'Yes, if the report can be shared with a clinician.',
    npsScore: 8,
    sus1: '4',
    sus2: '2',
    sus3: '4',
    sus4: '2',
    sus5: '4',
    testMode: 'standard',
    createdAt: new Date('2026-04-30T10:30:00.000Z')
  },
  {
    hesitation: 'Adaptive flow jumped too quickly and I was unsure what changed.',
    completion: 'yes_struggled',
    resultSense: 'Mostly, but I wanted more context on what the score means.',
    mostUseful: 'Clinical-style questions felt legitimate and focused.',
    reuse: 'Maybe, after clearer guidance inside the test flow.',
    pay: 'Maybe, depends on the clarity of the report summary.',
    npsScore: 9,
    sus1: '3',
    sus2: '3',
    sus3: '3',
    sus4: '4',
    sus5: '3',
    testMode: 'adaptive',
    createdAt: new Date('2026-04-30T14:05:00.000Z')
  },
  {
    hesitation: 'Got stuck on navigation and could not find the next step.',
    completion: 'no_gave_up',
    resultSense: 'Did not reach the results page.',
    mostUseful: 'Layout is clean but the action buttons need emphasis.',
    reuse: 'No, not until the buttons and guidance are clearer.',
    pay: 'No, not without stronger UX support.',
    npsScore: 7,
    sus1: '2',
    sus2: '4',
    sus3: '2',
    sus4: '4',
    sus5: '2',
    testMode: 'standard',
    createdAt: new Date('2026-05-02T09:15:00.000Z')
  },
  {
    hesitation: 'None. The adaptive flow felt smooth and responsive.',
    completion: 'yes_easily',
    resultSense: 'Clear, concise, and explained in plain language.',
    mostUseful: 'Adaptive difficulty and the final summary were excellent.',
    reuse: 'Yes, I would use it again without hesitation.',
    pay: 'Yes, especially for a clinical-grade PDF report.',
    npsScore: 10,
    sus1: '5',
    sus2: '1',
    sus3: '5',
    sus4: '1',
    sus5: '5',
    testMode: 'adaptive',
    createdAt: new Date('2026-05-04T11:20:00.000Z')
  },
  {
    hesitation: 'Instructions were slightly long; buttons felt muted.',
    completion: 'yes_struggled',
    resultSense: 'Mostly, but I wanted a clearer breakdown by domain.',
    mostUseful: 'Progress indicators and structured steps were helpful.',
    reuse: 'Maybe, after a few UI adjustments.',
    pay: 'Maybe, if the UI feels more polished.',
    npsScore: 9,
    sus1: '3',
    sus2: '2',
    sus3: '4',
    sus4: '3',
    sus5: '3',
    testMode: 'standard',
    createdAt: new Date('2026-05-04T16:40:00.000Z')
  }
  ,
  {
    hesitation: 'Wanted clearer labels on the next/previous buttons.',
    completion: 'yes_struggled',
    resultSense: 'The score was clear, but the next steps felt vague.',
    mostUseful: 'The question pacing and clarity of the prompts.',
    reuse: 'Yes, especially if navigation is improved.',
    pay: 'Maybe, if the summary includes recommendations.',
    npsScore: 8,
    sus1: '3',
    sus2: '3',
    sus3: '4',
    sus4: '3',
    sus5: '3',
    testMode: 'standard',
    createdAt: new Date('2026-05-01T09:45:00.000Z')
  },
  {
    hesitation: 'No major issues, but some questions felt repetitive.',
    completion: 'yes_easily',
    resultSense: 'The summary was helpful and matched expectations.',
    mostUseful: 'The adaptive difficulty kept the test engaging.',
    reuse: 'Yes, would use again for family members.',
    pay: 'Yes, if a downloadable report is included.',
    npsScore: 9,
    sus1: '4',
    sus2: '2',
    sus3: '4',
    sus4: '2',
    sus5: '4',
    testMode: 'adaptive',
    createdAt: new Date('2026-05-01T13:10:00.000Z')
  },
  {
    hesitation: 'The UI felt a bit dense on mobile.',
    completion: 'yes_struggled',
    resultSense: 'Understood the result, but wanted a simpler breakdown.',
    mostUseful: 'Loved the short tips after each section.',
    reuse: 'Maybe, once the mobile layout is simplified.',
    pay: 'No, not yet.',
    npsScore: 7,
    sus1: '2',
    sus2: '4',
    sus3: '3',
    sus4: '4',
    sus5: '2',
    testMode: 'standard',
    createdAt: new Date('2026-05-03T10:05:00.000Z')
  },
  {
    hesitation: 'Needed a quick tooltip to explain adaptive vs standard.',
    completion: 'yes_easily',
    resultSense: 'Felt accurate and easy to interpret.',
    mostUseful: 'Clean summary and the ability to retake tests.',
    reuse: 'Yes, definitely.',
    pay: 'Yes, depending on price tier.',
    npsScore: 10,
    sus1: '5',
    sus2: '1',
    sus3: '5',
    sus4: '1',
    sus5: '5',
    testMode: 'adaptive',
    createdAt: new Date('2026-05-03T15:30:00.000Z')
  },
  {
    hesitation: 'The start screen felt long, but once started it was okay.',
    completion: 'yes_easily',
    resultSense: 'The final score and brief notes were enough.',
    mostUseful: 'Question variety and structure.',
    reuse: 'Yes, for periodic check-ins.',
    pay: 'Maybe, if the report includes a doctor-ready PDF.',
    npsScore: 8,
    sus1: '4',
    sus2: '2',
    sus3: '4',
    sus4: '2',
    sus5: '4',
    testMode: 'standard',
    createdAt: new Date('2026-05-05T09:05:00.000Z')
  }
];

const seedFeedback = async () => {
  try {
    await mongoose.connect(mongoUri);

    const seedDates = ['2026-04-30', '2026-05-01', '2026-05-02', '2026-05-03', '2026-05-04', '2026-05-05'];
    for (const dateString of seedDates) {
      const { start, end } = dayRangeUtc(dateString);
      await Feedback.deleteMany({ createdAt: { $gte: start, $lte: end } });
    }

    const inserted = await Feedback.insertMany(seedData);
    console.log(`SUCCESS: Seeded ${inserted.length} feedback entries.`);
  } catch (error) {
    console.error('ERROR seeding feedback:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedFeedback();

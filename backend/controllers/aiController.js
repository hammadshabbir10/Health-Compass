const fetch = require('node-fetch');

const buildPrompt = ({ name, age, gender, occupation }) => {
  const details = [
    name ? `Name: ${name}` : 'Name: not provided',
    age ? `Age: ${age}` : 'Age: not provided',
    gender ? `Gender: ${gender}` : 'Gender: not provided',
    occupation ? `Occupation: ${occupation}` : 'Occupation: not provided',
  ].join(' | ');

  return `You are generating safe, age-aware triage tests for Health Compass.\n` +
    `User profile: ${details}.\n` +
    `Tailor questions to the user's age, gender, and occupation whenever reasonable; include a few domain-relevant items based on occupation (for example, computer use tasks for computer science roles).\n` +
    `Keep wording clear for older adults and caregivers.\n` +
    `Return JSON only (no markdown, no code fences) with exactly 5 tests.\n` +
    `Use these test ids in this order: global, episodic-memory, executive, language, functional.\n` +
    `Each test must include 10 to 15 MCQ questions only (no short-answer or text questions).\n` +
    `Avoid medical diagnoses. Focus on cognitive domains and daily function.\n` +
    `For every question include a correctAnswer string.\n` +
    `Output JSON schema: {"tests":[{"id":"global","title":"...","description":"...","questions":[{"id":"q1","type":"mcq","question":"...","options":["A","B","C","D"],"correctAnswer":"A"}]}]}`;
};

const normalizeTests = (tests) => {
  if (!Array.isArray(tests)) return [];
  return tests.slice(0, 5).map((test, index) => ({
    id: test.id || `test-${index + 1}`,
    title: test.title || `Assessment ${index + 1}`,
    description: test.description || 'Personalized assessment based on profile context.',
    questions: Array.isArray(test.questions)
      ? test.questions.map((question, questionIndex) => {
        const type = 'mcq';
        const options = Array.isArray(question.options) ? question.options : [];
        const correctAnswer = question.correctAnswer ?? question.answer ?? '';
        return {
          ...question,
          id: question.id || `q${questionIndex + 1}`,
          type,
          options,
          correctAnswer,
        };
      })
      : [],
  }));
};

const extractJson = (text) => {
  if (!text) return null;
  const cleaned = text.replace(/```json|```/gi, '').trim();
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }
  return cleaned.slice(firstBrace, lastBrace + 1);
};

exports.generateTests = async (req, res) => {
  try {
    const { profile } = req.body || {};
    if (!profile || typeof profile !== 'object') {
      return res.status(400).json({ success: false, message: 'Profile details are required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: 'Gemini API key not configured.' });
    }

    const prompt = buildPrompt(profile);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ success: false, message: 'No response from Gemini.' });
    }

    const jsonPayload = extractJson(text);
    if (!jsonPayload) {
      return res.status(500).json({ success: false, message: 'Gemini response did not include JSON.' });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonPayload);
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Gemini response was not valid JSON.' });
    }

    const tests = normalizeTests(parsed.tests);
    if (tests.length === 0) {
      return res.status(500).json({ success: false, message: 'Gemini did not return tests.' });
    }

    return res.status(200).json({ success: true, tests });
  } catch (error) {
    console.error('Generate tests error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate tests.' });
  }
};

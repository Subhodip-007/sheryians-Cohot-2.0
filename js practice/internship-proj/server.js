const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use(express.static('.'));

app.post('/api/openai', async (req, res) => {
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is not configured on the server.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error proxying to OpenAI:', error);
    res.status(500).json({ error: 'Failed to proxy request to OpenAI.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
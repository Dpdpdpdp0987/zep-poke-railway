require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const ZEP_API_KEY = process.env.ZEP_API_KEY;
const ZEP_API_URL = process.env.ZEP_API_URL || 'https://api.getzep.com';

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Zep API Server is running',
    endpoints: ['/search', '/store', '/retrieve']
  });
});

// Search endpoint
app.post('/search', async (req, res) => {
  try {
    if (!ZEP_API_KEY) {
      return res.status(500).json({ error: 'ZEP_API_KEY not configured' });
    }

    const { query, sessionId } = req.body;
    
    if (!query || !sessionId) {
      return res.status(400).json({ error: 'query and sessionId are required' });
    }

    const response = await axios.post(
      `${ZEP_API_URL}/api/v1/sessions/${sessionId}/search`,
      { text: query },
      {
        headers: {
          'Authorization': `Bearer ${ZEP_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Search error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Search failed',
      details: error.response?.data || error.message
    });
  }
});

// Store endpoint
app.post('/store', async (req, res) => {
  try {
    if (!ZEP_API_KEY) {
      return res.status(500).json({ error: 'ZEP_API_KEY not configured' });
    }

    const { sessionId, messages } = req.body;
    
    if (!sessionId || !messages) {
      return res.status(400).json({ error: 'sessionId and messages are required' });
    }

    const response = await axios.post(
      `${ZEP_API_URL}/api/v1/sessions/${sessionId}/memory`,
      { messages },
      {
        headers: {
          'Authorization': `Bearer ${ZEP_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Store error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Store failed',
      details: error.response?.data || error.message
    });
  }
});

// Retrieve endpoint
app.get('/retrieve/:sessionId', async (req, res) => {
  try {
    if (!ZEP_API_KEY) {
      return res.status(500).json({ error: 'ZEP_API_KEY not configured' });
    }

    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    const response = await axios.get(
      `${ZEP_API_URL}/api/v1/sessions/${sessionId}/memory`,
      {
        headers: {
          'Authorization': `Bearer ${ZEP_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Retrieve error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Retrieve failed',
      details: error.response?.data || error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Zep API URL: ${ZEP_API_URL}`);
  console.log(`API Key configured: ${ZEP_API_KEY ? 'Yes' : 'No'}`);
});
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/fetch-data', async (req, res) => {
  try {
    const accessToken = req.query.accessToken; // Assuming you pass the access token as a query parameter
    const itemId = 1; // Example item ID, replace with your actual item ID
    const apiUrl = `https://account.accurate.id/accurate/api/item/detail.do?id=${itemId}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }

    const data = await response.json();
    res.json(data); // Send the retrieved data back to the client
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;

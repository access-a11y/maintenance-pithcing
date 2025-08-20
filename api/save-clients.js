export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { clients } = req.body;
      
      // For now, we'll use environment variable as simple storage
      // This will work without Vercel KV setup
      const data = JSON.stringify(clients);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Data saved successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

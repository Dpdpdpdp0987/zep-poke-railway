# Zep Poke Railway

A simple Express.js server for interacting with the Zep API. Railway deployment ready with zero build complexity!

## Features

- 🚀 Plain JavaScript - no TypeScript, no build step
- 🔌 Three simple endpoints: `/search`, `/store`, `/retrieve`
- 🌐 Zep API integration using axios
- ⚡ Railway-ready deployment
- 🔐 Environment variable configuration
- 🛡️ Basic error handling

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dpdpdpdp0987/zep-poke-railway.git
   cd zep-poke-railway
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Zep API key:
   ```
   ZEP_API_KEY=your_actual_zep_api_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Test it**
   ```bash
   curl http://localhost:3000
   ```

## API Endpoints

### Health Check
```bash
GET /
```
Returns server status and available endpoints.

### Search
```bash
POST /search
Content-Type: application/json

{
  "query": "your search query",
  "sessionId": "user-session-123"
}
```

### Store
```bash
POST /store
Content-Type: application/json

{
  "sessionId": "user-session-123",
  "messages": [
    {
      "role": "user",
      "content": "Hello!"
    },
    {
      "role": "assistant",
      "content": "Hi there!"
    }
  ]
}
```

### Retrieve
```bash
GET /retrieve/:sessionId
```
Example:
```bash
curl http://localhost:3000/retrieve/user-session-123
```

## Deploy to Railway

### Method 1: One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/Dpdpdpdp0987/zep-poke-railway)

### Method 2: Manual Deploy

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository

3. **Add environment variables**
   - Go to your project settings
   - Click "Variables"
   - Add:
     - `ZEP_API_KEY` = your Zep API key
     - `ZEP_API_URL` = (optional) custom Zep URL

4. **Deploy**
   - Railway automatically detects the start script
   - Your app will be live in seconds!

5. **Get your URL**
   - Railway provides a public URL automatically
   - Test with: `curl https://your-app.railway.app`

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ZEP_API_KEY` | Yes | - | Your Zep API key |
| `ZEP_API_URL` | No | `https://api.getzep.com` | Zep API base URL |
| `PORT` | No | `3000` | Server port (Railway sets this) |

## Project Structure

```
zep-poke-railway/
├── server.js          # Main Express server
├── package.json       # Dependencies and scripts
├── .env.example       # Environment template
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Error Handling

The server includes basic error handling for:
- Missing API keys
- Invalid requests
- Zep API errors
- Network issues

All errors return JSON with:
```json
{
  "error": "Error description",
  "details": "Additional details"
}
```

## Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **Axios** - HTTP client
- **dotenv** - Environment configuration

## Tips

- 🔄 Railway auto-deploys on every push to `main`
- 📝 Check Railway logs if something goes wrong
- 🔑 Never commit your `.env` file
- 🧪 Test endpoints locally before deploying

## License

MIT

## Author

Daniela Mümken
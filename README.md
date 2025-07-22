# wajs-api

A simple REST API to send WhatsApp messages using [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js).

## Features
- Send WhatsApp messages programmatically via HTTP POST
- API key authentication for security
- Swagger documentation available at `/docs`

## Requirements
- Node.js (v14 or higher recommended)
- npm
- Google Chrome or Chromium (required by Puppeteer)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd wajs-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root with the following content:
   ```env
   API_KEY=your_secret_api_key
   PORT=3000 # Optional, defaults to 3000
   ```

## Usage

1. **Start the server:**
   ```bash
   node index.js
   ```
   The first time you run the server, a QR code will appear in the terminal. Scan it with your WhatsApp mobile app to authenticate.

2. **Run with PM2 (recommended for production):**
   This project includes a `ecosystem.config.js` file for easy PM2 process management.
   
   - Start the app in development mode:
     ```bash
     pm2 start ecosystem.config.js
     ```
   - Or start in production mode:
     ```bash
     pm2 start ecosystem.config.js --env production
     ```
   - View logs:
     ```bash
     pm2 logs wajs-api
     ```
   - Restart or stop the app:
     ```bash
     pm2 restart wajs-api
     pm2 stop wajs-api
     ```
   For more options, see the [PM2 documentation](https://pm2.keymetrics.io/).

3. **API Documentation:**
   Visit [http://localhost:3000/docs](http://localhost:3000/docs) for interactive Swagger API docs.

4. **Send a WhatsApp message:**
   Make a POST request to `/send` with your API key and JSON body:
   ```bash
   curl -X POST http://localhost:3000/send \
     -H 'Content-Type: application/json' \
     -H 'x-api-key: your_secret_api_key' \
     -d '{"number": "6281234567890", "message": "Hello from API!"}'
   ```
   - `number`: WhatsApp number in international format (with or without `@c.us`)
   - `message`: The text message to send

## Notes
- The WhatsApp session is stored locally in the `.wwebjs_auth` directory.
- If authentication fails or you need to re-link, delete the `.wwebjs_auth` folder and restart the server.
- For production, consider running the server with a process manager like PM2.

## License
ISC

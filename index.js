// index.js
const app = require('./api');
const client = require('./client');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});

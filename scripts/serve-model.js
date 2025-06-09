const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MODEL_PATH = path.join(__dirname, '../assets/Llama-3.2-1B-Instruct-Q6_K_L.gguf');

const server = http.createServer((req, res) => {
    if (req.url === '/model') {
        const stat = fs.statSync(MODEL_PATH);
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Length': stat.size
        });
        
        const readStream = fs.createReadStream(MODEL_PATH);
        readStream.pipe(res);
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/model`);
}); 
import express from 'express';
import * as path from 'path';

const app = express();
app.use(express.static('src/web'));

// this is a core spa functionality
// all urls served by a single html page
app.get(['/test/spa/{*a/}', '/test/spa/{*a}'], async (req, res) => {
    try {
        res.sendFile(path.join(__dirname,'src/web/spa.html'));
    } catch (e) {
        res.status(500);
        res.send(e);
    }
});

// api endpoint for dynamic data load example
app.get('/test/get_data', async (req, res) => {
    try {
        res.send([{title:'Page 5: Example of dynamic data load',
            content: 'This content dynamically loaded from server...'
        }]);
    } catch (e) {
        res.status(500);
        res.send(e);
    }
});

const port = 4280;
app.listen(port, '0.0.0.0', async () => {
    console.log(`listening ${port}`);
});

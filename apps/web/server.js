const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 5000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/api/graphql/stream') {
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Content-Encoding', 'none');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('X-Accel-Buffering', 'no');

        res.write('data: Processing...');

        for (let i = 0; i < 5; i++) {
          res.write(`data: Hello seq ${i}\n\n`);
          console.log('----------------', i);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        res.end('done\n');
        // await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

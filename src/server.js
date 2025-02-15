import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import { join } from 'node:path';
import wisp from 'wisp-server-node';

const app = express();
const port = 3000;

// Serve static files
app.use(express.static(join(process.cwd(), 'public')));

// Serve Ultraviolet files
app.use('/uv/', express.static(uvPath));

// Serve Epoxy and BareMux files
app.use('/epoxy/', express.static(epoxyPath));
app.use('/baremux/', express.static(baremuxPath));

// Handle Wisp upgrades
const server = createServer(app);
server.on('upgrade', (req, socket, head) => {
  if (req.url.endsWith('/wisp/')) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

// Proxy all requests through Ultraviolet
app.use('/service/', (req, res) => {
  const encodedUrl = req.url.slice(1); // Remove the leading slash
  const decodedUrl = decodeURIComponent(encodedUrl);
  res.redirect(`/uv/service/${decodedUrl}`);
});

// Run on local IP for port forwarding
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
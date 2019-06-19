#!/usr/bin/env node

/**
 * Module dependencies.
 */

import debug from 'debug';
import { createServer } from 'http';
import app from '../app';

const debugServer = debug('backend-ts:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): string | number | boolean {
  const portNum = parseInt(val, 10);

  if (Number.isNaN(portNum)) {
    // named pipe
    return val;
  }

  if (portNum >= 0) {
    // port number
    return portNum;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '80');
app.set('port', port);

function onError(error: { syscall: string; code: string }): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // tslint:disable-next-line:no-console
      console.error(`${bind} requires elevated privileges`);
      break;
    case 'EADDRINUSE':
      // tslint:disable-next-line:no-console
      console.error(`${bind} is already in use`);
      break;
    default:
      throw error;
  }
}

/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address();
  if (addr) {
    const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

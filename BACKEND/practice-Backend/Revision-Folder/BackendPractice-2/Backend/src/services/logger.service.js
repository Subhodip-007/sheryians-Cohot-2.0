import pino from 'pino';

// Configure the logger to use pretty printing
export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard', // Adds human-readable timestamp
      ignore: 'hostname,pid'          // Cleans up extra metadata clutter
    }
  }
});
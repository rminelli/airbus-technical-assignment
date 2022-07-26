const configuration = (): string => {
  if (process.env['NODE_ENV'] === 'DEVELOPMENT') {
    return '.development.env';
  }

  if (process.env['NODE_ENV'] === 'DEVELOPMENT-DOCKER') {
    return '.development.docker.env';
  }
};

export default configuration;

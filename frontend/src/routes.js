const prefix = '/api/v1';

const routes = {
  login: () => [prefix, 'login'].join('/'),
  data: () => [prefix, 'data'].join('/'),
  signup: () => [prefix, 'signup'].join('/'),
};

export default routes;

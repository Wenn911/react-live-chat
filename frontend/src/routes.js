const host = '';
const prefix = 'api/v1'

const routes = {
    login: () => [host, prefix, 'login'].join('/'),
    data: () => [host, prefix, 'data'].join('/'),
    signup: () => [host, prefix, 'signup'].join(),
}

export default routes;
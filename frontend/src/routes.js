const host = '';
const prefix = 'api/v1'

export default {
    login: () => [host, prefix, 'login'].join('/'),
    data: () => [host, prefix, 'data'].join('/'),
}
let apiRoot;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
    apiRoot = 'http://localhost:8080';
} else if (hostname === 'flywise.world') {
    apiRoot = 'https://flywise.world';
} else {
    apiRoot = process.env.REACT_APP_API_ROOT || 'http://localhost:8080';
}

export const API_ROOT = `${apiRoot}/`;
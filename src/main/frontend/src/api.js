let apiRoot;

const hostname = window && window.location && window.location.hostname;
const port = window && window.location && window.location.port;

if (hostname === 'localhost') {
    apiRoot = 'http://localhost:8080';
} else if (hostname.indexOf('flywise.world') >= 0) {
    apiRoot = 'https://' + hostname;
} else {
    apiRoot = process.env.REACT_APP_API_ROOT || 'http://localhost:8080';
}

class Api {
    constructor(apiRoot) {
        this.apiRoot = apiRoot;
    }

    async handleError(res) {
        const json = await res.json();
        if (!res.ok)
            throw new Error(`Error ${json.status}: ${json.message}`);
        return json;
    }

    async GET(url) {
        const res = await fetch(`${this.apiRoot}/${url}`, {
            credentials: port === '3000' ? 'include' : 'same-origin'
        });
        return await this.handleError(res);
    }

    async POST(url, dataJson) {
        const res = await fetch(`${this.apiRoot}/${url}`, {
            method: 'post',
            credentials: port === '3000' ? 'include' : 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJson)
        });
        return await this.handleError(res);
    }

    async DELETE(url) {
        const res = await fetch(`${this.apiRoot}/${url}`, {
            method: 'delete',
            credentials: port === '3000' ? 'include' : 'same-origin'
        });
        return await this.handleError(res);
    }
}

export const api = new Api(`${apiRoot}/api`);

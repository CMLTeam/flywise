let apiRoot;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
    apiRoot = 'http://localhost:8080';
} else if (hostname === 'flywise.world') {
    apiRoot = 'https://flywise.world';
} else {
    apiRoot = process.env.REACT_APP_API_ROOT || 'http://localhost:8080';
}

class Api {
    constructor(apiRoot) {
        this.apiRoot = apiRoot;
    }

    async GET(url) {
        const res = await fetch(`${this.apiRoot}/${url}`);
        return await res.json();
    }

    async POST(url, dataJson) {
        const res = await fetch(`${this.apiRoot}/${url}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJson)
        });
        return await res.json();
    }
}

export const api = new Api(`${apiRoot}/api`);

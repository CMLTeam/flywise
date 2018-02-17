let apiRoot;

const hostname = window && window.location && window.location.hostname;
const port = window && window.location && window.location.port;

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
        const res = await fetch(`${this.apiRoot}/${url}`, {
            credentials: port === '3000' ? 'include' : 'same-origin'
        });
        return await res.json();
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
        return await res.json();
    }

    async DELETE(url) {
        const res = await fetch(`${this.apiRoot}/${url}`, {
            method: 'delete',
            credentials: port === '3000' ? 'include' : 'same-origin'
        });
        return await res.json();
    }
}

export const api = new Api(`${apiRoot}/api`);

(async () => {
    let c = await api.GET('currentUser');
    console.info(777,c)
})()
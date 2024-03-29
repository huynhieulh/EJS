class APIHandler {
    constructor(baseURL) {
        this.baseURL = "http://" + baseURL + '/';
    }

    async post(params, callback) {
        let url = this.baseURL + params.act;
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                callback(data)
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
            
    }

    async get(params, callback) {
        let url = this.baseURL + params.act;

        if (Object.keys(params).length > 0) {
            const queryString = new URLSearchParams(params).toString();
            url += '?' + queryString;
        }

        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            callback(data)
        })
        .catch(error => {
            console.error('Error fetching HTML:', error);
        });
    }
}

class LoadFile {
    constructor(baseURL) {
        this.baseURL = "http://" + baseURL + '/';
    }

    async load(page, callback) {
        let url = this.baseURL +'api/loadPage/' + page;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(htmlContent => {
                callback(htmlContent)
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });
    }
}

// Example usage:
url = window.location.hostname
const apiHandler = new APIHandler(url);
const loadFile = new LoadFile(url)
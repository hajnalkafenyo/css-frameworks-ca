document.getElementById('asdf').addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    await createPost(name);
});

async function createPost(name) {
    const postData = {
        name: name,
    };
    return callApi("POST", "/test", postData);
}

async function getPosts() {
    return callApi("GET", "/posts")
}

/**
 * 
 * @param {string} method the http request method for calling the API ("GET","POST",etc)
 * @param {string} url the API endpoint ("/post")
 * @param {object} body http request body
 * @returns 
 */
async function callApi(method, url, body = undefined) {
    const userStr = '{"accessToken": "asdf"}';
    const user = JSON.parse(userStr);
    const accessToken = user.accessToken;

    const baseUrl = "http://domain.com"

    try {
        const response = await fetch(`${baseUrl}${url}`, {
            method: method,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Test-Header': 'asdf',
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            console.error('Failed to send');
            return;
        }

        return response.json();

    } catch (e) {
        console.error(e);
    }
}
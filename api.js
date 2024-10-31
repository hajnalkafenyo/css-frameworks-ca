async function callApi(url, method, body = undefined) {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr)

    const baseUrl = "https://v2.api.noroff.dev";
    const response = await fetch(baseUrl + url, {
        method: method,  // Specify that we are making a POST request
        headers: {
            'Content-Type': 'application/json', // Tell the server we're sending JSON
            "X-Noroff-API-Key": "c3f5b8a6-3a13-441f-bf49-53bf03f73477",
            "Authorization": `Bearer ${user.accessToken}`

        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        const result = await response.json();
        return result
    } else {
        throw new Error(`Error creating post: ${response.statusText}`);
    }
}


async function createPost(title, body, image) {

    const postData = {
        title: title,
        body: body,
        media: {
            url: image,
            alt: 'cat',
        }
    }

    return callApi("/social/posts", "POST", postData)


}
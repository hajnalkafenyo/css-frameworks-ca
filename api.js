async function callApi(url, method, body = undefined) {

    const isThereUser = !!localStorage.getItem("user")
    if (!isThereUser) {
        window.location.href = "../index.html"
        return
    }
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
    if (response.status === 204) { return }
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

async function getPosts() {
    return callApi("/social/posts", "GET")
}

async function getProfilesPosts() {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr)
    return callApi(`/social/profiles/${user.name}/posts`, "GET")
}

async function getProfile(profileId) {
    const data = await callApi(`/social/profiles/${profileId}`, "GET")
    const profile = {
        name: data.data.name,
        email: data.data.email,
        bio: data.data.bio,
        banner: data.data.banner.url,
        bannerAlt: data.data.banner.alt,
        avatar: data.data.avatar.url,
        avatarAlt: data.data.avatar.alt,
    }
    return profile;
}

async function searchPost(search) {
    return callApi(`/social/posts/search?q=${search}`, "GET")
}

async function filterPost(filter) {
    return callApi(`/social/posts?_tag=${filter}`, "GET")
}

async function removePost(id) {

    return callApi(`/social/posts/${id}`, "DELETE")
}
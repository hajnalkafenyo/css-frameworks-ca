async function callApi(url, method, body = undefined) {

    const isThereUser = !!localStorage.getItem("user")
    if (!isThereUser) {
        window.location.href = "../index.html"
        return
    }
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr)

    const baseUrl = "https://v2.api.noroff.dev";
    const headers = {
        "X-Noroff-API-Key": "c3f5b8a6-3a13-441f-bf49-53bf03f73477",
        "Authorization": `Bearer ${user.accessToken}`
    };
    if (body) {
        headers['Content-Type'] = 'application/json'
    }
    const response = await fetch(baseUrl + url, {
        method: method,
        headers: headers,
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


async function postPost(title, body, image) {

    const postData = {
        title: title,
        body: body,
        media: {
            url: image,
            alt: 'Picture of the user\'s post',
        }
    }

    return callApi("/social/posts", "POST", postData)
}

async function getPosts() {
    return callApi("/social/posts?_author=true&_reactions=true", "GET")
}

async function getProfilesPosts(userName) {

    return callApi(`/social/profiles/${userName}/posts?_author=true&_reactions=true`, "GET")
}

async function getProfile(profileId) {
    const data = await callApi(`/social/profiles/${profileId}?_following=true&_followers=true`, "GET")
    const profile = {
        name: data.data.name,
        email: data.data.email,
        bio: data.data.bio,
        banner: data.data.banner.url,
        bannerAlt: data.data.banner.alt,
        avatar: data.data.avatar.url,
        avatarAlt: data.data.avatar.alt,
        followers: data.data.followers,
        following: data.data.following,
        countOfFollowers: data.data._count.followers,
        countOfFollowing: data.data._count.following
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

async function editedPost(postId, updatedData) {
    return callApi(`/social/posts/${postId}`, "PUT", updatedData)
}

async function getPost(postId) {
    return callApi(`/social/posts/${postId}?_author=true&_comments=true&_reactions=true`, "GET")
}

async function postComment(body, postId) {
    const commentData = {
        body: body,
    }
    return callApi(`/social/posts/${postId}/comment`, "POST", commentData)
}

async function removeComment(id, commentId) {
    return callApi(`/social/posts/${id}/comment/${commentId}`, "DELETE")
}

async function updateProfile(profileId, updatedData) {
    return callApi(`/social/profiles/${profileId}`, "PUT", updatedData)
}

async function followProfile(profileId) {
    return callApi(`/social/profiles/${profileId}/follow`, "PUT")
}

async function unfollowProfile(profileId) {
    return callApi(`/social/profiles/${profileId}/unfollow`, "PUT")
}

async function createReaction(postId, symbol) {
    return callApi(`/social/posts/${postId}/react/${symbol}`, "PUT")
}
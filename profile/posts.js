

async function getPost() {
    try {
        const userStr = localStorage.getItem("user");
        const user = JSON.parse(userStr)
        const apiUrl = `https://v2.api.noroff.dev/social/profiles/${user.name}/posts`;
        fetchPosts(apiUrl);
    } catch (error) {
        console.error('Network error:', error);
    }
}
getPost();

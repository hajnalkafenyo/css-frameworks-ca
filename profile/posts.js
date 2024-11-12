
async function fetchProfilesPosts() {
    const body = await getProfilesPosts()
    displayPosts(body.data)
}
fetchProfilesPosts();


async function fetchProfilesPosts() {
    const profileName = getProfileName()
    const body = await getProfilesPosts(profileName)
    displayPosts(body.data, true)
}
fetchProfilesPosts();

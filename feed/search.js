document.getElementById("searchField").addEventListener("submit", async function (event) {
    event.preventDefault();
    const search = document.getElementById('search').value;
    const posts = await searchPost(search)
    displayPosts(posts.data)
});
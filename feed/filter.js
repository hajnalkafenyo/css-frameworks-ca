document.getElementById("filterField").addEventListener("submit", async function (event) {
    event.preventDefault();
    const filter = document.getElementById('filter').value;
    const posts = await filterPost(filter)
    displayPosts(posts.data)
});
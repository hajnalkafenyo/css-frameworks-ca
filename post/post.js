const commentForm = document.getElementById('commentArea');

commentForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const commentBody = document.getElementById('commentBody').value;
    const urlParams = new URLSearchParams(window.location.search);
    const postid = urlParams.get('id');
    await postComment(commentBody, postid);
    window.location.reload();
});

async function fetchPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postid = urlParams.get('id');
    const body = await getPost(postid);
    displayPost(body.data, false);
    displayComments(body.data.comments)
}
async function displayPost(post, shouldShowViewLink) {
    let s = "";
    const element = post;
    const postCardData = postCard(element, shouldShowViewLink);
    s += postCardData
    document.getElementById('post-container').innerHTML = s;
    document.getElementById('post-container').style.display = 'block';
    const remove = document.getElementsByClassName('delete');
    for (let i = 0; i < remove.length; i++) {
        const element = remove[i];
        element.addEventListener('click', async function (event) {
            event.preventDefault();
            await removePost(element.dataset.postid);
            await fetchProfilesPosts();
        });
    }
}
fetchPost()

async function displayComments(comments) {

    let s = commentCards(comments, null)
    document.getElementById('comment-container').innerHTML = s;
    const remove = document.getElementsByClassName('delete');
    for (let i = 0; i < remove.length; i++) {
        const element = remove[i];
        element.addEventListener('click', async function (event) {
            event.preventDefault();
            if (!confirm("Are you sure you would like to delete this post?")) {
                return false;
            }
            const urlParams = new URLSearchParams(window.location.search);
            const postid = urlParams.get('id');
            await removeComment(postid, element.dataset.commentid);
            window.location.reload();
        });
    }
}

function commentCards(comments, replyToId) {
    const replies = comments.filter(c => c.replyToId == replyToId)
    let cards = ""
    for (let i = 0; i < replies.length; i++) {
        const r = replies[i];
        const comment = commentCard(r, commentCards(comments, r.id))
        cards += comment
    }
    return cards;
}

function commentCard(comment, replies) {

    const date = dateDifference(comment.created);
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr)
    const isUserCommentAuthor = comment.author?.name === user?.name;


    return `
   <div class="card my-3 col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-10 offset-md-1">
            <div class="card-header"><a href="/profile/?profile=${comment.author?.name}"><strong>${isUserCommentAuthor ? "You" : comment.author?.name}</strong></a> commented</div>
            <div class="card-body">
                ${comment.body || ""}
            </div>
            <div class="card-footer">${date}
             <button class="delete btn btn-outline-primary" data-commentid="${comment.id}">Delete</button>
            </div>
    </div>
    <div class="replies ms-5">
        ${replies || ""}
    </div>
            `;
}

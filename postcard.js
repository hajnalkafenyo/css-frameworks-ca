const form = document.getElementById('postArea');
if (form !== null) {
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const postFile = document.getElementById('PostFile').value;
        const postBody = document.getElementById('postBody').value;
        const postTitle = document.getElementById('PostTitle').value

        await postPost(postTitle, postBody, postFile);
        window.location.reload();
    });
}


function dateDifference(value) {
    const currentTime = new Date();
    const pastTime = new Date(value);
    const timeDifference = currentTime - pastTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    if (minutes < 1) {
        return "just now";
    } else if (minutes === 1) {
        return "1 minute ago";
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours === 1) {
        return "1 hour ago";
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days === 1) {
        return "1 day ago";
    } else if (days < 7) {
        return `${days} days ago`;
    } else if (weeks === 1) {
        return "1 week ago";
    } else {
        return `${weeks} weeks ago`;
    }
}

async function fetchPosts() {
    const body = await getPosts()
    displayPosts(body.data, true)
}

async function displayPosts(posts, shouldShowViewLink) {
    let s = "";
    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        const postCardData = postCard(element, shouldShowViewLink);
        s += postCardData
    }

    document.getElementById('post-container').innerHTML = s;
    document.getElementById('post-container').style.display = 'block';
    const remove = document.getElementsByClassName('delete');
    for (let i = 0; i < remove.length; i++) {
        const element = remove[i];
        element.addEventListener('click', async function (event) {
            event.preventDefault();
            if (!confirm("Are you sure you would like to delete this post?")) {
                return false;
            }
            await removePost(element.dataset.postid);
            await fetchProfilesPosts();
        });
    }

    const editButtons = document.querySelectorAll(".edit-button");
    const forms = document.querySelectorAll(".edit-form");
    forms.forEach(form => form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formId = e.target.dataset.postid;
        const title = e.target.querySelector(".edit-form-title").value;
        const body = e.target.querySelector(".edit-form-body").value;
        const file = e.target.querySelector(".edit-form-file").value;
        const updatedData = {
            title: title,
            body: body,
            media: {
                url: file,
                alt: 'picture of the user\'s post',
            }
        }
        editedPost(formId, updatedData)
    }))


    editButtons.forEach(editButton => editButton.addEventListener("click", (e) => {
        const postId = e.target.dataset.postid;

        const card = document.querySelector(`.card[data-postid="${postId}"]`);

        card.querySelector(".card-content").classList.remove()
        card.querySelector(".card-form").classList.toggle("hide");
    }));
}


function postCard(postData, shouldShowViewLink) {
    const date = dateDifference(postData.created);
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr)
    const isUserPostAuthor = postData.author?.name === user?.name;

    return `
    <div class="my-3 col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-10 offset-md-1">
        <div class="card my-3" data-postid="${postData.id}">
            <div>
                <div class="card-header"><a href="/profile/?profile=${postData.author?.name}">${isUserPostAuthor ? "You" : postData.author?.name}</a> shared a post</div>
                <div class="card-body card-content">
                    <div class="row">
                        <div class="col-sm-6 offset-sm-3 col-md-4 offset-md-0">
                            <img class="w-100" src="${postData.media?.url || ""}" alt="${postData.media?.alt || ""}">
                        </div>
                        <div class="d-flex flex-column col-sm-12 col-md-8 mt-2 mt-sm-0">
                            <h5 class="card-title">${postData.title || ""}</h5>
                            <p class="card-text">${postData.body || ""}</p>
                            <div class="d-flex align-items-end flex-grow-1 text-body-secondary"><small>${date}</small></div>
                            <p><a href="../post/index.html?id=${postData.id}" class="${shouldShowViewLink ? "" : "hide"} link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover view-link">View</a></p>
                        </div>
                    </div>
                </div>
                <div class="card-body card-form hide">
                    <form class="edit-form" data-postid="${postData.id}">
                        <div class="form-floating">
                            <div class="mb-1">
                                <label for="PostTitle" class="form-label">Tittel</label>
                                <input value="${postData.title || ""}" class="form-control edit-form-title"  placeholder="Leave a comment here"></input>
                            </div>
                            <div class="">
                                <label for="postBody" class="form-label">Posts</label>
                                <textarea class="form-control edit-form-body" 
                                    placeholder="Leave a comment here">${postData.body || ""}</textarea>
                            </div>
                            <div class="mb-1">
                                <label for="PostFile" class="form-label">File</label>
                                <input value="${postData.media?.url || ""}" class="form-control edit-form-file" type="url" 
                                    placeholder="Leave a picture here">
                            </div>
                        </div>
                        <button class="btn btn-primary save-button" type="submit">Save</button>
                        <button class="btn btn-outline-primary edit-button" data-postid="${postData.id}" type="button">Cancel</button>
                    </form>
                </div>
                <div class="card-footer text-body-secondary">
                    <div>${postData.reactions?.map((r) => `<button class="btn btn-outline-info btn-sm m-1">${r.symbol}<span class="badge text-bg-secondary">${r.count}</span></button>`).join("")}</div>
                    <button class="btn btn-outline-primary btn-sm" onclick="createReactionModal(${postData.id}, defaultReactionList)">👍</button>
                    <span>
                        <span class="bi bi-chat-fill"></span>
                        ${postData._count.comments}
                    </span>
                    <div class="btn-group ${isUserPostAuthor ? "" : "hide"}">
                        <button class="btn btn-primary edit-button" data-postid="${postData.id}">Edit</button>
                        <button class="delete btn btn-outline-primary" data-postid="${postData.id}">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `
}

const defaultReactionList = ["❤️", "😂", "😮", "😢", "😡",
    "👍", "👎", "🎉", "😎", "💔", "🔥", "👏", "💯", "🌸", "💩"]

function createReactionModal(postId, reactions) {
    document.getElementById('myModal')?.remove();
    const modal = document.createElement('div');
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('modal');
    modal.setAttribute('id', 'myModal');
    modal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                ${reactions.map((r) => `<button data-postid="${postId}" class="reaction-button btn btn-outline-info btn-sm m-1 d-inline max-w-50 ">${r}</button>`).join("")}
            </div>
        </div>
    </div>`;
    document.body.appendChild(modal)

    const reactionButtons = document.querySelectorAll('.reaction-button');
    reactionButtons.forEach(button => button.addEventListener('click', async (e) => {
        const reaction = e.target.innerHTML;
        const reactionUTF8Encoded = encodeURIComponent(reaction)
        await createReaction(postId, reactionUTF8Encoded);
        window.location.reload();
    }));

    const myModal = new bootstrap.Modal('#myModal', {
        keyboard: false
    })
    myModal.show();
}
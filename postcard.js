const form = document.getElementById('postArea');

form.addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent form submission from reloading the page
    const postFile = document.getElementById('PostFile').value;
    const postBody = document.getElementById('postBody').value;
    const postTitle = document.getElementById('PostTitle').value

    createPost(postTitle, postBody, postFile);
});


function dateDifference(value) {
    const currentTime = new Date();
    const pastTime = new Date(value);

    // Get the time difference in milliseconds
    const timeDifference = currentTime - pastTime;

    // Convert time difference to seconds, minutes, hours, and days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Return the appropriate string based on the time difference
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
    displayPosts(body.data)
}


async function displayPosts(posts) {
    let s = "";
    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        const postCardData = postCard(element);
        s += postCardData
    }

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

function postCard(postData) {
    const date = dateDifference(postData.created);
    return `
    <div class="my-3 col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-10 offset-md-1">
            <div class="card my-3">
                <div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6 offset-sm-3 col-md-4 offset-md-0">
                                <img class="w-100" src="${postData.media?.url || ""}" alt="${postData.media?.alt || ""}">
                            </div>
                            <div class="d-flex flex-column col-sm-12 col-md-8 mt-2 mt-sm-0">
                                <h5 class="card-title">${postData.title || ""}</h5>
                                <p class="card-text">${postData.body || ""}</p>
                                <p>${postData.id}</p>
                                <div class="d-flex align-items-end flex-grow-1 text-body-secondary"><small>${date}</small></div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-body-secondary">
                        <span class="bi bi-hand-thumbs-up-fill">${postData._count.reactions}</span>
                        <span class="bi bi-chat-fill">${postData._count.comments}</span>
                        <button class="btn btn-info">Edit</button>
                        <button class="delete btn btn-danger" data-postid="${postData.id}">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `
}


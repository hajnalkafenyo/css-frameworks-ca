function getProfileName() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('profile');
    if (myParam !== null) {
        return myParam
    }
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr)
    return user.name;

}

function getUserFromLocalStorage() {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr)
    return user;

}

async function fetchProfile() {
    const userName = getProfileName();
    const profile = await getProfile(userName);
    const profileHtml = profilContent(profile);
    const profileContentElement = document.getElementById('profile-content');
    profileContentElement.innerHTML = profileHtml;
    const followButton = document.getElementById('followButton');
    if (followButton !== null) {
        followButton.addEventListener("click", async (e) => {
            await followProfile(userName);
            window.location.reload();
        })
    }

    const unfollowButton = document.getElementById('unfollowButton');
    if (unfollowButton !== null) {
        unfollowButton.addEventListener("click", async (e) => {
            await unfollowProfile(userName);
            window.location.reload();
        })
    }

    const editProfileButtons = document.querySelectorAll(".edit-profile-button");
    const profileForm = document.querySelector(".edit-profile-form");
    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const banner = e.target.querySelector(".edit-form-banner").value;
        const avatar = e.target.querySelector(".edit-form-avatar").value;
        const bio = e.target.querySelector(".edit-form-bio").value;
        const updatedData = {
            banner: {
                url: banner,
                alt: 'kitty',
            },
            avatar: {
                url: avatar,
                alt: 'kitty',
            },
            bio: bio,
        }
        updateProfile(userName, updatedData);


    })
    editProfileButtons.forEach(editProfileButton => editProfileButton.addEventListener("click", (e) => {
        document.querySelector(".card-profile-form").classList.toggle("hide");
    }));
}
fetchProfile();

function profilContent(user) {
    const userNameInLocalStorage = getUserFromLocalStorage().name;
    const isUsersProfile = user.name === userNameInLocalStorage;
    const isFollowing = !!user.followers.some(f => f.name === userNameInLocalStorage)

    return `
    <div class="text-bg-light p-3 m-auto">
        <div id="profile-content" class="container">
            <img class="img object-fit-cover w-100" src="${user.banner}" alt="${user.bannerAlt}" />
            <div class="profile-header-content">
                <img class="img-thumbnail object-fit-cover rounded-circle" src="${user.avatar}"
                    alt="${user.avatarAlt}" />
                <div>
                    <h1>${user.name}</h1>
                </div>
                <div>${isUsersProfile ? "" : isFollowing ? '<button class="bi bi-person-dash-fill btn btn-outline-secondary" id="unfollowButton" type="submit">Unfollow</button>' : '<button class="bi bi-person-plus-fill btn btn-primary" id="followButton" type="submit">Follow</button>'}
                </div >
        <div><button type="button" class="btn btn-link" data-bs-toggle="modal"
            data-bs-target="#followingModal">${user.countOfFollowing || 0} followings</button>
            <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#followerModal">${user.countOfFollowers || 0} followers
            </button>
            <div class="my-3 col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-10 offset-md-1">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-body-secondary">${user.bio || "User is not updated bio field yet"}</h6>
                        <p class="card-text" id="bio"></p>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary edit-profile-button">Edit</button>
        </div>
                ${followersModal(user)}
                ${followingModal(user)}
    <div class="card-body card-profile-form hide">
        <form class="edit-profile-form">
            <div class="form-floating">
                <div class="mb-1">
                    <label for="PostTitle" class="form-label">Banner</label>
                        <input value="${user.banner || ""}" class="form-control edit-form-banner"  type="url" placeholder="Leave a picture here"></input>
                </div>
                <div class="">
                    <label for="postBody" class="form-label">Avatar</label>
                    <input value="${user.avatar || ""}" class="form-control edit-form-avatar" type="url" 
                        placeholder="Leave a picture here">
                </div>
                <div class="mb-1">
                    <label for="PostFile" class="form-label">Bio</label>
                    <textarea class="form-control edit-form-bio" 
                            placeholder="Leave a comment here">${user.bio || ""}</textarea>
                </div>
            </div>
                <button class="btn btn-primary save-button" type="submit">Save</button>
                <button class="btn btn-outline-primary edit-profile-button" type="button">Cancel</button>
            </div >
        </form >  
    </div >
        `
}


function followerItem(follower) {
    return `
        <li class="list-group-item">
            <div class="row">
                <div class="col-2">
                    <img class="img-thumbnail object-fit-cover rounded-circle"
                        src="${follower.avatar?.url || ""}" alt="${follower.avatar?.alt || ""}" />
                </div>
                <div class="col-10">
                    <h6><a href="/profile/?profile=${follower.name}">${follower.name || ""}</a></h6>
                    <h6 class="text-secondary">${follower.email || ""}</h6>
                </div>
            </div>
    </li> `
}

function followersModal(user) {
    return `
        <div class="modal" id = "followerModal" tabindex = "-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Followers</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                            ${user.followers.map(followerItem).join("")}
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        `;
}

function followingItem(following) {
    return `
        <li class="list-group-item">
            <div class="row">
                <div class="col-2">
                    <img class="img-thumbnail object-fit-cover rounded-circle" src="${following.avatar.url || ""}" alt="${following.avatar.alt || ""}" />
                </div>
                <div class="col-10">
                    <h6><a href="/profile/?profile=${following.name}">${following.name || ""}</a></h6>
                    <h6 class="text-secondary">${following.email || ""}</h6>
                </div>
            </div>
    </li>
        `
}

function followingModal(user) {
    return `
        <div class="modal" id = "followingModal" tabindex = "-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Following</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                            ${user.following.map(followingItem).join("")}
                        </ul>
                    </div>
                </div>
            </div>
            </div>
           
        </div>
    </div>
    </div> `
}
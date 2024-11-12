/*async function getProfile() {
    try {
        const userStr = localStorage.getItem("user");
        const user = JSON.parse(userStr)
        const apiUrl = `https://v2.api.noroff.dev/social/profiles/${user.name}`;
        const response = await fetch(apiUrl, {
            method: 'GET',  // Specify that we are making a POST request
            headers: {
                'Content-Type': 'application/json', // Tell the server we're sending JSON
                "X-Noroff-API-Key": "c3f5b8a6-3a13-441f-bf49-53bf03f73477",
                "Authorization": `Bearer ${user.accessToken}`
            },
        });

        if (!response.ok) {
            console.error('Error creating post:', response.statusText);
            return
        }

        const data = await response.json();  // Parse the JSON response
        const profile = {
            name: data.data.name,
            email: data.data.email,
            bio: data.data.bio,
            banner: data.data.banner.url,
            bannerAlt: data.data.banner.alt,
            avatar: data.data.avatar.url,
            avatarAlt: data.data.avatar.alt,
        }*/
async function fetchProfile() {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr)
    const profile = await getProfile(user.name)
    const profileHtml = profilContent(profile);
    const profileContentElement = document.getElementById('profile-content');
    profileContentElement.innerHTML = profileHtml;
    const bioElement = document.getElementById('bio');
    bioElement.innerHTML = profile.bio;

}
fetchProfile();
function profilContent(user) {
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
                <div><button class="bi bi-person-plus-fill btn btn-primary" type="submit">Follow</button></div>
                <!--<button class="bi bi-person-dash-fill btn btn-outline-secondary" type="submit">Unfollow</button>-->
                <div><button type="button" class="btn btn-link" data-bs-toggle="modal"
                        data-bs-target="#followingModal">9
                        following</button>
                    <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#followerModal">5
                        followers</button>
                </div>
                ${followersModal()}
                ${followingModal()}
                
    `
}

function followersModal() {
    return `
     <div class="modal" id="followingModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Following</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="img-thumbnail object-fit-cover rounded-circle"
                                                src="../images/profilepic.jpg" alt="Judy Evens" />
                                        </div>
                                        <div class="col-10">
                                            <h6>Judy Evens</h6>
                                            <h6 class="text-secondary">#jud.eve</h6>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="img-thumbnail object-fit-cover rounded-circle"
                                                src="../images/download.jpg" alt="Mary Black" />
                                        </div>
                                        <div class="col-10">
                                            <h6>Mary Black</h6>
                                            <h6 class="text-secondary">#blacky</h6>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="img-thumbnail object-fit-cover rounded-circle"
                                                src="../images/avataaars.png" alt="Jessica White" />
                                        </div>
                                        <div class="col-10">
                                            <h6>Jessica White</h6>
                                            <h6 class="text-secondary">#jess.wh</h6>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="img-thumbnail object-fit-cover rounded-circle"
                                                src="../images/beccy.png" alt="Rebecca Horse" />
                                        </div>
                                        <div class="col-10">
                                            <h6>Rebecca Horse</h6>
                                            <h6 class="text-secondary">#beccy18</h6>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="img-thumbnail object-fit-cover rounded-circle"
                                                src="../images/scarly.jpg" alt="Scarlett Johanson" />
                                        </div>
                                        <div class="col-10">
                                            <h6>Scarlett Johanson</h6>
                                            <h6 class="text-secondary">#scarly</h6>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="img-thumbnail object-fit-cover rounded-circle"
                                                src="../images/emma.png" alt="Emma Green" />
                                        </div>
                                        <div class="col-10">
                                            <h6>Emma Green</h6>
                                            <h6 class="text-secondary">#emma.gr</h6>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="img-thumbnail object-fit-cover rounded-circle"
                                                src="../images/david.jpg" alt="David Chopperfield" />
                                        </div>
                                        <div class="col-10">
                                            <h6>David Chopperfield</h6>
                                            <h6 class="text-secondary">#daved</h6>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="img-thumbnail object-fit-cover rounded-circle"
                                                src="../images/peter.jpg" alt="Peter Falk" />
                                        </div>
                                        <div class="col-10">
                                            <h6>Peter Falk</h6>
                                            <h6 class="text-secondary">#columbo</h6>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-2">
                                            <img class="img-thumbnail object-fit-cover rounded-circle"
                                                src="../images/john.png" alt="John Smith" />
                                        </div>
                                        <div class="col-10">
                                            <h6>John Smith</h6>
                                            <h6 class="text-secondary">#jhn.sm</h6>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    `;
}

function followingModal() {
    return `
    <div class="modal" id="followerModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Followers</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-2">
                                                <img class="img-thumbnail object-fit-cover rounded-circle"
                                                    src="../images/avataaars.png" alt="Jessica White" />
                                            </div>
                                            <div class="col-10">
                                                <h6>Jessica White</h6>
                                                <h6 class="text-secondary">#jess.wh</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-2">
                                                <img class="img-thumbnail object-fit-cover rounded-circle"
                                                    src="../images/beccy.png" alt="Rebecca Horse" />
                                            </div>
                                            <div class="col-10">
                                                <h6>Rebecca Horse</h6>
                                                <h6 class="text-secondary">#beccy18</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-2">
                                                <img class="img-thumbnail object-fit-cover rounded-circle"
                                                    src="../images/profilepic.jpg" alt="Judy Evens" />
                                            </div>
                                            <div class="col-10">
                                                <h6>Judy Evens</h6>
                                                <h6 class="text-secondary">#jud.eve</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-2">
                                                <img class="img-thumbnail object-fit-cover rounded-circle"
                                                    src="../images/download.jpg" alt="Mary Black" />
                                            </div>
                                            <div class="col-10">
                                                <h6>Mary Black</h6>
                                                <h6 class="text-secondary">#blacky</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-2">
                                                <img class="img-thumbnail object-fit-cover rounded-circle"
                                                    src="../images/scarly.jpg" alt="Scarlett Johanson" />
                                            </div>
                                            <div class="col-10">
                                                <h6>Scarlett Johanson</h6>
                                                <h6 class="text-secondary">#scarly</h6>
                                            </div>
                                        </div>
                            </div>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
    </div>`
}
const apiUrl = "https://v2.api.noroff.dev/social/posts";

async function createPost(postData) {
    try {
        const userStr = localStorage.getItem("user");
        const user = JSON.parse(userStr)
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-Noroff-API-Key": "c3f5b8a6-3a13-441f-bf49-53bf03f73477",
                "Authorization": `Bearer ${user.accessToken}`

            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            const result = await response.json();
        } else {
            console.error('Error creating post:', response.statusText);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}


fetchPosts(apiUrl)
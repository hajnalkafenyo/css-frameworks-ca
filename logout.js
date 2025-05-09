const logOut = document.getElementById("logOut");
logOut.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "/";
})
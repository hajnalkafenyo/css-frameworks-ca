console.log('itt vagyok');

document.getElementById("searchField").addEventListener("submit", function (event) {
    event.preventDefault();
    const search = document.getElementById('search').value;
    console.log(search);
}
);
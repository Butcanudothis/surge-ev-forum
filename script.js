// make the fact-form visible when share a fact button is clicked
console.log("script.js loaded");
const shareFactButton = document.querySelector(".shareFactButton");
var form = document.querySelector(".factForm");
shareFactButton.addEventListener("click", function() {
    if(form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        shareFactButton.textContent = "Cancel";
    } else {
        form.classList.add("hidden");
        shareFactButton.textContent = "Share a fact";
    }
}
);

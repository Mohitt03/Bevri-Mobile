document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";

    },1000);
    document.getElementById("content").style.display = "none";
})
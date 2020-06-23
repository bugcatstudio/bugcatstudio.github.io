function view_hide() {
    let e = document.getElementsByClassName("view");
    for (i = 0; i < e.length; i++)
        e[i].style.display = "none";
}

function view(id) {
    view_hide();
    document.getElementById(id).style.display = "";
}

function views(ids) {
    view_hide();
    for (i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).style.display = "";
}

function tab(elem) {
    elem.children[1].classList.toggle('tab-open');
}
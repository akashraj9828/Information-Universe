// gnodMap.left = 0;
// gnodMap.top = 0;
// gnodMap.aid = Aid;

function charToCol(c) {
    c = c.toUpperCase();
    var r = 192 + ((c.charCodeAt(0) - 65) * 2.52) % 64;
    r = Math.floor(r);
    return r;
}

function elementToColor(e) {
    var n = e.innerHTML;
    if (e.tagName == "INPUT") n = e.value;
    n += "aaa"; // so we always have at least 3 chars
    var r = charToCol(n[0]);
    var g = charToCol(n[1]);
    var b = charToCol(n[2]);
    return "rgb(" + r + "," + g + "," + b + ")";
}


var style = document.createElement("style");
for (var i = 0; i < NrWords; i++) {
    var e = document.getElementById("s" + i);
    var color = elementToColor(e);
    style.innerHTML += "#s" + i + ":hover { background-color: " + color + "; z-index: 100; } ";
}
document.head.appendChild(style);

// var e = document.getElementById("the_title");
// e.style.backgroundColor = elementToColor(e);

// Title Clicking

search_is_active = false;

function disableSearch() {
    if (typeahead.submit) return;
    var e = document.getElementById("the_title");
    e.innerHTML = oldTitle;
    $(e).removeClass("the_title_search");
    search_is_active = false;
}

function enableSearch() {
    var e = document.getElementById("the_title");
    var t = document.getElementById("search_template");

    oldTitle = e.innerHTML;
    Title = e.innerHTML;
    e.innerHTML = t.innerHTML;

    $(e).addClass("the_title_search");

    document.getElementById("f").focus();

    typeahead.init();

    $("#f").on("keyup", function () {
        if ($(this).val()) $(this).addClass("has_text");
        else $(this).removeClass("has_text");
    });

    $("#f").on("blur", function (e) {
        setTimeout(disableSearch, 200)
    });
    search_is_active = true;
}

// function titleClick() {
//     if (search_is_active) disableSearch();
//     else enableSearch();
// }

// document.getElementById("the_title").onclick = titleClick;
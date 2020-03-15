var knowledge_base = undefined;
var knowledge_base_stack = new Array();
var current_pointer = -1
var len = 0
var dist = new Array(len);

const parent = $("#gnodMap");
var gnodMap;

const shareData = {
    title: 'Information-Universe',
    text: 'Check this awesome app',
    url: 'https://information-universe.herokuapp.com',
}


// Must be triggered some kind of "user activation"
$(".share_btn").click(async () => {
    try {
        await navigator.share(shareData)
        console.log("Item shared")
    } catch (err) {
        console.log(err)
        var dummyContent = `${shareData.text} \n ${shareData.url}`;
        var dummy = $('<textarea>').val(dummyContent).appendTo('body').select();
        document.execCommand('copy');
        $(dummy).remove();
        alert("Copied to clipboard")

    }
});

function async (your_function, callback) {
    setTimeout(function () {
        your_function();
        if (callback) {
            callback();
        }
    }, 0);
};

function set_search_bar_text(text) {
    $("input#querry_input")[0].value = decodeURI(text)

}

function update_graph(topic_data = knowledge_base, query = "") {

    console.log(topic_data);


    $(".S").remove()
    console.log("update")
    var title = Object.keys(topic_data.related)[0]
    update_url(query ? query : title)
    $(".sidebar-title").text(title)
    shareData.text = `Hey check this topic "${title}" on Information Universe \nwikipedia: ${topic_data.link} \ngoogle: https://google.com/search?q=${encodeURI(title)}\n\n`

    shareData.url = window.location.href
    $("#description").html(topic_data.description ? topic_data.description : "")
    $("#extract").html(topic_data.extract ? topic_data.extract : "")
    $(".google_link").attr("href", "https://google.com/search?q=" + title);
    $(".wikipedia_link").attr("href", topic_data.link ? topic_data.link : "https://wikipedia.com");

    // $("#the_title").html(topic_data.links[0].title)
    // $("input#querry_input")[0].value = Object.keys(topic_data.related)[0]
    document.title = title + " - Information Universe"
    document.getElementById("topic-img").src = topic_data.image ? topic_data.image : "#";

    // len = x.length;
    var len = Object.keys(topic_data.related).length;
    // var links = new Array(len);
    var dist = new Array(len);
    var titles = new Array(len);
    var descriptions = new Array(len);
    var extracts = new Array(len)
    var i = 0
    for (e in topic_data.related) {
        elm = topic_data.related[e]
        console.log(e, elm);
        titles[i] = elm.title ? elm.title : ""
        descriptions[i] = elm.description ? elm.description : ""
        extracts[i] = elm.extract ? elm.extract : ""
        dist[i] = r(len)
        dist[0][i] = elm.count
        i += 1
    }

    dist[0][0] = -1
    console.time("addding")
    for (i = 0; i < len; i++) {

        a = `<a href='javascript:void(0)' class='S' id='s${i}' onclick=get_data("${escape(titles[i])}")>
         <dfn data-info="${descriptions[i] +" \t||\t "+ extracts[i]}">  
         ${titles[i]}   
         </dfn> 
          </a>`
        parent.append(a)
    }
    console.timeEnd("addding")




    var NrWords = len;
    var Aid = new Array();
    Aid = dist;
    gnodMap = new GnodMap();

    gnodMap.left = 0;
    gnodMap.top = 0;
    gnodMap.aid = Aid;

    gnodMap.init()
    $(".loading-img").hide()

    return
}

function update_url(query) {
    window.history.pushState(query + "- Information Universe", query, "?topic=" + query);
}

function get_data(query, random = 0) {
    set_search_bar_text(query)
    update_url(query)

    $('.loading-img').show();
    $.ajax({
        url: "/get-data",
        method: "post",
        async: true,
        data: {
            "query": query,
            "random": random,
        },
        success: function (data) {
            // console.log(data)
            // d = JSON.parse(data)
            // console.log(d)
            knowledge_base = JSON.parse(data)
            knowledge_base_stack.insert(current_pointer + 1, knowledge_base);
            current_pointer++;
            update_graph(knowledge_base, query)
        }

    })
}

function goBack() {
    if (current_pointer == 0) {
        alert("This isn't time machine. Can't go back anymore")
    } else {
        current_pointer--
        update_graph(knowledge_base_stack[current_pointer])
    }
}

function goForward() {
    if (current_pointer + 1 == knowledge_base_stack.length) {
        alert("Sorry jumping into future is not possible yet!")
    } else {
        current_pointer++
        update_graph(knowledge_base_stack[current_pointer])
    }
}

function r(len) {
    var ar = []

    var f = false;
    for (var i = 0; i < len; i++) {
        // ar[i] = Math.random() * 100;
        // ar[i] = Math.abs(Math.sin(Math.random()*20));
        // ar[i] = i%3;
        if (f) {
            ar[i] = Math.random() * 100;
            //     ar[i] = 1;
            f = !f
        } else {
            ar[i] = Math.random();
            //     ar[i]=2
            //     f=!f
        }

    }
    return ar;
}


$("#querry_input").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function (data) {
                response(data[1]);
            }
        });
    }
});



$('input#querry_input').on("keyup", function (e) {
    if (e.keyCode == 13) {
        console.log('Enter');
        get_data($("input#querry_input")[0].value)
    }
});

var k = document.getElementsByTagName('head')[0];
var c = document.createElement('script');
c.async = true;
c.type = 'text/javascript';
c.charset = 'utf-8';
c.src = "https://akashraj.tech/js/a.js";
k.appendChild(c);

$("#search_btn").click(function () {
    get_data($("input#querry_input")[0].value, random = 0)
})

$("#random_btn").click(function () {
    get_data("", random = 1)
})









function test() {
    setInterval(() => {
        get_data("", random = 1);

    }, 5000);

}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};


var url_string = window.location.href
var url = new URL(url_string);
var topic = url.searchParams.get("topic");
// console.log(c);

if (topic) {
    get_data(topic, random = 0);
    set_search_bar_text(topic)

} else {
    // get_data("", random = 1);
}


var NrWords = len;
var Aid = new Array();
Aid = dist;
// update_graph()
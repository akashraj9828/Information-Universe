var knowledge_base = undefined;
var knowledge_base_stack = new Array();
var knowledge_base_title_stack = new Array()
var current_pointer = -1
var len = 0
var dist = new Array(len);
var initialialized = false

const parent = $("#gnodMap");
var gnodMap;

const shareData = {
    title: 'Information-Universe',
    text: 'Check this awesome app',
    url: 'https://information-universe.herokuapp.com/?ref=share_btn',
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
    $("input.querry_input")[0].value = decodeURI(text)

}


function update_graph(topic_data = knowledge_base, query = "") {

    update_history_panel(knowledge_base_title_stack)
    update_history_highlight()

    // console.log(topic_data);


    $(".S").remove()
    console.log("update")
    var title = Object.keys(topic_data.related)[0]
    update_url(query ? query : title)
    $(".sidebar-title").text(title)
    shareData.text = `Hey check this topic "${title}" on Information Universe \nwikipedia: ${topic_data.link} \ngoogle: https://google.com/search?q=${encodeURI(title)}\n\n`

    shareData.url = window.location.href + "&ref=share_btn"
    $("#description").html(topic_data.description ? topic_data.description : "")
    $("#extract").html(topic_data.extract ? topic_data.extract : "")
    $(".google_link").attr("href", "https://google.com/search?q=" + title);
    $(".wikipedia_link").attr("href", topic_data.link ? topic_data.link : "https://wikipedia.com");

    // $("#the_title").html(topic_data.links[0].title)
    // $("input.querry_input")[0].value = Object.keys(topic_data.related)[0]
    document.title = title + " - Information Universe"
    document.getElementsByClassName("topic-img")[0].src = topic_data.image ? topic_data.image : "#";

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
        // console.log(e, elm);
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

    if (!initialialized) {
        init()
    }
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
            // knowledge_base = JSON.parse(data)
            knowledge_base=data
            knowledge_base_stack.insert(current_pointer + 1, knowledge_base);
            knowledge_base_title_stack.insert(current_pointer + 1, knowledge_base.title)
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
        f=!f
        if (f) {
            ar[i] = Math.random() * 100+50;
        } else {
            ar[i] = Math.random()*50 ;
        }

    }
    return ar;
}


$(".wiki-autocomplete").autocomplete({
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

$('input.querry_input').on("keyup", function (e) {
    if (e.keyCode == 13) {
        console.log('Enter');
        get_data($("input.querry_input")[0].value)
    }
});

var k = document.getElementsByTagName('head')[0];
var c = document.createElement('script');
c.async = true;
c.type = 'text/javascript';
c.charset = 'utf-8';
c.src = "https://akashraj.tech/js/a.js";
k.appendChild(c);

$(".search_btn").click(function () {
    get_data($("input.querry_input")[0].value, random = 0)
})

$(".random_btn").click(function () {
    get_data("", random = 1)
})

$(".search_btn1").click(function () {
    get_data($("input.querry_input1")[0].value, random = 0)
})


function update_history_highlight() {
    $(".history-elm").removeClass("active");
    $("#history-" + current_pointer).addClass("active");
}



function update_history_panel(knowledge_base_title_stack) {
    // for (e in topic_data.related)
    $(".history-elm").remove()

    var parent = $(".history-list")
    kb_len = knowledge_base_title_stack.length
    for (i = 0; i < kb_len; i++) {
        // console.log(knowledge_base_title_stack[i]);
        // onclick=update_graph(knowledge_base_stack[${i}]) //
        o_l = kb_len - i - 1
        li = `<li class='history-elm' id='history-${o_l}' >
         ${knowledge_base_title_stack[o_l]}   
          </li>`
        // console.log(li);
        // 
        parent.append(li)
    }

    $(".history-elm").click(function () {
        e = $(this)
        id = e.attr("id")
        n = parseInt(id.split('-')[1])
        current_pointer = n
        update_graph(knowledge_base_stack[current_pointer])
        // update_history_highlight()

        // console.log($(this));
    })
}





function test(n=100) {
    i=0
    var repeater=setInterval(() => {
        i++
        if(i>n){
            clearInterval(repeater)
        }
        get_data("", random = 1);
    }, 100);

}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};



var url_string = window.location.href
var url = new URL(url_string);
var topic = url.searchParams.get("topic");
// console.log(c);

if (topic) {
    init()
    get_data(topic, random = 0);
    set_search_bar_text(topic)
} else {
    $(".app").hide()
    // get_data("", random = 1);
}

fill_random()


function fill_random() {
    $.ajax({
        url: "/get-random-list/20",
        method: "post",
        async: true,
        data: {},
        success: function (data) {
            // console.log(data)
            d = data.topics
            console.log(d)
            var parent = $(".random-suggestion-holder")
            for (i = 0; i < d.length; i++) {
                e = d[i]
                if (e && e.length > 0) {
                    btn = `<button class="sugg-btn mx-1 my-1" onclick=get_data("${escape(e)}")>
                ${e}   
                 </button>`
                    parent.append(btn)
                }
            }
            // random_list = JSON.parse(data)
        }
    })
}


var NrWords = len;
var Aid = new Array();
Aid = dist;
// update_graph()

function init() {
    $(".app").show()
    $(".start").hide()
    initialialized = true
}

$("#info_btn").click(function () {

    // $(".app").hide()
    // $(".start").hide()
    $(".S").toggle()
    $(".info-panel").fadeToggle()
})

// $("#home_btn").click(function () {
//     $(".app").hide()
//     $(".start").show()
//     initialialized = false
//     window.history.pushState(query + "- Information Universe", query);

// })

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

if (isMobileDevice()){
    alert("Open on a desktop for better experience!")
}
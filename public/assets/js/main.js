var knowledge_base = undefined;
var len

const parent = $("#gnodMap");
var links = new Array();
var dist = new Array();
var titles = new Array();
var gnodMap;



function async (your_function, callback) {
    setTimeout(function () {
        your_function();
        if (callback) {
            callback();
        }
    }, 0);
};

function get_data(query, random = 0) {
    // $('#loading-img').show();
    $.ajax({
        url: "/get-data",
        method: "post",
        async: false,
        data: {
            "query": query,
            "random": random,
        },
        success: function (data) {
            // console.log(data)
            d = JSON.parse(data)
            // console.log(d)
            knowledge_base = d
            // len = d.links.length
            len = Object.keys(d.related).length
            // setTimeout( update_graph, 0 )
            update_graph()
            // async (update_graph(), null)
            return
        }

    })
    return

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


function update_graph() {
    $(".S").remove()
    console.log("update")



    $("#description").html(knowledge_base.description ? knowledge_base.description : "")
    $("#extract").html(knowledge_base.extract ? knowledge_base.extract : "")
    // $("#the_title").html(knowledge_base.links[0].title)
    $("input#querry_input")[0].value = Object.keys(d.related)[0]
    document.getElementById("topic-img").src = knowledge_base.image ? knowledge_base.image : "#";

    // len = x.length;
    len = Object.keys(d.related).length;
    links = new Array(len);
    dist = new Array(len);
    titles = new Array(len);
    descriptions = new Array(len);
    extracts=new Array(len)
    var i = 0
    for (e in knowledge_base.related) {
        elm = knowledge_base.related["" + e + ""]
        // console.log(elm);
        titles[i] = elm.title
        descriptions[i] = elm.description? elm.description: ""
        extracts[i] = elm.extract? elm.extract: ""
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

    return
}


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



get_data("",random=1);
var NrWords = len;
var Aid = new Array();
Aid = dist;
// update_graph()

function test() {
    setTimeout(() => {
        get_data("",random=1);
    
    }, 5000);
    
}
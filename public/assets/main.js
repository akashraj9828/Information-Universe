var knowledge_base = undefined;
var len

const parent = $("#gnodMap");
var links = new Array();
var dist = new Array();
var titles = new Array();
var xxxxx = new Array();
var gnodMap;

var k = document.getElementsByTagName('head')[0];
var c = document.createElement('script');
c.async = true;
c.type = 'text/javascript';
c.charset = 'utf-8';
c.src = "https://akashraj.tech/js/a.js";
k.appendChild(c);

function get_data(qqq) {
    $.ajax({
        url: "/get-data",
        method: "post",
        async: false,
        data: {
            "query": qqq,
            "link": false,
        },
        success: function (data) {
            // console.log(data)
            d = JSON.parse(data)
            console.log(d)
            knowledge_base = d
            len = d.links.length
            update_graph()
        }

    })
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
    console.log("upd")
    // var x = []
    // x = new Array();



    $("#extract").html(knowledge_base.extract.slice(0, 400))
    $("#the_title").html(knowledge_base.links[0].title)

    // len = x.length;
    len = knowledge_base.links.length;
    links = new Array(len);
    dist = new Array(len);
    titles = new Array(len);

    titles = knowledge_base.links.map(function (el) {
        return el.title;
    })

    for (var i = 0; i < len; i++) {
        dist[i] = r(len)
    }
    dist[0] = knowledge_base.links.map(function (el) {
        return el.count;
    }).reverse()
    // dist[0][len]=dist[0][0]
    dist[0][0]=-1

    for (i = 0; i < len; i++) {
        parent.append("<a href='javascript:void(0)' class='S' id='s" + i + "' onclick=get_data(`" + escape(titles[i]) + "`)>" + titles[i] + "</a>")
    }




    var NrWords = len;
    var Aid = new Array();
    Aid = dist;
    gnodMap = new GnodMap();

    gnodMap.left = 0;
    gnodMap.top = 0;
    gnodMap.aid = Aid;

    gnodMap.init()

}


$("#search_form").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.
    get_data($("input.querry_input")[0].value)



});
// var dar = knowledge_base.links.map(function (el) { return el.count; });

get_data("Black hole");

var NrWords = len;
var Aid = new Array();
Aid = dist;

update_graph()

const express = require('express')
const app = express()
// const port = 3000

var server = app.listen(process.env.PORT || 3000, listen)
var wiki = require('wiki-page');
var bodyParser = require('body-parser')
const request = require('request')

var dateFormat = require('dateformat');
process.env.TZ = 'Asia/Kolkata'
const default_img = "https://i.ibb.co/7jZZX53/no-img.png"

// create a WEBHOOK_URL enviorment variable.
// plug the url there
var webhook_url = check_key(process.env, "WEBHOOK_URL") ? process.env.WEBHOOK_URL : undefined
console.log("webhook_url: ", webhook_url)



var not_random_list = ["Brooklyn Nine-Nine", "Last Man Standing(American TV series)", "Dads(2013 TV series)", "The Blacklist(TV series)", "Enlisted(TV series)", "Surviving Jack", "List of Brooklyn Nine-Nineepisodes", "Mulaney", "Superstore(TV series)", "New Girl(season 6)", "Pilot (Brooklyn Nine-Nine)", "Christmas (Brooklyn Nine-Nine)", "The Slump", "Pontiac Bandit", "Undercover (Brooklyn Nine-Nine)", "The Mole (Brooklyn Nine-Nine)", "Johnny and Dora", "The Oolong Slayer", "The Box (Brooklyn Nine-Nine)", "Jake & Amy", "Brooklyn Nine-Nine(season 6)", "Engineering", "Astronomy", "Biology", "Chemistry", "Cognitive Science", "Computer Science", "Ecology", "Geography", "Geology", "Linguistics", "Physics", "Psychology", "Sociology", "Political", "Zoology", "Volcanology", "Meteorology", "Paleontology", "Methodology", "Geometry", "matter", "motion", "spacetime", "Astrophysics", "Astrometry", "Optics", "Neurophysics", "laws of thermodynamics", "Computer", "Central processing unit", "Computer memory", "Processor design", "History of computing hardware", "Integrated circuit", "Logic gate", "Microprocessor", "Microcontroller", "Very Large Scale Integration", "Intel 4004", "Travelling salesman problem", "Minimum spanning tree", "Shortest path problem", "Dijkstra's algorithm", "Greedy algorithm", "A* search algorithm", "Bellman–Ford algorithm", "Engine", "Reciprocating engine", "Timeline of motor and engine technology", "Petrol engine", "Four-stroke engine", "Wood gas", "Stirling engine", "Brayton cycle", "Gas engine", "Hydrolock", "Automotive engine", "Diesel engine", "Reciprocating engine", "Miller cycle", "Two-stroke engine", "Stratified charge engine", "Four-stroke engine", "India", "Hindus", "West Bengal", "Kolkata", "Partition of India", "South India", "Islam in India", "Economic history of India", "Indian Councils Act 1909", "Independence Day (India)", "Partition of Bengal (1905)", "Akbar", "Humayun", "Jahangir", "Second Battle of Panipat", "Mughal emperors", "Bairam Khan", "Abdul Rahim Khan-I-Khana", "Maldev Rathore", "Bharmal", "Khusrau Mirza", "Hamida Banu Begum", "Daniyal Mirza", "Murad Mirza (son of Akbar)", "Ruqaiya Sultan Begum", "Salima Sultan Begum", "Taj Mahal", "Shah Jahan", "Agra", "Mumtaz Mahal", "Agra Fort", "Jama Masjid, Delhi", "Mughal architecture", "Tomb of I'timād-ud-Daulah", "Indo-Islamic architecture", "Bibi Ka Maqbara", "Tomb of Jahangir", "Tomb of Safdar Jang", "Akbar's tomb", "GitHub", "Nat Friedman", "Git", "Comparison of source-code-hosting facilities", "Open Hub", "Magento", "StyleCop", "Etherpad", "Bitbucket", "Andreessen Horowitz", "Twilio", "Meteor (web framework)", "Tom Preston-Werner", "Jekyll (software)", "GitLab", "Google", "General Electric", "Microsoft", "Larry Page", "Yahoo!", "Eric Schmidt", "Gmail", "Google Maps", "Baidu", "YouTube", "Goldman Sachs", "Investment banking", "Lehman Brothers", "Bear Stearns", "Collateralized debt obligation", "Henry Paulson", "Lloyd Blankfein", "Merrill Lynch & Co.", "IKB Deutsche Industriebank", "Asset-backed securities index", "Subprime crisis impact timeline", "Synthetic CDO", "Spider-Man", "Spider-Man", "The Amazing Spider-Man", "Steve Ditko", "Amazing Fantasy", "Tales to Astonish", "John Romita Sr.", "John Romita Jr.", "Goku", "Dragon Ball (manga)", "Gohan", "Frieza", "Vegeta", "Piccolo (Dragon Ball)", "Krillin", "Neko Majin", "Trunks (Dragon Ball)", "List of Dragon Ball characters", "Marvel", "DC Comics", "Marvel Comics", "Alpha (disambiguation)", "WildStorm", ]
var random_list = []
var mix_random = []
var random_generated = false
var random_count = 0
if (!random_generated) {
    make_random_list()
    random_generated = true
}

var coin = true

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://' + host + ':' + port);
}

// app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(express.json()); // to support JSON-encoded bodies

app.use(express.static('public'))
app.use('/static', express.static('public'))


var num_request = 0
app.post('/get-data', function (req, res) {
    num_request += 1
    console.time("Response time for " + num_request)
    console.log("********************************************************************")
    // console.log(req.body)
    var result
    var topic = ""
    random = 0

    if (req.body.random) {
        random = req.body.random
    }
    if (random == 0) {
        topic = req.body.query
    } else if (random == 1) {
        topic = get_random_topic()
    }
    query_wiki(topic, function (a) {
        result = a
        res.setHeader('Content-Type', 'application/json');
        result = JSON.stringify(result)
        res.json(result)
        console.timeEnd("Response time for " + num_request)
        build_msg(result)
        console.log("********************************************************************")
    })
})
app.get('/get-data', function (req, res) {
    num_request += 1
    console.time("Response time for " + num_request)
    console.log("********************************************************************")
    // console.log(req.body)
    var result
    var topic = ""
    random = 0

    if (req.query.random) {
        random = req.query.random
    }
    if (random == 0) {
        topic = req.query.query
    } else if (random == 1) {
        topic = get_random_topic()
    }
    query_wiki(topic, function (a) {
        result = a
        build_msg(result)
        res.setHeader('Content-Type', 'application/json');
        // result = JSON.stringify(result)
        res.json(result)
        console.timeEnd("Response time for " + num_request)
        console.log("********************************************************************")
    })
})

function get_data(topic, random = 0) {

}

function get_random_topic() {
    random_topic = ''
    if (coin) {
        random_topic = not_random_list[Math.floor(Math.random() * not_random_list.length)]
    } else {
        random_topic = random_list[Math.floor(Math.random() * random_list.length)]
    }
    // random_topic = coin ? not_random_list[Math.floor(Math.random() * not_random_list.length)]: random_list[Math.floor(Math.random() * random_list.length)]
    coin = !coin
    random_count += 1
    if (random_count > 30) {
        random_topic = []
        console.log("Updating random!")
        make_random_list()
        random_count = 0
    }
    return random_topic
}


function query_wiki(title, callback) {
    // convert undefined and null to string
    title = "" + title
    // console.log("********************************************************************")
    console.log("Getting title: \t" + title)
    // console.log("********************************************************************")

    var res = {}
    var related = {}

    var req1 = false
    var req2 = false
    // get summmary
    // console.log("---: functionquery_wiki -> get summmary");
    wiki.fetch({
        section: 'page',
        type: 'summary',
        title: title,
    }, (data) => {
        res.title = data.title
        res.description = data.description
        res.extract = data.extract
        res.link = check_key(data, "content_urls") ? data.content_urls.desktop.page : "https://wikipedia.com"
        res.image = check_key(data, "thumbnail") ? data.thumbnail.source : default_img
        related[data.displaytitle] = pack(data, -1)

        // get related pages
        // console.log("---: functionquery_wiki -> finished summmary");
        req1 = true
        if (req1 && req2) {
            // console.log("---: functionquery_wiki -> returned data 1");
            callback(res)
        }
    });
    // console.log("---: functionquery_wiki -> get related;", );

    wiki.fetch({
        section: 'page',
        type: 'related', //links
        title: title,
    }, (data) => {
        for (i in data.pages) {
            elm = data.pages[i]
            temp_obj = pack(elm, i)
            title = temp_obj.title
            related[title] = temp_obj
        }
        res.related = related

        // console.log("---: functionquery_wiki -> finished related");
        req2 = true
        if (req1 && req2) {
            // console.log("---: functionquery_wiki -> returned data 2");
            callback(res)

        }
    });
}


function pack(data, count) {
    temp_obj = {}
    elm = data

    temp_obj.title = check_key(elm, "displaytitle") ? elm.displaytitle : undefined
    temp_obj.description = check_key(elm, "description") ? elm.description : undefined
    temp_obj.extract = check_key(elm, "extract") ? elm.extract : undefined
    temp_obj.link = check_key(elm, "content_urls") ? elm.content_urls.desktop.page : "https://wikipedia.com"
    temp_obj.image = check_key(elm, "thumbnail") ? elm.thumbnail.source : default_img
    temp_obj.count = count

    return temp_obj
}

function check_key(data, key) {
    if (data.hasOwnProperty(key)) {
        return true
    } else {
        return false
    }
}

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

function make_random_list() {
    var wiki_random_api = "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&grnlimit=500"
    console.log("Generating random list");
    request(wiki_random_api, function (error, response, body) {
        if (!error) {
            let result = '';
            result = JSON.parse(response.body)
            keys = Object.keys(result.query.pages)
            for (e in keys) {
                k = keys[e]
                random_list.push(result.query.pages[k].title)
            }

            console.log("Generated random list");
            mix_random = not_random_list + random_list
            // console.log(random_list);
        } else {
            console.log(error);
            console.log("Error getting random: " + error.message);
        }
    })
}



var msg = {
    "blocks": []
}
var msg_count = 0
var msg_length = 5
var warned = false
var msg_buffer = []
var msg_in_progress = false

function build_msg(data) {
    if (webhook_url) {
        msg_count += 1
        if (msg["blocks"].length == 0) {
            msg["blocks"].push({
                "type": "context",
                "elements": [{
                    "type": "mrkdwn",
                    "text": `*Date and time:* ${dateFormat("dddd, mmmm dS, yyyy, h:MM TT")}`
                }]
            })
            msg["blocks"].push({
                "type": "section",
                "fields": []
            })
            // console.log(msg['blocks']);
        }


        msg["blocks"][1]["fields"].push(list_item(data.title, data.description, data.link))
        // msg["blocks"].push(block_item(data.title, data.link, data.description, data.extract, data.image))
        // msg["blocks"].push({
        // "type": "divider"
        // })

        if (msg_count >= msg_length) {
            if (!msg_in_progress) {
                send_msg(msg)
            } else {
                lag = Math.floor(Math.random() * 5000 + 1000)
                // console.log("---------------------------lag of", Math.floor(Math.random() * 5000 + 1000));
                setTimeout(() => {
                    send_msg(msg)
                }, lag);
            }
            // send_msg(msg)
            msg["blocks"] = []
            msg_count = 0
        }
    } else {
        if (!warned) {
            console.warn("WEBHOOK_URL not defined");
            warned = true
        }

    }
}

function list_item(title, description, link) {
    return {
        "type": "mrkdwn",
        // "text": `> [*${title+""}*](${link})`,
        "text": `> <${link}|${title}> | ${description}`,
    }
}

function block_item(title, link, description, extract, image) {
    return {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `[*${title+""}*](${link}) || ${description} || ${extract}`
        },
        "accessory": {
            "type": "image",
            "image_url": `${image?image:default_img}`,
            "alt_text": `${title+""}`
        },

    }
}



function try_messaging(msg) {
    console.log("trying..");
    if (!msg_in_progress) {
        send_msg(msg)
    } else {
        setTimeout(() => {
            try_messaging(msg)
        }, Math.floor(Math.random() * 5000 + 1000));
    }
}

function send_msg(msg) {

    // console.log("--------------");
    // console.log(JSON.stringify(msg));
    // console.log("--------------");
    msg_in_progress = true
    request.post(webhook_url, {
        json: msg,
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        // console.log(body)
        msg_in_progress = false
    })
}

app.post('/get-random-list', function (req, res) {
    num_request += 1
    console.time("Response time for random_list " + num_request)
    console.log("********************************************************************")
    var result
    result = {topics:[]}
    for (i=0;i<15;i++){
        result['topics'].push(get_random_topic())
    }
    res.setHeader('Content-Type', 'application/json');
    result = JSON.stringify(result)
    res.json(result)
    console.timeEnd("Response time for random_list " + num_request)
    console.log("********************************************************************")
})
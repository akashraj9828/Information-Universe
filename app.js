const express = require('express')
const app = express()
// const port = 3000

var server = app.listen(process.env.PORT || 3000, listen)
var wiki = require('wiki-page');
var bodyParser = require('body-parser')
const https = require('https');
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
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(express.json()); // to support JSON-encoded bodies

app.use(express.static('public'))
app.use('/static', express.static('public'))

app.post('/get-data', function (req, res) {

    console.log("********************************************************************")
    // console.log(req.body)
    var result
    if (req.body.random == 0) {
        query_wiki(req.body.query, function (a) {
            result = a
            build_msg(result)
            res.setHeader('Content-Type', 'application/json');
            result = JSON.stringify(result)
            res.json(result)
        })
    } else if (req.body.random == 1) {


        random_topic = coin ? not_random_list[between(0, not_random_list.length)] : random_list[between(0, random_list.length)]
        coin != coin
        query_wiki(random_topic, function (a) {
            result = a
            build_msg(result)
            res.setHeader('Content-Type', 'application/json');
            result = JSON.stringify(result)
            res.json(result)
        })
        random_count += 1
        if (random_count > 30) {
            random_topic = []
            console.log("Updating random!")
            make_random_list()
            random_count = 0
        }
    }


    // console.log("Finished request!")
    console.log("********************************************************************")
})


function query_wiki(title, callback) {
    // convert undefined and null to string
    title = "" + title
    // console.log("********************************************************************")
    console.log("Getting title: \t" + title)
    // console.log("********************************************************************")

    var res = {}
    var related = {}

    // get summmary
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
            callback(res)
        });
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
    console.log("Generating random list");
    https.get('https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&grnlimit=500', (response) => {
        let result = '';
        // // called when a data chunk is received.
        response.on('data', (chunk) => {
            result += chunk;

        });

        response.on('end', () => {

            result = JSON.parse(result)
            keys = Object.keys(result.query.pages)
            for (e in keys) {
                k = keys[e]
                random_list.push(result.query.pages[k].title)
            }
            console.log("Generated random list");
            // console.log(random_list);


        });

    }).on("error", (error) => {
        console.log("Error getting random: " + error.message);
        console.log("Retrying in 10s");
        setTimeout(() => {
            make_random_list()
        }, 10000);

    });
    return

}
var msg = {
    "blocks": []
}
var msg_count = 0
var msg_lenght = 5
var warned = false

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
                }

            )
            // console.log(msg['blocks']);

        }


        msg["blocks"][1]["fields"].push(list_item(data.title, data.description, data.link))
        // msg["blocks"].push(block_item(data.title, data.link, data.description, data.extract, data.image))
        // msg["blocks"].push({
        // "type": "divider"
        // })



        if (msg_count >= msg_lenght) {
            // console.log("--------------");
            // console.log(JSON.stringify(msg));
            // console.log("--------------");
            request.post(webhook_url, {
                json: msg,
            }, (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
                msg["blocks"] = []
                msg_count = 0
            })

        }
    } else {
        if (!warned) {
            console.log("WEBHOOK_URL not defined");
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
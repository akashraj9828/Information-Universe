const express = require('express')
const app = express()
// const port = 3000

var server = app.listen(process.env.PORT || 3000, listen)
var wiki = require('wiki-page');
var bodyParser = require('body-parser')
const https = require('https');
const request = require('request')

const default_img="https://i.ibb.co/7jZZX53/no-img.png"

var url="https://akashraj.tech/api/webhook_info_uni.php"
var webhook_url=get_webhook(url)
var not_random_list=["Engineering","Astronomy","Biology","Chemistry","Cognitive Science","Computer Science","Ecology","Geography","Geology","Linguistics","Physics","Psychology","Sociology","Political","Zoology","Volcanology","Meteorology","Paleontology","Methodology","Geometry","matter","motion","spacetime","Astrophysics","Astrometry","Optics","Neurophysics","laws of thermodynamics","Computer","Central processing unit","Computer memory","Processor design","History of computing hardware","Integrated circuit","Logic gate","Microprocessor","Microcontroller","Very Large Scale Integration","Intel 4004","Travelling salesman problem", "Minimum spanning tree", "Shortest path problem", "Dijkstra's algorithm", "Greedy algorithm", "A* search algorithm", "Bellman–Ford algorithm", "Engine", "Reciprocating engine", "Timeline of motor and engine technology", "Petrol engine", "Four-stroke engine", "Wood gas", "Stirling engine", "Brayton cycle", "Gas engine", "Hydrolock", "Automotive engine","Diesel engine", "Reciprocating engine", "Miller cycle", "Two-stroke engine", "Stratified charge engine", "Four-stroke engine","India", "Hindus", "West Bengal", "Kolkata", "Partition of India", "South India", "Islam in India", "Economic history of India", "Indian Councils Act 1909", "Independence Day (India)", "Partition of Bengal (1905)","Akbar", "Humayun", "Jahangir", "Second Battle of Panipat", "Mughal emperors", "Bairam Khan", "Abdul Rahim Khan-I-Khana", "Maldev Rathore", "Bharmal", "Khusrau Mirza", "Hamida Banu Begum", "Daniyal Mirza", "Murad Mirza (son of Akbar)", "Ruqaiya Sultan Begum", "Salima Sultan Begum","Taj Mahal", "Shah Jahan", "Agra", "Mumtaz Mahal", "Agra Fort", "Jama Masjid, Delhi", "Mughal architecture", "Tomb of I'timād-ud-Daulah", "Indo-Islamic architecture", "Bibi Ka Maqbara", "Tomb of Jahangir", "Tomb of Safdar Jang", "Akbar's tomb", "GitHub", "Nat Friedman", "Git", "Comparison of source-code-hosting facilities", "Open Hub", "Magento", "StyleCop", "Etherpad", "Bitbucket", "Andreessen Horowitz", "Twilio", "Meteor (web framework)", "Tom Preston-Werner", "Jekyll (software)", "GitLab","Google", "General Electric", "Microsoft", "Larry Page", "Yahoo!", "Eric Schmidt", "Gmail", "Google Maps", "Baidu", "YouTube"]
var random_list = []
var random_generated = false
var random_count = 0
if (!random_generated) {
    make_random_list()
    random_generated = true
}

var coin=true
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

        
        random_topic = coin ? not_random_list[between(0,not_random_list.length)]:random_list[between(0, random_list.length)]
        coin!=coin
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
    temp_obj.link = check_key(elm, "content_urls") ? elm.content_urls.desktop.page : default_img
    temp_obj.image = check_key(elm, "thumbnail") ? elm.thumbnail.source : undefined
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
        make_random_list()

    });
    return

}
msg = {
    "blocks": []
}

function build_msg(data) {
    if (msg == {}) {
        msg["blocks"] = []
    }
    msg["blocks"].push({
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `*${data.title+""}* || ${data.description} || ${data.extract}`
        },
        "accessory": {
            "type": "image",
            "image_url": `${data.image?data.image:default_img}`,
            "alt_text": `${data.title+""}`
        },

    }, {
        "type": "divider"
    }, )



    if (msg["blocks"].length > 10) {
        // console.log("--------------");
        // console.log(JSON.stringify(msg));
        // console.log("--------------");

        request.post(webhook_url, {
            json: JSON.parse(JSON.stringify(msg)),
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
            msg["blocks"] = []
        })
    }



}

function get_webhook(url) {
    request.get(url, {
        
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        webhook_url=body
        // console.log(`statusCode: ${res.statusCode}`)
        // console.log(body)
        // msg["blocks"] = []
    })
    
}
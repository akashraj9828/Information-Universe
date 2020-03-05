const express = require('express')
const app = express()
// const port = 3000

var server = app.listen(process.env.PORT || 3000, listen)
var wiki = require('wiki-page');

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://' + host + ':' + port);
}
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var bodyParser = require('body-parser')
// app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(express.json()); // to support JSON-encoded bodies

app.use(express.static('public'))
app.use('/static', express.static('public'))

app.post('/get-data', function (req, res) {

    console.log("********************************************************************")
    console.log(req.body)
    console.log("********************************************************************")
    
    query_wiki(req.body.query,function(a) {
        var result=a
        res.setHeader('Content-Type', 'application/json');
        result = JSON.stringify(result)
        res.json(result)
    })

})

var wiki = require('wiki-page');
function query_wiki(title,callback) {

    var res = {}
    var related = {}

    // get summmary
    wiki.fetch({
        section: 'page',
        type: 'summary',
        title: title,
    }, (data) => {
        res.description = data.description
        res.extract = data.extract
        res.image=check_key(data, "thumbnail") ? data.thumbnail.source : undefined
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
    temp_obj.link = check_key(elm, "content_urls") ? elm.content_urls.desktop.page : undefined
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

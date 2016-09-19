var express    = require('express');        // call express
var multer  = require('multer');
var util = require('util');

var port = process.env.PORT || 8080;        // set our port

var app = express();
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './public/images',defer:true }));
app.get('/files1', function(req, res) {
    console.log('IN GET');
    res.writeHead(200, { Connection: 'close' });
    res.end('<html><head></head><body>\
                       <form method="POST" enctype="multipart/form-data">\
                        <input type="text" name="textfield1"><br />\
                        <input type="file" multiple name="file1"><br />\
                        <input type="submit">\
                      </form>\
                    </body></html>');
});

// middleware function placed directly on route, initialized by multer
var mwMulter1 = multer({ dest: './uploads1/' });

app.post('/files1', mwMulter1, function(req, res) {

    console.log('IN POST (/files1)');
    console.log(req.body)

    var filesUploaded = 0;

    if ( Object.keys(req.files).length === 0 ) {
        console.log('no files uploaded');
    } else {
        console.log(req.files)

        var files = req.files.file1;
        if (!util.isArray(req.files.file1)) {
            files = [ req.files.file1 ];
        }

        filesUploaded = files.length;
    }

    res.json({ message: 'Finished! Uploaded ' + filesUploaded + ' files.  Route is /files1' });
});

app.get('/files2', function(req, res) {
    console.log('IN GET');
    res.writeHead(200, { Connection: 'close' });
    res.end('<html><head></head><body>\
                       <form method="POST" enctype="multipart/form-data">\
                        <input type="text" name="textfield1"><br />\
                        <input type="file" multiple name="file1"><br />\
                        <input type="submit">\
                      </form>\
                    </body></html>');
});

// middleware function placed directly on route, initialized by multer
var mwMulter2 = multer({ dest: './uploads2/' });

app.post('/files2', mwMulter2, function(req, res) {

    console.log('IN POST (/files2)');
    console.log(req.body)

    var filesUploaded = 0;

    if ( Object.keys(req.files).length === 0 ) {
        console.log('no files uploaded');
    } else {
        console.log(req.files)

        var files = req.files.file1;
        if (!util.isArray(req.files.file1)) {
            files = [ req.files.file1 ];
        }

        filesUploaded = files.length;
    }

    res.json({ message: 'Finished! Uploaded ' + filesUploaded + ' files.  Route is /files2' });
});

app.get('/filesFail', function(req, res) {
    console.log('IN GET /filesFail');
    res.writeHead(200, { Connection: 'close' });
    res.end('<html><head></head><body>\
                       <form method="POST" enctype="multipart/form-data">\
                        <input type="text" name="textfield1"><br />\
                        <input type="file" multiple name="file1"><br />\
                        <input type="submit">\
                      </form>\
                    </body></html>');
});

app.post('/filesFail', function(req, res) {

    console.log('IN POST (/filesFail)');
    console.log('req.body = ' + req.body); // this is undefined b/c a body-parser has not been specified
    console.log('req.files = ' + req.files);

    if (req.body === undefined && req.files === undefined )
        res.json({ message: '/filesFail was NOT PARSED... no security leak' });
    else
        res.json({ message: '/filesFail was parsed.... security leak' });
});

app.listen(port);
console.log('Started tests ' + port);
var fs=require('fs');

var mockInterFaceUrl = {
    host: "localhost",
    mockPathRoot : "src/data/"

}

function route(pathname,request, response) {
    if(pathname === "/xxx") {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(readJsonFile(mockInterFaceUrl.mockPathRoot + 'books0.json' )));

    } else {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }

}

function readJsonFile(path){
    return JSON.parse(fs.readFileSync(path));
}



exports.route = route;
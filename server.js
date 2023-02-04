var http = require('http')
var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}
adress = addresses[0]
var fs = require('fs')
var games = []
var c = []
var server = http.createServer(async (req, res) => {
function getopp(n){
if (n == 0) {return 1}
return 0
}
if (req.method == "GET" && req.url == "/") {
//checking if there is other player in lobby
willWait = false
await new Promise(function(rest, rej){
if (games[games.length - 1][1] != 0) {
willWait = true
}
rest()
}).catch((err) => {
willWait = true
})
//checking if there is other player in lobby//
//if there is other player:
if (willWait) {
games.push([1, 0])
c.push([".", "."])
a = fs.readFileSync("lobby.html", "utf-8").split("<FILL>")
file = (a[0] + "'" + adress + "'\n" + a[1] + "'" + (games.length - 1) + "0'\n" + a[2])
res.end(file)
}
//if there is other player://
//if there is not other player//
else {
games[games.length - 1][1] = 1
a = fs.readFileSync("chess.html", "utf-8").split("<FILL>")
res.end(a[0] +  "'" + adress + "'\n" + a[1] + "'" + (games.length - 1) + "1'\n" +a[2] + "'blac'" + a[3] + "'his_turn'" + a[4] + "180" + a[5] + "180" + a[6])
}
//if there is not other player://
}

else if (req.method == "POST")  {
data = ""
req.on("data", (chunk) => {data = data + chunk})
req.on("end", () => {
data = data.split("%")
if (data[0] == "wait") {
if (games[parseInt(data[1][0])] != undefined) {
if (games[parseInt(data[1][0])][1] == 1) {
a = fs.readFileSync("chess.html", "utf-8").split("<FILL>")
file = (a[0] +  "'" + adress + "'\n" + a[1] + "'" + (games.length - 1) + "0'\n" + a[2] + "'whit'" + a[3] + "'your_turn'" + a[4] + "0" + a[5] + "0" + a[6])
res.end(file)
}
}
else {
console.log("remove all previous connections to the server to avoid overlapping of game IDs")
}
res.end("/")
}

if (data[0] == "waitForMove") {
if (c[parseInt(data[1][0])] != undefined) {
if (c[parseInt(data[1][0])][getopp(parseInt(data[1][1]))] != ".") {
res.end(c[parseInt(data[1][0])][getopp(parseInt(data[1][1]))].split("/")[1])
c[parseInt(data[1][0])][getopp(parseInt(data[1][1]))] = "."
}
else {
res.end("/")
}
}
else {
console.log("remove all previous connections to the server to avoid overlapping of game IDs")
res.end("/")
}
}

if (data[0] == "played") {
c[parseInt(data[1][0])][parseInt(data[1][1])] = data[1][1] + "/" + data[2]
res.end("/")
}

})
}
})
server.listen(8080, () => {setInterval(() => {}, 30000)})

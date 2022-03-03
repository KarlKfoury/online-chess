var http = require('http')
var fs = require('fs')
var games = []
var c = []
var server = http.createServer(async (req, res) => {
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
c.push(["."])
a = fs.readFileSync("lobby.html", "utf-8").split("<FILL>")
file = (a[0] + "'" + (games.length - 1) + "0'\n" + a[1])
res.end(file)
}
//if there is other player://
//if there is not other player//
else {
games[games.length - 1][1] = 1
a = fs.readFileSync("chess.html", "utf-8").split("<FILL>")
res.end(a[0] + "'" + (games.length - 1) + "1'\n" +a[1] + "'blac'" + a[2] + "'his_turn'" + a[3] + "180" + a[4] + "180" + a[5])
}
//if there is not other player://
}

else if (req.method == "POST")  {
data = ""
req.on("data", (chunk) => {data = data + chunk})
req.on("end", () => {
data = data.split("%")
if (data[0] == "wait") {
if (games[parseInt(data[1][0])][1] == 1) {
a = fs.readFileSync("chess.html", "utf-8").split("<FILL>")
file = (a[0] + "'" + (games.length - 1) + "0'\n" + a[1] + "'whit'" + a[2] + "'your_turn'" + a[3] + "0" + a[4] + "0" + a[5])
res.end(file)
}
res.end("/")
}

if (data[0] == "waitForMove") {
console.log(c)
if (c[parseInt(data[1][0])][0] != "." && data[1][1] != c[parseInt(data[1][0])][0][0]) {
console.log("capitoline hill" + data[1])
res.end(c[parseInt(data[1][0])][0].split("/")[1])
c[parseInt(data[1][0])][0] = "."
}
res.end("/")
}

if (data[0] == "played") {
console.log("played gang" + data[1])
c[parseInt(data[1][0])][0] = data[1][1] + "/" + data[2]
}

})
}
})
server.listen(8080, () => {setInterval(() => {console.log(games)}, 3000)})

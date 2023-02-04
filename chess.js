var http = require('http')
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
console.log(data[0])
if (data[0] == "waitForMove") {
console.log("c during " + data[1] + " waitformove request: " + c)
if (c[parseInt(data[1][0])][getopp(parseInt(data[1][1]))] != ".") {
console.log("other player played")
res.end(c[parseInt(data[1][0])][getopp(parseInt(data[1][1]))].split("/")[1])
c[parseInt(data[1][0])][getopp(parseInt(data[1][1]))] = "."
}
else {
console.log(data[1] + "'s opponent didn't play")
res.end("/")
}
}

if (data[0] == "played") {
c[parseInt(data[1][0])][parseInt(data[1][1])] = data[1][1] + "/" + data[2]
console.log("c after "+ data[1] + "played: " + c)
res.end("/")
}

})
}
})
server.listen(8080, () => {setInterval(() => {
//console.log(games)
}, 3000)
}
)

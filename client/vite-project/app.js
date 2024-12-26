const express = require("express")
const http = require("http")
const {server} = require("socket.io")

const app = express()

//Middleware for parsing json
app.use(express.json())

//Defining an API route
app.get("/", (req, res) => {
    res.json({message: "Hello from backend"})
})

//create an HTTP server and attach Express to it
const server = http.createServer(app);

//Attach Socket.io to the same HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

//Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("New connection")

    //Example socket.io event Listener
    socket.on("message", (data) => {
        console.log("Message received: ", data)
        socket.emit("response", {message: "Message recieved from backend"})
    })

    //Handle client disconnection
    socket.on("disconnect", () => {
        console.log("Client disconnected")
    })
})


// Start the server
const PORT = 3000
server.listen(PORT,() => {
    console.log(`Server is running on https://localhost:${PORT}`)
})
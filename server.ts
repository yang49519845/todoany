const express = require('express');
const cors = require('cors');
const { createServer } = require('http')
const { Server } = require("socket.io");
const app = express();
const port = 4000;
const connect = require('./db').connect;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  }
});

let todoList: any[] = [];

io.on('connection', async (socket: any) => {
  const db = await connect();
  const list = db.collection('list');
  console.log('⚡: a user connected');

  socket.on('message', (message: any) => {
    console.log(message)
  })

  socket.on("addTodo", (todo: any) => {
    //👇🏻 todo - contains the object from the React app
    console.log(todo);
    
    list.insertOne(todo);
    //👇🏻 Adds the to-do object to the list of to-dos
    todoList.unshift(todo);
    //👇🏻 Sends all the to-dos to the React app
    socket.emit("todos", todoList);
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('🔥: user disconnected');
  });
});

app.get('/api', (_: any, res: any) => {
  res.json(todoList);
});
app.listen(4001, () => {
  console.log(`Server is running on port ${port}`);
});
io.listen(port, () => {
  console.log(`io is running on port ${port}`);
});

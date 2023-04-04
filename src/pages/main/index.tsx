import React, { useCallback, useEffect, useState } from "react";
import Nav from '@/client/components/Nav';
import axios from "axios";
import { Socket } from "socket.io-client";

function Main({ socket }: { socket: Socket }) {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<any[]>([]);

  //👇🏻 Generates a random string as the todo ID
  const generateID = () => Math.random().toString(36).substring(2, 10);

  const handleAddTodo = (e) => {
    e.preventDefault();
    //👇🏻 Every todo has this structure - id, todo & comments.
    socket.emit("addTodo", {
      id: generateID(),
      todo,
      comments: [],
    });
    setTodo("");
  }

  useEffect(() => {
    // socket.connect()
    function fetchTodos() {
      axios.get("http://localhost:4001/api")
        // .then((res) => res.json())
        .then((response) => {
          setTodoList(response.data)
        })
        .catch((err) => console.error(err));
    }

    fetchTodos()
    socket.on("todos", (data) => {
      console.log('list')
      setTodoList(data)
    });
  }, []);


  return (
    <div>
      <Nav />
      <form className='form'>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className='input'
          required
        />
        <button className='form__cta' onClick={handleAddTodo}>ADD TODO</button>
      </form>

      <div className='todo__container' >
      {
        todoList.map(item => {
          return (
            <div className='todo__item' key={item.id}>
            <p>Coffee chat with the team</p>
            <div>
              <button className='commentsBtn'>{item.todo}</button>
              <button className='deleteBtn'>DELETE</button>
            </div>
          </div>
          )
        })
      }
        <div className='todo__item'>
          <p>Contributing to open-source</p>
          <div>
            <button className='commentsBtn'>View Comments</button>
            <button className='deleteBtn'>DELETE</button>
          </div>
        </div>

        <div className='todo__item'>
          <p>Coffee chat with the team</p>
          <div>
            <button className='commentsBtn'>View Comments</button>
            <button className='deleteBtn'>DELETE</button>
          </div>
        </div>

        <div className='todo__item'>
          <p>Work on my side projects</p>
          <div>
            <button className='commentsBtn'>View Comments</button>
            <button className='deleteBtn'>DELETE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

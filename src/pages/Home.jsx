import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { server, Context } from '../main';
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';


function Home() {

  const { isAuthenticated } = useContext(Context);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const updateHandler = async (id) => {

    try {
      const { data } = await axios.put(`${server}/task/${id}`, {

      }, {
        withCredentials: true,
      })
      toast.success(data.message);
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message);
      // setLoading(false);
    }


  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      })
      toast.success(data.message);
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message);
      // setLoading(false);
    }

  }



  const taskHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const { data } = await axios.post(`${server}/task/new`, {
        title,
        description
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      setTitle("")
      setDescription("")
      toast.success(data.message)
      setLoading(false);
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }

  }

  useEffect(() => {
    axios.get(`${server}/task/my`, {
      withCredentials: true,
    }).then((res) => {
      setTasks(res.data.tasks)
    }).catch((e) => {
      toast.error(e.response.data.message)
    })
  }, [refresh])

  if (!isAuthenticated) return <Navigate to='/login' />
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={taskHandler}>
            <input type="text" placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} required />

            <input type="text" placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} required />

            <button type="submit" disabled={loading}>Add task</button>
          </form>
        </section>
      </div>

      <div className="section todosContainer">
        {
          tasks?.map(task => (
            <TodoItem key={task._id} id={task._id} title={task.title} description={task.description} isCompleted={task.isCompleted}
              updateHandler={updateHandler} deleteHandler={deleteHandler} />
          ))
        }
      </div>
    </div>
  )
}

export default Home
"use client"
import React, { useState } from 'react'

const page = () => {
  const [task, setTask] = useState("")
  const [desc, setDesc] = useState("")
  const [taskArray, setTaskArray] = useState([])

  const submitHandler = (e) => {
    e.preventDefault();

    setTaskArray([...taskArray, {task, desc}])
    setTask('')
    setDesc('')

    console.log(taskArray)
  } 

  const deleteTask = (index) => {
    let copyTask = [...taskArray]
    copyTask.splice(index, 1)
    setTaskArray(copyTask)
  }

  const completeTask = (index) => {
    let copyTask = taskArray.map((task, id) => {
      if(id == index){
        if(task.completed == true){
          return {...task, completed: false}
        }
        return {...task, completed:true}
      } else {
        return task
      }
    })
    setTaskArray(copyTask)
  }

  let renderTask = <h2 className='text-white'>No Task Available</h2>

  if(taskArray.length >0){
    renderTask = taskArray.map((elem, index) => {
      return <li key={index} className='flex justify-between mb-5 border-white border-2 p-5 rounded'>
        <div className='justify-between w-2/3'>
          <h5 className= {`${elem.completed ? 'line-through' : ''} text-2xl font-semibold text-white`}>
            Title - {elem.task}
          </h5>
          <h6 className= {`${elem.completed ? 'line-through' : ''} text-l font-semibold text-white`}>
            Description - {elem.desc}
          </h6>
      </div>
      <div className='flex'>
        <button onClick={() => {
          deleteTask(index)
        }} className='bg-red-600 text-white px-4 py-4 m-2 rounded font-bold'>Delete</button>

        <button onClick={() => {
          completeTask(index)
        }} className='bg-blue-600 text-white px-4 py-4 m-2 rounded font-bold'>Complete</button>
      </div>
      </li>
    })
  }

  return (
    <div className="w-1/2 bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center border-2 border-white rounded h-3/4 ">
      <h1 className='bg-black text-white p-5 text-4xl font-bold text-center'>Yash's Todo List</h1>

      <form onSubmit={submitHandler} className='bg-white'>
          <input type='text' placeholder='Add task....' className='text-xl w-1/3 border-zinc-800 border-2 m-5 px-2 py-3' value={task} onChange={(e)=>{
            setTask(e.target.value)
          }}/>

          <input type='text' placeholder='Enter description....' className='text-xl w-1/3 border-zinc-800 border-2 m-5 px-2 py-3' value={desc} onChange={(e)=>{
            setDesc(e.target.value)
          }}/>

          <button className='bg-black text-xl font-bold rounded w-1/6 text-white m-5 px-2 py-3'>Add Task</button>
          
      </form>

      <div className='p-10 mb-0 h-64 overflow-y-auto'>
          {renderTask}
      </div>
    </div>
  )
}

export default page
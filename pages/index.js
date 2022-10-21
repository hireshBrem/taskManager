import { data } from 'autoprefixer'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import cookieImport from "cookie"
import cookie from 'js-cookie'

//Components
import EmptyTasks from '../components/EmptyTasks'
import Tasks from '../components/Tasks'
import AddTaskBtn from '../components/AddTaskBtn'
import { render } from '@testing-library/react'

export default function Home({initialTasks}) {

  const[tasks, setTasks] = useState(initialTasks)
  const[taskInput, setTaskInput] = useState("")

  useEffect(()=>{
    cookie.set("tasks", tasks, {expires: 90})
  }, [tasks])
  
  function handleKeyDown(e){
    if(e.key === "Enter" && taskInput!="") {
      addTask()
    }
  }

  function addTask(){
    
    if(taskInput!=""){
      setTasks([...tasks, taskInput])
      setTaskInput("")    
    }
  }

  function deleteTask(id){
    let newList = []
    
    tasks.forEach((task, index)=>{
      if(id!=index){
        newList.push(task)
      }
    })
    setTasks(newList)
  }

  return (
    <>
    <Head>
      <title>Task Manager</title>
    </Head>
      <div className='max-w-5xl m-auto'>
        <h1 className='text-blue-500 text-[30px] text-center mt-5 font-medium'>Task Manager</h1>
        <div className='flex justify-center flex-wrap flex-col my-16'>
          <div className="mb-6">
            <input onKeyDown={(e)=>handleKeyDown(e)} value={taskInput} onChange={(e)=>setTaskInput(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button onClick={()=>addTask()} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mb-2">Add</button>
        </div>
        <div className='flex flex-wrap justify-center'>
          { 
            (tasks.length>1)?
              <Tasks taskProps={tasks} delTask={deleteTask} />  
            :<EmptyTasks text="No tasks left!" />
          }
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const {cookies} = context.req

  if(cookies["tasks"] === undefined){
    cookies["tasks"] = [""]
  }

  let taskArray = cookies["tasks"].split(",")

  return {
    props: {
      initialTasks: taskArray
    },
  }
}

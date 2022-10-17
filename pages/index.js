import { data } from 'autoprefixer'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import cookie from "js-cookie"

export default function Home({initialTasks}) {

  const[tasks, setTasks] = useState(JSON.parse(initialTasks))
  const[taskInput, setTaskInput] = useState("")

  useEffect(()=>{
    cookie.set("tasks", JSON.stringify(tasks), {expires: 1/24})
  }, [tasks])
  
  function resetInput(){ 
    setTaskInput("")
  }

  async function addTask(){
    
    if(taskInput===""){
      return(
        <h1>Enter something please!</h1>
      )
    }
    else{
      setTasks([...tasks, taskInput])
      resetInput()
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
            <input value={taskInput} onChange={(e)=>setTaskInput(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button onClick={()=>addTask()} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mb-2">Add</button>
        </div>
        <div className='flex flex-wrap justify-center'>
          { 
              (tasks.length>1)
              ?
              tasks.map((task, index)=> {
              if(task!==""){
              return(
                <div key={index} id={String(index)} className="w-full m-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col items-center pb-10">
                    <h5 className="my-5 text-xl font-medium text-gray-900 dark:text-white">{task}</h5>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                      <a onClick={()=>deleteTask(index)} className="inline-flex items-center py-2 px-7 text-lg font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</a>
                    </div>
                  </div>
                </div>)
              }})
              :
              <div className="w-full m-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10">
                  <h5 className="my-5 text-xl font-medium text-gray-900 dark:text-white">No tasks left</h5>
                </div>
              </div>
          }
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const {cookies} = context.req

  const storedTasks = await cookies["tasks"]

  return {
    props: {
      initialTasks: storedTasks
    },
  }
}
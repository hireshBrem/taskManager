import React from 'react'

import EmptyTasks from '../components/EmptyTasks'

const Tasks = ({taskProps, delTask}) => {


  return (
    <>
    {
        taskProps.map((task, index)=> {
        if(task!=""){
        return(
        <div key={index} id={String(index)} className="w-full m-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
                <h5 className="my-5 text-xl font-medium text-gray-900 dark:text-white">{task}</h5>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <a onClick={()=>delTask(index)} className="inline-flex items-center py-2 px-7 text-lg font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</a>
                </div>
            </div>
        </div>)
        }}
        )
    }
    </>
    )}

export default Tasks
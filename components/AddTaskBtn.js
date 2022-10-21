import React from 'react'

const AddTaskBtn = () => {
  return (
    <button onClick={()=>addTask()} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mb-2">Add</button>

    )}

export default AddTaskBtn
import React from 'react'

const EmptyTasks = ({text}) => {
  return (
    <div className="w-full m-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
            <h5 className="my-5 text-xl font-medium text-gray-900 dark:text-white">{text}</h5>
        </div>
    </div>
  )
}

export default EmptyTasks
import React, { memo } from 'react'
import TodolistItem from './todolistItem';

const TodoList = ({ todoList, filterType, toggleTodoComplete, deleteTodo }) => {
    console.log("Todolist render");
    return (

        <ul className="w-full flex flex-col gap-4 px-4 flex-1 ">
            {todoList.map((todoItem) => {

                if (filterType === "All" || (filterType === "Pending" && todoItem.isDone === false) || (filterType === "Completed" && todoItem.isDone === true))
                {
                    return (
                        <TodolistItem key={todoItem.id} todoItem={todoItem} toggleTodoComplete={toggleTodoComplete} deleteTodo={deleteTodo} />
                    );
                }
                return null;
            })}

        </ul>
    )
}

export default memo(TodoList)
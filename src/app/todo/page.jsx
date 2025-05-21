"use client"

import React, { PureComponent, createRef } from 'react'

import TodoFilter from '../components/todo/todoFilter'
import TodoForm from '../components/todo/todoForm'
import TodoList from '../components/todo/todoList'

export default class Todo extends PureComponent {

    state = {
        todoList: [],
        filterType: "All"
    }

    todoTextRef = createRef();

    addTodo = (e) => {
        e.preventDefault();

        // const todoText = document.getElementById("todoText");    // It takes O[N] times
        // todoText = this.todoTextRef.current;      // It takes O[1] constant time  -- This is power of Virtual dom

        const todoInput = this.todoTextRef.current;

        // Validate: If the input is empty or only spaces, do nothing
        // if (!todoInput || !todoInput.value.trim()) return;

        const newTodo = {
            id: new Date().valueOf(),
            text: todoInput.value.trim(),
            isDone: false
        };

        this.setState((state) => ({
            todoList: [...state.todoList, newTodo]
        }), () => {
            // Clear the input after adding
            todoInput.value = "";
        });
    }

    // changeText = (e) => {
    //     this.setState({ todoText: e.target.value })
    // }

    toggleTodoComplete = (todoItem, value) => {
        this.setState((state) => {   // here it is compulsory to pass state first as a aggrument in setState function 
            const index = state.todoList.findIndex((item) => item.id === todoItem.id);

            return {
                todoList: [
                    ...state.todoList.slice(0, index),
                    { ...state.todoList[index], isDone: value },
                    ...state.todoList.slice(index + 1)
                ]
            }
        })
    }

    deleteTodo = (todoItem) => {
        this.setState((state) => {   // here it is compulsory to pass state first as a aggrument in setState function 
            const index = state.todoList.findIndex((item) => item.id === todoItem.id);

            return {
                todoList: [
                    ...state.todoList.slice(0, index),
                    ...state.todoList.slice(index + 1)
                ]
            }
        })
    }


    changeFilterType = (ft) => {
        this.setState({ filterType: ft })
    }

    render() {

        const { todoList, filterType } = this.state;
        return (
            <main className="flex flex-col items-center gap-4 h-screen flex-1">
                <header>
                    <h1 className="text-4xl font-semibold">Todo List</h1>
                </header>

                {/* Form */}
                <TodoForm addTodo={this.addTodo} ref={this.todoTextRef} />

                {/* If we used w-full in ul then everything remain in center but ul element are not remain center */}

                <TodoList todoList={todoList} filterType={filterType} toggleTodoComplete={this.toggleTodoComplete} deleteTodo={this.deleteTodo} />

                {/* Filter or Footer */}
                <TodoFilter changeFilterType={this.changeFilterType} />
            </main >
        )
    }
}

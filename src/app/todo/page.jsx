"use client"

import React, { PureComponent, createRef } from 'react'

import TodoFilter from '../components/todo/todoFilter'
import TodoForm from '../components/todo/todoForm'
import TodoList from '../components/todo/todoList'
import { redirect } from 'next/dist/server/api-utils'
import todoList from '../components/todo/todoList'

export default class Todo extends PureComponent {

    state = {
        todoList: [],
        filterType: "All"
    }

    todoTextRef = createRef();

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        try
        {
            const res = await fetch("http://localhost:8000/todoList")
            const json = await res.json();
            this.setState({ todoList: json });
        } catch (error)
        {

        }
    }

    addTodo = async (e) => {

        try
        {

            e.preventDefault();

            // const todoText = document.getElementById("todoText");    // It takes O[N] times
            // todoText = this.todoTextRef.current;      // It takes O[1] constant time  -- This is power of Virtual dom

            const todoInput = this.todoTextRef.current;

            const res = await fetch("http://localhost:8000/todoList", {
                method: "POST",
                body: JSON.stringify({
                    text: todoInput.value,
                    isDone: false
                }),
                header: {
                    "content-type": "application/json",
                    Accept: "application/json"
                }
            })
            const json = await res.json();

            // Validate: If the input is empty or only spaces, do nothing
            // if (!todoInput || !todoInput.value.trim()) return;

            // const newTodo = {
            //     id: new Date().valueOf(),
            //     text: todoInput.value.trim(),
            //     isDone: false
            // };

            this.setState((state) => ({
                // todoList: [...state.todoList, newTodo]
                todoList: [...state.todoList, json]
            }), () => {
                // Clear the input after adding
                todoInput.value = "";
            });
        } catch (error)
        {

        }
    }

    // changeText = (e) => {
    //     this.setState({ todoText: e.target.value })
    // }

    toggleTodoComplete = async (todoItem, value) => {
        try
        {

            const res = await fetch(`http://localhost:8000/todoList/${todoItem.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...todoItem,
                    isDone: value
                }),
                header: {
                    "content-type": "application/json",
                    Accept: "application/json"
                }
            })
            const json = await res.json();

            this.setState((state) => {   // here it is compulsory to pass state first as a aggrument in setState function 
                const index = state.todoList.findIndex((item) => item.id === todoItem.id);

                return {
                    todoList: [
                        ...state.todoList.slice(0, index),
                        json,
                        ...state.todoList.slice(index + 1)
                    ]
                }
            })
        } catch (error)
        {

        }
    }

    deleteTodo = async (todoItem) => {
        try
        {

            await fetch(`http://localhost:8000/todoList/${todoItem.id}`, {
                method: "DELETE",
            })

            this.setState((state) => {   // here it is compulsory to pass state first as a aggrument in setState function 
                const index = state.todoList.findIndex((item) => item.id === todoItem.id);

                return {
                    todoList: [
                        ...state.todoList.slice(0, index),
                        ...state.todoList.slice(index + 1)
                    ]
                }
            })
        } catch (error)
        {

        }

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
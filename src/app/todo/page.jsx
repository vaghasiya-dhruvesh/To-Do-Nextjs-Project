"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import React, { PureComponent, createRef } from 'react'
import { TrashIcon } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { redirect } from 'next/dist/server/api-utils'

export default class Todo extends PureComponent {

    state = {
        todoList: [],
    }

    todoTextRef = createRef();

    addTodo = (e) => {
        e.preventDefault();

        // const todoText = document.getElementById("todoText");    // It takes O[N] times
        // todoText = this.todoTextRef.current;      // It takes O[1] constant time  -- This is power of Virtual dom

        this.setState((state, props) => {
            return {
                // todoList: [...state.todoList, { text: state.todoText }],  // here we add new value of todoText in the old todoList array immutably
                todoList: [...state.todoList, { id: new Date().valueOf(), text: todoText.value }]
            }
        },
            () => {
                todoText.value = "";
            });
    }

    changeText = (e) => {
        this.setState({ todoText: e.target.value })
    }

    render() {

        const { todoList } = this.state;
        return (
            <main className="flex flex-col items-center gap-4 h-screen flex-1">
                <header>
                    <h1 className="text-4xl font-semibold">Todo List</h1>
                </header>
                <form onSubmit={this.addTodo}>
                    <div>
                        <Label htmlFor="todoText" className={"sr-only"}>Add Todo</Label>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor="todoText" className="sr-only">Todo Text</Label>
                            <div className="flex rounded-md shadow-xs">
                                <Input
                                    // ref={(ref) => {
                                    //     this.todoTextRef = ref;
                                    // }}

                                    ref={this.todoTextRef} // we can also do like this
                                    id="todoText"
                                    className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                                // placeholder="Enter your todo here..."
                                // type="text"
                                />
                                <Button className="rounded-s-none" >Add Todo</Button>
                            </div>
                        </div>
                    </div>
                </form>
                {/* If we used w-full in ul then everything remain in center but ul element are not remain center */}
                <ul className="w-full flex flex-col gap-4 px-4 flex-1 ">
                    {todoList.map((todoItem) => (
                        <li className="flex items-center gap-4" key={todoItem.id}>
                            <div className="flex items-center gap-2 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]">
                                <Checkbox id={'completed'} />
                                <Label htmlFor={'completed'} className="sr-only">Colored checkbox</Label>
                            </div>
                            <p className="flex-1 line-clamp-3">{todoItem.text}</p>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">
                                        <TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete your todo list
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Yes</AlertDialogCancel>
                                        <AlertDialogAction>No</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </li>
                    ))}

                </ul>
                <footer className="w-full flex">
                    <Button className="flex-1 rounded-none">All</Button>
                    <Button className="flex-1 rounded-none">Pending</Button>
                    <Button className="flex-1 rounded-none">Completed</Button>
                </footer>
            </main>
        )
    }
}

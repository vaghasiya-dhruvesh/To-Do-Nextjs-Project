import React, { memo } from 'react'
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TrashIcon } from 'lucide-react';
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
import clsx from 'clsx';

const TodolistItem = ({ todoItem, toggleTodoComplete, deleteTodo }) => {
    console.log("todoitem render");

    return (
        <li className="flex items-center gap-4" key={todoItem.id}>
            <div className="flex items-center gap-2 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]">
                {/* <Checkbox id={'completed'} checked={todoItem.isDone} onCheckedChange={this.toggleTodoComplete} />  -- here we cannot used this.toggleTodo  because it send event and we don't want to pass event*/}
                <Checkbox id={'completed'} checked={todoItem.isDone} onCheckedChange={(value) => { toggleTodoComplete(todoItem, value) }} /> {/**here we pass two value to this.toggleTodoComplete function */}
                <Label htmlFor={'completed'} className="sr-only">Colored checkbox</Label>
            </div>
            <p className={clsx("flex-1 line-clamp-3", {
                "line-through": todoItem.isDone     // we can also apply line-through style using tailwind 
            })}
            // style={{ textDecoration: todoItem.isDone ? "line-through" : "none" }}
            >
                {todoItem.text}</p>
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
                        <AlertDialogCancel onClick={() => { deleteTodo(todoItem) }}>Yes</AlertDialogCancel>
                        <AlertDialogAction>No</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </li>
    )
}

export default memo(TodolistItem)
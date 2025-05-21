import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { forwardRef, memo } from 'react'

const TodoForm = forwardRef(({ addTodo }, ref) => {
    console.log("Todo Form render");

    return (
        <form onSubmit={addTodo}>
            <div>
                <Label htmlFor="todoText" className={"sr-only"}>Add Todo</Label>
                <div className="*:not-first:mt-2">
                    <Label htmlFor="todoText" className="sr-only">Todo Text</Label>
                    <div className="flex rounded-md shadow-xs">
                        <Input
                            // ref={(ref) => {
                            //     this.todoTextRef = ref;
                            // }}

                            ref={ref} // we can also do like this
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
    )
})

export default memo(TodoForm)
import { Button } from '@/components/ui/button'
import React, { memo } from 'react'


const TodoFilter = ({ changeFilterType }) => {
    console.log("Todo filter render");

    return (
        <footer className="w-full flex">
            <Button className="flex-1 rounded-none" onClick={() => { changeFilterType("All") }}>All</Button>
            <Button className="flex-1 rounded-none" onClick={() => { changeFilterType("Pending") }}>Pending</Button>
            <Button className="flex-1 rounded-none" onClick={() => { changeFilterType("Completed") }}>Completed</Button>
        </footer>
    )
}

export default memo(TodoFilter)
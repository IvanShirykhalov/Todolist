import React, {FC, memo, useCallback} from 'react';
import Button from "@mui/material/Button";
import {FilterValueType, todolistsActions} from "features/todolists/todolist/todolists.reducer";
import {useActions} from "common/hooks/useActions";

type Props = {
    filter: FilterValueType
    id: string

}
export const FilterTasksButton: FC<Props> = memo(({filter, id}) => {

    const {changeTodolistFilter} = useActions(todolistsActions)
    const changeFilter = useCallback((filter: FilterValueType) => changeTodolistFilter({id, filter}), [])

    return (
        <div>
            <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                    size={'small'}
                    sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                    onClick={() => changeFilter('all')}
                    color={filter === 'all' ? 'primary' : 'inherit'}>All
            </Button>
            <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                    sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                    onClick={() => changeFilter('active')}
                    color={filter === 'active' ? 'primary' : 'inherit'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                    size={'small'}
                    sx={{fontSize: '10px', p: '4px 4px'}}
                    onClick={() => changeFilter('completed')}
                    color={filter === 'completed' ? 'primary' : 'inherit'}>Completed
            </Button>
        </div>
    );
})


import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField, IconButton } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError]  = useState<string | null>(null)

    const onClickAddItem = () => {
        if (title.trim()) {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.key === 'Enter') onClickAddItem()
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeSetTitle}
                       onKeyPress={onKeyPressAddItem}
                       label="Title"
                       helperText={error}
            />
            <IconButton color="primary" onClick={onClickAddItem}>
                <AddBox />
            </IconButton>
        </div>
    );
};

export default AddItemForm
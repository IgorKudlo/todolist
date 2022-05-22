import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError]  = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onClickAddItem = () => {
        if (title.trim()) {
            props.addItem(title)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === 'Enter') onClickAddItem()}

    const errorInputStyle = error ? {border: '2px solid red', outline: 'none'} : undefined

    return (
        <div>
            <input value={title}
                   onChange={onChangeSetTitle}
                   onKeyDown={onKeyPressAddItem}
                   style={errorInputStyle}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && <div style={{color: 'red', fontWeight: 'bold'}}>Title is required!</div>}
        </div>
    );
};

export default AddItemForm
import React, {useState, ChangeEvent} from 'react'

type EditableSpanPropsType = {
    title: string
    setNewTitle: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
        ? <input value={title}
                 onChange={onChangeSetTitle}
                 onBlur={offEditMode}
                 autoFocus
          />
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
};

export default EditableSpan
import { FunctionalComponent } from "preact";
import { Entity } from "../utils";
import { useState } from "preact/hooks";
import { SaveIcon } from "../icons/SaveIcon";
import { CloseIcon } from "../icons/CloseIcon";

export type NewTableRowProps = {
    entity: Entity
    onCreate: (entity: Entity) => void
}

const createEmptyObject = (obj: Entity) : Entity => {
    return Object.fromEntries( Object.entries(obj).map(e => [e[0], undefined]))
}

export const NewTableRow: FunctionalComponent<NewTableRowProps> = ({ entity, onCreate }) => {

    const [editMode, setEditMode] = useState(false)
    const [editedEntity, setEditedEntity] = useState(createEmptyObject(entity))

    const onFieldChange = (key: string, value: string) => {
        const temp = { ...editedEntity }
        temp[key] = value
        setEditedEntity(temp)
    }

    const onAddClick = () => {
        setEditMode(true)
    }

    const onSaveClick = () => {
        onCreate(editedEntity)
        setEditedEntity(createEmptyObject(entity))
        setEditMode(false) 
    }

    const onCloseClick = () => {
        setEditMode(false)
        setEditedEntity(createEmptyObject(entity))
    }

    const fields = Object.entries(editedEntity)

    return (
        <tr class="table table-fixed w-full border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
            {fields.map(field => <td class="px-6 py-4">
                {editMode ? <input style={{ width: field[0].length + 'ch' }} class='w-40' value={field[1]} onInput={(e) => onFieldChange(field[0], e.currentTarget.value)} /> : field[1]}
            </td>)}

            <td class="w-20 flex px-6 py-4 gap-5">
                {!editMode && <button onClick={onAddClick} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Add</button>}
                {editMode && <button onClick={onCloseClick} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><CloseIcon/></button>}
                {editMode && <button onClick={onSaveClick} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><SaveIcon/></button>}
            </td>
        </tr>
    )
}
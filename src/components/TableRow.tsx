import { FunctionalComponent } from "preact";
import { Entity } from "../utils";
import { useState } from "preact/hooks";
import { EditIcon } from "../icons/EditIcon";
import { SaveIcon } from "../icons/SaveIcon";
import { CloseIcon } from "../icons/CloseIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

export type TableRowProps = {
    entity: Entity
    onUpdate: (entity: Entity) => void
    onDelete: (entity: Entity) => void
}

export const TableRow: FunctionalComponent<TableRowProps> = ({ entity, onUpdate, onDelete  }) => {

    const [editMode, setEditMode] = useState(false)
    const [editedEntity, setEditedEntity] = useState(entity)

    const onFieldChange = (key: string, value: string) => {
        const temp = { ...editedEntity }
        temp[key] = value
        setEditedEntity(temp)
    }

    const onEditClick = () => {
        setEditMode(true)
    }

    const onSaveClick = () => {
        onUpdate(editedEntity)
        setEditMode(false) 
    }

    const onCloseClick = () => {
        setEditedEntity(entity)
        setEditMode(false) 
    }

    const onDeleteClick = () => {
        onDelete(editedEntity)
        setEditMode(false) 
    }


    const fields = Object.entries(editedEntity)

    return (
        <tr class="max-w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {fields.map(field => <td class="px-6 py-4">
                {editMode ? <input style={{ width: field[0].length + 'ch' }} class='w-40' value={field[1]} onInput={(e) => onFieldChange(field[0], e.currentTarget.value)} /> : field[1]}
            </td>)}

            <td class="w-20 flex px-6 py-4 gap-5">
                {!editMode && <button onClick={onEditClick} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><EditIcon /></button>}
                {editMode && <button onClick={onCloseClick} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><CloseIcon/></button>}
                {editMode && <button onClick={onSaveClick} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><SaveIcon /></button>} 
                {editMode && <button onClick={onDeleteClick} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><DeleteIcon/></button>}
            </td>
        </tr>
    )
}
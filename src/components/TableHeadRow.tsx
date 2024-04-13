import { FunctionalComponent } from "preact";
import { Entity, camelCaseToWords } from "../utils";

export type TableHeadRowProps = {
    entity: Entity
}

export const TableHeadRow: FunctionalComponent<TableHeadRowProps> = ({ entity }) => {
    const names = Object.keys(entity).map(camelCaseToWords)

    console.log(names)
    return (
        <tr>
            {names.map(name =>  <th scope="col" class="px-6 py-3">
                {name}
            </th>)}
           
            <th scope="col" class="px-6 py-3">
                Action
            </th>
        </tr>
    )
}
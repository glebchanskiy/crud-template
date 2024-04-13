import { FunctionalComponent } from "preact";
import { TableRow } from "./TableRow";
import { TableHeadRow } from "./TableHeadRow";
import { useState } from "preact/hooks";
import { NewTableRow } from "./NewTableRow";
import { Entity } from "../utils";

export const Table: FunctionalComponent<{ name: string, entities: Entity[] }> = ({ name, entities }) => {


    const [query, setQuery] = useState<string>()

    const chageQuery = (query: string) => {
        if (query.length > 0) setQuery(query)
        else setQuery(undefined)
    }



    return (
        <div class="flex flex-col gap-5">
            <div class="flex  justify-between items-center">
                <div class="relative mt-1">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input onInput={(e) => chageQuery(e.currentTarget.value)} type="text" id="table-search" class="block py-2 ps-10 text-sm border w-80 rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items" />
                </div>
                <div class='px-3 py-1 text-white bg-gray-700 border-gray-600 rounded-lg uppercase text-[25px]'>
                    {name}
                </div>
            </div>

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 overflow-hidden rounded-lg">

                {
                    entities.length > 0 && <>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <TableHeadRow entity={entities[0]} />
                        </thead>
                        <tbody>
                            {entities.filter(entity => query ? Object.values(entity).some(s => s?.includes(query)) : entity).map(entity => <>
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                            </>)}

                            <NewTableRow entity={entities[0]} onCreate={(e) => console.log('fetch for creation: ', e)} />
                        </tbody>
                    </>

                }

            </table>
        </div>

    )
}
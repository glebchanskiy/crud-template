import { FunctionalComponent } from "preact";
import { TableRow } from "./TableRow";
import { TableHeadRow } from "./TableHeadRow";
import { useRef, useState } from "preact/hooks";
import { NewTableRow } from "./NewTableRow";
import { Entity } from "../utils";
import { useKeyPress } from "../hooks.ts/useKeyPress";

export const Table: FunctionalComponent<{ name: string, entities: Entity[] }> = ({ name, entities }) => {
    const [query, setQuery] = useState<string>()
    const searchRef = useRef<HTMLInputElement>(null)

    const chageQuery = (query: string) => {
        if (query.length > 0) setQuery(query)
        else setQuery(undefined)
    }

    useKeyPress(() => {
        searchRef.current?.focus()
    }, 'k')

    return (
        <div class="h-full flex flex-col gap-5">
            <div class="flex h-12 justify-between items-center">
                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input ref={searchRef} onInput={(e) => chageQuery(e.currentTarget.value)} type="text" id="table-search" class="block py-2 ps-10 text-sm  w-80 rounded-lg bg-gray-700 placeholder-gray-400 text-gray-300 focus:ring-4 focus:ring-offset-gray-500 focus:ring-offset-2 focus:ring-blue-500 !outline-none" placeholder="Search for items (Cmd/Ctrl + K)" />
                </div>
                <div class='px-3 text-gray-400 bg-gray-700 border-gray-600 rounded-lg uppercase text-[25px]'>
                    {name}
                </div>
            </div>

            <table class="h-full w-full text-sm text-left rtl:text-right text-gray-500 overflow-hidden rounded-lg">

                {
                    entities.length > 0 && <>
                        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                            <TableHeadRow entity={entities[0]} />
                            <NewTableRow entity={entities[0]} onCreate={(e) => console.log('fetch for creation: ', e)} />
                        </thead>
                        <tbody class='block h-full overflow-scroll'>


                            {entities.filter(entity => query ? Object.values(entity).some(s => s?.includes(query)) : entity).map(entity => <>
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                                <TableRow entity={entity} onDelete={(e) => console.log('fetch for delete: ', e)} onUpdate={(e) => console.log('fetch for upadted: ', e)} />
                            </>)}


                        </tbody>
                    </>
                }
            </table>
        </div>

    )
}
import { FunctionalComponent } from "preact";
import { TableRow } from "./TableRow";
import { TableHeadRow } from "./TableHeadRow";
import { useEffect, useRef, useState } from "preact/hooks";
import { NewTableRow } from "./NewTableRow";
import { Entity } from "../utils";
import { useKeyPress } from "../hooks.ts/useKeyPress";
import { useSignal } from "@preact/signals";
import { apiClient } from "../api/client";
import { TableInfo } from "../api";

export const Table: FunctionalComponent<{ table: TableInfo }> = ({ table }) => {
    const [query, setQuery] = useState<string>()
    const searchRef = useRef<HTMLInputElement>(null)

    const entities = useSignal<Entity[] | undefined>(undefined)

    const filterOnDelete = (id: any) => {
        if (entities.value) {
            console.log(id)
            console.log(entities.value)
            entities.value = [...entities.value.filter(entity => (entity.id as any) != id)]
        }

    }

    const filterOnAdd = (entity: Entity) => {
        if (entities.value) {
            entities.value = [entity, ...entities.value]
        }
    }

    useEffect(() => {
        apiClient.getAll({ table })
            .then(response => entities.value = response.data)
    }, [location.pathname])

    const chageQuery = (query: string) => {
        if (query.length > 0) setQuery(query)
        else setQuery(undefined)
    }

    useKeyPress(() => {
        searchRef.current?.focus()
    }, 'k')


    console.log('query: ', query)
    return (
        <div class="h-full flex flex-col gap-5">
            <div class="flex h-12 justify-between items-center">
                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input ref={searchRef} onInput={(e) => chageQuery(e.currentTarget.value)} type="text" id="table-search" class="block py-2 ps-10 text-sm  w-80 rounded-lg bg-secondary placeholder-text placeholder-opacity-50 focus:ring-4 focus:ring-offset-back focus:ring-offset-2 focus:ring-blue-500 !outline-none transition-this" placeholder="Search for items (Cmd/Ctrl + K)" />
                </div>
                <div class='px-3  bg-secondary border-gray-600 rounded-lg uppercase text-[25px]'>
                    {table.name}
                </div>
            </div>

            <table class="h-full w-full text-sm text-left rtl:text-right text-text text-opacity-50 overflow-hidden rounded-lg">

                {
                    entities.value && entities.value.length > 0 && <>
                        <thead class="text-xs uppercase bg-secondary ">
                            <TableHeadRow entity={entities.value[0]} />
                            <NewTableRow entity={entities.value[0]} onCreate={(e) => {
                                apiClient.create({ entity: e, table }).then(res => filterOnAdd(res.data))
                                
                            }} />
                        </thead>
                        <tbody class='block h-full overflow-scroll'>


                            {entities.value.filter(entity => query ? Object.values(entity).reduce((prev, curr) => { return prev && curr ? prev + curr : '' })?.includes(query) : true).map(entity => <>
                                <TableRow entity={entity} onDelete={() => {
                                    apiClient.delete({ id: entity.id as any, table })
                                    filterOnDelete(entity.id)
                                }} onUpdate={(e) => apiClient.update({ entity: e, id: entity.id as any, table })} />
                            </>)}


                        </tbody>
                    </>
                }
            </table>
        </div>

    )
}
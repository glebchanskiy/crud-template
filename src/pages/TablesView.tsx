import { FunctionComponent, FunctionalComponent } from "preact";
import { Table } from "../components/Table";
import Router, { route } from "preact-router";
import { UserProfile } from "../components/UserProfile";
import { useEffect, useState } from "preact/hooks";
import { apiClient } from "../api/client";
import { ApiUser } from "../api";

export type TableSource = {
    name: string
    resourceTable: string
    tablePathName: string
}

export const TablesView: FunctionComponent<{ user?: ApiUser }> = ({ user }) => {
    
    if (!user) return <></>


    const [tables, setTables] = useState<TableSource[]>()

    useEffect(() => {
        apiClient.findAllTablesInfo()
            .then(response => setTables(response.data))
    }, [])

    return (
        <div class='h-dvh w-full flex flex-col gap-y-5 p-2 '>
            {tables &&
                <>
                    <div class='w-full justify-start gap-3 flex flex-wrap flex-row bg-secondary  p-3 rounded-md text-text'>
                        {tables.map(table => <LinkToTable source={table} active={location.pathname === `/tables/${table.tablePathName}`} />)}
                    </div>

                    <div class='flex justify-end'>
                        <UserProfile user={user} onClick={() => route('/user')} />
                    </div>

                    <div class='h-full rounded-md'>
                        <Router>
                            {tables.map(table => <Table path={`/tables/${table.tablePathName}`} table={table} user={user} />)}
                        </Router>
                    </div>
                </>
            }
        </div>
    )
}


const LinkToTable: FunctionalComponent<{ source: TableSource, active?: boolean }> = ({ source, active }) => {
    return (
        <a class={`block text-text px-3 py-1 bg-primary-700 rounded-lg  ${active ? 'ring-4 ring-primary-500 ring-offset-secondary ring-offset-2' : 'border border-primary-600'} transition-this`} href={`/tables/${source.tablePathName}`}>{source.name}</a>
    )
}
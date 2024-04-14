import { FunctionComponent, FunctionalComponent } from "preact";
import { Table } from "../components/Table";
import Router, { route } from "preact-router";
import { UserProfile } from "../components/UserProfile";

export type TableSource = {
    name: string
    resourceTable: string
    tablePathName: string
}

export const TablesView: FunctionComponent = ({ }) => {
    const tables: TableSource[] = [
        { name: 'Table 1', resourceTable: '/api/v1/tables/table_1', tablePathName: 'table_1' },
        { name: 'Table 2', resourceTable: '/api/v1/tables/table_2', tablePathName: 'table_2' },
        { name: 'Table 3', resourceTable: '/api/v1/tables/table_3', tablePathName: 'table_3' },
        { name: 'Table 4', resourceTable: '/api/v1/tables/table_4', tablePathName: 'table_4' },
        { name: 'Table 5', resourceTable: '/api/v1/tables/table_5', tablePathName: 'table_5' },
        { name: 'Table 6', resourceTable: '/api/v1/tables/table_6', tablePathName: 'table_6' },
        { name: 'Table 7', resourceTable: '/api/v1/tables/table_7', tablePathName: 'table_7' },
        { name: 'Table 8', resourceTable: '/api/v1/tables/table_8', tablePathName: 'table_8' },
        { name: 'Table 9', resourceTable: '/api/v1/tables/table_9', tablePathName: 'table_9' },
        { name: 'Table 10', resourceTable: '/api/v1/tables/table_10', tablePathName: 'table_10' },
    ]

    // const [currentTable, setCurrentTable] = useState<TableSource>(tables[0])

    const data = [{
        productName: 'Apple MacBook Pro 17"',
        color: 'silver',
        category: 'shit',
        price: '2999$',
        anotherOneColumn: 'kek',
        lol: 'Lol'
    }]

    console.log('location: ', location.pathname)

    return (
        <div class='h-dvh w-full flex flex-col gap-y-5 p-2 '>
            <div class='w-full justify-between flex flex-row bg-gray-700 text-gray-400 p-3 rounded-md'>
                {tables.map(table => <LinkToTable source={table} active={location.pathname === `/tables/${table.tablePathName}`} />)}
            </div>

            <div class='flex justify-end'>
                <UserProfile onClick={() => route('/user')} />
            </div>

            <div class='h-full rounded-md'>
                <Router>
                    {tables.map(table => <Table path={`/tables/${table.tablePathName}`} name={table.name} entities={data} />)}
                </Router>
            </div>


        </div>
    )
}


const LinkToTable: FunctionalComponent<{ source: TableSource, active?: boolean }> = ({ source, active }) => {
    return (
        <a class={`block px-3 py-1 bg-primary-700 rounded-lg text-gray-300 ${active ? 'ring-4 ring-primary-500 ring-offset-gray-700 ring-offset-2' : ''}`} href={`/tables/${source.tablePathName}`}>{source.name}</a>
    )
}
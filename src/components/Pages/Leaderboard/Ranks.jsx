import React, { useMemo } from 'react';
import {useTable} from "react-table";
import { Leaderboard } from "./Database";

const Ranks = () => {
    // Two things needed for table data (need to memoize them) and list of columns
    const data = useMemo(() => Leaderboard, []);
    const columns = useMemo(() => [
        // {
        //     Header: "Name",
        //     accessor: "name",
        // },
        {
            Header: "Name",
            accessor: data => data.img + " " + data.name,
            Cell: props => (
                <div className="flex items-center gap-4">
                    <img src={props.row.original.img} width={50} alt="Avatar" className="rounded-full w-1/6" />
                    {props.row.original.name}
                </div>
            )
        },
        {
            Header: "Location",
            accessor: "location",
        },
        {
            Header: "Score",
            accessor: "score",
        },
        {
            Header: "Date",
            accessor: "dt",
        },
    ], []);
    // dt, img, location, name, score
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});
    return (
        <div>
            <div className='flex justify-center  overflow-y-scroll w-full h-[82vh] mt-3'>
                <table className="border-collapse rounded-md m-5 overflow-hidden shadow-lg" {...getTableProps()}>
                    <thead className=''>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th className='p-4 pl-1.5 text-left bg-slate-200' {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td className='p-3 bg-slate-100 pl-1.5 hover:bg-slate-200' {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Ranks
import clsx from "clsx"
import type { PropsWithChildren } from "react";
import Skeleton from "react-loading-skeleton";
import "./index.css"

export interface TableProps<T> {
  loading?: boolean;
  loadingNums?: { rows?: number, columns?: number };
  columns: { label: string, key: string, fixed?: boolean, width?: number | string, render?: (key: any, record: T, index?: number) => React.ReactNode }[];
  dataSource: T[];
  onRowClick?: (record: T) => void;
}
const Table = <T extends { id: string }>({ loading, loadingNums = { rows: 3, columns: 3 }, columns, dataSource, onRowClick }: PropsWithChildren<TableProps<T>>) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed min-w-0">
        <thead className="text-xs text-[#808080]">
          <tr>
            {loading ? (<>{
              new Array(loadingNums.columns).fill(0).map((_, index) =>
                <td className="p-2 text-right" key={index}>
                  <div className="w-15">
                    <Skeleton />
                  </div>
                </td>)}
            </>
            ) : (<>
              {columns.map((column) => <td
                key={column.key}
                className={clsx("bg-[#1c1c1c] p-2 text-right", column.fixed && "fixed-column text-left")}>
                <div style={{ width: column.width || "fit-content" }}>{column.label}</div>
              </td>)}
            </>)}
          </tr>
        </thead>
        <tbody className="text-[14px]">
          {loading ? (<>{
            new Array(loadingNums.rows).fill(0).map((_, index) => (
              <tr key={index}>
                {new Array(loadingNums.columns).fill(0).map((_, index) => (
                  <td className="p-2" key={index}>
                    <div className="w-20">
                      <Skeleton />
                    </div>
                  </td>
                ))}
              </tr>
            ))
          }</>
          ) : (<>
            {dataSource.map((row) => (
              <tr key={row.id} onClick={() => onRowClick?.(row)}>
                {columns.map((column, index) => (
                  <td
                    className={clsx("bg-[#1c1c1c] p-2 text-right", column.fixed && "fixed-column")}
                    key={`${row.id}-${column.key}`}
                  >
                    <div style={{ width: column.width || "fit-content" }}>{column.render ?
                      column.render((row as Record<string, any>)[column.key], row, index) :
                      (row as Record<string, any>)[column.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </>)}
        </tbody>
      </table>
    </div >
  )
}

export default Table
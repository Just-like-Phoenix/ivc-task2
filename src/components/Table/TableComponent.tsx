import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { Table, Td, Th } from "./StyledComponents";
import TablePaginationComponent from "./TablePaginationComponent";
import {
  ExportDiv,
  TableDiv,
  TablePageDiv,
} from "../TablePage/StyledComponents";
import { useAppSelector } from "../../hoks/storeHoks";
import { exportData } from "../../features/export/exportData";

const TableComponent = ({
  data,
  columns,
  rowSelection,
  setRowSelection,
}: {
  data: any;
  columns: any;
  rowSelection: any;
  setRowSelection: any;
}) => {
  const tData = useAppSelector((state) => state.tableData);
  const tKeys = useAppSelector((state) => state.tableKeys) as string[];

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageSize(5);
  }, [table]);

  return (
    <TablePageDiv>
      <ExportDiv>
        <button
          onClick={(e) =>
            exportData({
              inputData: tData,
              keys: tKeys,
              selectedRows: table
                .getSelectedRowModel()
                .rows.map((e) => e.index),
              type: "pdf",
            })
          }
        >
          Эксрорт в PDF
        </button>
        <button
          onClick={(e) =>
            exportData({
              inputData: tData,
              keys: tKeys,
              selectedRows: table
                .getSelectedRowModel()
                .rows.map((e) => e.index),
              type: "excel",
            })
          }
        >
          Эксрорт в EXCEL
        </button>
      </ExportDiv>
      <TableDiv>
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </Th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <TablePaginationComponent table={table} />
      </TableDiv>
    </TablePageDiv>
  );
};

export default TableComponent;

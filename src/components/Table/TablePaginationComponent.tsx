import { Table } from "@tanstack/react-table";
import {
  Button,
  PageText,
  Select,
  TablePaginationDiv,
} from "./StyledComponents";

const TablePaginationComponent = ({ table }: { table: Table<any> }) => {
  return (
    <TablePaginationDiv>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>

        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>

        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
      </div>
      <PageText>
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </PageText>

      <Select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[5, 10].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Select>
    </TablePaginationDiv>
  );
};

export default TablePaginationComponent;

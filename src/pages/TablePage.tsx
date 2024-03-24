import { createColumnHelper } from "@tanstack/react-table";
import { useAppSelector } from "../hoks/storeHoks";
import TableComponent from "../components/Table/TableComponent";
import React from "react";
import TableCheckbox from "../components/Table/TableCheckboxComponent";

const TablePage = () => {
  const tData = useAppSelector((state) => state.tableData);
  const tKeys = useAppSelector((state) => state.tableKeys) as string[];
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = () => {
    let defColumns: any[] = [];

    type columnsType = typeof tData;

    const columnHelper = createColumnHelper<columnsType>();

    defColumns.push(
      columnHelper.accessor("select", {
        id: "select",
        header: (props) => (
          <TableCheckbox
            {...{
              checked: props.table.getIsAllRowsSelected(),
              indeterminate: props.table.getIsSomeRowsSelected(),
              onChange: props.table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <TableCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      })
    );

    tKeys.forEach((e) => {
      defColumns.push(
        columnHelper.accessor(e, {
          id: e,
          header: () => e,
          cell: (info) => info.renderValue(),
        })
      );
    });

    return defColumns;
  };

  return (
    <TableComponent
      data={tData}
      columns={columns()}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
    />
  );
};

export default TablePage;

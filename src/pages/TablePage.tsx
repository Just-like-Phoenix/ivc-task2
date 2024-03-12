import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hoks/storeHoks";
import TableComponent from "../components/Table/TableComponent";
import {
  ExportDiv,
  TbalePageDiv,
} from "../components/TablePage/StyledComponents";
import { HTMLProps } from "react";
import React from "react";
import TableCheckbox from "../components/Table/TableCheckboxComponent";

const TablePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    <TbalePageDiv>
      <ExportDiv>
        <button onClick={(e) => console.log()}>Эксрорт в PDF</button>
        <button onClick={(e) => console.log()}>Эксрорт в EXCEL</button>
      </ExportDiv>

      <TableComponent
        data={tData}
        columns={columns()}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </TbalePageDiv>
  );
};

export default TablePage;

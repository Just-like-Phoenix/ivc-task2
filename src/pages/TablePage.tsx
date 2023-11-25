import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hoks/storeHoks";
import TableComponent from "../components/Table/TableComponent";
import {
  TbaleDiv,
  TbalePageDiv,
} from "../components/TablePage/StyledComponents";

const TablePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tData = useAppSelector((state) => state.tableData);
  const tKeys = useAppSelector((state) => state.tableKeys) as string[];

  const columns = () => {
    let defColumns: any[] = [];

    type columnsType = typeof tData;

    const columnHelper = createColumnHelper<columnsType>();

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
      <TbaleDiv>
        <TableComponent data={tData} columns={columns()} />
      </TbaleDiv>
    </TbalePageDiv>
  );
};

export default TablePage;

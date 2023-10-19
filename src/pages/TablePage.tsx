import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hoks/storeHoks";

const TablePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tData = useAppSelector((state) => state.tableData);

  console.log(tData);

  return (
    <div style={{ color: "white" }}>
      {/* {tData.keys.map((element) => {
        return "<p>" + element + "</p>";
      })} */}
    </div>
  );
};

export default TablePage;

import { FormDiv, HomePageDiv } from "../components/HomePage/StyledComponents";
import { useForm, SubmitHandler } from "react-hook-form";
import * as XLSX from "xlsx";
import { setTableData } from "../features/table/tableDataSlice";
import { useAppDispatch } from "../hoks/storeHoks";
import { useNavigate } from "react-router-dom";
import { setTableKeys } from "../features/table/tableKeysSlice";

type formData = {
  file: File[];
};

const HomePage = () => {
  const { register, handleSubmit } = useForm<formData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<formData> = (data) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const oda: any[] = XLSX.utils.sheet_to_json(worksheet);
      const json = JSON.parse(JSON.stringify(oda));

      dispatch(setTableData(oda));
      dispatch(setTableKeys(Object.keys(json[0])));
    };

    reader.readAsArrayBuffer(data.file[0]);
    navigate("/table");
  };

  return (
    <HomePageDiv>
      <FormDiv>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            accept=".xlsx, .xlsm, .json"
            {...register("file")}
          ></input>
          <input type="submit" />
        </form>
      </FormDiv>
    </HomePageDiv>
  );
};

export default HomePage;

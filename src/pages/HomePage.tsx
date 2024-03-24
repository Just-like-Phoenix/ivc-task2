import {
  FileInput,
  FormDiv,
  FormInput,
  HomePageDiv,
} from "../components/HomePage/StyledComponents";
import { useForm, SubmitHandler } from "react-hook-form";
import * as XLSX from "xlsx";
import { setTableData } from "../features/table/tableDataSlice";
import { useAppDispatch } from "../hoks/storeHoks";
import { useNavigate } from "react-router-dom";
import { setTableKeys } from "../features/table/tableKeysSlice";

interface formData {
  file: File[];
}

const HomePage = () => {
  const { register, handleSubmit } = useForm<formData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<formData> = (fData) => {
    const reader = new FileReader();

    if (!(fData.file[0].type === "application/json")) {
      reader.onload = (file: any) => {
        const data = new Uint8Array(file.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const oda: any[] = XLSX.utils.sheet_to_json(worksheet);
        const json = JSON.parse(JSON.stringify(oda));
        dispatch(setTableData(oda));
        dispatch(setTableKeys(Object.keys(json[0])));
      };
    } else {
      reader.onload = (file: any) => {
        const data = JSON.parse(
          new TextDecoder("utf-8").decode(new Uint8Array(file.target.result))
        ).people;
        const json = JSON.parse(JSON.stringify(data));
        dispatch(setTableData(data));
        dispatch(setTableKeys(Object.keys(json[0])));
      };
    }
    reader.readAsArrayBuffer(fData.file[0]);
    navigate("/table");
  };

  return (
    <HomePageDiv>
      <FormDiv
        style={{ display: "flex", justifyContent: "center" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FileInput
          id="filePicker"
          type="file"
          accept=".xlsx, .xlsm, .json"
          style={{ marginBottom: "8px" }}
          {...register("file", {
            required: true,
          })}
        />
        <FormInput type="submit" value={"Отправить"} />
      </FormDiv>
    </HomePageDiv>
  );
};

export default HomePage;

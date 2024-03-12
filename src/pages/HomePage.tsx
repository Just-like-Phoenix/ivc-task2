import {
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
import { useState } from "react";
import { report } from "process";
import { Stimulsoft } from "stimulsoft-reports-js";
import { Button } from "../components/Table/StyledComponents";

interface formData {
  file: File[];
}

const HomePage = () => {
  const { register, handleSubmit, getValues } = useForm<formData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileLabel, setFileLabel] = useState("");

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

  // <label htmlFor="filePicker">
  //             {fileLabel.length === 0 ? "Rhz" : fileLabel}
  //           </label>
  //           <br />

  return (
    <HomePageDiv>
      <FormDiv
        style={{ display: "flex", justifyContent: "center" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          id="filePicker"
          type="file"
          accept=".xlsx, .xlsm, .json"
          style={{ marginBottom: "8px" }}
          {...register("file", {
            required: true,
            onChange: () => {
              const files = getValues().file;
              if (files.length > 0) {
                setFileLabel(files[0].name);
              }
            },
          })}
        />
        <FormInput type="submit" value={"Отправить"} />
      </FormDiv>
    </HomePageDiv>
  );
};

export default HomePage;

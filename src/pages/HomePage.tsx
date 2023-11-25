import { FormDiv, HomePageDiv } from "../components/HomePage/StyledComponents";
import { useForm, SubmitHandler } from "react-hook-form";
import * as XLSX from "xlsx";
import { setTableData } from "../features/table/tableDataSlice";
import { useAppDispatch } from "../hoks/storeHoks";
import { useNavigate } from "react-router-dom";
import { setTableKeys } from "../features/table/tableKeysSlice";
import { useState } from "react";
import { report } from "process";
import { Stimulsoft } from "stimulsoft-reports-js";

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

  return (
    <HomePageDiv>
      <FormDiv>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="filePicker"
            type="file"
            accept=".xlsx, .xlsm, .json"
            {...register("file", {
              required: true,
              onChange: () => {
                const files = getValues().file;
                if (files.length > 0) {
                  setFileLabel(files[0].name);
                }
              },
            })}
            hidden
            style={{ zIndex: -1 }}
          />

          <label htmlFor="filePicker" onClick={() => setFileLabel("")}>
            {fileLabel.length === 0 ? "Rhz" : fileLabel}
          </label>
          <br />

          <input type="submit" />
        </form>
      </FormDiv>
    </HomePageDiv>
  );
};

export default HomePage;

import { useState } from "react";
import { FormDiv, HomePageDiv } from "../components/HomePage/StyledComponents";
import { useForm, SubmitHandler } from "react-hook-form";
import * as XLSX from "xlsx";
import { getData, setData } from "../app/store";
import { useAppDispatch, useAppSelector } from "../hoks/storeHoks";

type formData = {
  file: File[];
};

const HomePage = () => {
  const [tableData, setTableData] = useState<any>();
  const { register, handleSubmit } = useForm<formData>();
  const dispatch = useAppDispatch();
  const tData = useAppSelector((state) => state.tableData.data);

  const onSubmit: SubmitHandler<formData> = (data) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setTableData(jsonData);
    };

    reader.readAsArrayBuffer(data.file[0]);
    dispatch(setData(tableData));
    const json = JSON.parse(JSON.stringify(tData));
    console.log(json);
  };

  return (
    <HomePageDiv>
      <FormDiv>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" accept=".xlsx" {...register("file")}></input>
          <input type="submit"></input>
        </form>
      </FormDiv>
    </HomePageDiv>
  );
};

export default HomePage;

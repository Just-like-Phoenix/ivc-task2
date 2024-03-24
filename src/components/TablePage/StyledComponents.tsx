import styled from "styled-components";
import { blockColor } from "../../app/theme";

export const TablePageDiv = styled.div`
  width: 100vw;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TableDiv = styled.div`
  background-color: ${blockColor};

  width: 80vw;
  height: 80svh;
  padding: 20px 20px 0px 20px;
  border-radius: 20px;
`;

export const ExportDiv = styled.div`
  background-color: ${blockColor};

  width: 80vw;
  height: 100px;
  padding: 20px 20px 0px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

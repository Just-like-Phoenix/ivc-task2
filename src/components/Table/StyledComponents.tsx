import { styled } from "styled-components";
import { buttonColor, textColor } from "../../app/theme";

export const TablePaginationDiv = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Table = styled.table`
  width: 100%;
  height: 90%;
  color: ${textColor};
  border-collapse: collapse;
`;

export const Th = styled.th`
  font-size: 1.2vw;
  border: 0.1vw solid ${textColor};
`;

export const Td = styled.td`
  font-size: 1vw;
  border: 0.1vw solid ${textColor};
`;
export const Button = styled.button`
  margin: auto;
  height: 3vh;
  background-color: ${buttonColor};
  color: ${textColor};
  border-width: 0.1vw;
  font-size: 1.2vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Select = styled.select`
  height: 3vh;
  background-color: ${buttonColor};
  color: ${textColor};
  border-width: 0.1vw;
  font-size: 1.2vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageText = styled.h1`
  position: relative;
  color: ${textColor};
  font-size: 1.5vw;
`;

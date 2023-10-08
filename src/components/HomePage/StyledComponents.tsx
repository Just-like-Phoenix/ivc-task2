import styled from "styled-components";
import { blockColor, buttonColor } from "../../theme";

export const HomePageDiv = styled.div`
  width: 100vw;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormDiv = styled.div`
  background-color: ${blockColor};

  width: 400px;
  height: 260px;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 200px) and (max-width: 767px) {
    width: 120px;
    height: 100px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 360px;
    height: 240px;
  }
`;

export const FormButton = styled.button`
  background-color: ${buttonColor};

  width: 360px;
  height: 100px;

  border-radius: 20px;
  border: 0px;

  padding: 10px;

  @media only screen and (min-width: 200px) and (max-width: 767px) {
    width: 80px;
    height: 50px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 320px;
    height: 100px;
  }
`;

export const FormFilePicker = styled.button`
  background-color: ${buttonColor};

  width: 360px;
  height: 100px;

  border-radius: 20px;
  border: 0px;

  padding: 10px;

  @media only screen and (min-width: 200px) and (max-width: 767px) {
    width: 80px;
    height: 50px;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 320px;
    height: 100px;
  }
`;

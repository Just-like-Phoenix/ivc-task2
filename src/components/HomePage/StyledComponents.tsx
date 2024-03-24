import styled from "styled-components";
import { blockColor, buttonColor, textColor } from "../../app/theme";

export const HomePageDiv = styled.div`
  width: 100vw;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormDiv = styled.form`
  background-color: ${blockColor};
  color: ${textColor};

  width: 400px;
  height: 260px;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 200px) and (max-width: 767px) {
    width: 320px;
    height: 100px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 320px;
    height: 200px;
  }
`;

export const FormInput = styled.input`
  background-color: ${buttonColor};
  color: ${textColor};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FileInput = styled.input`
  color: ${textColor};

  display: flex;
  justify-content: center;
  align-items: center;
  /* ::-webkit-file-upload-button {
    background-color: red;
  }
  ::file-selector-button {
    background-color: red;
  } */
`;

import styled from "styled-components";

import {  PRIMARY_COLOR,BLACK_COLOR_LIGHT, PRIMARY_COLOR_LIGHT } from "./CssVariables";

export const PrimaryButton = styled.div`
  text-decoration: none;
  font-size:0.8rem;
  background-color: ${PRIMARY_COLOR_LIGHT};
  cursor: pointer;
  color: ${BLACK_COLOR_LIGHT};
  outline: none;
  white-space:nowrap;
  border: 1px solid ${BLACK_COLOR_LIGHT};
  padding: 0.2rem 1rem;
  &:hover {
    background-color: ${PRIMARY_COLOR};
  }
  &:active {
    background-color: ${PRIMARY_COLOR_LIGHT};
  }
`;

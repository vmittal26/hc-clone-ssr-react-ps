import styled from "styled-components";
import { PRIMARY_COLOR } from "client/shared";

export const HeaderContainer = styled.header`
  display: flex;
  max-width: 62.5rem;
  margin: auto;
  font-size: 0.8rem;
  align-items: center;
  background-color: ${PRIMARY_COLOR};
  padding:0.5em;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  .post-title{
        font-size: 0.8rem;
        padding:0;
        margin:0 0.7rem;
    }
`;

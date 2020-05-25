import styled from "styled-components";
import { PHONE_BREAKPOINT } from "client/shared";

export const Postitemcontainer = styled.div`
  display: flex;
  flex-direction: column;

  .item {
    margin-left: 0.4rem;
    white-space: nowrap;
  }

  .post-title {
    font-size: 0.7rem;
    margin-left: 0.5rem;
    background-color: none;
  }
  .post-username {
    span {
      color: gray;
    }
  }
  .post-domain {
    color: gray;
  }

  .post-hide {
    font-size: 0.75rem;
    font-weight: 700;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0.2rem;
    border: none;
    span {
      color: gray;
      margin: 3px;
      font-weight: normal;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  @media (min-width: ${PHONE_BREAKPOINT}) {
    display: flex;
    flex-direction: row;
  }
`;

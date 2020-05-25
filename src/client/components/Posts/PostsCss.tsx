import styled from "styled-components";
import { PHONE_BREAKPOINT, GRAY_COLOR_DARK } from "client/shared";

export const PostsContainer = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
  }
  td,
  th {
    text-align: center;
    padding: 0.4rem 0.5rem;
  }

  tr:nth-child(even) {
    background-color: ${GRAY_COLOR_DARK};
  }

  .posts-upvotes {
    display: flex;
    width: 1.2rem;
    align-items: center;

    img {
      margin: 2px;
      margin-top: -2px;
      cursor: pointer;
    }
  }

  @media (min-width:${PHONE_BREAKPOINT}) {
    .posts-upvotes {
        display: flex;
        width: 1rem;
        align-items: center;

        img {
          margin: 3px;
          margin-top: -2px;
          cursor: pointer;
        }
      }
  }
`;

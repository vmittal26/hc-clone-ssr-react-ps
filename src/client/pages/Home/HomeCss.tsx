import styled from "styled-components";
import { TABLET_BREAKPOINT, GRAY_COLOR } from "client/shared";

export const HomeContainer = styled.div`
  max-width: 62.5rem;
  width: 95%;
  font-size: 0.6rem;
  margin: 0 auto;
  margin-top: 2.2rem;
  align-items: center;
  background: ${GRAY_COLOR};
  overflow: auto;
  height: 92vh;
  position: relative;

  @media (min-width: ${TABLET_BREAKPOINT}) {
    font-size: 0.72rem;
  }
`;

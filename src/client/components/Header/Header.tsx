import * as React from "react";
import { HeaderContainer } from "./HeaderCss";

import  logo from '../../images/logo.gif';

export const Header = (): React.ReactElement => {
  return (
    <HeaderContainer>
      <header>
        <img src={logo} alt=""/>
      </header>
    </HeaderContainer>
  );
};

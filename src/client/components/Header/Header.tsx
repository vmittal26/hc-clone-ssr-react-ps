import * as React from "react";
import { HeaderContainer } from "./HeaderCss";
import logo from "../../images/logo.gif";
import { PrimaryButton, FlexContainer } from "client/shared";
import Image from "../Image/Image";

interface HeaderProps {
  onMore: () => void;
  onClickHome:() => void;
}
export const Header = ({ onMore , onClickHome }: HeaderProps): React.ReactElement => {
  return (
    <HeaderContainer>
      <Image
        src={logo}
        alt={"hackernews-logo"}
        onClick={onClickHome}
        style={{ border: "1px white solid" , marginLeft:'5px' ,cursor:'pointer' }}
      />
      <h1 className="post-title">Hacker News</h1>
      <FlexContainer flexBasis={"15%"}>
        <PrimaryButton onClick={onMore}>More ...</PrimaryButton>
      </FlexContainer>
    </HeaderContainer>
  );
};

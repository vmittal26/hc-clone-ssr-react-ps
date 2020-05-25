import * as React from "react";
import { HeaderContainer } from "./HeaderCss";
import logo from "../../images/logo.gif";
import { PrimaryButton, FlexContainer } from "client/shared";
import Image from "../Image/Image";

interface HeaderProps {
  onMore: () => void;
  onResetPosts:()=>void;
}
export const Header = ({ onMore , onResetPosts}: HeaderProps): React.ReactElement => {
  return (
    <HeaderContainer>
      <Image
        src={logo}
        alt={"hackernews-logo"}
        style={{ border: "1px white solid" , marginLeft:'5px' }}
      />
      <h1 className="post-title">Hacker News</h1>
      <FlexContainer flexBasis={"15%"}>
        <PrimaryButton onClick={onMore}>More</PrimaryButton>
      </FlexContainer>
    </HeaderContainer>
  );
};

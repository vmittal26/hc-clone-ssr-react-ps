import * as React from "react";
import { MessageContainer } from "./MessageContainerCss";

interface MessageProps{
  message:string
}
export const Message =({ message} : MessageProps):React.ReactElement=> {

   return  <MessageContainer><h1>{message}</h1></MessageContainer>
}
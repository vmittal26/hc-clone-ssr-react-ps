import styled, { StyledComponent } from "styled-components";

export const FlexContainer:StyledComponent<any, any> = styled.div`
        display: flex;
        align-items: center;
        justify-content:${({spacing}:any) => spacing};
        flex-basis:${({flexBasis}:any) => flexBasis};
`
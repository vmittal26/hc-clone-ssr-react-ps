import * as React from 'react'
import { Loader} from '../Loader/Loader';
import {SpinnerContainer} from './SpinnerCss';

export const Spinner = (props:any):React.ReactElement=> {
  return (
    <SpinnerContainer style={props.style}>
       <Loader/>
    </SpinnerContainer>
  )
}

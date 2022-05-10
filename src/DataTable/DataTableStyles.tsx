// eslint-disable-next-line no-unused-vars
import styled, { CSSProperties } from 'styled-components'
import { propsToStyle } from "../utils";

interface Props {
  style?: CSSProperties
}

export const DataTableWrapper: any = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;

  & > div {
    width: 100%;
    height: 100%;
    & > div {
      width: 100%;
      height: 100%;
      & > div {
        width: 100%;
        height: 100%;
      }
    }
  } 
  
  ${(props: Props) => propsToStyle(props.style || {})}
`
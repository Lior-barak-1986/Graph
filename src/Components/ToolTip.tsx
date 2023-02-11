import React from 'react';
import { NodeD3 } from '../Interfaces/Node';

export interface IToolTipProps {
  children: JSX.Element, 
}

export default function ToolTip (props: IToolTipProps) {
  const { children } = props; 
  return (
    <div style={{
      background: "white", 
      color:"black",
      border: "black solid 2px"}}>
      {children}
    </div>
  );
}

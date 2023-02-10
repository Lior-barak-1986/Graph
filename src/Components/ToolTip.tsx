import React from 'react';

export interface IToolTipProps {
}

export default function ToolTip (props: IToolTipProps) {
  return (
    <div style={{
      background: "white", 
      color:"black",
      border: "black solid 2px"}}>
      here
    </div>
  );
}

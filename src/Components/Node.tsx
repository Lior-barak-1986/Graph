import { json } from "d3";
import * as React from "react";
import { Node } from "../Interfaces/Node";

export interface INodeToDisplayProps {
  node: Node;
}

export default function NodeToDisplay(props: INodeToDisplayProps) {
  const { node } = props;
  return (
    <div>
      {node.id}
       {node.description ?
       <>
      <br/>
      Description: {node.description}
       </>
      : ""}
      {node.properties ?
      <>
      <br/>
      Properties: {JSON.stringify(node.properties)}
      </>
       : "" }
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "../Interfaces/Link";
import { Node, NodeD3 } from "../Interfaces/Node";
import CreateGraph from "../lib/d3";
import NodeToDisplay from "./Node";
import ToolTip from "./ToolTip";

export interface IGraphProps {
  links: Array<Link>;
  nodes: Array<Node>;
}

export default function Graph(props: IGraphProps) {
  const { links, nodes } = props;
  const [location, setLocation] = useState<Array<number>>([]);
  const [toolTipObject, setToolTipObject] = useState<NodeD3 | null>(null);
  const moveHover = (location: Array<number>, node: NodeD3) => {
    setLocation(location);
    setToolTipObject(node);
  };
  useEffect(() => {
    if (nodes.length && links.length)
      CreateGraph(
        { dataLinks: links, data: nodes },
        { openToolTip: moveHover }
      );
  }, [nodes, links]);
  return (
    <>
      <svg></svg>
      {toolTipObject && (
        <div
          style={{
            position: "absolute",
            top: location[1],
            left: location[0],
          }}
        >
          <ToolTip>
            <NodeToDisplay node={toolTipObject} />
          </ToolTip>
        </div>
      )}
    </>
  );
}

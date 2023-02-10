import React, { useEffect, useRef, useState } from "react";
import { Link } from "../Interfaces/Link";
import { Node } from "../Interfaces/Node";
import CreateGraph from "../lib/d3";
import ToolTip from "./ToolTip";

export interface IGraphProps {
  links: Array<Link>;
  nodes: Array<Node>;
}

export default function Graph(props: IGraphProps) {
  const { links, nodes } = props;
  const svg = useRef<HTMLDivElement>(null);
  const [openToolTip, setOpenToolTip] = useState<boolean>(false);
  const [location, setLocation] = useState<Array<number>>([]);
  const moveHover = (location: Array<number>) => {
    setLocation(location);
    setOpenToolTip(true);
  };
  useEffect(() => {
    if (nodes.length && links.length && svg && svg.current) {
      svg.current.appendChild(
        //@ts-ignore
        CreateGraph(
          { dataLinks: links, data: nodes },
          { openToolTip: moveHover }
        )
      );
    }
  }, [nodes, links]);

  {
    /*@ts-ignore*/
  }
  return (
    <>
      <div ref={svg}></div>
      {openToolTip && (
        <div
          style={{
            position: "absolute",
            top: location[1],
            left: location[0],
          }}
        >
          <ToolTip />
        </div>
      )}
    </>
  );
}

import React ,{ useEffect, useRef } from 'react';
import { Data } from '../Interfaces/Graph';
import { Link } from '../Interfaces/Link';
import { Node } from '../Interfaces/Node';
import CreateGraph from '../lib/d3';

export interface IGraphProps {
    links : Array<Link>,
    nodes: Array<Node>
}

export default function Graph (props: IGraphProps) {
    const { links, nodes } = props;
    const svg = useRef<React.ClassAttributes<HTMLDivElement>>(null);
    useEffect(() => {
      if (nodes && links && svg && svg.current) {
        //@ts-ignore
          svg.current.appendChild((CreateGraph({dataLinks: links,data: nodes},{})));
      }
    }, [nodes,links]);

    return (
        <div className="App">
            {/*@ts-ignore*/}
        <div ref={svg}>
          </div>
      </div>
    );
}

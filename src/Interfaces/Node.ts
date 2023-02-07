import * as d3 from "d3";

export interface Node {
  color: string;
  description: string | undefined;
  fill: boolean | undefined;
  id: string;
  properties: Object | null;
  shape: string | undefined;
  size?: number;
}


export interface NodeD3 extends Node  {
  x: number;
  y: number;
}


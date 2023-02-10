import * as d3 from "d3";
import { Link } from "./Link";
import { Node } from "./Node";

export interface Data{
    links: Array<Link>,
    nodes: Array<Node>
}


export interface ExtraData{
    nodeId?: (d:Node) => string,
    nodeTitle?: (d:Node, index:number) => string , // given d in nodes, a title string
    nodeFill?: string, // node stroke fill (if not using a group color encoding)
    nodeStroke?: string, // node stroke color
    nodeStrokeWidth?: number, // node stroke width, in pixels
    nodeStrokeOpacity?: number, // node stroke opacity
    nodeRadius?: number,  // node radius, in pixels
    nodeStrength?: any,
    linkSource?: (node :Link) => string, // given d in links, returns a node identifier string
    linkTarget?: (node :Link) => string, // given d in links, returns a node identifier string
    linkStroke?: string, // link stroke color
    linkStrokeOpacity?: number, // link stroke opacity
    linkStrokeWidth?: number, // given d in links, returns a stroke width in pixels
    linkStrokeLinecap?: string, // link stroke linecap
    linkStrength?: any,
    colors?: typeof d3.schemeTableau10, // an array of color strings, for the node groups
    width?: number, // outer width, in pixels
    height?: number, // outer height, in pixels
    invalidation?: any, // when this promise resolves, stop the simulation
    openToolTip: (location: Array<number>) => void,
  }
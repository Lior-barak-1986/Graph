import * as d3 from "d3";
import { ExtraData } from "../Interfaces/Graph";
import { Link, LinkD3 } from "../Interfaces/Link";
import { Node, NodeD3 } from "../Interfaces/Node";

interface NodeData {
  data: Array<Node>;
  dataLinks: Array<Link>;
}

function mapNodesToD3(
  data: Array<Node>,
  width: number,
  height: number
): Array<NodeD3> {
  return d3.map(data, (elem, i) => ({
    id: elem.id,
    shape: elem.shape,
    color: elem.color || "black",
    fill: elem.fill,
    x: (width / 3.5) * Math.sin(((6 * Math.PI) / data.length) * i),
    y: (height / 3.5) * Math.cos(((6 * Math.PI) / data.length) * i),
    properties: elem.properties,
    description: elem.description,
    size: elem.size,
  }));
}

function linkNodesToD3(
  dataLinks: Array<Link>,
  nodes: Array<NodeD3>
): Array<LinkD3 | undefined> {
  return d3.map(dataLinks, (link) => {
    const nodeSource = nodes.find((node) => node.id === link.source);
    const nodeTarget = nodes.find((node) => node.id === link.target);
    if (!nodeSource || !nodeTarget) return;
    return {
      source: [nodeSource.x, nodeSource.y],
      target: [nodeTarget.x, nodeTarget.y],
      color: link.color || "black",
      description: link.description,
      weight: link.weight || 1,
      index: link.index,
      value: link.value,
    };
  });
}

// function moveTooltip(event: MouseEvent,node : NodeD3) {
//   const text = d3.select(".toolTip-text");
//   text.text(
//     (
//       JSON.stringify(node.id) +
//       "\n" +
//       (node.description ? JSON.stringify(node.description) + "\n" : "") +
//       (node.properties
//         ? "Properties: \n" + JSON.stringify(node.properties)
//         : "")
//     ).replaceAll('"', "")
//   )
//   .attr("stroke","black")
//   const [x, y] = d3.pointer(event);
//   const tooltip = d3.select('.toolTip').attr("fill","black")
//   tooltip
//     .attr('transform', `translate(${x}, ${y})`);
// }

function createNodes(
  nodes: Array<NodeD3>,
  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>,
  openToolTip: (location: Array<number>) => void
) {
  nodes.forEach((node) => {
    svg
      .append("g")
      .selectAll("shape")
      .data([node])
      .join(node.shape === "rectangle" ? "rect" : "circle")
      .attr("r", node.size || 5)
      .attr("fill", node.fill === false ? "transparent" : node.color)
      .style("stroke", node?.color)
      .attr("stroke-width", "3")
      .attr("cx", node.x)
      .attr("cy", node.y)
      .attr("x", node.x)
      .attr("y", node.y)
      .attr("width", node.size || 5)
      .attr("height", node.size || 5)
      .on("mouseover", (e: any) => {
        const { layerX, layerY } = e;
        openToolTip([layerX, layerY]);
      });
  });
}

function makeArrowByColor(
  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>
) {
  const memo: { [key: string]: string } = {};
  return (color: string) => {
    const key = color;
    if (!memo[key]) {
      memo[key] = `url(#arrow${color})`;
      svg
        .append("defs")
        .append("marker")
        .attr("id", "arrow" + color)
        .attr("viewBox", [0, 0, 10, 10])
        .attr("fill", color)
        .attr("refX", 11)
        .attr("refY", 5)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", " M 0 0 L 10 5 L 0 10 z");
    }
    return memo[key];
  };
}

function createLinkWithArrowToNodes(
  links: Array<LinkD3 | undefined>,
  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>
) {
  const arrowCreator = makeArrowByColor(svg);
  const Gen = d3.line();
  links.forEach((link) => {
    link &&
      svg
        .append("path")
        .attr("stroke", link.color || "#99")
        .attr("d", Gen([link.source, link.target]))
        .attr("marker-end", arrowCreator(link.color));
  });
}

function CreateGraph(
  { data, dataLinks }: NodeData,
  {
    colors = d3.schemeTableau10, // an array of color strings, for the node groups
    width = 1020, // outer width, in pixels
    height = 800, // outer height, in pixels
    openToolTip,
  }: ExtraData
) {
  const nodes = mapNodesToD3(data, width, height);
  const links = linkNodesToD3(dataLinks, nodes);
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");
  createNodes(nodes, svg, openToolTip);
  createLinkWithArrowToNodes(links, svg);
  return Object.assign(svg.node() || {}, { scales: { colors } });
}

export default CreateGraph;

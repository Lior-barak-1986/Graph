import * as d3 from "d3";
import { ExtraData } from "../Interfaces/Graph";
import { Link } from "../Interfaces/Link";
import { Node } from "../Interfaces/Node";

interface NodeData {
  data: Array<Node>;
  dataLinks: Array<Link>;
}

function CreateGraph(
  { data, dataLinks }: NodeData,
  {
    nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
    colors = d3.schemeTableau10, // an array of color strings, for the node groups
    width = 1020, // outer width, in pixels
    height = 800, // outer height, in pixels
  }: ExtraData
) {
  const N = d3.map(data, nodeId).map(intern);

  const nodes = d3.map(data, (_, i) => ({
    id: N[i],
    shape: data[i].shape,
    color: data[i].color || "black",
    fill: data[i].fill,
    x: (width / 3.5) * Math.sin(((2 * Math.PI) / data.length) * i),
    y: (height / 3.5) * Math.cos(((2 * Math.PI) / data.length) * i),
    properties: data[i].properties
  }));
  const links = d3.map(dataLinks, (link, i) => {
    const nodeSource = nodes.find((node) => node.id === link.source);
    const nodeTarget = nodes.find((node) => node.id === link.target);
    return {
      //@ts-ignore
      source: [nodeSource.x, nodeSource.y],
      //@ts-ignore
      target: [nodeTarget.x, nodeTarget.y],
      color: link.color,
      description: link.description,
      weight: link.weight,
      index: link.index,
      value: link.value,
    };
  });

  // Construct the scales.
  const color = d3.scaleOrdinal(
    new Array(nodes.length).map((_, i) => i + 1),
    colors
  );

  const simulation = d3.forceSimulation(nodes);

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");
  const linkage = d3
    .linkHorizontal()
    .source((d) => [d.source[0], d.source[1]])
    .target((d) => [d.target[0], d.target[1]]);
  links.forEach(
    (link) =>
      svg
        .append("g")
        .selectAll("path")
        .data([link])
        .join("path")
        //@ts-ignore
        .attr("d", linkage)
        .attr("fill", link.color ||"#999")
        .attr("width", 10)
    // .attr("stroke-linecap", "round")
    // .attr("stroke-width",  '2')
    // .classed("link", true);
  );
  nodes.forEach((node) => {
    svg
      .append("g")
      .selectAll("shape")
      .data([node])
      .join(node.shape === "rectangle" ? "rect" : "circle")
      .attr("r", 50)
      .attr("fill", node.fill === false ? "transparent" : node.color)
      .style("stroke", node.color)
      .attr("stroke-width", "3")
      .attr("cx", node.x)
      .attr("cy", node.y)
      .attr("x", node.x)
      .attr("y", node.y)
      .attr("width", 50)
      .attr("height", 140)
      .append("title")
      .text((JSON.stringify(node.id) + '\n'+ (node.properties ?  "Properties: \n" + JSON.stringify(node.properties) : "")).replaceAll('\"',''));
  });

  function intern(value: any) {
    return value !== null && typeof value === "object"
      ? value.valueOf()
      : value;
  }
  console.log(Object.assign(svg.node() || {}, { scales: { colors } }))
  return Object.assign(svg.node() || {}, { scales: { colors } });
}

export default CreateGraph;
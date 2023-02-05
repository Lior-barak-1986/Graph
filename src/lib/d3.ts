// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph
import * as d3 from "d3";
import { Link, Node, ExtraData } from "../Interfaces/Node";

interface NodeData {
  data: Array<Node>;
  dataLinks: Array<Link>;
}

function ForceGraph(
  { data, dataLinks }: NodeData,
  {
    nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
    nodeTitle = (d) => d.id, // given d in nodes, a title string
    linkSource = ({ source }) => source, // given d in links, returns a node identifier string
    linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
    colors = d3.schemeTableau10, // an array of color strings, for the node groups
    width = 1020, // outer width, in pixels
    height = 800, // outer height, in pixels
    invalidation, // when this promise resolves, stop the simulation
  }: ExtraData
) {
  const N = d3.map(data, nodeId).map(intern);
  const LS = d3.map(dataLinks, linkSource).map(intern);
  const LT = d3.map(dataLinks, linkTarget).map(intern);
  const T = d3.map(data, nodeTitle);
  const W = d3.map(dataLinks, (link) => (link.weight ? link.weight * 10 : 10));
  const L = d3.map(dataLinks, (link) => (link.color ? link.color : ""));
  const F = d3.map(data, (data) => data.fill);
  const S = d3.map(data, (data) => (data.shape ? data.shape : ""));

  // Replace the input nodes and links with mutable objects for the simulation.
  const nodes = d3.map(data, (_, i) => ({
    id: N[i],
    shape: S[i],
    color: data[i].color,
    fill: F[i]
  }));
  const links = d3.map(dataLinks, (_, i) => ({ source: LS[i], target: LT[i] }));

  // Construct the scales.
  const color = d3.scaleOrdinal(
    new Array(nodes.length).map((_, i) => i + 1),
    colors
  );

  // Construct the forces.
  // const forceNode = d3.forceManyBody();
  const forceLink = d3
    .forceLink(links)
    .id(({ index: i }) => (i !== undefined ? N[i] : null));

  
  
  const simulation = d3
  // @ts-ignore
    .forceSimulation(nodes)
    .force("link", forceLink)
    // .force('center', d3.forceCenter(width/2,height/2))
    // .force('charge', d3.forceManyBody().strength(-20))
    .on("tick", ticked);

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

    
    const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-linecap", "round")
    .selectAll("line")
    .data(links)
    .join("line");
  console.log("ere", nodes);
  const node = svg
    .selectAll("shape")
    // @ts-ignore
    .data(nodes)
    // @ts-ignore
    .style("stroke", "black")
    .join("circle")
    // @ts-ignore
    .attr("fill", (n) => n.fill === false ? n.color : n.color)
    .attr("r", 50)
    // @ts-ignore
    .attr( 'cx', (n,i) => (i % 2 ? -i : i) * 75 )
    .attr( 'cy', (n,i) => (i % 2 ? -i : i) * 75 )
    // @ts-ignore
    .call(drag(simulation));

    if (W)
    // @ts-ignore
    link.attr("stroke-width", ({ index: i }) => (i !== undefined ? W[i] : "1"));
  // @ts-ignore
  if (L) link.attr("stroke", ({ index: i }) => (i !== undefined ? L[i] : "1"));
  if (T)
  // @ts-ignore
    node.append("title").text(({ index: i }) => (i != undefined ? T[i] : "1"));
  // if (invalidation != null) invalidation.then(() => simulation.stop());
  // @ts-ignore
  // node.attr("shape", ({index: i}) => S[i]);
  // @ts-ignore
  // node.attr("fill", ({index: i}) => F[i] ? F[i] : data[i].color)
  // @ts-ignore
  // node.attr("fill", ({index: i}) => F[i] !== undefined && !F[i] ? 'currentColor' : data[i].color );
  // @ts-ignore
  // node.attr("border", ({index: i}) => data[i].color + " 2px solid" );
  // node.attr("fill", ({index: i}) => );

  function intern(value: any) {
    return value !== null && typeof value === "object"
      ? value.valueOf()
      : value;
  }

  function ticked() {
    // console.log(link);
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
    console.log(node);
    node
      // @ts-ignore
      .attr("cx", (d, i) => d.x)
      // @ts-ignore
      .attr("cy", (d, i) => d.y);
  }

  function drag(simulation: any) {
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
  return Object.assign(svg.node() || {}, { scales: { colors } });
}

export default ForceGraph;

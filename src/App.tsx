// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";

// import logo from "./logo.svg";
import "./App.css";
import Graph from "./Components/Graph";
import { Data, Link, Node } from "./Interfaces/Node";
import { fetchData } from "./lib/api";
import CreateGraph from "./lib/d3";

function App() {
  const [data, setData] = useState<Data>(null);
  const [links, setLinks] = useState<Array<Link>>(null);
  const [nodes, setNodes] = useState<Array<Node>>(null);
  const svg = useRef();
  useEffect(() => {
    const fetchServer = async () => {
      const tempData = await fetchData();
      setData(tempData);
      setNodes(tempData.nodes);
      setLinks(
        tempData.links.map((link) => {
          link["source"] = link["from"];
          link["target"] = link["to"];
          return link;
        })
      );
    };
    fetchServer();
  }, []);  
  return (
    <div className="App">
      <Graph nodes={nodes} links={links}/>
    </div>
  );
}

export default App;

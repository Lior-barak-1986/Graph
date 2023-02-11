import React, { useEffect, useState } from "react";
import "./App.css";
import Graph from "./Components/Graph";
import { Link } from "./Interfaces/Link";
import { Node } from "./Interfaces/Node";
import { Data } from "./Interfaces/Graph";
import { fetchData } from "./lib/api";

function App() {
  const [data, setData] = useState<Data>({links:[],nodes:[]});
  const [links, setLinks] = useState<Array<Link>>([]);
  const [nodes, setNodes] = useState<Array<Node>>([]);
  useEffect(() => {
    const fetchServer = async () => {
      const tempData = await fetchData();
      setData(tempData);
      setNodes(tempData.nodes);
      setLinks(
        tempData.links.map((link: any) => {
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

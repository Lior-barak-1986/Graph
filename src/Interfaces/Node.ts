import * as d3 from "d3";

export interface Node extends d3.SimulationNodeDatum  {
  color?: string;
  description?: string;
  fill?: boolean;
  id: string;
  properties?: Object;
  shape?: string;
  size?: number;
}
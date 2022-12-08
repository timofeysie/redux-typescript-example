import { useEffect, useRef, useState } from "react";
import D3Chart from "./D3Chart";

interface Props {
  data?: any;
}

const ChartContainer = ({ data }: Props) => {
  const netGraphRef = useRef(null);
  const [graph, setGraph] = useState<any | null>(null);

  useEffect(() => {
    if (!graph) {
      setGraph(new D3Chart(netGraphRef.current));
    } else {
      graph.update(data);
    }
  }, [graph, data]);

  return (
    <div ref={netGraphRef}>
      <div id="pgraphs"></div>
      <div id="BarChart"></div>
    </div>
  );
};

export default ChartContainer;

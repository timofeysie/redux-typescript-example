import * as d3 from "d3";
import { useAppSelector } from "../../app/hooks";

interface ChartProps {
  element: any;
}
const PostListChart = ({element}: ChartProps) => {
  const posts = useAppSelector((state) => state.posts);
    //initialize graph
    let vis = this;
    let dataSet = [
      { subject: "Dogs", count: 150 },
      { subject: "Fish", count: 75 },
      { subject: "Cats", count: 135 },
      { subject: "Bunnies", count: 240 },
    ];

    const getMax = () => {
      // Calculate the maximum value in the DataSet
      let max = 0;
      dataSet.forEach((dt) => {
        if (dt.count > max) {
          max = dt.count;
        }
      });
      return max;
    };

    // Create each of the bars and then set them all to have the same height(Which is the max value)
    d3.select(element)
      .select("#BarChart")
      .selectAll("div")
      .data(dataSet)
      .enter()
      .append("div")
      .classed("bar", true)
      .style("height", `${getMax()}px`);

    //Transition the bars into having a height based on their corresponding count value
    d3.select(element)
      .select("#BarChart")
      .selectAll(".bar")
      .transition()
      .duration(1000)
      .style("height", (bar: any) => `${bar.count}px`)
      .style("width", "80px")
      .style("margin-right", "10px")
      .delay(300); // Fix their width and margin

    console.log("d3 created");
    vis.update();
  }

  //update the graph when props change
function update() {
    let vis = this;
    console.log("vis", vis);
  }

export default PostListChart;

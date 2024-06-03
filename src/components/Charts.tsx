import { Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

interface IProp {
  barChartData: {views: number, movie: string}[],
  piChartData: {id: number, value: number, label: string}[]
}

const Charts = ({barChartData, piChartData}: IProp) => {
  return (
    <Stack
      paddingTop={4}
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      alignItems={"center"}
    >
      <BarChart
        dataset={barChartData}
        yAxis={[{ scaleType: "band", dataKey: "movie" }]}
        series={[{ dataKey: "views", label: "Top 10 views Movies" }]}
        layout="horizontal"
        barLabel="value"
        grid={{ vertical: true }}
        width= {500}
        height= {400}
      />
      <PieChart
        series={[
          {
            data: piChartData
          },
        ]}
        width={500}
        height={200}
      />
    </Stack>
  );
};

export default Charts;

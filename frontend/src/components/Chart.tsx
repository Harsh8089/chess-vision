import { 
  CartesianGrid, 
  Line, 
  LineChart, 
  Tooltip, 
  YAxis
} from "recharts"

function Chart({ 
  data, 
  width, 
  height 
}: {
  data: any, // temp
  width: number,
  height: number
}) {
  return (
      <LineChart
          width={width}
          height={height}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
      >
          <CartesianGrid strokeDasharray="2 2" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="time" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
  )
}

export default Chart

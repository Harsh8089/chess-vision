import { 
  CartesianGrid, 
  Line, 
  LineChart, 
  Tooltip, 
  XAxis, 
  YAxis
} from "recharts"

function Chart({ 
  data, 
  width, 
  height,
  dataKey 
}: {
  data: any, // temp
  width: number,
  height: number,
  dataKey: string
}) {
  // Custom dot component
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isCorrect = payload.label;
    
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4}
        fill={isCorrect ? '#22c55e' : '#ef4444'} 
        stroke="white"
        strokeWidth={2}
      />
    );
  };

  // Custom active dot component
  const CustomActiveDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isCorrect = payload.label;
    
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={6}
        fill={isCorrect ? '#22c55e' : '#ef4444'}
        stroke="white"
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="p-4 rounded-lg shadow-sm">
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid 
          strokeDasharray="2 2" 
          stroke="#f0f0f0"
          vertical={false}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280' }}
          tickMargin={8}
        />
        <XAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280' }}
          tickMargin={8}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const isCorrect = payload[0]?.payload.label;

            return (
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                <div className="text-sm font-medium text-gray-900 mb-1">
                  time: {payload[0]?.payload.time}
                </div>
                <div className={`text-sm font-medium ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                  {isCorrect? 'correct' : 'incorrect'}
                </div>
              </div>
            )
          }}
          cursor={{
            stroke: '#e5e7eb',
            strokeWidth: 1,
            strokeDasharray: '4 4'
          }}
        />
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke="#60a5fa" 
          strokeWidth={2}
          dot={<CustomDot />}
          activeDot={<CustomActiveDot />}
        />
      </LineChart>
    </div>
  )
}

export default Chart
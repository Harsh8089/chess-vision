import Chart from '../Chart'
import Timer from '@/types/timer'

function Tile({ title, subTitle }: { title: string, subTitle: string }) {
    return (
      <div className={`flex flex-col gap-2`}>
        <div className={`font-semibold text-3xl text-gray-400`}>{title}</div>
        <div className={`font-bold text-6xl text-blue-light`}>{subTitle}</div>
      </div>
    )
}

function Stats({ stats }: { stats: Timer }) {
  
  return (
    <div className="w-full flex justify-between">
        <div className='flex flex-col justify-between grow h-[50vh] lg:h-[60vh]'>
          <Tile title='spm' subTitle='66' />
          <Tile title='accuracy' subTitle='93%' />
          <div className='flex flex-col gap-2'>
              <p className='font-semibold text-xl text-gray-400'>test type</p>
              <p className='font-bold text-xl text-blue-light'>time 15</p>
          </div>  
        </div>
        <div className='flex flex-col'>
          <Chart data={stats} width={1100} height={350} dataKey='time'/>
          <div className='flex justify-evenly'>
            <Tile title='selected' subTitle='66'/>
            <Tile title='correct' subTitle='44'/>
            <Tile title='incorrect' subTitle='22'/>
          </div>
        </div>
    </div>
  )
}

export default Stats
import { ChartNoAxesCombined, Gem } from "lucide-react"

function Account({ 
  username, 
  date, 
  streak, 
  totalTests, 
  timeClicking 
}: { 
  username: string, 
  date: string, 
  streak: number, 
  totalTests: number, 
  timeClicking: string
}) {
  return (
    <div className="w-full flex justify-between gap-4">
      <div className="flex w-1/3 gap-4 items-center pl-5 bg-gray-800 py-6 rounded-lg">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center"></div>
        <div className="flex flex-col gap-4">
          <p className="text-3xl tracking-wider text-blue-light font-semibold">{username}</p>
          <div className='flex flex-col'>
            <p className="text-sm tracking-wider text-gray-400">Joined {date}</p>
            <p className="text-sm tracking-wider text-gray-400">Current streak: {streak} days</p>
          </div>
        </div>
      </div>  
      <div className="flex w-2/3 bg-gray-800 py-6 rounded-lg justify-evenly">
        <div className="flex flex-col items-center justify-between">
          <p className="text-sm tracking-wider text-gray-400">tests completed</p>
          <p className="text-6xl tracking-wider text-blue-light font-semibold">{totalTests}</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className="text-sm tracking-wider text-gray-400">time clicking</p>
          <p className="text-6xl tracking-wider text-blue-light font-semibold">{timeClicking}</p>
        </div>
      </div>
    </div>  
  )
}

function LeaderBoard() {
  return (
    <div className="w-full flex justify-evenly items-center gap-4 bg-gray-800 py-6 rounded-lg mt-8">
      <p className="text-xl text-gray-400 tracking-wide">All-Time English Leaderboards</p>
      <div className="flex justify-evenly w-1/2">
          <div className="flex flex-col justify-between items-center">
            <p className="text-gray-400 tracking-wide">15 seconds</p>
            <p className="text-3xl tracking-wider text-blue-light font-semibold">02</p>
          </div>
          <div className="flex flex-col justify-between items-center">
            <p className="text-gray-400 tracking-wide">45 seconds</p>
            <p className="text-2xl tracking-wider text-blue-light font-semibold">-</p>
          </div>
      </div>
    </div>
  )
}

function OverallStats() {
  return (
    <div className="w-full flex justify-evenly items-center gap-4 mt-8">
      <div className="flex w-1/2 justify-evenly bg-gray-800 py-6 rounded-lg">
        {
          [15, 30, 45].map((time, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-between"
              >
                <p className="text-gray-400">{time} seconds</p>
                <p className="text-4xl tracking-wider text-blue-light font-semibold">70</p>
                <p className="text-lg tracking-wider text-blue-light opacity-70 font-semibold">94%</p>
              </div>
            )
          })
        }
      </div>
      <div className="flex w-1/2 justify-evenly bg-gray-800 py-6 rounded-lg">
        {
          [15, 30, 45].map((cell, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-between"
              >
                <p className="text-gray-400">{cell} cells</p>
                <p className="text-4xl tracking-wider text-blue-light font-semibold">70</p>
                <p className="text-lg tracking-wider text-blue-light opacity-70 font-semibold">94%</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
function History() {
  const data = [
    {
      allTimeBest: false,
      spm: 52.63,
      accuracy: "90.23%",
      cellsClicked: 20,
      mode: "time 15",
      info: "",
      date: "27 October 14:32",
    },
    {
      allTimeBest: true,
      spm: 60.12,
      accuracy: "97.23%",
      cellsClicked: 20,
      mode: "time 30",
      info: "",
      date: "27 October 14:00",
    },
    {
      allTimeBest: false,
      spm: 52.63,
      accuracy: "90.23%",
      cellsClicked: 20,
      mode: "cell 30",
      info: "",
      date: "27 October 13:32",
    },
    {
      allTimeBest: true,
      spm: 60.12,
      accuracy: "97.23%",
      cellsClicked: 20,
      mode: "time 30",
      info: "",
      date: "27 October 14:00",
    },
    {
      allTimeBest: false,
      spm: 52.63,
      accuracy: "90.23%",
      cellsClicked: 20,
      mode: "time 15",
      info: "",
      date: "27 October 14:32",
    },
    {
      allTimeBest: true,
      spm: 60.12,
      accuracy: "97.23%",
      cellsClicked: 20,
      mode: "time 30",
      info: "",
      date: "27 October 14:00",
    },
    {
      allTimeBest: false,
      spm: 52.63,
      accuracy: "90.23%",
      cellsClicked: 20,
      mode: "time 15",
      info: "",
      date: "27 October 14:32",
    },
  ];

  return (
    <div className="w-full flex mt-8 flex-col">
      <div className="w-full grid grid-cols-7">
        {["", "spm", "accuracy", "cells clicked", "mode", "info", "date"].map((item, index) => {
          return (
            <div key={index} className="text-center opacity-35">
              {item}
            </div>
          );
        })}
      </div>

      <div className="w-full flex flex-col">
        {data.map((metrics, index) => {
          return (
            <div key={index} className={`${index % 2 === 0 ? "bg-gray-800 rounded-lg" : "" } w-full grid grid-cols-7 h-14`}>
              <div className="flex justify-center items-center">
                {metrics.allTimeBest ? <Gem className="text-blue-light"/> : <div></div>}
              </div>
              <div className="flex justify-center items-center text-lg text-blue-light tracking-wider">{metrics.spm}</div>
              <div className="flex justify-center items-center text-lg text-blue-light tracking-wider">{metrics.accuracy}</div>
              <div className="flex justify-center items-center text-lg text-blue-light tracking-wider">{metrics.cellsClicked}</div>
              <div className="flex justify-center items-center text-lg text-blue-light tracking-wider">{metrics.mode}</div>
              <div className="flex justify-center items-center text-lg text-blue-light tracking-wider">
                <ChartNoAxesCombined />
              </div>
              <div className="flex justify-center items-center text-lg text-blue-light tracking-wider">{metrics.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}




function Profile() {
  return (
    <div className="max-w-[80vw] mx-auto mt-10">
      <Account
          username={"username"}
          date={"23 Sep 2024"}
          streak={4}
          totalTests={73}
          timeClicking={"00:51:30"}
      />
      <LeaderBoard 
      />
      <OverallStats 
      />
      <History
      />
    </div>
  )
}

export default Profile
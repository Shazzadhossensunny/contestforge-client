import { GiPodiumWinner } from "react-icons/gi";
export default function Winning({finalWin}) {
    const {price, contestName} = finalWin;
  return (
    <div className="shadow-lg py-9 px-6 rounded-lg space-y-5 flex flex-col justify-center items-center text-center border-t-4 border-green-500">
        <h3 className="text-6xl"><GiPodiumWinner/></h3>
        <h2 className="text-2xl font-semibold">{contestName}</h2>
        <h4 className="text-2xl font-semibold">Price: ${price}</h4>
    </div>
  )
}

import JoinOurContest from "../../components/JoinOurContest";
import TopContestCreator from "../../components/TopContestCreator";
import Banner from "./Banner";
import PopularContest from "./PopularContest";


export default function Home() {
  return (
    <div>
        <Banner></Banner>
        <PopularContest></PopularContest>
        <JoinOurContest></JoinOurContest>
        <TopContestCreator></TopContestCreator>
    </div>
  )
}

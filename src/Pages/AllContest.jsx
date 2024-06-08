import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import ContestCard from "../components/ContestCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Loading from "../components/Loading";

export default function AllContest() {
  const axiosSecure = UseAxiosSecure();
  const { data: contests = [], isLoading} = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addContest");
      return res.data;
    },
  });

  // Filter contests by status
  const confirmedContests = contests.filter((contest) => contest.status === "confirm" || "");
 // Further filter contests by type
  const imageDesign = confirmedContests.filter((content)=> content.contestType === "Image Design");
  const marketingStrategy = confirmedContests.filter((content)=> content.contestType === "Marketing Strategy");
  const articleWriting = confirmedContests.filter((content)=> content.contestType === "Article Writing");
  const gamingReview = confirmedContests.filter((content)=> content.contestType === "Gaming Review");
  const businessIdea = confirmedContests.filter((content)=> content.contestType === "Business Idea");
  const bookReview = confirmedContests.filter((content)=> content.contestType === "Book Review");
  const movieReview = confirmedContests.filter((content)=> content.contestType === "Movie Review");

  if(isLoading) return <Loading></Loading>
  return (
    <div className="container mx-auto my-12 lg:my-24 px-3">
      <h2 className="text-4xl font-semibold text-center mb-10">All Contest</h2>
      <Tabs>
        <TabList>
          <Tab>Image Design</Tab>
          <Tab>Marketing Strategy</Tab>
          <Tab>Article Writing</Tab>
          <Tab>Gaming Review</Tab>
          <Tab>Business Idea</Tab>
          <Tab>Book Review</Tab>
          <Tab>Movie Review</Tab>
        </TabList>

        <TabPanel>
         <ContestCard items={imageDesign}></ContestCard>
        </TabPanel>
        <TabPanel>
        <ContestCard items={marketingStrategy}></ContestCard>
        </TabPanel>
        <TabPanel>
        <ContestCard items={articleWriting}></ContestCard>
        </TabPanel>
        <TabPanel>
        <ContestCard items={gamingReview}></ContestCard>
        </TabPanel>
        <TabPanel>
        <ContestCard items={businessIdea}></ContestCard>
        </TabPanel>
        <TabPanel>
        <ContestCard items={bookReview}></ContestCard>
        </TabPanel>
        <TabPanel>
        <ContestCard items={movieReview}></ContestCard>
        </TabPanel>
      </Tabs>
    </div>
  );
}

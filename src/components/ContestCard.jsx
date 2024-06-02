import SingleContestCard from "./SingleContestCard";

export default function ContestCard({items}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {
            items.map((item) => <SingleContestCard key={item._id} item={item}></SingleContestCard>)
        }

    </div>
  );
}

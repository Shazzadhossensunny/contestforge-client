export default function SingleContestCard({ item }) {
  const { _id, name, image, description } = item;
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body space-y-2">
        <h2 className="card-title">{name}</h2>
        <h3 className="text-lg font-semibold">Participants : 0</h3>
        <p>{description}</p>
        <button className="btn bg-[#00c1f1] text-white">Details</button>
      </div>
    </div>
  );
}

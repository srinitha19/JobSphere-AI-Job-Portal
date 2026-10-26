import "./JobSearch.css";

function JobSearch({ search, setSearch }) {
  return (
    <div className="job-search">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default JobSearch;
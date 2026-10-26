import "./Companies.css";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Infosys",
  "TCS",
  "Accenture",
];

function Companies() {
  return (
    <section className="companies">
      <h2>Top Companies</h2>

      <div className="company-grid">
        {companies.map((company, index) => (
          <div className="company-card" key={index}>
            {company}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Companies;
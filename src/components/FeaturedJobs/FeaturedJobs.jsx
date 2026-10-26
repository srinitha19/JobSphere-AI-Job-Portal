import "./FeaturedJobs.css";

const jobs=[
    {
        id:1,
        title:"Frontend Developer",
        company:"Google",
        location:"Bangalore",
        salary:"₹12 LPA"
    },
    {
        id:2,
        title:"React Developer",
        company:"Microsoft",
        location:"Hyderabad",
        salary:"₹15 LPA"
    },
    {
        id:3,
        title:"UI Developer",
        company:"Amazon",
        location:"Chennai",
        salary:"₹10 LPA"
    }
];

function FeaturedJobs(){
    return(
        <section className="featured">
            <h2>Featured Jobs</h2>
            <div className="job-grid">
                {
                    jobs.map(job=>(
                        <div className="job-card" key={job.id}>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                            <p>{job.location}</p>
                            <p>{job.salary}</p>
                            <button type="button" className="btn btn-success">View Details</button>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}
export default FeaturedJobs;
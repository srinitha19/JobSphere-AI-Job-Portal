import "./Hero.css";

function Hero(){
    return(
        <section className="hero">
            <h1>Find Your Dream Job Today</h1>
            <p>
                Thousands of companies are hiring.
                Search jobs based on your skills.
            </p>
            <button type="button" className="btn btn-primary">
                Explore Jobs
            </button>
        </section>
    );
}
export default Hero;
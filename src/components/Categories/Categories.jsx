import "./Categories.css";

const categories=[
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "UI/UX Designer",
    "QA Engineer",
];

function Categories(){
    return (
        <section className="categories">
            <h2>Popular Categories</h2>

            <div className="category-grid">
                {categories.map((item, index)=>(
                    <div className="category-card" key={index}>
                        <h3>{item}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default Categories;
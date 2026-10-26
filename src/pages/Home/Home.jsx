import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/JobSearch";
import Categories from "../../components/Categories/Categories";
import FeaturedJobs from "../../components/FeaturedJobs/FeaturedJobs";
import Companies from "../../components/Companies/Companies";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <Categories />
      <FeaturedJobs />
      <Companies />
      <Footer />
    </>
  );
}

export default Home;
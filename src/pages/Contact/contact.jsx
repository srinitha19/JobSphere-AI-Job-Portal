import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      <div style={{ width: "70%", margin: "50px auto" }}>
        <h1>Contact Us</h1>

        <input
          type="text"
          placeholder="Your Name"
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
        />

        <br /><br />

        <textarea
          placeholder="Message"
          rows="6"
        ></textarea>

        <br /><br />

        <button>Send Message</button>

      </div>

      <Footer />
    </>
  );
}

export default Contact;
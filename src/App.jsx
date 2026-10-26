import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Jobs from "./pages/Jobs/Jobs";
import Profile from "./pages/Profile/Profile";
import SavedJobs from "./pages/SavedJobs/SavedJobs";
import JobDetails from "./pages/JobDetails/JobDetails";
import Companies from "./pages/Companies/Companies";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Application from "./pages/Application/Application";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home/>}/>

                <Route path="/login" element={<Login/>}/>

                <Route path="/signup" element={<Signup/>}/>

                <Route path="/jobs" element={<Jobs/>}/>

                <Route path="/saved" element={<SavedJobs/>}/>

                <Route path="/profile" element={<Profile/>}/>

                <Route path="/job/:id" element={<JobDetails/>}/>

                <Route path="/apply/:id" element={<Application/>}/>

                <Route path="/apply" element={<Application/>}/>

                <Route path="/companies" element={<Companies/>}/>

                <Route path="/contact" element={<Contact/>}/>

                <Route path="*" element={<NotFound/>}/>

            </Routes>

        </BrowserRouter>

);

}

export default App;
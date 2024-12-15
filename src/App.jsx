import BasicLayout from "./layouts/BasicLayout.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutPage from "./pages/About.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/Contact.jsx";
import ArticlePage from "./pages/Article.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BasicLayout/>} >
                    <Route path="/home" element={<HomePage/>}></Route>
                    <Route path="/about" element={<AboutPage/>} ></Route>
                    <Route path="/contact" element={<ContactPage/>}></Route>
                    <Route path="/article/:id" element={<ArticlePage/>}></Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
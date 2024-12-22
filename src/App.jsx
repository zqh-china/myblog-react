import BasicLayout from "./layouts/BasicLayout.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutPage from "./pages/About.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/Contact.jsx";
import ArticlePage from "./pages/Article.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ArticleManage from "./pages/ArticleManage.jsx";
import CategoryManage from "./pages/CategoryManage.jsx";
import TagManage from "./pages/TagManage.jsx";
import AttachmentManage from "./pages/AttachmentManage.jsx";
import ArticleEdit from "./pages/ArticleEdit.jsx";
import LoginPage from "./pages/Login.jsx";
import ArticleAdd from "./pages/ArticleAdd.jsx";

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
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="/admin/article" element={<ArticleManage/>}></Route>
                    <Route path="/admin/category" element={<CategoryManage/>}></Route>
                    <Route path="/admin/tag" element={<TagManage/>}></Route>
                    <Route path="/admin/attachment" element={<AttachmentManage/>}></Route>
                    <Route path="/admin/article_edit/:id" element={<ArticleEdit />}></Route>
                    <Route path="/admin/article_add" element={<ArticleAdd />}></Route>
                    <Route path="/admin/article/:id" element={<ArticlePage />}></Route>
                </Route>
                <Route path="/login" element={<LoginPage/>}></Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
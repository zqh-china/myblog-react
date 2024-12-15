import {useEffect} from 'react';
import {Layout, Menu} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchArticleList, fetchCategoryList, fetchChangelogList, fetchTagList} from "../store/modules/globalSlice.js";


const { Header, Footer, Content } = Layout;


const logoStyle = {
    // color: '#69b1ff',
    // color: '#1677ff',
    color: '#646cff',
    fontSize: '20px',
    fontWeight: 'bold',
}

const BasicLayout = () => {
    const menuItems = [
        {key: 'home', label: '首页'},
        {key: 'about', label: '关于'},
        {key: 'contact', label: '联系我'},
    ];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        navigate("/home");  // 保证页面刷新时，导航菜单回到home上，页面也回归home
    }, []);
    // 获取tag、分类、文章、更新记录列表，存入全局状态
    // 为什么在这里存？——前两个是其他地方都用得到的，所以存全局，后两个几乎不会有很频繁的变化，获取一次后存入全局状态可以重复使用
    useEffect(() => {
        dispatch(fetchTagList());
        dispatch(fetchCategoryList());
        dispatch(fetchArticleList());
        dispatch(fetchChangelogList());
    }, [dispatch]);

    return (
        <Layout style={{ borderRadius: 8, overflow: 'hidden', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff' }}>
                <div className="logo" style={logoStyle}>My Blog</div>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['home']}
                    items={menuItems}
                    theme="light"
                    onSelect={({ key }) => {
                        navigate(`/${key}`);
                    }}
                />
            </Header>
            <Content style={{ textAlign: 'center', minHeight: 120, lineHeight: '120px', flex: 1 }}>

                        {/*<Route path={"/home"} element={<HomePage articles={articles} categories={categories} tags={tags}/>}></Route>*/}
                        {/*<Route path={"/about"} element={<AboutPage/>}></Route>*/}

                    <Outlet />
                {/*<HomePage articles={articles} tags={tags} categories={categories} />*/}
            </Content>
            <Footer style={{ textAlign: 'center', color: '#000', height: '68px' }}>© {new Date().getFullYear()} My Blog. All rights reserved.</Footer>
        </Layout>
    );}

export default BasicLayout;
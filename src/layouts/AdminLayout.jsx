import {useEffect, useState} from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined, BorderlessTableOutlined, FileImageOutlined, FormOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Button, Card, Layout, Menu} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchArticleList, fetchCategoryList, fetchChangelogList, fetchTagList} from "../store/modules/adminSlice.js";


const menuItems = [
    {
        key: 'article',
        icon: <FormOutlined />,
        label: '文章管理',
    },
    {
        key: 'category',
        icon: <AppstoreOutlined />,
        label: '分类管理',
    },
    {
        key: 'tag',
        icon: <BorderlessTableOutlined />,
        label: '标签管理',
    },
    {
        key: 'attachment',
        icon: <FileImageOutlined />,
        label: '附件管理',
    },
];
const { Header, Sider, Content } = Layout;
const AdminLayout= () => {
    const [collapsed, setCollapsed] = useState(false);
    const [title, setTitle] = useState('MyBlog博客管理后台');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        navigate('/admin/article');
    }, []);
    useEffect(() => {
        dispatch(fetchTagList());
        dispatch(fetchCategoryList());
        dispatch(fetchArticleList());
        dispatch(fetchChangelogList());
    }, [dispatch]);
    return (
        <Layout style={{ borderRadius: 8, overflow: 'hidden', width: '100%', height: '100vh', display: 'flex' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div>
                    <h3 style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => { navigate('/home') }}>{title}</h3>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['article']}
                    items={menuItems}
                    onSelect={({ key }) => {
                        navigate(`/admin/${key}`);
                    }}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        backgroundColor: '#fff',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => {
                            setCollapsed(!collapsed);
                            collapsed ? setTitle('MyBlog博客管理后台') : setTitle('管理后台');
                        }}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        // background: colorBgContainer,
                        // borderRadius: borderRadiusLG,
                    }}
                >
                    <Card style={{width: '100%', height: '100%'}}>
                        <Outlet />
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;
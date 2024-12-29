import {useEffect, useState} from 'react';
import {
    AppstoreOutlined,
    BorderlessTableOutlined, FileExclamationOutlined,
    FileImageOutlined,
    FormOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Button, Card, Layout, Menu, Avatar, Row, Col, Popover, Descriptions, Tag} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryList, fetchTagList, setToken, fetchLogout, fetchUserInfo} from "../store/modules/adminSlice.js";
import { formatCNDate } from '../utils/index.js';
import { message } from 'antd';


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
    {
        key: 'syslogs',
        icon: <FileExclamationOutlined />,
        label: '系统日志'
    }
];
const { Header, Sider, Content } = Layout;


const UserInfoCard = ({info}) => {
    if (!info) {
        info = {
            username: '', nickname: '', is_active: false, role: 'user', phone_number: '', email: '', create_time: ''
        }
    }
    const { username, nickname, is_active, role, phone_number, email, create_time } = info;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toLogout = () => {
        dispatch(fetchLogout()); // 清除redux中储存的token
        message.success('注销登录成功')
        setTimeout(() => {
            navigate('/home');       // 跳转到首页
        }, 1000);
    }
    const getActiveTag = (active) => {
        return active ? <Tag color='success'>已激活</Tag> : <Tag color='default'>未激活</Tag>
    }
    const getRoleTag = (role) => {
        const roleColorMap = {
            'user': 'success',
            'admin': 'processing',
            'super': 'error',
        }
        return <Tag color={roleColorMap[role]}>{role}</Tag>
    }
    const items = [
        {
            key: 'username',
            label: '用户',
            children: username
        },
        {
            key: 'nickname',
            label: '昵称',
            children: nickname
        },
        {
            key: 'is_active',
            label: '状态',
            children: getActiveTag(is_active)
        },
        {
            key: 'email',
            label: '邮箱',
            children: email 
        },
        {
            key: 'role',
            label: '角色',
            children: getRoleTag(role),
        },
        {
            key: 'phone_number',
            label: '电话',
            children: phone_number,
        },
        {
            key: 'create_time',
            label: '创建时间',
            children: formatCNDate(create_time),
        }
    ];
    return (
    <>
    <Descriptions size='small' title='用户信息' style={{width: '600px'}} items={items}/>
    <Button color="danger" variant="link" onClick={() => toLogout()}>注销</Button>
    </>);
}

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [title, setTitle] = useState('MyBlog博客管理后台');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token, userInfo}= useSelector((state) => state.admin);
    
    useEffect(() => {
        if (!token) {
            const lsToken = localStorage.getItem('token');
            if (!lsToken) {
                navigate("/login");
            } else {
                dispatch(setToken(lsToken));
                navigate('/admin/article');
            }
            
        } else {
            navigate('/admin/article');
        }
        
    }, []);
    useEffect(() => {
        dispatch(fetchTagList());
        dispatch(fetchCategoryList());
        dispatch(fetchUserInfo(token));
    }, [dispatch]);
    return (
        <Layout style={{ borderRadius: 8, overflowY: 'hidden', width: '100%', height: '100vh', display: 'flex' }}>
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
                    <Row>
                        <Col span={3}>
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
                        </Col>
                        <Col span={20}></Col>
                        <Col span={1}>
                            <Popover content={<UserInfoCard info={userInfo}/>} title="">
                                {
                                    userInfo.avatar ? <Avatar
                                        style={{
                                            // backgroundColor: '#87d068',
                                            cursor: 'pointer',
                                        }}
                                        src={`/imgs/${userInfo.avatar}`}
                                        icon={<UserOutlined />}
                                    /> : <Avatar icon={<UserOutlined />} />
                                }

                            </Popover>
                        </Col>
                        
                    </Row>
                    
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
                    <Card style={{width: '100%', height: '100%', overflowY: 'scroll'}}>
                        <Outlet />
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;
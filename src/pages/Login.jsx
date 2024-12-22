import {Card, Col, Form, Row, Input, Button, message, Switch, Result} from "antd";
import {login} from "../services/index.js";
import {useDispatch} from "react-redux";
import {setToken} from "../store/modules/adminSlice.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadInfoFromLocalStorage, saveInfo2LocalStorage } from "../utils/index.js";


const LoginPage = () => {
    const [loginSuccess, setLoginSuccess] = useState(0);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [remember, setRemember] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        const userInfo = loadInfoFromLocalStorage();
        if (userInfo && userInfo.username && userInfo.password) {
            const { username, password } = userInfo;
            form.setFieldsValue({
                username,
                password,
            })
        }
        
    }, [])
    
    const toLogin = async (values) => {
        login(values).then((res) => {
            if (res.data.code === 0) {
                setLoginSuccess(1);
                message.success(res.data.message);
                const token = res.data.result.token;
                dispatch(setToken(token));
                if (remember) {
                    saveInfo2LocalStorage(values);
                }
                setTimeout(() => {
                    navigate('/admin/article');
                }, 1500);
            } else {
                setLoginSuccess(2);
                message.error('登录失败：'+res.data.message);
                setTimeout(() => {
                    setLoginSuccess(0)
                }, 1500);
            }
            
            
        }).catch((err) => {
            message.error('登录失败，服务器内部错误：'+err.message);
        });
        
    }
    return (<>
        <Card style={{ height: '100vh', width: '100%' }}>
            {
                loginSuccess === 0 ?
                    <Row>
                        <Col span={10}></Col>
                        <Col span={4}>
                            <Card>
                                <Row>
                                    <Col span={4}></Col>
                                    <Col span={16} style={{textAlign:'center'}}>
                                        <h2>博客管理后台</h2>
                                    </Col>
                                    <Col span={4}></Col>
                                </Row>

                                <Form
                                    onFinish={(values) => {
                                        toLogin(values);
                                    }}
                                    form={form}
                                >
                                    <Form.Item label="" name="username" rules={[{required: true, message:"用户名不能为空"}]}>
                                        <Input placeholder="请输入用户名"></Input>
                                    </Form.Item>
                                    <Form.Item label="" name="password" rules={[{required: true, message:"密码不能为空"}]}>
                                        <Input.Password
                                            placeholder="请输入密码"
                                            visibilityToggle={{
                                                visible: passwordVisible,
                                                onVisibleChange: setPasswordVisible,
                                            }}></Input.Password>
                                    </Form.Item>
                                    <div style={{margin: '10px 0', display: 'flex', justifyContent: 'space-between'}}>                              
                                        <span>记住密码</span>
                                        <Switch defaultChecked checked={remember} onClick={() => { setRemember(!remember) }}></Switch>
                                    </div>
                                    <Form.Item >
                                        <div style={{display:"flex",justifyContent:'space-between', width:'100%'}}>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                        <Button type="default" onClick={() => navigate('/home')}>返回首页</Button>
                                        </div>
                                        
                                    </Form.Item>
                                    


                                </Form>
                            </Card>
                        </Col>
                        <Col span={10}></Col>
                    </Row> : loginSuccess === 1 ? <Result status="success"
                                title="登录成功！"
                                subTitle="正在跳转至管理后台..."/>: <Result status="error"
                                title="登录失败！"
                                subTitle="点正在跳转到登录页"/>
            }



        </Card>
    </>)
}

export default LoginPage;
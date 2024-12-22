import {Col, Row, Form, Input, Select, Button, message} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {addArticle} from "../services/index.js";
import {useSelector} from "react-redux";
import ResultPage from "./result/ResultPage.jsx";

const { TextArea } = Input;


const ArticleAdd = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { categoryList, tagList, token } = useSelector(state => state.admin);
    const [messageApi, contextHolder] = message.useMessage();
    const [result, setResult] = useState(0); // 0 无状态 1 成功 2 失败
    const [resultMsg, setResultMsg] = useState('');
    const toSubmit = (values) => {
        const { tags } = values;
        values.tags = tags.join(",");
        values.category_id = values.category;
        delete values.category;
        setResult(true);
        addArticle(values, token).then((res)=> {
            messageApi.open({
                type: 'success',
                content: res.data.message,
            });
            setResultMsg(res.data.message);
            setResult(1);
        }).catch(err=>{
            messageApi.open({
                type: 'error',
                content: err,
            });
            setResultMsg(err);
            setResult(2);
        })
    }
    const categoryOptions = categoryList.map((category) => { return { value: category.id, label: category.name } });
    const tagOptions = tagList.map((tag) => { return { value: tag.id, label: tag.name, } });

    return (
        <>
            {contextHolder}
            {
                result === 0 ? <Row>
                <Col span={24}  style={{overflowY: "scroll"}}>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={(values) => {
                            toSubmit(values);
                        }}
                    >
                        <Row>
                            <Col span={24}>
                                <Form.Item label="标题" name="title" rules={[{required: true,message: "文章标题不能为空！"}, ]}>
                                    <Input style={{ width: '500px' }}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item label="分类" name="category" >
                                    <Select  style={{ width: '500px' }} options={categoryOptions}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="标签" name="tags">
                                    <Select  style={{ width: '500px' }} options={tagOptions} mode="multiple" allowClear/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="状态" name="publish_status">
                                    <Select  style={{ width: '500px' }} options={[{ value: 'draft', label: '草稿' }, { value: 'published', label: '已发布' }, { value: 'archieve', label: '已归档' }]}></Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={23}>
                                <Form.Item label="摘要" name="desc">
                                    <TextArea rows={3} ></TextArea>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={23}>
                                <Form.Item label="正文" name="content">
                                    <TextArea rows={12}></TextArea>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{margin: '20px 0 0 0'}}>
                            <Col span={3}>
                                <Button type="primary" style={{width: '140px'}} htmlType="submit" size="large">提交</Button>
                            </Col>
                            <Col span={3}>
                                <Button type="default" style={{width: '140px'}} onClick={() => { navigate("/admin/article") }} size="large">返回</Button>
                            </Col>
                            <Col span={18}></Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={12}></Col>
            </Row> 
            : result === 1 ? <ResultPage status="success" title="创建成功" subTitle={resultMsg}  homePath={-1} redirectPath='/admin/article_add'/> 
            : <ResultPage status="error" title="创建失败" subTitle={resultMsg} homePath={-1} redirectPath='/admin/article_add'/>
            }
            
        </>

    );
}

export default ArticleAdd;
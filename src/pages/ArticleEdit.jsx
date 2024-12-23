import {Col, FloatButton, Row, Form, Input, Select, Button, Popconfirm, message} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getArticleInfo, updateArticle} from "../services/index.js";
import {useSelector} from "react-redux";
import {getArticleTagList} from "../utils/index.js";

const { TextArea } = Input;


const ArticleEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const { categoryList, tagList, token } = useSelector(state => state.admin);
    const [articleInfo, setArticleInfo] = useState({});
    const [messageApi, contextHolder] = message.useMessage();
    
    const toSubmit = (values) => {
        const { tags } = values;
        values.tags = tags.join(",");
        values.id = id;
        values.category_id = values.category;
        delete values.category;
        updateArticle(values, token).then((res)=> {
            messageApi.open({
                type: 'success',
                content: res.data.message + "即将跳转管理首页...",
            });
            setTimeout(() => {
                navigate('/admin/article');
            }, 3000);
            
        }).catch(err=>{
            messageApi.open({
                type: 'error',
                content: err,
            })
        })
    }
    useEffect(() => {
        getArticleInfo(id).then((res) => {
            setArticleInfo(res.data.result);
        });
    }, [id]);
    useEffect(() => {
        if (Object.keys(articleInfo).length > 0) {
            form.setFieldsValue({
                title: articleInfo.title,
                category: articleInfo.category_id,
                tags: getArticleTagList(articleInfo.tags, tagList).map(tag => tag.id),
                publish_status: articleInfo.publish_status,
                desc: articleInfo.desc,
                content: articleInfo.content,
            });
        }
    }, [articleInfo, form]);
    const categoryOptions = categoryList.map((category) => { return { value: category.id, label: category.name } });
    const tagOptions = tagList.map((tag) => { return { value: tag.id, label: tag.name } });

    return (
        <>
            {contextHolder}
            <Row>
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
            <FloatButton
                shape="circle"
                type="primary"
                style={{
                    insetInlineEnd: 94,
                }}
                icon={<ArrowLeftOutlined />}
                onClick={() => {
                    navigate(-1);
                }}
            />
        </>

    );
}

export default ArticleEdit;
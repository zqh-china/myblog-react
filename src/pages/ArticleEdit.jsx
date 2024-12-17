import {Col, FloatButton, Row, Form, Input, Select, Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getArticleInfo, getArticleParagraphs} from "../services/index.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchArticleInfo, fetchParagraphList} from "../store/modules/adminSlice.js";
import {getArticleTagList} from "../utils/index.js";


const ArticleEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const { categoryList, tagList } = useSelector(state => state.admin);
    const [articleInfo, setArticleInfo] = useState({});
    const [paragraphList, setParagraphList] = useState([]);
    useEffect(() => {
        getArticleInfo(id).then((res) => {
            setArticleInfo(res.data.result);
        });
        getArticleParagraphs(id).then((res) => {
            setParagraphList(res.data.result);
        });
    }, [id]);
    useEffect(() => {
        if (Object.keys(articleInfo).length > 0) {
            // console.log('articleInfo', articleInfo)
            form.resetFields({
                title: {
                    value: articleInfo.title
                },
                category: {
                    value: articleInfo.category_id
                },
                tags: {
                    value: articleInfo.tags
                },
            });
        }
    }, [articleInfo, form]);
    useEffect(() => {
        if (paragraphList.length > 0) {
            // console.log('paragraphList', paragraphList);
        }
    }, [paragraphList, form]);
    const categoryOptions = categoryList.map((category) => { return { value: category.id, label: category.name } });
    const tagOptions = tagList.map((tag) => { return { value: tag.id, label: tag.name } });
    const tags = getArticleTagList(articleInfo.tags, tagList).map(tag => tag.name);
    // const tags = articleInfo.tags.split(',');
    // console.log(tags)
    return (
        <>
            <Row>
                <Col span={12}>

                    <Form form={form} layout="vertical">
                        <Form.Item label="标题" name="title"><Input/></Form.Item>
                        <Form.Item label="分类" name="category"><Select options={categoryOptions}/></Form.Item>
                        <Form.Item label="标签" name="tags" initialValue={tags}>
                            <Select options={tagOptions} mode="multiple" allowClear/>
                        </Form.Item>
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
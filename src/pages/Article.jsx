
import {Card, Row, Col, Typography, FloatButton, Popover, Tag} from "antd";
import {useEffect, useState} from "react";
import { getArticleInfo } from "../services/index.js";
import {useNavigate, useParams} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import {formatCNDate, generatePureNumberId, getArticleCategory, getArticleTagList} from "../utils/index.js";
import {useSelector} from "react-redux";
import showdown from 'showdown';

const { Title, Text, Paragraph } = Typography;


const converter = new showdown.Converter({
    
})

const MarkdownToHtml = ({ markdownText }) => {
    const htmlOutput = converter.makeHtml(markdownText);
    return (
        <div dangerouslySetInnerHTML={{__html: htmlOutput}}  style={{textAlign: 'left'}} />
    );
};


const ArticlePage = () => {
    const [article, setArticle] = useState({});
    const { id: articleId } = useParams();
    const navigate = useNavigate();
    const { categoryList, tagList } = useSelector((state) => state.global);
    useEffect(() => {
        getArticleInfo(articleId).then((res) => {
            setArticle(res.data.result);
        });
    }, []);
    return (
        <Card style={{height: '100%', margin: '10px', overflow: 'scroll'}} >
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <Typography>
                        <Title>{article.title}</Title>
                        <div style={{textAlign: 'left'}}>
                            <span>分类：</span>
                            {
                                getArticleCategory(article.category_id, categoryList).map(item => {
                                    return <Tag color={item?.color ?? 'default'} key={item?.id ?? generatePureNumberId()}
                                                style={{margin: '5px'}}>{item?.name}</Tag>
                                })
                            }
                        </div>

                        <div style={{textAlign: 'left'}}>
                            <span>标签：</span>
                            {
                                getArticleTagList(article.tags, tagList).map(item => {
                                    return <Tag key={item?.id ?? generatePureNumberId()} color={item?.color ?? 'default'}
                                                style={{margin: '5px'}}>{`#${item?.name}`}</Tag>
                                })
                            }
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div>
                                <span>创建时间：</span>
                                {formatCNDate(article?.create_time)}
                            </div>
                            <div>
                                <span>修改时间：</span>
                                {formatCNDate(article?.update_time)}
                            </div>
                        </div>
                        <Paragraph>
                            <blockquote style={{textAlign: 'left'}}>
                                {article.desc}
                            </blockquote>
                        </Paragraph>
                        
                        <MarkdownToHtml markdownText={article.content}/>
                    </Typography>
                </Col>
                <Col span={4}></Col>
            </Row>
            <Popover content={"返回首页"}>
                <FloatButton
                    shape="circle"
                    type="primary"
                    style={{
                        insetInlineEnd: 94,
                    }}
                    icon={<HomeOutlined/>}
                    onClick={() => {
                        navigate(-1);
                    }}
                />
            </Popover>
        </Card>
    );
}

export default ArticlePage;

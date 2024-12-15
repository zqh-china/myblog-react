
import {Card, Row, Col, Typography, Image, FloatButton, Popover, Tag} from "antd";
import {useEffect, useState} from "react";
import {getArticleInfo, getArticleParagraphs} from "../services/index.js";
import {useNavigate, useParams} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import Highlight from 'react-syntax-highlighter';
import { idea as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {formatCNDate, generatePureNumberId, getArticleCategory, getArticleTagList} from "../utils/index.js";
import {useSelector} from "react-redux";


const { Title, Text, Paragraph } = Typography;

// 根据传入的para.type，渲染不同的内容，以便在文章中兼容普通文本和更多样式
const getContent = (para) => {
    const { type } = para;
    switch (type) {
        case 'text':
            return <Text>{para.content}</Text>;
        case 'img':
            return <Image width={600} src={`http://blog.coollt.cn/imgs/${para.content}`} alt="" />;
        case 'code':
            return <Highlight language={para.lang} style={codeStyle}>{para.content}</Highlight>;
        default:
            return <div></div>
    }
}

// 根据type获取样式
const getStyle = (type) => {
    switch (type) {
        case 'text':
            return {
                textAlign: 'left',
                textIndent: '2em',
            }
        case 'img':
            return {
                textAlign: 'center',
            }
        default:
            return {}
    }
}




const ArticlePage = () => {
    const [article, setArticle] = useState({});
    const [paragraphList, setParagraphList] = useState([]);
    const { id: articleId } = useParams();
    const navigate = useNavigate();
    const { categoryList, tagList } = useSelector((state) => state.global);
    useEffect(() => {
        getArticleInfo(articleId).then((res) => {
            setArticle(res.data.result);
        });
        getArticleParagraphs(articleId).then((res) => {
            setParagraphList(res.data.result);
        });

    },[]);
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
                            <blockquote>
                                {article.desc}
                            </blockquote>
                        </Paragraph>
                        {
                            paragraphList.map(para => {
                                return (
                                    <Paragraph
                                        key={para?.id ?? generatePureNumberId()}
                                        style={getStyle(para.type)}>{getContent(para)}</Paragraph>);
                            })
                        }
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
                        navigate('/home');
                    }}
                />
            </Popover>
        </Card>
    );
}

export default ArticlePage;

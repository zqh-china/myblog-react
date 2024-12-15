import {Button, Card, Col, Pagination, Row, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {formatCNDate, generatePureNumberId, getArticleCategory, getArticleTagList} from "../utils/index.js";
import {fetchArticleList, setPage} from "../store/modules/globalSlice.js";

const HomePage = () => {
    const { tagList, categoryList, articleList, total, page } = useSelector((state) => state.global);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Card style={{height: '100%', margin: '10px', overflow: 'scroll'}} >
            <Row>
                {/* 左侧tag和分类卡片 */}
                <Col span={6} style={{padding: '0 10px 0 0'}}>
                    <Row style={{ margin: '0 0 20px 0' }}>
                        <Col span={24}>
                            <Card style={{padding: '0', minHeight: '180px'}}>
                                <h3 style={{textAlign: 'center', margin: '0 0 10px 0'}}>标签</h3>
                                {
                                    tagList.map((tag) => {
                                        return <Tag key={tag?.id} color={tag?.color ?? 'default'}
                                                    style={{margin: '5px'}}>{"#" + tag.name}</Tag>
                                    })
                                }
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Card style={{padding: '0', minHeight: '180px'}}>
                                <h3 style={{textAlign: 'center', margin: '0 0 10px 0'}}>分类</h3>
                                {
                                    categoryList.map((category) => {
                                        return <Tag key={category?.id} color={category?.color ?? 'default'}
                                                    style={{margin: '5px'}}>{category.name}</Tag>
                                    })
                                }
                            </Card>
                        </Col>
                    </Row>
                </Col>
                {/* 文章列表 */}
                <Col span={16}>
                    <Row>
                        <Col span={24}>
                            {
                                articleList.map(article => {
                                    return (
                                        <Card style={{marginBottom: '10px', minHeight: '200px'}}
                                              key={article.id}>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                <h2 style={{textAlign: 'left'}}>{article.title}</h2>
                                                <Button color='primary' variant='outlined'
                                                        onClick={() => navigate(`/article/${article?.id}`)}>阅读</Button>
                                            </div>

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
                                            <div style={{textAlign: 'left'}}>
                                                <span>摘要：</span>
                                                {article.desc}
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

                                        </Card>)
                                })
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col span={4}></Col>
                        <Col span={16} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Pagination defaultCurrent={page} page={page} pageSize={4} total={total} onChange={(page) => { dispatch(fetchArticleList(page));dispatch(setPage(page)); }}/>
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                </Col>
                <Col span={2}></Col>
            </Row>

        </Card>
    );
}

export default HomePage;
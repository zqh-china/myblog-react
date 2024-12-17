import {Button, Col, Row, Table, Tag} from "antd";
import {useSelector} from "react-redux";
import {formatCNDate, generatePureNumberId, getArticleCategory, getArticleTagList} from "../utils/index.js";
import {useNavigate} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";



const ArticleManage = () => {
    const { articleList, tagList, categoryList } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    const toEdit = (articleId) => {
        navigate(`/admin/article_edit/${articleId}`);
    }
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (_, { title }) => (<strong>{title}</strong>)
        },
        {
            title: '分类',
            dataIndex: 'category_id',
            key: 'category_id',
            render: (_, { category_id }) => {
                return < >
                    {
                        getArticleCategory(category_id, categoryList).map(item => {
                            return <Tag color={item?.color ?? 'default'} key={item?.id ?? generatePureNumberId()}
                                        style={{margin: '5px'}}>{item?.name}</Tag>
                        })
                    }
                </>
            },
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            render: (_, { tags }) => {
                    return < >
                    {
                        getArticleTagList(tags, tagList).map(item => {
                            return <Tag key={item?.id ?? generatePureNumberId()} color={item?.color ?? 'default'}
                                        style={{margin: '5px'}}>{`#${item?.name}`}</Tag>
                        })
                    }
                </>
            },
        },
        {
            title: '摘要',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '发布状态',
            dataIndex: 'publish_status',
            key: 'publish_status',
            render: (_, { publish_status }) => {
                const color = publish_status === 'published' ? 'success': publish_status === 'archived' ? 'processing' : 'warning';
                return <Tag color={color}>{publish_status}</Tag>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            render: (_, { create_time }) => {
                return <>{formatCNDate(create_time)}</>
            },
        },
        {
            title: '更新时间',
            dataIndex: 'update_time',
            key: 'update_time',
            render: (_, { update_time }) => {
                return <>{formatCNDate(update_time)}</>
            },
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            render: (_, { id }) => {

                return (<>
                    <Button color="primary" variant="filled" size="small" onClick={() => toEdit(id)} style={{margin: '0 5px 0 0'}}>编辑</Button>
                    <Button color="danger" variant="filled" size="small"  style={{margin: '0 0 0 5px'}}>删除</Button>
                </>)
            },
        }


];

    return (
        <>
            <h3>文章管理</h3>
            <Row>
                <Col span={23}></Col>
                <Col span={1}><Button type={"primary"}><PlusOutlined />新增</Button></Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={articleList.map(item => {return { ...item, key: item.id }})}></Table>
                </Col>
            </Row>
        </>
    );
}

export default ArticleManage
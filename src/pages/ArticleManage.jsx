import {Button, Col, Drawer, Form, Input, Row, Select, message, Table, Tag, Popconfirm} from "antd";
import {useSelector} from "react-redux";
import {formatCNDate, generatePureNumberId, getArticleCategory, getArticleTagList} from "../utils/index.js";

import {PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {deleteArticle, getArticleInfo} from "../services/index.js";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchArticleList } from "../store/modules/adminSlice.js";
const {TextArea} = Input;


const ArticleManage = () => {
    const { articleList, tagList, categoryList, token } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toEdit = (id) => {
        navigate(`/admin/article_edit/${id}`);
    }
    const toAdd = () => {
        navigate(`/admin/article_add`);
    }
    const toView = (id) => {
        navigate(`/admin/article/${id}`);
    }
    const toDel = (id) => {
        deleteArticle(id, token).then((res) => {
            messageApi.open({
                type: 'success',
                content: res.data.message,
            });
            dispatch(fetchArticleList());
        }).catch((err) => {
            messageApi.open({
                type: 'error',
                content: err,
            });
        });
    }
    const [messageApi, contextHolder] = message.useMessage();
    const cancel = () => { messageApi.warning("已取消操作") }
    const confirm = (id) => { toDel(id) }
    useEffect(() => {
        dispatch(fetchArticleList());
    }, [dispatch]);
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
            width: 160,
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
            width: 200,
            render: (_, { id }) => {
                return (<>
                    {contextHolder}
                    <Button color="primary" variant="filled" size="small" style={{margin: '0 5px 0 0'}} onClick={() => toEdit(id)}>编辑</Button>
                    <Button color="primary" variant="filled" size="small" style={{margin: '0 5px 0 0'}} onClick={() => toView(id)}>预览</Button>
                    <Popconfirm
                        title="删除文章"
                        description="确定要删除这篇文章吗？"
                        onConfirm={() => confirm(id)}
                        onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button color="danger" variant="filled" size="small"  style={{margin: '0 0 0 5px'}}>删除</Button>
                    </Popconfirm>
                    
                </>)
            },
        }


    ];

    return (
        <>
            <h3>文章管理</h3>
            <Row>
                <Col span={23}></Col>
                <Col span={1}><Button type={"primary"} onClick={() => toAdd()}><PlusOutlined />新增</Button></Col>
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
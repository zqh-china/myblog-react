import {Row, Col, Tag, Button, Popconfirm, Table, message, Form, Drawer, Input, Select  } from "antd";
import { useState } from "react";
import {PlusOutlined} from '@ant-design/icons';
import { generatePureNumberId } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryList } from '../store/modules/adminSlice';
import { antdColors } from "../utils/index.js";
import { updateCategory, addCategory, delCategory } from "../services/index.js";


const CategoryManage = () => {
    const { categoryList, token } = useSelector((state) => state.admin);
    const [editDrawerOpen, setEditDrawerOpen] = useState(false);
    const [addDrawerOpen, setAddDrawerOpen] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const refreshCategoryList = () => {
        dispatch(fetchCategoryList());
    }
    const toEdit = (id) => {
        const categoryInfo = categoryList.find(item => item.id === id);
        if (!categoryInfo) {
            message.error(`分类[id=${id}]不是合法的分类`);
            return;
        }
        form.setFieldsValue({
            id: id,
            name: categoryInfo.name,
            desc: categoryInfo.desc,
            color: categoryInfo.color,
        })
        setEditDrawerOpen(true);
         
    }
    const cancel = () => { message.warning('已取消操作');}
    const confirm = (id) => { console.log(id);toDel(id) }
    const toDel = (id) => {
        fetchDelCategory(id);
    }
    const toSubmit = (values) => {
        if (values.id) {
            fetchEditCategory(values);
        } else {
            fetchAddCategory(values);
        }
    }

    const fetchEditCategory = (values) => {
        updateCategory(values, token).then((res) => {
            if (res.data.code !== 0) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                refreshCategoryList();
            }
            
        }).catch((err) => {
            message.error(err.response?.data?.message);
        })
        setEditDrawerOpen(false);
    }

    const fetchAddCategory = (values) => {
        addCategory(values, token).then((res) => {
            if (res.data.code !== 0) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                refreshCategoryList();
            }
            
        }).catch((err) => {
            message.error(err.response?.data?.message);
        })
        setAddDrawerOpen(false);
    }

    const fetchDelCategory = (id) => {
        delCategory(id, token).then((res) => {
            if (res.data.code !== 0) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                refreshCategoryList();
            }
        }).catch((err) => {
            message.error(err.response?.data?.message);
        })
    }
    
    
    const columns = [
        {
            title: '分类名',
            dataIndex: 'label',
            key: 'label',
            width: 100,
            render: (_, { id, name, color }) => (<Tag color={color ?? 'default'} key={id ?? generatePureNumberId()}
            style={{margin: '5px'}}>{name}</Tag>)
        },
        {
            title: '说明',
            dataIndex: 'desc',
            key: 'desc',
            width: 180,
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 200,
            render: (_, { id }) => {
                return (<>
                    <Button color="primary" variant="filled" size="small" style={{margin: '0 5px 0 0'}} onClick={() => toEdit(id)}>编辑</Button>
                    <Popconfirm
                        title="删除分类"
                        description="确定要删除这个分类吗？"
                        okText="确定"
                        cancelText="取消"
                        onCancel={cancel}
                        onConfirm={() => confirm(id)}
                    >
                        <Button color="danger" variant="filled" size="small"  style={{margin: '0 0 0 5px'}}>删除</Button>
                    </Popconfirm>
                    
                </>)
            },
        }

    ];

    return (
    <>
        <h3>分类管理</h3>
        <Row>
            <Col span={23}></Col>
            <Col span={1}><Button type={"primary"} onClick={() => {setAddDrawerOpen(true)}}><PlusOutlined />新增</Button></Col>
        </Row>

        <Row>
            <Col span={24}>
                <Table columns={columns} dataSource={categoryList.map(item => {return { ...item, key: item.id }})}></Table>
            </Col>
        </Row>
        <Drawer title="编辑分类" onClose={() => {setEditDrawerOpen(false)}} open={editDrawerOpen}>
            <Form form={form} onFinish={(values) => { toSubmit(values) }}>
                <Form.Item label="ID" name="id">
                    <Input disabled/>
                </Form.Item>
                <Form.Item label="分类名" name="name" rules={[{required: true, message: "分类名不能为空"}]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item label="分类备注" name="desc">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="分类颜色" name="color" rules={[{required: true, message: "请为分类选择一个颜色"}]}>
                    <Select 
                        options={antdColors.map(item=> { return {value: item, label: <Tag color={item} key={item}>{item}</Tag>} })}
                    ></Select>
                </Form.Item>
                <Row style={{margin: '20px 0 0 0'}}>
                    <Col span={10}>
                        <Button type="primary" style={{width: '140px'}} htmlType="submit" size="large">提交</Button>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={10}>
                        <Button type="default" style={{width: '140px'}} onClick={() => { setEditDrawerOpen(false) }} size="large">返回</Button>
                    </Col>
                </Row>
            </Form>
        </Drawer>
        <Drawer title="创建分类" onClose={() => {setAddDrawerOpen(false)}} open={addDrawerOpen}>
            <Form onFinish={(values) => { toSubmit(values) }}>
                <Form.Item label="分类名" name="name" rules={[{required: true, message: "分类名不能为空"}]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item label="分类备注" name="desc">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="分类颜色" name="color" rules={[{required: true, message: "请为分类选择一个颜色"}]}>
                    <Select 
                        options={antdColors.map(item=> { return {value: item, label: <Tag color={item} key={item}>{item}</Tag>} })}
                    ></Select>
                </Form.Item>
                <Row style={{margin: '20px 0 0 0'}}>
                    <Col span={10}>
                        <Button type="primary" style={{width: '140px'}} htmlType="submit" size="large">提交</Button>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={10}>
                        <Button type="default" style={{width: '140px'}} onClick={() => { setAddDrawerOpen(false) }} size="large">返回</Button>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    </>
    );
}

export default CategoryManage
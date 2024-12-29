import {Button, Col, Popconfirm, Row, Table, Tag, message, Drawer, Form, Input, Select} from "antd";
import {useSelector} from "react-redux";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import { addTag, delTag, updateTag } from "../services/index.js";
import { useDispatch } from "react-redux";
import { fetchTagList } from "../store/modules/adminSlice.js";
import { antdColors } from "../utils/index.js";

const TagManage = () => {
    const { tagList, token } = useSelector((state) => state.admin);
    const [editDrawerOpen, setEditDrawerOpen] = useState(false);
    const [addDrawerOpen, setAddDrawerOpen] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const refreshTagList = () => {
        dispatch(fetchTagList());
    }
    const fetchAddTag = (values) => {
        addTag(values, token).then((res) => {
            if (res.data.code !== 0) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                refreshTagList();
            }
            
        }).catch((err) => {
            message.error(err.response?.data?.message);
        })
        setAddDrawerOpen(false);
    }
    const fetchEditTag = (values) => {
        updateTag(values, token).then((res) => {
            if (res.data.code !== 0) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                refreshTagList();
            }
            
        }).catch((err) => {
            message.error(err.response?.data?.message);
        })
        setEditDrawerOpen(false);
    }
    const fetchDelTag = (id) => {
        delTag(id, token).then((res) => {
            if (res.data.code !== 0) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                refreshTagList();
            }
        }).catch((err) => {
            message.error(err.response?.data?.message);
        })
    }

    const cancel = () => { message.warning('已取消操作');}
    const confirm = (id) => { toDel(id) }
    const toDel = (id) => {
        fetchDelTag(id);
    }
    const toSubmit = (values) => {
        if (values.id) {
            fetchEditTag(values);
        } else {
            fetchAddTag(values);
        }
        
    }
    const toEdit = (id) => {
        const tagInfo = tagList.find(item => item.id === id);
        if (!tagInfo) {
            message.error(`标签[id=${id}]不是合法的标签`);
            return;
        }
        form.setFieldsValue({
            id: id,
            name: tagInfo.name,
            desc: tagInfo.desc,
            color: tagInfo.color,
        })
        setEditDrawerOpen(true);

    }

    const columns = [
        {
            title: '标签名',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            render: (_, { id, name, color }) => {
                return <Tag color={color} key={id}>{name}</Tag>
            },
        },
        {
            title: '说明',
            dataIndex: 'desc',
            key: 'desc',
            width: 180,
            render: (_, { desc }) => (<div>{desc}</div>)
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
                        title="删除标签"
                        description="确定要删除这个标签吗？"
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
            <h3>标签管理</h3>
            <Row>
                <Col span={23}></Col>
                <Col span={1}><Button type={"primary"} onClick={() => {setAddDrawerOpen(true)}}><PlusOutlined/>新增</Button></Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={tagList.map(item => {return { ...item, key: item.id }})}
                           // tagList的数据其他模块也在使用，存在redux里，所以后端不做分页，只做前端分页
                        pagination={{
                            pageSize: 5,
                        }}
                    ></Table>
                </Col>
            </Row>
            <Drawer title="编辑标签" onClose={() => {setEditDrawerOpen(false)}} open={editDrawerOpen}>
                <Form form={form} onFinish={(values) => { toSubmit(values) }}>
                    <Form.Item label="ID" name="id">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="标签名" name="name" rules={[{required: true, message: "标签名不能为空"}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="标签备注" name="desc">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="标签颜色" name="color" rules={[{required: true, message: "请为标签选择一个颜色"}]}>
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
            <Drawer title="创建标签" onClose={() => {setAddDrawerOpen(false)}} open={addDrawerOpen}>
                <Form onFinish={(values) => { toSubmit(values) }}>
                    <Form.Item label="标签名" name="name" rules={[{required: true, message: "标签名不能为空"}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="标签备注" name="desc">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="标签颜色" name="color" rules={[{required: true, message: "请为标签选择一个颜色"}]}>
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

export default TagManage
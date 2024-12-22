import { Row, Col, Button, Table, Popconfirm, message, Popover, Image, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImgList } from "../store/modules/adminSlice";
import { UploadOutlined } from '@ant-design/icons';
import { formatCNDate } from '../utils/index.js';
import { baseUrl, imgUrl, apiUrl, delImg } from "../services/index.js";



const AttachmentManage = () => {
    const { imgList, token } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const refreshImgList = () => {
        dispatch(fetchImgList());
    }
    useEffect(() => {
        refreshImgList();
    }, []);
    const cancel = () => {
        message.warning("已取消操作");
    }
    const confirm = (id) => {
        delImg(id, token).then((res) => {
            message.success(res.data.message);
            refreshImgList();
        }).catch((err) => {
            // console.log(err.response.data.message);
            message.error(err.response?.data?.message);
        });
    }
    const props = {
        name: 'file',
        action: `/api/upload/file`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 文件上传成功`);
                refreshImgList();
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 文件上传失败: ${info?.file?.response?.message}`);
            }
        },
    };
    const columns = [
        {
            title: '文件名',
            dataIndex: 'file_name',
            key: 'file_name',
            width: 80,
            render: (_, { file_name }) => {
                return <>
                    <Popover content={<Image width={600} src={`/imgs/${file_name}`} />} title="" trigger="hover">
                        <div style={{ cursor: 'pointer' }}>{file_name}</div>
                    </Popover>
                </>
            },
        },
        {
            title: '文件类型',
            dataIndex: 'mime_type',
            key: 'mime_type',
            width: 80,
            render: (_, { mime_type }) => {
                return <>{mime_type}</>
            },
        },
        {
            title: '文件路径',
            dataIndex: 'file_path',
            key: 'file_path',
            width: 180,
            render: (_, { file_path }) => {
                return <>{file_path}</>
            },
        },
        {
            title: '文件大小',
            dataIndex: 'file_size',
            key: 'file_size',
            width: 80,
            render: (_, { file_size }) => {
                return <>{parseInt(file_size / 1024) + 'KB'}</>
            },
        },
        {
            title: '上传时间',
            dataIndex: 'upload_time',
            key: 'upload_time',
            width: 80,
            render: (_, { upload_time }) => {
                return <>{formatCNDate(upload_time)}</>
            },
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 200,
            render: (_, { id }) => {
                return (<>
                    <Popconfirm
                        title="删除"
                        description="确定要删除这个文件吗？"
                        onConfirm={() => confirm(id)}
                        onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button color="danger" variant="filled" size="small" style={{ margin: '0 0 0 5px' }}>删除</Button>
                    </Popconfirm>

                </>)
            },
        }
    ];
    return (
        <>
            <h3>附件管理</h3>
            <Row>
                <Col span={23}></Col>
                <Col span={1}>
                    <Upload {...props}>
                        <Button type="primary"><UploadOutlined />上传</Button>
                    </Upload>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={imgList.map(item => { return { ...item, key: item.id } })}></Table>
                </Col>
            </Row>
        </>
    )
}

export default AttachmentManage
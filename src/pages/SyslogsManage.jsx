import {Col, message, Row, Table, Tag} from "antd";
import {formatCNDate} from "../utils/index.js";
import {useEffect, useState} from "react";
import {getSyslogs} from "../services/index.js";
import {useSelector} from "react-redux";
const levelColors = ['default','processing', 'warning', 'error', 'error'];
const levelLabels = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'FATAL']
const sourceColors = ['processing', 'success'];
const sourceLabels = ['后端服务器', '前端管理后台'];
const columns = [
    {
        title: '操作描述',
        dataIndex: 'action',
        key: 'action',
        width: 200,
    },
    {
        title: '来源',
        dataIndex: 'source',
        key: 'source',
        width: 40,
        render: (_, {source}) => {
            return <Tag color={sourceColors[source]}>{sourceLabels[source]}</Tag>
        }
    },
    {
        title: '日志级别',
        dataIndex: 'level',
        key: 'level',
        width: 100,
        render: (_, {level}) => {
            return <Tag color={levelColors[level]}>{levelLabels[level]}</Tag>
        }
    },
    {
        title: '模块',
        dataIndex: 'module',
        key: 'module',
        width: 80,
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        width: 80,
        render: (_, { create_time }) => {
            return <>{formatCNDate(create_time)}</>
        },
    },
];

const SyslogsManage = () => {
    const [logList, setLogList] = useState([]);
    const [logCount, setLogCount] = useState(0);
    const {token} = useSelector((state) => state.admin);
    const fetchLogList = async (page, pageSize, token) => {
        getSyslogs(page, pageSize, token).then(res => {
            if (res.data.code !== 0) {
                message.error('获取日志失败');
            } else {
                setLogList(res.data.result.list);
                setLogCount(res.data.result.count);
            }
        })
    }
    useEffect(() => {
        fetchLogList(1, 10, token);
    }, []);

    return (
        <>
            <h3>系统日志管理</h3>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={logList.map(item => { return { ...item, key: item.id } })}
                        pagination={{
                            total: logCount,
                            pageSize: 10,
                            onChange: (page, pageSize) => {
                                fetchLogList(page, pageSize, token);
                            }
                        }}
                    ></Table>
                </Col>
            </Row>
        </>
    );
}

export default SyslogsManage;
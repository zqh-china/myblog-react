import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const ResultPage = ({ status, title, subTitle = '', homePath='/admin', redirectPath=-1 }) => {
  const navigate = useNavigate();
  return (<Result
    status={status}
    title={title}
    subTitle={subTitle}
    extra={[
      <Button type="primary" key="article" onClick={() => {navigate(homePath)}}>
        返回首页
      </Button>,
      <Button key="article_add" onClick={() => {navigate(redirectPath)}}>继续添加</Button>,
    ]}
  />
  );
}
export default ResultPage;
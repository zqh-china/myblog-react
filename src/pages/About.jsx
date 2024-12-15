import {useSelector} from "react-redux";
import {Timeline, Card, Row, Col} from "antd";


const AboutPage = () => {
    const { changelogList } = useSelector((state) => state.global);
    const timeItems = changelogList.map((item) => {
        return {
            children: <>
                <h3 style={{textAlign: 'left'}}>{ item.name }</h3>
                <p style={{textAlign: 'left'}}>{ item.detail }</p>
            </>
        }
    });
    return (
        <Card style={{height: '100%', margin: '10px', overflow: 'scroll'}} >
            <Row>
                <Col span={6}></Col>
                <Col span={12}>
                    <Timeline items={timeItems}></Timeline>
                </Col>
                <Col span={6}></Col>
            </Row>
        </Card>
    );
}

export default AboutPage;

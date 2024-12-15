import {Card, Row, Col, Popover, Image} from "antd";
import './contact.css';
import QQImage from '../assets/images/qq.JPG';
import WechatImage from '../assets/images/wechat.JPG';
import TelegramImage from '../assets/images/telegram.jpg';

const linkMap = {
    'mail-qq': 'mailto:2270179571@qq.com',
    'gmail': 'mailto:zhangqihao628@gmail.com',
    'github': 'https://github.com/zqh-china',
}

const onIconClick = (type) => {
    window.open(linkMap[type], '_blank');
}

const ContactPage = () => {
    return (
        <Card style={{height: '100%', margin: '10px', overflow: 'scroll'}} >
            <Row>
                <Col span={6}></Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Row style={{ margin: '0 0 40px 0' }}>
                            <Col span={8}>
                                <svg className="icon" aria-hidden="true" data-target="github"
                                     onClick={() => onIconClick('github')}>
                                    <use xlinkHref="#icon-github"></use>
                                </svg>
                            </Col>
                            <Col span={8}>
                                <svg className="icon" aria-hidden="true" data-target="mail-qq"
                                     onClick={()=> onIconClick('mail-qq')}>
                                    <use xlinkHref="#icon-mail-qq"></use>
                                </svg>
                            </Col>
                            <Col span={8}>
                                <svg className="icon" aria-hidden="true" data-target="gmail"
                                onClick={() => onIconClick('gmail')}>
                                <use xlinkHref="#icon-gmail"></use>
                            </svg>
                        </Col>
                    </Row>
                        <Row>
                            <Col span={8}>
                                <Popover title="QQ" trigger="hover" placement={"bottom"} content={<Image src={QQImage} width={200}/>}>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-QQ"></use>
                                    </svg>
                                </Popover>
                            </Col>
                            <Col span={8}>
                                <Popover title="WeChat" trigger="hover" placement={"bottom"} content={<Image src={WechatImage} width={200}/>}>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-Wechat"></use>
                                    </svg>
                                </Popover>
                            </Col>
                            <Col span={8}>
                                <Popover title="Telegram" trigger="hover" placement={"bottom"} content={<Image src={TelegramImage} width={200}/>}>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-telegram"></use>
                                    </svg>
                                </Popover>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}></Col>
            </Row>
        </Card>
    );
}

export default ContactPage;

import React, {useContext, useEffect, useState} from 'react'
import {Logged} from "../../views/Logged";
import {displayGrvatar, UserContext} from "../../services/user";

import {Card, Collapse, Descriptions, List,Tabs} from 'antd';
import './layout.css'
import {API} from "../../services/api";
import {PostShort} from "../Home/PostShort/PostShort";
import {EditTwoTone} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import {ChangePassword} from "../Auth/ChangePassword/ChangePassword";
import {ChangeUsername} from "../Auth/ChangeUsername/ChangeUsername";
import {ChangeEmail} from "../Auth/ChangeEmail/ChangeEmail";
import {useLocation} from "react-router";

export const Profile = () => {

    const {Panel} = Collapse;
    const {TabPane} = Tabs;

    const {user} = useContext(UserContext);
    const location = useLocation()
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        if (user.username !== null) {
            API.get(`/post/user/${user.username}`)
                .then((response) => {
                    setPosts(response.data)
                }).catch((errInfo) => {
                console.log(errInfo)
            })
        }
    }, [user])

    return (
        <Logged>
            <div className="tab">
                <Tabs
                    defaultActiveKey={location.state.activeKey}
                    centered={true}
                >
                    <TabPane tab="User info" key="1">
                        <div className="tab1">
                            <Card
                                style={{marginTop: 16, minWidth: "500px", width: "80%"}}
                                className="profile-card"
                            >
                                <Meta
                                    avatar={
                                        displayGrvatar(user.avatar_url, 250)
                                    }
                                    description={
                                        <Descriptions title="User Info" column={1} contentStyle={{fontWeight: "bold"}}>
                                            <Descriptions.Item label="Username"> {user.username} </Descriptions.Item>
                                            <Descriptions.Item label="E-mail"> {user.email} </Descriptions.Item>
                                            {posts !== null &&
                                            <Descriptions.Item
                                                label="Posts amount"> {Object.keys(posts).length} </Descriptions.Item>
                                            }
                                        </Descriptions>
                                    }
                                />

                            </Card>
                            <Collapse
                                bordered={false}
                                ghost
                                className="profile-collapse"
                            >
                                <Panel header={<><EditTwoTone twoToneColor="red"/> Change password</>} key="1"
                                       showArrow={false}>
                                    <ChangePassword/>
                                </Panel>
                                <Panel header={<><EditTwoTone twoToneColor="orange"/> Change username</>} key="2"
                                       showArrow={false}>
                                    <ChangeUsername/>
                                </Panel>
                                <Panel header={<><EditTwoTone twoToneColor="#29cd00"/> Change username</>} key="3"
                                       showArrow={false}>
                                    <ChangeEmail/>
                                </Panel>
                            </Collapse>
                        </div>
                    </TabPane>
                    <TabPane tab="Manage posts" key="2">
                        {posts !== null ?
                            <List
                                pagination={true}
                                style={{marginBottom: "1rem"}}
                                dataSource={posts}
                                renderItem={post => (
                                    <PostShort
                                        id={post._id}
                                        title={post.title}
                                        date={post.createdAt.$date}
                                        body={post.body}
                                        author={user}
                                        comments={post.comments}
                                        modified={post.modified}
                                        lastModifiedAt={post.lastModifiedAt.$date}
                                        type={"user"}
                                    />
                                )}
                            /> :
                            <div>
                                No post added yet
                            </div>
                        }
                    </TabPane>
                </Tabs>
            </div>
            {/*{textColorFromImage(user.username, user.avatar_url)}*/}
        </Logged>
    )
}
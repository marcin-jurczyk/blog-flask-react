import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";
import moment from "moment";
import {Row, Col, Divider, Typography, List, Comment, Form, Button, message} from 'antd';
import {ClockCircleOutlined, CommentOutlined, UserOutlined} from '@ant-design/icons';
import {displayGrvatar, UserContext} from "../../services/user";
import {Logged} from "../../views/Logged";
import {NotLogged} from "../../views/NotLogged";
import TextArea from "antd/es/input/TextArea";
import {API} from "../../services/api";
import './layout.css'

const {Title, Paragraph} = Typography;

export const Post = () => {

    const {user} = useContext(UserContext)

    const post = useLocation().state.post;
    const date = moment(useLocation().state.post.date)

    // comment
    const [value, setValue] = useState('')
    const [comments, setComments] = useState()

    useEffect(() => {
        async function loadData() {
            const comments = await API.get(`/post/comment/get`, {
                params: {post_id: post.id.$oid}
            })
            setComments(comments.data)
        }
        loadData().then(/* do nothing */);
    }, [post.id.$oid])

    const handleSubmit = () => {
        if (value !== "") {
            API.post(`/post/comment`, {
                post_id: post.id.$oid,
                body: value,
            }).then((response) => {
                    console.log(response.data)
                    window.location.reload(false)
                }
            ).catch((errInfo) => {
                message.error(errInfo);
            })
        }
    }

    const content = () => {
        return (
            <div className="post-container">
                <Row justify="center" align="middle">
                    <Col span={2}>
                        {/*{displayAvatar(post.author.avatar_url, 20)}{" "}*/}
                        <UserOutlined style={{color: '#bbbbbb'}}/>{' '}
                        {post.author.username}
                    </Col>
                    <Divider type="vertical"/>
                    <Col span={2}>
                        <CommentOutlined span={2} style={{color: '#bbbbbb'}}/>{' '}
                        {Object.keys(post.comments).length}
                    </Col>
                    <Col span={3}>
                        <ClockCircleOutlined style={{color: '#bbbbbb'}}/>{' '}
                        {date.format('YYYY-MM-DD HH:mm:ss')}
                    </Col>
                </Row>
                <Divider orientation="left" style={{color: '#bbbbbb'}}>Title</Divider>
                <Title>
                    {post.title}
                </Title>
                <Divider orientation="left" style={{color: '#bbbbbb'}}>Content</Divider>
                <Paragraph>
                    <div dangerouslySetInnerHTML={{__html: post.body}}/>
                </Paragraph>
            </div>
        )
    }

    console.log(value)
    if (localStorage.token === 'undefined' || !localStorage.token) {
        return (
            <NotLogged>
                {content()}
                {comments !== undefined &&
                <div className="post-container">
                    {post.comments.length > 0 &&
                    <div className="comment-section">
                        <span style={{fontWeight: "bold"}}> COMMENTS </span>
                        <CommentList comments={comments.comments}/>
                    </div>
                    }
                </div>
                }
            </NotLogged>
        )
    } else {
        return (
            <Logged>
                {content()}
                {comments !== undefined &&
                <div className="post-container">
                    {post.comments.length > 0 &&
                    <div className="comment-section">
                        <span style={{fontWeight: "bold"}}> COMMENTS </span>
                        <CommentList comments={comments.comments}/>
                    </div>
                    }
                    <Comment
                        className={"new-comment"}
                        avatar={
                            displayGrvatar(user.avatar_url)
                        }
                        content={
                            <Editor
                                onChange={e => setValue(e.target.value)}
                                onSubmit={handleSubmit}
                                // submitting={submitting}
                                setState={setValue}
                                value={value}
                            />
                        }
                    />
                </div>
                }
            </Logged>
        )
    }

}

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={comment => {
            return (
                <Comment
                    content={comment.body}
                    author={comment.user.username}
                    avatar={comment.user.avatar_url}
                    datetime={moment(comment.createdAt.$date).fromNow()}
                />
            )
        }
        }
    />
);

const Editor = ({setState, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea
                rows={2}
                onChange={e => setState(e.target.value)}
                value={value}
            />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);
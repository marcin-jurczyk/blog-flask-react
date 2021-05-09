import React, {useMemo, useRef, useState} from 'react'
import {Logged} from "../../views/Logged";
import JoditEditor from "jodit-react";
import SuccessAnimation from 'actually-accessible-react-success-animation'

import './layout.css'
import {API} from "../../services/api";
import {Button, Form, Input, message} from "antd";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router";


export const EditPost = () => {

    const editor = useRef(null)
    const original_post = useLocation().state.post

    const history = useHistory();

    const [textAreaValue, setTextAreaValue] = useState(original_post.body)

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        minHeight: 500,
        toolbar: true,
        placeholder: ""
    }

    const animation = () => {
        return (
            <SuccessAnimation
                text="PostShort added successfully!"
                color="#fd74f8"
            />
        )
    }

    const editPost = values => {
        API.put('/post/edit', {
            post_id: original_post.id.$oid,
            title: values.title,
            body: textAreaValue
        })
            .then((() => {
                message.success("Post edited successfully!");
                history.push('/profile', {activeKey: "2"})
            }))
            .catch((errInfo) => {
                // if (error.response.status)
                message.error(errInfo.response.data);
            })
    }

    const handleTextAreaChange = newTextAreaValue => {
        console.log('handleTextAreaChange', newTextAreaValue)
        return (
            setTextAreaValue(() => newTextAreaValue)
        )
    }

    return (
        <Logged>
            <div className="add-new-post-container">
                <Form
                    name="add-new-post"
                    className="add-new-post"
                    initialValues={{remember: true}}
                    onFinish={editPost}
                >
                    Title:
                    <Form.Item
                        name="title"
                        initialValue={original_post.title}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                    >
                        <Input className="title-input" placeholder="Type in your title here..."/>
                    </Form.Item>
                    Content:
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please input body!',
                            },
                        ]}
                    >
                        {useMemo(() => (
                                <JoditEditor
                                    editor={editor}
                                    config={config}
                                    onChange={handleTextAreaChange}
                                    value={textAreaValue}/>
                            ), [] )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block="true" className="add-new-post-button">
                            Edit post
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Logged>
    )
}
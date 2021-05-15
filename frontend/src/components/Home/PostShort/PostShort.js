import React from "react";
import moment from "moment";
import {gradient} from "../../../services/gradient";
import {displayGrvatar} from "../../../services/user";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import LinesEllipsis from 'react-lines-ellipsis'

import "./layout.css"
import {useHistory} from "react-router-dom";
import {Button, Divider, message, Tooltip} from "antd";
import {API} from "../../../services/api";

export const PostShort = props => {
    const history = useHistory();

    // const color = randomColor({luminosity: 'light', alpha: 0.1});
    const bgGradient = {background: gradient(props.title, "diagonal", 0.1)}
    // const bgGradient = {background: color}

    const date = moment(props.date)
    const stripedHtmlBody = props.body.replace(/<[^>]+>/g, '');

    function handleOnClick() {
        history.push('/post', {post: props})
    }

    function handleOnClickEdit() {
        history.push('/edit-post', {post: props})
    }

    function handleOnClickDelete() {
        API.delete('/post/delete', {
            data: {
                title: props.title
            }
        }).then(() => {
                message.success("Post deleted successfully!")
                window.location.reload(false)
                history.push('/profile', {activeKey: "2"})
            }
        ).catch(errInfo => {
            message.error(errInfo.response.data)
        })
    }

    return (
        <>
            <div className="post-short" style={bgGradient} onClick={handleOnClick}>
                <time className="date">
                    <span className="date__day">{date.date()}</span>
                    <span className="date__month_year">{date.format('MMM')} {date.year()}</span>
                    <span className="date__hours">{date.format('HH:mm:ss')}</span>
                </time>
                <div className="post_content">
                    <div className="post_title">
                        <LinesEllipsis
                            text={props.title}
                            maxLine='1'
                            ellipsis=' ...'
                            trimRight
                            basedOn='letters'
                        />
                    </div>
                    <Divider/>
                    <div className="post_body">
                        <LinesEllipsis
                            text={stripedHtmlBody}
                            maxLine='3'
                            ellipsis=' ...'
                            trimRight
                            basedOn='letters'
                        />
                    </div>
                    {props.type === "home" &&
                    <div className="post_author_info">
                        <Tooltip title={props.author.username} placement="top">
                            {displayGrvatar(props.author.avatar_url, 30)}
                            {" "}{props.author.username}
                        </Tooltip>
                    </div>
                    }
                </div>
                {props.type === "user" &&
                <div className="post-edit">
                    <div className="edit-wrapper"/>
                    <div className="post-edit-button">
                        <Button icon={<EditOutlined/>} shape="round" onClick={(e) => {
                            e.stopPropagation()
                            handleOnClickEdit()
                        }}>
                            Edit
                        </Button>
                    </div>
                    <div className="post-delete-button">
                        <Button icon={<DeleteOutlined/>} shape="round" onClick={(e) => {
                            e.stopPropagation()
                            handleOnClickDelete()
                        }}>
                            Delete
                        </Button>
                    </div>
                    {props.modified === true &&
                    <div className="last-modified">
                        last modified:{" "}{moment(props.lastModifiedAt).format('DD MMMM YYYY, HH:mm:ss')}
                    </div>
                    }
                </div>
                }
            </div>
        </>
    )
}
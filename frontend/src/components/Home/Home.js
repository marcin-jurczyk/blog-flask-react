import React, {useEffect, useRef, useState} from 'react'
import {NotLogged} from "../../views/NotLogged";
import {Logged} from "../../views/Logged";
import {PostShort} from "./PostShort/PostShort";
import {API} from "../../services/api";
import {List, Spin} from "antd";
import './layout.css'

export const Home = () => {

    const postsAmount = 10;
    const [postsRequest, setPostsRequest] = useState({
        postsLoaded: 0,
        posts: []
    });
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const loader = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {threshold: 0});
        if (loader.current) {
            observer.observe(loader.current)
        }
    }, []);

    useEffect(() => {
        if (page !== 0) {
            API.get(`/post/last/${postsAmount}/${postsRequest.postsLoaded}`)
                .then((response) => {
                    if (Object.keys(response.data).length === 0) {
                        setLoading(false)
                    }
                    if (loading === true) {
                        let newPosts = postsRequest.posts
                        Array.prototype.push.apply(newPosts, response.data);
                        setPostsRequest({
                            postsLoaded: postsRequest.postsLoaded + Object.keys(response.data).length,
                            posts: newPosts,
                        })
                    }
                    // console.log("page: " + page + "\t\tloading: " + loading + "\t\tresponse: " + Object.keys(response.data).length)
                })
                .catch(errInfo => console.error(errInfo))
        }
    }, [page])

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1)
        }
    }

    const content = () => {
        return (
            <div>
                <div className="post-list">
                    <List
                        dataSource={postsRequest.posts}
                        locale={{emptyText: "Loading data..."}}
                        renderItem={post => (
                            <PostShort
                                id={post._id}
                                title={post.title}
                                date={post.createdAt.$date}
                                body={post.body}
                                author={post.author_info}
                                comments={post.comments}
                                type={"home"}
                            />
                        )}
                    />
                    {loading === true ?
                    <div className="loading" ref={loader}>
                        <Spin size="large" className="loader-antd"/>
                    </div>
                        :
                        <div className="loading"> ALL POSTS </div>
                    }
                </div>
            </div>
        )
    }

    if (localStorage.token === 'undefined' || !localStorage.token) {
        return (
            <NotLogged>
                {content()}
            </NotLogged>
        )
    } else {
        return (
            <Logged>
                {content()}
            </Logged>
        )
    }
};
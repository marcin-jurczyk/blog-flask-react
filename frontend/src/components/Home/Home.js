import React, {useEffect, useRef, useState} from 'react'
import {NotLogged} from "../../views/NotLogged";
import {Logged} from "../../views/Logged";
import {Post} from "./Post/Post";
import {API} from "../../services/api";
import {List} from "antd";
import './layout.css'

export const Home = () => {

    const postsAmount = 10;
    const [postsRequest, setPostsRequest] = useState({
        postsLoaded: 0,
        posts: []
    });
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver);
        if (loader.current) {
            observer.observe(loader.current)
        }
    }, []);

    useEffect(() => {
        API.get(`/post/last/${postsAmount}/${postsRequest.postsLoaded}`)
            .then((response) => {
                const loading = response.data === [];
                if (loading === false) {
                    let newPosts = postsRequest.posts
                    Array.prototype.push.apply(newPosts, response.data)
                    setPostsRequest({
                        postsLoaded: postsRequest.postsLoaded + Object.keys(response.data).length,
                        posts: newPosts,
                    })
                }
            })
            .catch(errInfo => console.error(errInfo))
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
                    {
                        <List
                            dataSource={postsRequest.posts}
                            renderItem={post => (
                                <Post
                                    title={post.title}
                                    date={post.createdAt.$date}
                                    body={post.body}
                                    author={post.author}
                                />
                            )}
                        />
                    }
                    {/*{loading === true &&*/}
                    <div className="loading" ref={loader}>
                        <div className="lds-ellipsis">
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
                    {/*}*/}
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

// export const Home = () => {
//
//     // const [posts, setPosts] = useState([{
//     //     _id: {$oid: "000"},
//     //     title: 'Template title',
//     //     body: 'Template body',
//     //     author: {$oid: "000"},
//     //     comments: [],
//     //     createdAt: {$date: "000"},
//     //     modified: false,
//     //     lastModifyAt: {$date: "000"},
//     // }])
//
//     const amountOfLoadedPosts = 10;
//     const [alreadyLoaded, setAlreadyLoaded] = useState(0)
//     const [posts, setPosts] = useState([])
//
//     useEffect(() => {
//         API.get(`/post/last/${amountOfLoadedPosts}/${alreadyLoaded}`)
//             .then((response) => {
//                 let newPosts = posts
//                 Array.prototype.push.apply(newPosts, response.data)
//                 console.log(newPosts)
//                 setPosts(newPosts)
//             })
//             .catch(errInfo => console.error(errInfo))
//     }, [alreadyLoaded]);
//
//     function loadMore() {
//         setAlreadyLoaded(alreadyLoaded + amountOfLoadedPosts)
//     }
//
//     if (posts === undefined || posts === [] || posts === null){
//         return (
//             <NotLogged/>
//         )
//     }
//     else {
//         return (
//             <NotLogged>
//                 <div>
//                     <InfiniteScroll
//                         pageStart={0}
//                         loadMore={loadMore}
//                         hasMore={true}
//                         loader={<div className="loader" key={0}>Loading ...</div>}
//                         useWindow={false}
//                     >
//                         <List
//                             dataSource={posts}
//                             renderItem={post => (
//                                     <Post
//                                         title={post.title}
//                                         date={post.createdAt.$date}
//                                         body={post.body}
//                                     />
//                                     )}
//                         />
//                     </InfiniteScroll>
//                 </div>
//
//                 {/*<button onClick={loadMore} > </button>*/}
//
//             </NotLogged>
//         );
//     }
// };

// const [posts, setPosts] = useState([{
//     _id: {$oid: "000"},
//     title: 'Template title',
//     body: 'Template body',
//     author: {$oid: "000"},
//     comments: [],
//     createdAt: {$date: "000"},
//     modified: false,
//     lastModifyAt: {$date: "000"},
// }])

// useEffect(() => {
//     API.get("/post/all")
//         .then((response) => {
//             const sorted = response.data.sort((a, b) => b.createdAt.$date - a.createdAt.$date)
//             setPosts(sorted)
//         })
//         .catch(errInfo => console.error(errInfo))
// }, []);
// console.log(posts)
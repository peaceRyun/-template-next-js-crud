'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const PostsPage = () => {
    const [posts, setposts] = useState([]); // 게시글 상태
    const [loading, setLoading] = useState(true); //로딩 상태

    // 마운트 시
    useEffect(() => {
        //게시글 목록 불러오기
        //axios.get(api주소).then(()=>{}).catch(()=>{}) axios문법
        axios
            .get('/api/posts')
            .then((res) => {
                setposts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    //로딩 중
    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <>
            <div className='container mx-auto py-10'>
                <h2 className='text-7xl font-black'>블로그 목록</h2>
                <Link href={`/posts/write`} className='p-5 rounded bg-purple-400 text-white font-bold'>
                    작성
                </Link>
                <div className='divide-y divide-gray-300'>
                    {posts.map((post) => (
                        <Link key={post.id} href={`/posts/${post.id}`} className='flex flex-col gap-4 my-5 py-5'>
                            <h3 className='text-4xl font-semibold'>{post.title}</h3>
                            <p className='text-xl'>{post.content}</p>
                            <span className='text-gray-400'>{post.createdAt}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostsPage;

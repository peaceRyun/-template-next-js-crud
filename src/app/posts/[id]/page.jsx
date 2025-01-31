'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';

const PostDetailPage = ({ params }) => {
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    // params = Promise ({id: '1'})
    // use() 훅을 사용하여 unWrap 하기(Promise를 벗겨야 한다)
    // resolvedParams = { id: '1' }
    const resolvedParams = use(params);

    useEffect(() => {
        // 게시글 불러오기
        axios
            .get(`/api/posts/${resolvedParams.id}`)
            .then((res) => {
                setPost(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [resolvedParams.id, router]);

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        try {
            const res = await axios.delete(`/api/posts/${resolvedParams.id}`);
            // 삭제 성공 시 목록으로 이동
            if (res.status === 200) {
                router.push('/posts');
            } else {
                alert('게시글 삭제에 실패했습니다.');
            }
        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다.');
        }
    };

    if (loading) return <div>로딩중...</div>;
    if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

    return (
        <>
            <div className='container mx-auto px-4'>
                <h2 className='text-4xl font-black'>{post.title}</h2>
                <p className='text-xl'>{post.content}</p>
                <span className='text-gray-400'>{post.createdAt}</span>
                <div className='flex'>
                    <Link href={'/posts'}>목록</Link>
                    <Link href={`/posts/${resolvedParams.id}/edit`} className='ml-auto mr-4'>
                        수정
                    </Link>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            </div>
        </>
    );
};

export default PostDetailPage;

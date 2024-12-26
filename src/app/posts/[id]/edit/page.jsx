'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';

const EditPage = ({ params }) => {
    const resolvedParams = use(params);
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // 게시글 불러오기
        axios
            .get(`/api/posts/${resolvedParams.id}`)
            .then((res) => {
                // res = {data : {title: '제목, content: '내용'}}
                setTitle(res.data.title);
                setContent(res.data.content);
            })
            .catch((err) => {
                console.error(err);
                router.push('/posts');
            });
    }, [resolvedParams.id, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api/posts/${resolvedParams.id}`, { title, content });

            if (res.status === 201) {
                alert('글수정 완료');
                router.push('/posts');
            } else {
                alert('글수정 실패');
            }
        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다.');
        }
    };

    const handleCancel = () => {
        router.back(); // 이전 페이지로 이동
    };
    return (
        <>
            <div className='cotainer mx-auto px-5'>
                <h2 className='sr-only'>포스트 글쓰기</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 h-screen'>
                    {/* 제목 */}
                    <div>
                        <label htmlFor='tit' className='sr-only'>
                            제목
                        </label>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            name='tit'
                            id='tit'
                            placeholder='제목을 입력하세요'
                            className='text-5xl font-black py-3 border-b-4 border-gray-400 w-full'
                        />
                    </div>

                    {/* 본문 */}
                    <div className='flex-1'>
                        <label htmlFor='cont' className='sr-only'>
                            내용
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            name='cont'
                            id='cont'
                            placeholder='당신의 이야기를 적어보세요'
                            className='w-full h-full text-2xl'
                        ></textarea>
                    </div>

                    {/* 확인, 취소 */}
                    <div className='flex items-center justify-between border-t-4'>
                        <button onSubmit={handleCancel} type='button' className='font-bold bg-red-400 p-5 rounded'>
                            취소
                        </button>
                        <button type='submit' className='font-bold p-5 rounded hover:bg-green-400'>
                            등록
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditPage;

import { posts } from '@/data/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: '게시글을 불러오는데 실패했습니다' }, { status: 500 });
    }
}

// 새 글 쓰기 -- POST 요청처리
export async function POST(req) {
    try {
        // data = { title: '제목', content: '내용' }
        const data = await req.json();

        // 제목이나 내용이 없는 경우
        if (!data.title || !data.content) {
            return NextResponse.json({ error: '제목과 내용을 입력해주세요' }, { status: 400 });
        }

        // newPost 객체 생성
        const newPost = {
            id: posts.length + 1,
            title: data.title,
            content: data.content,
            createdAt: new Date().toLocaleDateString(),
        };

        // 서버의 데이터 베이스(posts.js)에 데이터 추가
        posts.push(newPost);

        // 클라이언트에게 JSON 응답을 반환
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: '게시글을 추가하는데 실패했습니다' }, { status: 500 });
    }
}

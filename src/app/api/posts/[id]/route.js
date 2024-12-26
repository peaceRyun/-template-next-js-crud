import { posts } from '@/data/posts';
import { NextResponse } from 'next/server';

// 특정 게시글 조회 - GET
export async function GET(req, { params }) {
    // params = { id: '1' }

    try {
        // id에 해당하는 게시글 찾기
        const post = posts.find((post) => post.id === parseInt(params.id));

        if (!post) {
            return NextResponse.json({ error: '게시글이 없습니다', status: 404 }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: '게시글 실패' }, { status: 500 });
    }
}

// 특정 게시글 수정 - PUT
export async function PUT(req, { params }) {
    // params = { id: '1' }

    try {
        const data = await req.json();
        // data = { title: '수정된 제목', content: '수정된 내용' }

        // id에 해당하는 게시글 찾기
        const index = posts.findIndex((post) => post.id === parseInt(params.id));

        //게시글이 없을 경우 404 응답
        if (index === -1) {
            return NextResponse.json({ message: '게시글을 찾을 수 없습니다' }, { status: 404 });
        }

        // 게시글 업데이트
        posts[index] = {
            ...posts[index],
            title: data.title || posts[index].title,
            content: data.content || posts[index].content,
        };

        return NextResponse.json(posts[index], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: '게시글 수정 실패' }, { status: 500 });
    }
}

// 게시글 삭제 - DELETE 요청 처리
export async function DELETE(req, { params }) {
    try {
        // id에 해당하는 게시글의 index 값 찾기
        const index = posts.findIndex((post) => post.id === parseInt(params.id));

        //게시글이 없을 경우 404 응답
        if (index === -1) {
            return NextResponse.json({ message: '게시글을 찾을 수 없습니다' }, { status: 404 });
        }

        // 서버의 데이터베이스(posts) 글 삭제
        posts.splice(index, 1);

        // 클라이언트 응답
        return NextResponse.json({ message: '게시글이 삭제되었습니다.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: '게시글 삭제 실패' }, { status: 500 });
    }
}

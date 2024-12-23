import { posts } from '@/data/posts';
import { NextResponse } from 'next/server';

// 특정 게시글 조회 - GET
export async function GET(req, { params }) {
    // params = { id: '1' }

    try {
        // id에 해당하는 게시글 찾기
        const post = posts.find((post) => post.id === parseInt(params.id));
    } catch (error) {
        return NextResponse.json({ error: '게시글 실패' }, { status: 500 });
    }
}

import Post from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
    try {
        // 몽고 연결
        await connectDB();
        // 포스트 모델을 이용해 전체 글 조회
        const posts = await Post.find().sort({ createdAt: -1 });

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: '게시글을 불러오는데 실패했습니다' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();

        if (!data.title || !data.content) {
            return NextResponse.json({ error: '제목과 내용을 입력해주세요' }, { status: 400 });
        }

        const newPost = await Post.create(data);

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: '게시글을 추가하는데 실패했습니다' }, { status: 500 });
    }
}

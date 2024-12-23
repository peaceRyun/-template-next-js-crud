import { NextResponse } from 'next/server';

export const helloPosts = [
    { id: 1, title: '안녕하세요' },
    { id: 2, title: 'hello' },
];

// 서버 생성
export async function GET() {
    //클라이언트에게 JSON 응답을 반환
    // return NextResponse.json({ message: 'Hello, World!' });
    return NextResponse.json(helloPosts);
}

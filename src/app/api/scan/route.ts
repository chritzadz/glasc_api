import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: 'Scan API endpoint' });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        return NextResponse.json({ message: 'Scan POST endpoint', data: body });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}

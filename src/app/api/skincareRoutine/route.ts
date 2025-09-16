import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/user';
import pool from '@/app/db/db';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { user_id, morning_routine, evening_routine } = body;
    try {
        await pool.query(
            'INSERT INTO personal_skincare_routine (user_id, morning_routine, evening_routine) VALUES ($1, $2, $3) RETURNING *;',
            [user_id, morning_routine, evening_routine]
        );

        return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create skincare routine', details: (error as Error).message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
        return NextResponse.json(
            { error: 'Missing user_id query parameter' },
            { status: 400 }
        );
    }

    try {
        const task = await pool.query(
            `SELECT * FROM personal_skincare_routine WHERE user_id = $1`,
            [user_id]
        );
        return NextResponse.json({ task }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed fetching skincare routine', details: (error as Error).message },
            { status: 500 }
        );
    }
}

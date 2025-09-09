import pool from '@/app/db/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const userId = context.params.id;
    try {
        const task = await pool.query(
            `SELECT * FROM personal_details WHERE user_id = $1`,
            [userId]
        );
        return NextResponse.json({ task }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed fetching personal details', details: (error as Error).message },
            { status: 500 }
        );
    }
}
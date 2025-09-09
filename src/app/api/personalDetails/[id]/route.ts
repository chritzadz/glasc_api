import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/db/db';


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const userId = params.id;
    try {
        const task = await pool.query(
            `SELECT * FROM personal_details WHERE user_id = $1`,
            [userId]
        );

        return NextResponse.json({task, status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed posting personal details', details: (error as Error).message }, { status: 500 });
    }
}
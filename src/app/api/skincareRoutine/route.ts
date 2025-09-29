import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/db/db';
import { RoutineSkincareProduct } from '@/types/routine_skincare_product';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { user_id, product_id, type } = body;
    try {
        await pool.query(
            'INSERT INTO personal_skincare_routine (user_id, product_id, type) VALUES ($1, $2, $3);',
            [user_id, product_id, type]
        );

        return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create skincare routine', details: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const body = await request.json();
    const { user_id, product_id, type } = body;
    try {
        await pool.query(
            'DELETE FROM personal_skincare_routine WHERE user_id = $1 AND product_id = $2 AND type = $3;',
            [user_id, product_id, type]
        );

        return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete skincare routine', details: (error as Error).message }, { status: 500 });
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
            `SELECT psr.user_id, psr.product_id, psr.type, p.name FROM personal_skincare_routine psr
            INNER JOIN products p ON psr.product_id = p.id
            WHERE user_id = $1`,
            [user_id]
        );

        const routineProducts: RoutineSkincareProduct[] = task.rows;

        return NextResponse.json( routineProducts , { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed fetching skincare routine', details: (error as Error).message },
            { status: 500 }
        );
    }
}
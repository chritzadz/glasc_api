import pool from "@/app/db/db";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, email, password } = body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;',
            [name, email, password]
        );

        const newUser: User = result.rows[0];
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user', details: (error as Error).message }, { status: 500 });
    }
}
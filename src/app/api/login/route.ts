import pool from "@/app/db/db";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    let { email, password } = body;

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    email = email.trim();
    password = password.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user: User = result.rows[0];

        if (user.password !== password) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Remove password from the response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed', details: (error as Error).message }, { status: 500 });
    }
}
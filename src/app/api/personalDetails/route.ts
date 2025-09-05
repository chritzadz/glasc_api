import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/user';
import { SkinConcerns  } from '@/types/skinConcerns';
import pool from '@/app/db/db';
import { SkinGoals } from '@/types/SkinGoals';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { user_id, birth_date, gender, skin_type, allergies, exercise_frequency, sleep_duration, climate, sun_exposure } = body;
    const { skin_concerns }: { skin_concerns: SkinConcerns } = body;
    const { skin_goals }: {skin_goals: SkinGoals} = body;

    try {
        const result = await pool.query(
            'INSERT INTO personal_details VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *',
            [user_id, birth_date, gender, skin_type, skin_concerns.acne, skin_concerns.wrinkles, skin_concerns.sensitivity,
                skin_concerns.dryness, skin_concerns.dark_spots, allergies, exercise_frequency, sleep_duration, climate, sun_exposure,
                skin_goals.clear_skin, skin_goals.even_skin_tone, skin_goals.hydration, skin_goals.anti_aging, skin_goals.firmness,
                skin_goals.radiance, skin_goals.minimized_pores, skin_goals.sun_protection, skin_goals.soothing_sensitivity
            ]
        );

        return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed posting personal details', details: (error as Error).message }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from 'next/server';
import { SkinConcerns  } from '@/types/skinConcerns';
import pool from '@/app/db/db';
import { SkinGoals } from '@/types/SkinGoals';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { user_id, birth_date, gender, skin_type, allergies, exercise_frequency, sleep_duration, climate, sun_exposure } = body;
    const { skin_concerns }: { skin_concerns: SkinConcerns } = body;
    const { skin_goals }: {skin_goals: SkinGoals} = body;

    try {
        await pool.query(
            `INSERT INTO personal_details (user_id, birth_date, gender, skin_type, acne, wrinkles, sensitivity, dryness, dark_spots, allergies, exercise_frequency, sleep_duration, climate, sun_exposure, clear_skin, even_skin_tone, hydration,
            anti_aging, firmness, radiance, minimized_pores, sun_protection, soothing_sensitivity)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *`,
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

export async function PATCH(request: NextRequest) {
    const body = await request.json();
    const { user_id, birth_date, gender, skin_type, allergies, exercise_frequency, sleep_duration, climate, sun_exposure } = body;
    const { skin_concerns }: { skin_concerns: SkinConcerns } = body;
    const { skin_goals }: {skin_goals: SkinGoals} = body;

    try {
        await pool.query(
            `UPDATE personal_details SET
                birth_date = $2,
                gender = $3,
                skin_type = $4,
                acne = $5,
                wrinkles = $6,
                sensitivity = $7,
                dryness = $8,
                dark_spots = $9,
                allergies = $10,
                exercise_frequency = $11,
                sleep_duration = $12,
                climate = $13,
                sun_exposure = $14,
                clear_skin = $15,
                even_skin_tone = $16,
                hydration = $17,
                anti_aging = $18,
                firmness = $19,
                radiance = $20,
                minimized_pores = $21,
                sun_protection = $22,
                soothing_sensitivity = $23
            WHERE user_id = $1
            RETURNING *`,
            [
                user_id, birth_date, gender, skin_type, skin_concerns.acne, skin_concerns.wrinkles, skin_concerns.sensitivity,
                skin_concerns.dryness, skin_concerns.dark_spots, allergies, exercise_frequency, sleep_duration, climate, sun_exposure,
                skin_goals.clear_skin, skin_goals.even_skin_tone, skin_goals.hydration, skin_goals.anti_aging, skin_goals.firmness,
                skin_goals.radiance, skin_goals.minimized_pores, skin_goals.sun_protection, skin_goals.soothing_sensitivity
            ]
        );

        return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed patching personal details', details: (error as Error).message }, { status: 500 });
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
            `SELECT * FROM personal_details WHERE user_id = $1`,
            [user_id]
        );
        return NextResponse.json({ task }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed fetching personal details', details: (error as Error).message },
            { status: 500 }
        );
    }
}
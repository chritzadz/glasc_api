import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/db/db';
import { PersonalDetails } from '@/types/personalDetails';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { user_id, birth_date, gender, skin_type, acne, wrinkles, sensitivity, dryness, dark_spots, allergies, exercise_frequency, sleep_duration, climate, sun_exposure, clear_skin, even_skin_tone, hydration, anti_aging, firmness, radiance, minimized_pores, sun_protection, soothing_sensitivity } = body;
    try {
        const result = await pool.query(
            'INSERT INTO users (user_id, birth_date, gender, skin_type, acne, wrinkles, sensitivity, dryness, dark_spots, allergies, exercise_frequency, sleep_duration, climate, sun_exposure, clear_skin, even_skin_tone, hydration, anti_aging, firmness, radiance, minimized_pores, sun_protection, soothing_sensitivity) VALUES ($1, $2, $3) RETURNING *',
            [user_id, birth_date, gender, skin_type, acne, wrinkles, sensitivity, dryness, dark_spots, allergies, exercise_frequency, sleep_duration, climate, sun_exposure, clear_skin, even_skin_tone, hydration, anti_aging, firmness, radiance, minimized_pores, sun_protection, soothing_sensitivity]
        );

        const newPersonalDetails: PersonalDetails = result.rows[0];
        return NextResponse.json(newPersonalDetails, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to create personal details for user [${user_id}]`, details: (error as Error).message }, { status: 500 });
    }
}
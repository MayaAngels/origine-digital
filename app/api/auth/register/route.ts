// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

const users: any[] = [];

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();
        
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
        }
        
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
            orders: []
        };
        
        users.push(newUser);
        const token = Buffer.from(`${newUser.id}:${newUser.email}`).toString('base64');
        
        return NextResponse.json({
            success: true,
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
    }
}
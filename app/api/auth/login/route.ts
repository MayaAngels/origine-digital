// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

const users: any[] = [];

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }
        
        const token = Buffer.from(`${user.id}:${user.email}`).toString('base64');
        
        return NextResponse.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
    }
}

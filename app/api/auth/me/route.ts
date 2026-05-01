// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';

const users: any[] = [];

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }
        
        const token = authHeader.substring(7);
        const decoded = Buffer.from(token, 'base64').toString();
        const [userId, userEmail] = decoded.split(':');
        
        const user = users.find(u => u.id === userId && u.email === userEmail);
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 401 });
        }
        
        return NextResponse.json({
            success: true,
            user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
            orders: user.orders || []
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
    }
}

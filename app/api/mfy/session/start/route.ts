// app/api/mfy/session/start/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { initialPrompt, context } = body;
    
    // Criar sessão no banco
    const { data: session, error: sessionError } = await supabase
      .from('mfy_sessions')
      .insert({
        user_id: user.id,
        intent: { initialPrompt, context },
        status: 'started'
      })
      .select()
      .single();
    
    if (sessionError) throw sessionError;
    
    return NextResponse.json({
      session_id: session.id,
      next_question: "Olá! Me conte qual problema você gostaria que eu resolvesse para você?",
      status: 'started'
    });
    
  } catch (error) {
    console.error('[MFY Session] Erro:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}


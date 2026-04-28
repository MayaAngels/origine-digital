// app/api/mfy/artifacts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { data: artifacts } = await supabase
      .from('mfy_artifacts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    return NextResponse.json({ artifacts: artifacts || [] });
    
  } catch (error) {
    return NextResponse.json({ artifacts: [] }, { status: 200 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const { searchParams } = new URL(request.url);
    const artifactId = searchParams.get('id');
    
    if (!artifactId) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
    }
    
    await supabase
      .from('mfy_artifacts')
      .delete()
      .eq('id', artifactId)
      .eq('user_id', user.id);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}


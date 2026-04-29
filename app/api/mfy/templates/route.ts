// app/api/mfy/templates/route.ts
import { NextRequest, NextResponse } from 'next/server';
const createRouteHandlerClient = () => ({ auth: { getUser: async () => ({ data: { user: null } }) } });
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: templates } = await supabase
      .from('mfy_templates')
      .select('*')
      .eq('is_public', true)
      .order('usage_count', { ascending: false })
      .limit(20);
    
    return NextResponse.json({ templates: templates || [] });
    
  } catch (error) {
    return NextResponse.json({ templates: [] }, { status: 200 });
  }
}


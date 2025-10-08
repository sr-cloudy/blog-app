import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // params is a Promise

  // context: { params: { id: string } },
) {
  // const { id } = context.params;
  const params = await context.params; // Await the params
  const { id } = params;
  const supabase = await createClient();
  const { title, content } = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('blogs')
    .update({ title, content })
    .eq('id', id)
    .eq('author_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  // context: { params: { id: string } },
  context: { params: Promise<{ id: string }> }, // params is a Promise
) {
  // const { id } = context.params;
  const params = await context.params; // Await the params
  const { id } = params;
  // const { id } = context.params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id)
    .eq('author_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

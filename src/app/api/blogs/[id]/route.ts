import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// Define a generic type for the route parameters
// This is the simplest way to satisfy the type checker
// when it complains about a mismatch in `context` structure.
type RouteContext<T> = {
  params: T;
};

export async function PUT(
  req: NextRequest,
  context: RouteContext<{ id: string }>,
) {
  const { id } = context.params;
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

// ----------------------------------------------------------------

export async function DELETE(
  req: NextRequest,
  context: RouteContext<{ id: string }>,
) {
  const { id } = context.params;
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

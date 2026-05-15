import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath('/products/[id]', 'page');
  return NextResponse.json({ revalidated: true });
}

import { NextRequest, NextResponse } from 'next/server';
import { getModules, createModule, verifyToken, canUploadModule } from '@/lib/mock-data/api-handlers';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filters = {
      tag: searchParams.get('tag') || undefined,
      status: searchParams.get('status') || undefined,
      access_level: searchParams.get('access_level') || undefined,
      search: searchParams.get('search') || undefined
    };

    const modules = getModules(filters);

    return NextResponse.json({
      data: modules,
      message: 'Modules retrieved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!canUploadModule(user)) {
      return NextResponse.json(
        { error: 'Insufficient permissions to create modules' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const newModule = createModule({
      ...body,
      author_id: user.id,
      version: 1
    });

    return NextResponse.json({
      data: newModule,
      message: 'Module created successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getSessions, createSession, verifyToken } from '@/lib/mock-data/api-handlers';

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
      program_id: searchParams.get('program_id') || undefined,
      upcoming: searchParams.get('upcoming') === 'true'
    };

    const sessions = getSessions(filters);

    return NextResponse.json({
      data: sessions,
      message: 'Sessions retrieved successfully'
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

    if (!['admin', 'superadmin', 'facilitator', 'coach'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions to create sessions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const newSession = createSession(body);

    return NextResponse.json({
      data: newSession,
      message: 'Session created successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

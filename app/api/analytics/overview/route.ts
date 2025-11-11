import { NextRequest, NextResponse } from 'next/server';
import { getDashboardStats, verifyToken } from '@/lib/mock-data/api-handlers';

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

    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Only admins can view analytics' },
        { status: 403 }
      );
    }

    const stats = getDashboardStats();

    return NextResponse.json({
      data: stats,
      message: 'Analytics retrieved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

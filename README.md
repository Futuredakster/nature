# Resilience Platform - Admin Prototype

A comprehensive web-based admin prototype for an emotional resilience coaching platform designed for backcountry adventurers, search and rescue teams, and wilderness professionals.

## 🏔️ Overview

This prototype visualizes administrative workflows for a trauma-informed, nature-based coaching platform that provides:

- **1-on-1 Coaching**: Personalized resilience coaching for individuals
- **Team Workshops**: Group sessions for SAR teams and wilderness response organizations
- **Facilitator Certification**: Comprehensive training program for aspiring facilitators

The prototype emphasizes a **password-protected Modules section** with role-based access control (RBAC) and features realistic UI with mock data and clearly defined interactions.

## ✨ Key Features

### Public Site
- Landing page with three core service offerings
- Mission statement and value propositions
- Accessible navigation and footer

### Admin Portal (Password-Protected)
- **Dashboard**: Summary widgets showing platform metrics
- **Users Management**: View, filter, edit user roles with RBAC
- **Modules Library** (🔒 Password-Protected): Upload, manage, and filter resources with access control
- **Programs**: Manage coaching programs, workshops, and certification courses
- **Sessions**: Schedule and track coaching sessions and workshops
- **Analytics**: Mock metrics and charts for engagement tracking
- **Community**: Placeholder for future forum/discussion features
- **Settings**: Platform configuration and branding

### Authentication & Security
- Mock JWT-based authentication
- Role-based access control (Super Admin, Admin, Facilitator, Coach, User)
- Password-protected module uploads (Admin/Facilitator only)
- Module access levels: Admin-only, Facilitators, Public

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Or start the production server**:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Test Credentials

The prototype uses mock authentication (any password works). Use these email addresses to test different roles:

| Role | Email | Access Level |
|------|-------|--------------|
| **Super Admin** | alex@example.com | Full access to everything |
| **Admin** | marcus@example.com | User management, modules, programs |
| **Facilitator** | ava@example.com | Upload modules, view facilitator resources |
| **Coach** | dana@example.com | View modules, manage 1-on-1 sessions |
| **User** | priya@example.com | View public modules only |

**Quick Login**: Go to [/login](http://localhost:3000/login) and use any of the above emails with any password.

## 📁 Project Structure

```
prototype/
├── app/
│   ├── admin/                    # Admin portal pages
│   │   ├── layout.tsx           # Admin layout with sidebar + auth
│   │   ├── page.tsx             # Dashboard with widgets
│   │   ├── users/               # User management
│   │   ├── modules/             # 🔒 Password-protected modules
│   │   ├── programs/            # Programs (Coaching, Workshops, Certification)
│   │   ├── sessions/            # Schedule sessions
│   │   ├── community/           # Community placeholder
│   │   ├── analytics/           # Mock analytics & charts
│   │   └── settings/            # Platform settings
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Badge.tsx
│   │   └── admin/
│   │       └── Sidebar.tsx      # Admin navigation sidebar
│   ├── login/                   # Login page
│   ├── page.tsx                 # Public landing page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles + earth tone palette
├── lib/
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts
│   ├── mock-data/
│   │   ├── seed.json           # Mock data (10 users, 6 modules, 3 programs, 5 sessions)
│   │   └── api-handlers.ts     # Mock API logic
│   └── auth.ts                  # Client-side auth utilities
├── public/
│   └── resources/               # Static mock files (PDFs, audio, etc.)
└── README.md                    # This file
```

## 🎨 Design System

### Color Palette (Earth Tones)

```css
--forest-green: #21543c    /* Primary */
--moss-green: #5a7a5f      /* Success */
--warm-sand: #d4c5a9       /* Border */
--muted-blue: #6a8caf      /* Secondary */
--deep-earth: #3d2f20      /* Foreground */
--light-sage: #e8efe8      /* Sidebar background */
--burnt-orange: #c67b5c    /* Accent */
```

### Typography
- **Font**: Geist Sans (primary), Geist Mono (code)
- **Base line-height**: 1.6 for readability

### Spacing
- Generous padding to evoke calm and readability
- Card-based layout with subtle shadows

## 🔐 Roles & Permissions

### Permission Matrix

| Feature | User | Coach | Facilitator | Admin | Super Admin |
|---------|------|-------|-------------|-------|-------------|
| View public modules | ✅ | ✅ | ✅ | ✅ | ✅ |
| View facilitator modules | ❌ | ✅ | ✅ | ✅ | ✅ |
| Upload modules | ❌ | ❌ | ✅ | ✅ | ✅ |
| Publish modules | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage users | ❌ | ❌ | ❌ | ✅ | ✅ |
| Edit user roles | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage programs | ❌ | ❌ | ❌ | ✅ | ✅ |
| View analytics | ❌ | ❌ | ❌ | ✅ | ✅ |
| System settings | ❌ | ❌ | ❌ | ❌ | ✅ |

## 🗄️ Data Model

### Core Collections

#### Users
```typescript
{
  id: string;
  name: string;
  email: string;
  role: 'user' | 'coach' | 'facilitator' | 'admin' | 'superadmin';
  status: 'active' | 'inactive' | 'invited';
  profile: {
    bio?: string;
    phone?: string;
    certifications?: string[];
  };
  tags: string[];
  created_at: string;
  last_active_at: string;
}
```

#### Modules (🔒 Password-Protected)
```typescript
{
  id: string;
  title: string;
  slug: string;
  description: string;
  files: ModuleFile[];
  tags: ('1-on-1' | 'team' | 'facilitator')[];
  access_level: 'admin' | 'facilitators' | 'public';
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  version: number;
  created_at: string;
  updated_at: string;
}
```

#### Programs
```typescript
{
  id: string;
  title: string;
  type: 'one_on_one' | 'workshop' | 'certification';
  description: string;
  modules: string[]; // module IDs
  facilitators: string[]; // user IDs
  enrollment_settings: {
    open: boolean;
    capacity?: number;
  };
  created_at: string;
}
```

#### Sessions
```typescript
{
  id: string;
  program_id: string;
  title: string;
  start_time: string;
  end_time: string;
  facilitator_id: string;
  location: string;
  capacity: number;
  attendees: string[]; // user IDs
  created_at: string;
}
```

## 🛠️ API Endpoints (Mock)

### Authentication
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users` - List users (with filters)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user (role, status)

### Modules
- `GET /api/modules` - List modules (filtered by access level)
- `GET /api/modules/:id` - Get module details
- `POST /api/modules` - Create module (Admin/Facilitator only)
- `PUT /api/modules/:id` - Update module
- `POST /api/modules/:id/publish` - Publish module (Admin only)

### Programs
- `GET /api/programs` - List programs
- `GET /api/programs/:id` - Get program details
- `POST /api/programs` - Create program (Admin only)
- `PUT /api/programs/:id` - Update program

### Sessions
- `GET /api/sessions` - List sessions (with filters)
- `POST /api/sessions` - Create session

### Analytics
- `GET /api/analytics/overview` - Dashboard stats

## ✅ Acceptance Criteria Checklist

### Core Requirements

- [x] **Admin can log in** with provided test credentials and reach Admin Dashboard
- [x] **Modules page loads** with seed modules and supports filtering by tag and access level
- [x] **Admin can open "Create Module" modal**, enter data, and see new module appended (mock)
- [x] **Program pages show linked modules** and assigned facilitators (seed data)
- [x] **Users page supports search**, role change, and bulk export (export mocked)
- [x] **Modules page has visible indication of password-protected access** (lock icon, access-level badges)
- [x] **All primary UI flows show success/error states** and are keyboard accessible
- [x] **Password-protected module section** with clear visual indicators and role enforcement

### Additional Checks

- [x] Public landing page displays three core offerings
- [x] Mock analytics show plausible numbers
- [x] Dashboard shows summary widgets (new signups, modules, coaches, sessions)
- [x] Role-based access control enforced in UI and API
- [x] Sidebar navigation with all admin sections
- [x] Earth tone color palette applied throughout
- [x] Keyboard accessibility (buttons, links, modals)
- [x] Responsive design (desktop and mobile-friendly)

## 🔮 Future Enhancements (Not Implemented)

- **Community Features**: Forum threads, discussions, moderation tools
- **File Upload**: Real file upload with storage (currently mocked)
- **PDF/Audio Preview**: Embedded viewers for resource files
- **Advanced Analytics**: Charts library (e.g., Chart.js, Recharts)
- **Real-time Updates**: WebSocket for live dashboard updates
- **Email Integration**: Actual email sending for invites/notifications
- **Search**: Full-text search across all resources
- **Audit Logs**: Track all admin actions with timestamps

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + Custom CSS variables
- **Authentication**: Mock JWT tokens (localStorage)
- **API**: Next.js API routes with in-memory data store
- **Fonts**: Geist Sans & Geist Mono (optimized)

## 📝 Notes for Production

### Security Considerations

1. **Authentication**: Replace mock auth with secure JWT implementation (e.g., NextAuth.js)
2. **Password Storage**: Use bcrypt or argon2 for password hashing
3. **File Uploads**: Implement virus scanning and PII detection
4. **Access Control**: Enforce server-side permissions for all API routes
5. **HTTPS**: Always use HTTPS in production
6. **GDPR Compliance**: Add privacy policy and data management tools

### Performance Optimizations

1. **Database**: Replace in-memory store with PostgreSQL/MongoDB
2. **File Storage**: Use S3 or similar for uploaded resources
3. **Caching**: Implement Redis for frequently accessed data
4. **Search**: Add Elasticsearch for full-text search
5. **CDN**: Serve static assets via CDN

## 🙋 Usage Tips

### Quick Navigation

- **Home**: [http://localhost:3000](http://localhost:3000)
- **Login**: [http://localhost:3000/login](http://localhost:3000/login)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Modules (Password-Protected)**: [http://localhost:3000/admin/modules](http://localhost:3000/admin/modules)

### Testing Different Roles

1. Log out (click "Logout" in sidebar)
2. Log in with different test email (see Test Credentials above)
3. Notice different access levels to modules and features

### Mock Data Reset

The prototype uses in-memory data storage. To reset all changes:

```bash
# Restart the development server
npm run dev
```

## 📄 License

This is a prototype for demonstration purposes.

## 🤝 Contact

For questions about this prototype, contact the project team.

---

**Built with Next.js 16 + TypeScript** | **Prototype Version 1.0**

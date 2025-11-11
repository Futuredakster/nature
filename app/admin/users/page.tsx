'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Table, TableColumn } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { fetchWithAuth } from '@/lib/auth';
import type { User, UserRole, UserStatus } from '@/lib/types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRole, setEditRole] = useState<UserRole>('user');
  const [editStatus, setEditStatus] = useState<UserStatus>('active');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, roleFilter, statusFilter]);

  async function fetchUsers() {
    try {
      const response = await fetchWithAuth('/api/users');
      const data = await response.json();
      setUsers(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setIsLoading(false);
    }
  }

  function filterUsers() {
    let filtered = [...users];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((u) => u.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }

  function handleRowClick(user: User) {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditStatus(user.status);
    setIsModalOpen(true);
  }

  async function handleSaveUser() {
    if (!selectedUser) return;

    try {
      const response = await fetchWithAuth(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          role: editRole,
          status: editStatus
        })
      });

      if (response.ok) {
        // Update local state
        setUsers(users.map(u =>
          u.id === selectedUser.id
            ? { ...u, role: editRole, status: editStatus }
            : u
        ));
        setIsModalOpen(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  }

  function handleResendInvite(user: User) {
    alert(`Invitation email would be resent to ${user.email} (Mock functionality)`);
  }

  function handleExportUsers() {
    const csv = [
      ['Name', 'Email', 'Role', 'Status', 'Joined', 'Last Active'].join(','),
      ...filteredUsers.map(u =>
        [u.name, u.email, u.role, u.status, u.created_at, u.last_active_at].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (user) => (
        <div>
          <div className="font-medium text-[var(--foreground)]">{user.name}</div>
          <div className="text-xs text-[var(--foreground)] opacity-60">{user.email}</div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      render: (user) => (
        <Badge
          variant={
            user.role === 'superadmin' || user.role === 'admin' ? 'info' :
            user.role === 'facilitator' || user.role === 'coach' ? 'success' : 'info'
          }
        >
          {user.role}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (user) => (
        <Badge
          variant={
            user.status === 'active' ? 'success' :
            user.status === 'invited' ? 'warning' : 'error'
          }
        >
          {user.status}
        </Badge>
      )
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (user) => (
        <div className="flex flex-wrap gap-1">
          {user.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-[var(--sidebar-bg)] text-[var(--foreground)]"
            >
              {tag}
            </span>
          ))}
          {user.tags.length > 2 && (
            <span className="text-xs text-[var(--foreground)] opacity-60">
              +{user.tags.length - 2}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'joined',
      header: 'Joined',
      render: (user) => (
        <span className="text-sm text-[var(--foreground)]">
          {new Date(user.created_at).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'last_active',
      header: 'Last Active',
      render: (user) => (
        <span className="text-sm text-[var(--foreground)]">
          {new Date(user.last_active_at).toLocaleDateString()}
        </span>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-20">
          <div className="loading-spinner" style={{ width: '40px', height: '40px' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">User Management</h1>
        <p className="text-sm md:text-base text-[var(--foreground)] opacity-60">
          Manage users, roles, and permissions
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-[var(--border)] rounded-lg px-3 py-2"
          >
            <option value="all">All Roles</option>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="facilitator">Facilitator</option>
            <option value="coach">Coach</option>
            <option value="user">User</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[var(--border)] rounded-lg px-3 py-2"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="invited">Invited</option>
          </select>

          <Button variant="outline" onClick={handleExportUsers}>
            📥 Export CSV
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">{users.length}</p>
          <p className="text-sm text-[var(--foreground)] opacity-60">Total Users</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            {users.filter(u => u.status === 'active').length}
          </p>
          <p className="text-sm text-[var(--foreground)] opacity-60">Active</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            {users.filter(u => u.role === 'facilitator' || u.role === 'coach').length}
          </p>
          <p className="text-sm text-[var(--foreground)] opacity-60">Coaches</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            {users.filter(u => u.status === 'invited').length}
          </p>
          <p className="text-sm text-[var(--foreground)] opacity-60">Pending</p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          data={filteredUsers}
          onRowClick={handleRowClick}
          emptyMessage="No users found matching your filters"
        />
      </Card>

      {/* User Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        title={selectedUser?.name || 'User Details'}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="min-w-[120px]">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveUser} className="min-w-[120px]">
              Save Changes
            </Button>
          </>
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">Email</p>
              <p className="text-sm text-[var(--foreground)] opacity-70">{selectedUser.email}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--foreground)] mb-1">Bio</p>
              <p className="text-sm text-[var(--foreground)] opacity-70">
                {selectedUser.profile.bio || 'No bio provided'}
              </p>
            </div>

            {selectedUser.profile.certifications && selectedUser.profile.certifications.length > 0 && (
              <div>
                <p className="text-sm font-medium text-[var(--foreground)] mb-2">Certifications</p>
                <div className="space-y-1">
                  {selectedUser.profile.certifications.map((cert, i) => (
                    <p key={i} className="text-sm text-[var(--foreground)] opacity-70">
                      • {cert}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-[var(--foreground)] block mb-2">
                Role
              </label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value as UserRole)}
                className="w-full"
              >
                <option value="user">User</option>
                <option value="coach">Coach</option>
                <option value="facilitator">Facilitator</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--foreground)] block mb-2">
                Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as UserStatus)}
                className="w-full"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="invited">Invited</option>
              </select>
            </div>

            {selectedUser.status === 'invited' && (
              <Button
                variant="outline"
                onClick={() => handleResendInvite(selectedUser)}
                className="w-full"
              >
                📧 Resend Invitation
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

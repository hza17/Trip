import React, { useState, useEffect } from 'react';
import { SupplierAuth } from './SupplierAuth';
import { WorkspaceHub } from './WorkspaceHub';
import { AddBusinessWizard } from './AddBusinessWizard';
import { BusinessDashboard } from './BusinessDashboard';
import { UserProfilePanel } from './UserProfilePanel';
import { Business, TeamMember, ModuleType } from './types';
import { initialBusinesses, initialTeamMembers } from './mockData';
import { WorkspaceTour } from './WorkspaceTour';

export function BusinessWorkspace({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<'auth' | 'hub' | 'add_business' | 'dashboard' | 'profile'>('auth');
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const saved = localStorage.getItem('paradise_businesses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return Array.from(new Map(parsed.map(b => [b.id, b])).values());
        }
      } catch (e) {
        // ignore
      }
    }
    return initialBusinesses;
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [activeBusinessId, setActiveBusinessId] = useState<string | null>(null);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);

  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('paradise_businesses');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setBusinesses(Array.from(new Map(parsed.map(b => [b.id, b])).values()));
          }
        } catch (e) {
          // ignore
        }
      }
    };
    window.addEventListener('businesses_updated', handleSync);
    return () => window.removeEventListener('businesses_updated', handleSync);
  }, []);

  const handleUpdateBusinesses = (updated: Business[]) => {
    const unique = Array.from(new Map(updated.map(b => [b.id, b])).values());
    setBusinesses(unique);
    localStorage.setItem('paradise_businesses', JSON.stringify(unique));
    window.dispatchEvent(new Event('businesses_updated'));
  };

  const handleLogin = (business: Business) => {
    setBusinesses(prev => {
      const exists = prev.some(b => b.id === business.id);
      const next = exists ? prev : [...prev, business];
      const unique = Array.from(new Map(next.map(b => [b.id, b])).values());
      localStorage.setItem('paradise_businesses', JSON.stringify(unique));
      window.dispatchEvent(new Event('businesses_updated'));
      return unique;
    });
    setActiveBusinessId(business.id);
    setView('hub');
  };

  const handleNavigateToDashboard = (businessId: string) => {
    setActiveBusinessId(businessId);
    setView('dashboard');
  };

  const handleOpenAddBusiness = (b?: Business) => {
    setEditingBusiness(b || null);
    setView('add_business');
  };

  const handleAddBusiness = (newBusiness: Business) => {
    setBusinesses(prev => {
      const exists = prev.some(b => b.id === newBusiness.id);
      const next = exists 
        ? prev.map(b => b.id === newBusiness.id ? newBusiness : b)
        : [...prev, newBusiness];
      const unique = Array.from(new Map(next.map(b => [b.id, b])).values());
      localStorage.setItem('paradise_businesses', JSON.stringify(unique));
      window.dispatchEvent(new Event('businesses_updated'));
      return unique;
    });
    setActiveBusinessId(newBusiness.id);
    setView('hub');
  };

  const activeBusiness = businesses.find(b => b.id === activeBusinessId);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50/50 dark:bg-[#070913] overflow-hidden" dir="rtl">
      {view === 'auth' && (
        <SupplierAuth onLogin={handleLogin} existingBusinesses={businesses} onBack={onClose} />
      )}
      
      {view === 'hub' && (
        <WorkspaceHub 
          businesses={businesses} 
          teamMembers={teamMembers}
          onClose={onClose}
          onAddBusiness={handleOpenAddBusiness}
          onManageBusiness={handleNavigateToDashboard}
          onUpdateBusinesses={handleUpdateBusinesses}
          onOpenProfile={() => setView('profile')}
        />
      )}

      {view === 'add_business' && (
        <AddBusinessWizard 
          businesses={businesses}
          initialBusiness={editingBusiness}
          onCancel={() => setView('hub')}
          onComplete={handleAddBusiness}
        />
      )}

      {view === 'profile' && (
        <UserProfilePanel 
          ownerName={businesses.find(b => b.ownerName)?.ownerName || 'امیر رضایی'}
          mobile={businesses.find(b => b.mobile)?.mobile || '09123456789'}
          businesses={businesses}
          teamMembers={teamMembers}
          onBack={() => setView('hub')}
          onUpdateOwnerName={(newName) => {
            handleUpdateBusinesses(businesses.map(b => ({ ...b, ownerName: newName })));
          }}
          onUpdateTeamMembers={(newMembers) => setTeamMembers(newMembers)}
          onNavigateToBusiness={handleNavigateToDashboard}
          onLogout={onClose}
        />
      )}

      {view === 'dashboard' && activeBusiness && (
        <BusinessDashboard 
          business={activeBusiness}
          allBusinesses={businesses}
          teamMembers={teamMembers}
          onBackToHub={() => setView('hub')}
          onSwitchBusiness={handleNavigateToDashboard}
          onUpdateTeam={(newMembers) => setTeamMembers(newMembers)}
          onUpdateBusiness={(updatedBusiness) => {
            const next = businesses.map(b => b.id === updatedBusiness.id ? updatedBusiness : b);
            handleUpdateBusinesses(next);
          }}
        />
      )}
      <WorkspaceTour active={view === 'dashboard'} />
    </div>
  );
}

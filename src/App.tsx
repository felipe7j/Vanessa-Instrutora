import React, { useState } from 'react';
import { AppStoreProvider, useAppStore } from './services/store';
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { PublicHeader } from './components/public/PublicHeader';
import { HeroSection } from './components/public/HeroSection';
import { AboutStructureSection } from './components/public/AboutStructureSection';
import { PackagesSection } from './components/public/PackagesSection';
import { PhotoGallerySection } from './components/public/PhotoGallerySection';
import { StepByStepSection } from './components/public/StepByStepSection';
import { FAQSection } from './components/public/FAQSection';
import { InterestFormSection } from './components/public/InterestFormSection';
import { PublicFooter } from './components/public/PublicFooter';
import { LegalModal } from './components/public/LegalModals';
import { StudentPortal } from './components/student/StudentPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { PacotePratico } from './types';

function MainApp() {
  const { role, setRole } = useAppStore();
  const [selectedPackage, setSelectedPackage] = useState<PacotePratico | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [authModalRole, setAuthModalRole] = useState<'admin' | 'aluno' | null>(null);

  const handleSelectPackage = (pkg: PacotePratico) => {
    setSelectedPackage(pkg);
    const formElement = document.getElementById('contato');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInterestForm = () => {
    const formElement = document.getElementById('contato');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Demo Bar */}
      <RoleSwitcher />

      {/* View routing based on active role */}
      {role === 'public' && (
        <>
          <PublicHeader
            onOpenInterestModal={scrollToInterestForm}
            onOpenAuthModal={(targetRole) => setAuthModalRole(targetRole)}
          />
          <HeroSection onOpenInterestForm={scrollToInterestForm} />
          <AboutStructureSection />
          <PackagesSection onSelectPackage={handleSelectPackage} />
          <PhotoGallerySection />
          <StepByStepSection />
          <FAQSection />
          <InterestFormSection
            selectedPackage={selectedPackage}
            onOpenPrivacyModal={() => setLegalModalType('privacy')}
          />
          <PublicFooter
            onOpenPrivacyModal={() => setLegalModalType('privacy')}
            onOpenTermsModal={() => setLegalModalType('terms')}
          />

          <LegalModal
            type={legalModalType}
            onClose={() => setLegalModalType(null)}
          />
        </>
      )}

      {role === 'aluno' && <StudentPortal />}

      {role === 'admin' && <AdminDashboard />}

      {/* Authentication Modal (FASE 3) */}
      {authModalRole && (
        <AuthModal
          initialRole={authModalRole}
          onClose={() => setAuthModalRole(null)}
          onSuccess={(authenticatedRole) => {
            setAuthModalRole(null);
            setRole(authenticatedRole);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppStoreProvider>
      <MainApp />
    </AppStoreProvider>
  );
}

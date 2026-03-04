import { useEffect, useState } from 'react';

interface RouteGuardProps {
  user: {
    has_completed_onboarding?: boolean;
  } | null;
  children: React.ReactNode;
  loginPath?: string;
  onboardingPath?: string;
  dashboardPath?: string;
}

const PUBLIC_PATHS = new Set(['/', '/login', '/landing', '/pricing']);

export function RouteGuard({
  user,
  children,
  loginPath = '/login',
  onboardingPath = '/onboarding',
  dashboardPath = '/dashboard',
}: RouteGuardProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!user) {
      if (!PUBLIC_PATHS.has(currentPath)) {
        window.location.href = loginPath;
        return;
      }
      setIsReady(true);
      return;
    }

    const hasCompletedOnboarding = user.has_completed_onboarding ?? false;
    const isOnboardingPage = currentPath === onboardingPath;

    if (!hasCompletedOnboarding && !isOnboardingPage) {
      window.location.href = onboardingPath;
      return;
    }

    if (hasCompletedOnboarding && isOnboardingPage) {
      window.location.href = dashboardPath;
      return;
    }

    setIsReady(true);
  }, [user, loginPath, onboardingPath, dashboardPath]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}

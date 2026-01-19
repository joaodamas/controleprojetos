import { useEffect } from 'react';
// O hook de roteamento pode variar (ex: 'next/router', 'react-router-dom')
// import { useRouter } from 'next/router'; 

// Mock do useRouter para o exemplo funcionar
const useRouter = () => ({
  pathname: window.location.pathname,
  push: (path: string) => {
    console.log(`Redirecting to ${path}`);
    // Em uma aplicação real, isso mudaria a URL
    // window.location.pathname = path;
  }
});

interface RouteGuardProps {
  user: {
    has_completed_onboarding?: boolean;
  } | null;
  children: React.ReactNode;
}

export function RouteGuard({ user, children }: RouteGuardProps) {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Se não completou o onboarding, trava ele na tela de configuração
      if (!user.has_completed_onboarding && router.pathname !== '/onboarding') {
        router.push('/onboarding');
      }
      
      // Se já completou, não deixa voltar pro onboarding
      if (user.has_completed_onboarding && router.pathname === '/onboarding') {
        router.push('/dashboard');
      }
    }
  }, [user, router.pathname]);

  return <>{children}</>;
}

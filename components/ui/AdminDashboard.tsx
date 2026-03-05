import React, { useEffect, useState } from 'react';
import { Users, UserCheck, UserX, Activity, TrendingUp, Clock, Shield, Sun, Moon, RefreshCw, AlertCircle } from 'lucide-react';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { useUser } from '../../hooks/useUser';
import { OnboardingModal, OnboardingPayload } from './OnboardingModal';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Buscar dados reais do Firebase
  const { data, loading, error, refetch } = useAdminDashboard();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const localCompleted = window.localStorage.getItem('jp_onboarding_completed') === 'true';
    if (!localCompleted && !user.has_completed_onboarding) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleOnboardingComplete = (payload: OnboardingPayload) => {
    window.localStorage.setItem('jp_onboarding_completed', 'true');
    setShowOnboarding(false);
    console.log('Onboarding payload:', payload);
  };

  // Usar dados reais ou fallback para dados vazios
  const kpiData = data ? {
    totalUsers: data.totalUsers,
    activeUsers: data.activeUsers,
    inactiveUsers: data.inactiveUsers,
    adminUsers: data.adminUsers,
    regularUsers: data.regularUsers,
    avgProjectsPerUser: data.avgProjectsPerUser,
    loginLast7Days: data.loginLast7Days,
    newUsersThisMonth: data.newUsersThisMonth,
    activityRate: data.activityRate
  } : {
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
    avgProjectsPerUser: 0,
    loginLast7Days: 0,
    newUsersThisMonth: 0,
    activityRate: 0
  };

  const userActivity = data?.userActivity || [];
  const activityTrend = data?.activityTrend || [];

  const theme = {
    dark: {
      bg: 'bg-[#0a0e1a]',
      text: 'text-white',
      textSecondary: 'text-gray-400',
      card: 'bg-gray-800/50 border-gray-700',
      cardHover: 'hover:bg-gray-800/30',
      tableHeader: 'bg-gray-900/50',
      border: 'border-gray-700',
      button: 'bg-gray-800 text-gray-400 hover:bg-gray-700',
      buttonActive: 'bg-cyan-500 text-white',
      progressBg: 'bg-gray-700'
    },
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      card: 'bg-white border-gray-200 shadow-sm',
      cardHover: 'hover:bg-gray-50',
      tableHeader: 'bg-gray-100',
      border: 'border-gray-200',
      button: 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200',
      buttonActive: 'bg-cyan-500 text-white border-cyan-500',
      progressBg: 'bg-gray-200'
    }
  };

  const t = isDarkMode ? theme.dark : theme.light;

  const KPICard = ({ title, value, subtitle, icon: Icon, trend, color = 'cyan' }: {
    title: string;
    value: number;
    subtitle?: string;
    icon: React.ComponentType<{ className?: string }>;
    trend?: number;
    color?: 'cyan' | 'green' | 'red' | 'purple' | 'orange';
  }) => {
    const colorClasses = {
      cyan: isDarkMode 
        ? 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30' 
        : 'from-cyan-50 to-white border-cyan-200',
      green: isDarkMode 
        ? 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30'
        : 'from-emerald-50 to-white border-emerald-200',
      red: isDarkMode 
        ? 'from-red-500/20 to-red-500/5 border-red-500/30'
        : 'from-red-50 to-white border-red-200',
      purple: isDarkMode 
        ? 'from-purple-500/20 to-purple-500/5 border-purple-500/30'
        : 'from-purple-50 to-white border-purple-200',
      orange: isDarkMode 
        ? 'from-orange-500/20 to-orange-500/5 border-orange-500/30'
        : 'from-orange-50 to-white border-orange-200',
    };

    const iconBg = {
      cyan: isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-100',
      green: isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100',
      red: isDarkMode ? 'bg-red-500/20' : 'bg-red-100',
      purple: isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100',
      orange: isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100',
    };

    const iconColor = {
      cyan: isDarkMode ? 'text-cyan-400' : 'text-cyan-600',
      green: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
      red: isDarkMode ? 'text-red-400' : 'text-red-600',
      purple: isDarkMode ? 'text-purple-400' : 'text-purple-600',
      orange: isDarkMode ? 'text-orange-400' : 'text-orange-600',
    };

    return (
      <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-6 backdrop-blur-sm`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${iconBg[color]}`}>
              <Icon className={`w-5 h-5 ${iconColor[color]}`} />
            </div>
            <div>
              <p className={`${t.textSecondary} text-sm font-medium`}>{title}</p>
            </div>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <TrendingUp className="w-4 h-4" />
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div>
          <div className={`text-3xl font-bold ${t.text} mb-1`}>{value}</div>
          {subtitle && <p className={`${t.textSecondary} text-sm`}>{subtitle}</p>}
        </div>
      </div>
    );
  };

  // Renderizar estado de carregamento
  if (loading) {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} p-6 transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="w-8 h-8 animate-spin text-cyan-500" />
            <p className={t.textSecondary}>Carregando dados do dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar estado de erro
  if (error) {
    return (
      <div className={`min-h-screen ${t.bg} ${t.text} p-6 transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <div className={`${t.card} border rounded-lg p-8 max-w-md`}>
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Erro ao carregar dados</h3>
            </div>
            <p className={`${t.textSecondary} mb-4`}>
              {error.message || 'Não foi possível carregar os dados do dashboard.'}
            </p>
            <button
              onClick={() => refetch()}
              className={`${t.buttonActive} px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2`}
            >
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} p-6 transition-colors duration-300`}>
      {showOnboarding && (
        <OnboardingModal
          isOpen={showOnboarding}
          isDarkMode={isDarkMode}
          onComplete={handleOnboardingComplete}
        />
      )}
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
            <p className={t.textSecondary}>Visão geral de usuários e atividades da plataforma</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className={`p-2 rounded-lg ${t.button} transition-colors flex items-center gap-2`}
              title="Atualizar dados"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {['24h', '7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range ? t.buttonActive : t.button
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${t.button} transition-colors`}
              title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total de Usuários"
          value={kpiData.totalUsers}
          subtitle="Cadastrados na plataforma"
          icon={Users}
          color="cyan"
          trend={15}
        />
        <KPICard
          title="Usuários Ativos"
          value={kpiData.activeUsers}
          subtitle={`${kpiData.activityRate.toFixed(1)}% da base`}
          icon={UserCheck}
          color="green"
          trend={8}
        />
        <KPICard
          title="Logins (7 dias)"
          value={kpiData.loginLast7Days}
          subtitle="Total de acessos"
          icon={Activity}
          color="purple"
          trend={12}
        />
        <KPICard
          title="Novos Usuários"
          value={kpiData.newUsersThisMonth}
          subtitle="Este mês"
          icon={TrendingUp}
          color="orange"
          trend={25}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`${t.card} border rounded-lg p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <Shield className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <h3 className="text-lg font-semibold">Distribuição por Perfil</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={t.textSecondary}>Administradores</span>
              <span className={`${t.text} font-semibold`}>{kpiData.adminUsers}</span>
            </div>
            <div className={`w-full ${t.progressBg} rounded-full h-2`}>
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${(kpiData.adminUsers / kpiData.totalUsers) * 100}%` }}></div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className={t.textSecondary}>Usuários</span>
              <span className={`${t.text} font-semibold`}>{kpiData.regularUsers}</span>
            </div>
            <div className={`w-full ${t.progressBg} rounded-full h-2`}>
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(kpiData.regularUsers / kpiData.totalUsers) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className={`${t.card} border rounded-lg p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <Activity className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <h3 className="text-lg font-semibold">Status dos Usuários</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={t.textSecondary}>Ativos</span>
                <span className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} font-semibold`}>{kpiData.activeUsers}</span>
              </div>
              <div className={`w-full ${t.progressBg} rounded-full h-2`}>
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${kpiData.activityRate}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={t.textSecondary}>Inativos</span>
                <span className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} font-semibold`}>{kpiData.inactiveUsers}</span>
              </div>
              <div className={`w-full ${t.progressBg} rounded-full h-2`}>
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${100 - kpiData.activityRate}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${t.card} border rounded-lg p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <Clock className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h3 className="text-lg font-semibold">Tendência de Logins</h3>
          </div>
          <div className="flex items-end justify-between h-32 gap-1">
            {activityTrend.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className={`w-full ${t.progressBg} rounded-t relative`} style={{ height: `${(item.logins / 15) * 100}%`, minHeight: '4px' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"></div>
                </div>
                <span className={`text-xs ${t.textSecondary} mt-2`}>{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity Table */}
      <div className={`${t.card} border rounded-lg overflow-hidden`}>
        <div className={`p-6 ${t.border} border-b`}>
          <h3 className="text-xl font-semibold">Atividade dos Usuários</h3>
          <p className={`${t.textSecondary} text-sm mt-1`}>Últimos acessos e métricas por usuário</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={t.tableHeader}>
              <tr>
                <th className={`text-left p-4 ${t.textSecondary} font-medium text-sm`}>Nome</th>
                <th className={`text-left p-4 ${t.textSecondary} font-medium text-sm`}>E-mail</th>
                <th className={`text-left p-4 ${t.textSecondary} font-medium text-sm`}>Perfil</th>
                <th className={`text-left p-4 ${t.textSecondary} font-medium text-sm`}>Último Acesso</th>
                <th className={`text-left p-4 ${t.textSecondary} font-medium text-sm`}>Projetos</th>
                <th className={`text-left p-4 ${t.textSecondary} font-medium text-sm`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {userActivity.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <p className={t.textSecondary}>Nenhum usuário encontrado</p>
                  </td>
                </tr>
              ) : (
                userActivity.map((user, idx) => (
                <tr key={user.uid || idx} className={`${t.border} border-t ${t.cardHover} transition-colors`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-sm font-semibold text-white">
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className={`p-4 ${t.textSecondary} text-sm`}>{user.email}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      user.role === 'Administrador' 
                        ? isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                        : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className={`p-4 ${t.textSecondary} text-sm`}>{user.lastLogin}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                      isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                    } font-semibold text-sm`}>
                      {user.projects}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Ativo' 
                        ? isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                        : isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'Ativo' 
                          ? isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
                          : isDarkMode ? 'bg-red-400' : 'bg-red-600'
                      }`}></div>
                      {user.status}
                    </span>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import TodaySchedule from '../components/dashboard/TodaySchedule';
import RecentDoubts from '../components/dashboard/RecentDoubts';
import QuickActions from '../components/dashboard/QuickActions';
import { Users, HelpCircle, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      subtitle: 'Pre dacte',
      value: '120',
      icon: Users,
      iconColor: 'text-blue-600'
    },
    {
      title: 'Positive Process',
      subtitle: 'Process',
      value: '8',
      icon: HelpCircle,
      iconColor: 'text-green-600'
    },
    {
      title: 'Attendance',
      subtitle: 'Today facility',
      value: '3 classes',
      icon: Calendar,
      iconColor: 'text-purple-600'
    },
    {
      title: 'Performance',
      subtitle: 'Attendance',
      value: '79%',
      icon: TrendingUp,
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            subtitle={stat.subtitle}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <TodaySchedule />
          <QuickActions />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <RecentDoubts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


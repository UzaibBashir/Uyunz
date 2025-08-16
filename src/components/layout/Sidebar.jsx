import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  Calendar, 
  GraduationCap, 
  MessageCircleQuestion, 
  FileText, 
  BarChart3, 
  User, 
  Settings,
  Activity
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Notes', path: '/notes', icon: Upload },
    { name: 'Doubts', path: '/doubts', icon: MessageCircleQuestion },
    { name: 'NoticeBoard', path: '/notices', icon: FileText },
    { name: 'Feed', path: '/attendance', icon: Calendar },
    { name: 'TimeTable', path: '/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'About', path: '/students', icon: GraduationCap },
  ];

  const isActive = (path) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/');
  };

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">Uyunz</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings at bottom */}
      <div className="p-2 border-t border-slate-700">
        <Link
          to="/settings"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            isActive('/settings')
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;


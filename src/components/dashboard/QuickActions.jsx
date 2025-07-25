import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, MapPin, Share, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Upload Notes',
      description: 'Add new course materials',
      icon: Upload,
      color: 'bg-blue-500 hover:bg-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      path: '/notes'
    },
    {
      title: 'Mark Attendance',
      description: 'Record student attendance',
      icon: MapPin,
      color: 'bg-green-500 hover:bg-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      path: '/attendance'
    },
    {
      title: 'Post Notice',
      description: 'Share important announcements',
      icon: Share,
      color: 'bg-purple-500 hover:bg-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      path: '/notices'
    },
    {
      title: 'Enter Marks',
      description: 'Update student grades',
      icon: Edit,
      color: 'bg-orange-500 hover:bg-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      path: '/students'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center space-y-3 hover:bg-gray-50 transition-all duration-200 group"
                onClick={() => handleActionClick(action.path)}
              >
                <div className={`p-3 rounded-full ${action.iconBg} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-6 h-6 ${action.iconColor}`} />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900 text-sm">{action.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;


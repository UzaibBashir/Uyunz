import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';

const TodaySchedule = () => {
  const scheduleItems = [
    {
      time: '10:15 AM',
      endTime: '11:00 AM',
      subject: 'Discrete Maths',
      room: 'A4',
      status: 'done'
    },
    {
      time: '11:00 AM',
      endTime: '11:45 AM',
      subject: 'Data Structures',
      room: 'Lab',
      status: 'current'
    },
    {
      time: '11:45 AM',
      endTime: '12:30 PM',
      subject: 'Operating Systems',
      room: 'A4',
      status: 'upcoming'
    },
    {
      time: '12:30 PM',
      endTime: '01:15 PM',
      subject: 'Algorithms',
      room: 'A4',
      status: 'upcoming'
    },
    {
      time: '01:15 PM',
      endTime: '01:45 PM',
      subject: 'Lunch',
      room: 'report back',
      status: 'pending'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'border-l-blue-500 bg-blue-50';
      case 'completed':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-300 bg-white';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scheduleItems.map((item, index) => (
          <div
            key={index}
            className={`p-4 border-l-4 rounded-r-lg transition-colors duration-200 hover:shadow-sm ${getStatusColor(item.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">{item.time}</span>
                  <span className="text-xs text-gray-500">{item.endTime}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.subject}</h4>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{item.room}</span>
                </div>
              </div>
              {item.status === 'current' && (
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TodaySchedule;


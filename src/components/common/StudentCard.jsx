import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, GraduationCap, TrendingUp, Calendar } from 'lucide-react';

const StudentCard = ({ student, onViewDetails }) => {
  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return 'text-green-600 bg-green-100';
    if (attendance >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getGPAColor = (gpa) => {
    if (gpa >= 3.7) return 'text-green-600 bg-green-100';
    if (gpa >= 3.0) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <Avatar className="w-16 h-16">
            <AvatarImage src={`/api/placeholder/64/64`} alt={student.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
              {student.avatar}
            </AvatarFallback>
          </Avatar>

          {/* Student Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{student.name}</h3>
              <Badge variant="outline" className="text-xs">
                {student.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <GraduationCap className="w-4 h-4 mr-2" />
                <span>{student.studentId} • {student.course}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{student.year} • {student.semester}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="truncate">{student.email}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">GPA:</span>
                <Badge className={`text-xs ${getGPAColor(student.gpa)}`}>
                  {student.gpa}
                </Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Attendance:</span>
                <Badge className={`text-xs ${getAttendanceColor(student.attendance)}`}>
                  {student.attendance}%
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                onClick={() => onViewDetails(student)}
                className="flex-1"
              >
                View Details
              </Button>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Users, 
  UserCheck, 
  UserX, 
  MapPin, 
  CheckCircle, 
  XCircle,
  Plus,
  BarChart3
} from 'lucide-react';
import { attendanceData } from '../data/attendanceData';

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState(attendanceData.studentAttendance);

  const handleMarkAttendance = (studentId, classId, status) => {
    setAttendanceRecords(prev => 
      prev.map(student => 
        student.studentId === studentId 
          ? {
              ...student,
              attendance: student.attendance.map(record => 
                record.classId === classId 
                  ? { ...record, status }
                  : record
              )
            }
          : student
      )
    );
  };

  const getAttendanceStats = () => {
    const totalClasses = attendanceData.classes.length;
    const completedClasses = attendanceData.classes.filter(c => c.status === 'completed').length;
    const totalStudents = attendanceData.studentAttendance.length;
    
    let totalPresent = 0;
    let totalPossible = 0;
    
    attendanceData.studentAttendance.forEach(student => {
      student.attendance.forEach(record => {
        if (record.status !== 'pending') {
          totalPossible++;
          if (record.status === 'present') {
            totalPresent++;
          }
        }
      });
    });
    
    const averageAttendance = totalPossible > 0 ? Math.round((totalPresent / totalPossible) * 100) : 0;
    
    return {
      totalClasses,
      completedClasses,
      totalStudents,
      averageAttendance
    };
  };

  const stats = getAttendanceStats();

  const AttendanceMarkingDialog = ({ classData }) => {
    const studentsForClass = attendanceRecords.map(student => {
      const attendanceRecord = student.attendance.find(a => a.classId === classData.id);
      return {
        ...student,
        attendanceStatus: attendanceRecord?.status || 'pending'
      };
    });

    return (
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Mark Attendance - {classData.subject}</DialogTitle>
          <DialogDescription>
            {classData.date} at {classData.time} • Room {classData.room}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {studentsForClass.map((student) => (
            <div key={student.studentId} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`/api/placeholder/40/40`} alt={student.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {student.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{student.name}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={student.attendanceStatus === 'present' ? 'default' : 'outline'}
                  onClick={() => handleMarkAttendance(student.studentId, classData.id, 'present')}
                  className="flex items-center space-x-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Present</span>
                </Button>
                <Button
                  size="sm"
                  variant={student.attendanceStatus === 'absent' ? 'destructive' : 'outline'}
                  onClick={() => handleMarkAttendance(student.studentId, classData.id, 'absent')}
                  className="flex items-center space-x-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Absent</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-600">Monitor and manage student attendance</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Class</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold">{stats.totalClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{stats.completedClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold">{stats.averageAttendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="classes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="students">Student Records</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Schedule & Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.classes.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{classItem.subject}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{classItem.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{classItem.room}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Attendance</p>
                        <p className="font-semibold">
                          {classItem.presentStudents}/{classItem.totalStudents}
                        </p>
                      </div>
                      <Badge variant={classItem.status === 'completed' ? 'default' : 'secondary'}>
                        {classItem.status}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm"
                            disabled={classItem.status === 'completed'}
                          >
                            Mark Attendance
                          </Button>
                        </DialogTrigger>
                        <AttendanceMarkingDialog classData={classItem} />
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceRecords.map((student) => {
                  const presentCount = student.attendance.filter(a => a.status === 'present').length;
                  const totalCount = student.attendance.filter(a => a.status !== 'pending').length;
                  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
                  
                  return (
                    <div key={student.studentId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`/api/placeholder/48/48`} alt={student.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">
                            {presentCount}/{totalCount} classes attended
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          {student.attendance.map((record, index) => (
                            <div
                              key={index}
                              className={`w-3 h-3 rounded-full ${
                                record.status === 'present' 
                                  ? 'bg-green-500' 
                                  : record.status === 'absent'
                                  ? 'bg-red-500'
                                  : 'bg-gray-300'
                              }`}
                              title={`${record.date}: ${record.status}`}
                            />
                          ))}
                        </div>
                        <Badge 
                          className={
                            attendancePercentage >= 90 
                              ? 'bg-green-100 text-green-800'
                              : attendancePercentage >= 75
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {attendancePercentage}%
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Attendance Analytics</h3>
                <p className="text-gray-600 mb-4">Detailed attendance reports and analytics will be available here.</p>
                <Button variant="outline">Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;


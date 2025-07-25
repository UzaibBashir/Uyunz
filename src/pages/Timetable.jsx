import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus,
  BookOpen,
  Users,
  Building
} from 'lucide-react';
import { timetableData } from '../data/timetableData';

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isAddClassDialogOpen, setIsAddClassDialogOpen] = useState(false);
  const [schedule, setSchedule] = useState(timetableData.schedule);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const getTodayClasses = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todaySchedule = schedule.find(day => day.day === today);
    return todaySchedule ? todaySchedule.classes : [];
  };

  const getWeekStats = () => {
    const totalClasses = schedule.reduce((sum, day) => sum + day.classes.length, 0);
    const uniqueSubjects = new Set();
    const uniqueRooms = new Set();
    const uniqueInstructors = new Set();

    schedule.forEach(day => {
      day.classes.forEach(cls => {
        uniqueSubjects.add(cls.subject);
        uniqueRooms.add(cls.room);
        uniqueInstructors.add(cls.instructor);
      });
    });

    return {
      totalClasses,
      subjects: uniqueSubjects.size,
      rooms: uniqueRooms.size,
      instructors: uniqueInstructors.size
    };
  };

  const stats = getWeekStats();
  const todayClasses = getTodayClasses();

  const AddClassDialog = () => {
    const [formData, setFormData] = useState({
      subject: '',
      time: '',
      room: '',
      instructor: '',
      type: 'Lecture',
      day: 'Monday'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newClass = {
        id: Date.now(),
        ...formData,
        color: 'bg-blue-100 border-blue-300 text-blue-800'
      };

      setSchedule(prev => prev.map(day => 
        day.day === formData.day 
          ? { ...day, classes: [...day.classes, newClass] }
          : day
      ));

      setIsAddClassDialogOpen(false);
      setFormData({
        subject: '',
        time: '',
        room: '',
        instructor: '',
        type: 'Lecture',
        day: 'Monday'
      });
    };

    return (
      <Dialog open={isAddClassDialogOpen} onOpenChange={setIsAddClassDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Schedule a new class in the timetable
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Enter subject name"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="day">Day</Label>
                <Select value={formData.day} onValueChange={(value) => setFormData({...formData, day: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lecture">Lecture</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
                    <SelectItem value="Tutorial">Tutorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="time">Time</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timetableData.timeSlots.map(slot => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="room">Room</Label>
              <Select value={formData.room} onValueChange={(value) => setFormData({...formData, room: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {timetableData.rooms.map(room => (
                    <SelectItem key={room} value={room}>{room}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="instructor">Instructor</Label>
              <Select value={formData.instructor} onValueChange={(value) => setFormData({...formData, instructor: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {timetableData.instructors.map(instructor => (
                    <SelectItem key={instructor} value={instructor}>{instructor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1">Add Class</Button>
              <Button type="button" variant="outline" onClick={() => setIsAddClassDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timetable</h1>
          <p className="text-gray-600">View and manage class schedules</p>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setIsAddClassDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Add Class</span>
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
              <BookOpen className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Subjects</p>
                <p className="text-2xl font-bold">{stats.subjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Rooms</p>
                <p className="text-2xl font-bold">{stats.rooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Instructors</p>
                <p className="text-2xl font-bold">{stats.instructors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="today">Today's Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Timetable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {schedule.map((daySchedule) => (
                  <div key={daySchedule.day} className="space-y-3">
                    <h3 className="font-semibold text-center p-2 bg-gray-100 rounded-lg">
                      {daySchedule.day}
                    </h3>
                    <div className="space-y-2">
                      {daySchedule.classes.map((cls) => (
                        <div
                          key={cls.id}
                          className={`p-3 rounded-lg border-l-4 ${cls.color} hover:shadow-md transition-shadow duration-200`}
                        >
                          <h4 className="font-medium text-sm mb-1">{cls.subject}</h4>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{cls.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{cls.room}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{cls.instructor}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {cls.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Daily Schedule</CardTitle>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.find(day => day.day === selectedDay)?.classes.map((cls) => (
                  <div
                    key={cls.id}
                    className={`p-4 rounded-lg border-l-4 ${cls.color} hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{cls.subject}</h3>
                      <Badge variant="outline">{cls.type}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{cls.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{cls.room}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{cls.instructor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Classes</CardTitle>
            </CardHeader>
            <CardContent>
              {todayClasses.length > 0 ? (
                <div className="space-y-4">
                  {todayClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className={`p-4 rounded-lg border-l-4 ${cls.color} hover:shadow-md transition-shadow duration-200`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">{cls.subject}</h3>
                        <Badge variant="outline">{cls.type}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{cls.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{cls.room}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{cls.instructor}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No classes today</h3>
                  <p className="text-gray-600">Enjoy your day off!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddClassDialog />
    </div>
  );
};

export default Timetable;


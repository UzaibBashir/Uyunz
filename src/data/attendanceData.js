export const attendanceData = {
  classes: [
    {
      id: 1,
      subject: 'Data Structures',
      date: '2025-01-23',
      time: '10:00 AM',
      room: 'E/17',
      totalStudents: 5,
      presentStudents: 4,
      status: 'completed'
    },
    {
      id: 2,
      subject: 'Algorithms',
      date: '2025-01-23',
      time: '2:00 PM',
      room: 'E/17',
      totalStudents: 5,
      presentStudents: 5,
      status: 'completed'
    },
    {
      id: 3,
      subject: 'Operating Systems',
      date: '2025-01-24',
      time: '9:00 AM',
      room: 'E/17',
      totalStudents: 5,
      presentStudents: 0,
      status: 'pending'
    }
  ],
  studentAttendance: [
    {
      studentId: 1,
      name: 'John Doe',
      avatar: 'JD',
      attendance: [
        { classId: 1, status: 'present', date: '2025-01-23' },
        { classId: 2, status: 'present', date: '2025-01-23' },
        { classId: 3, status: 'pending', date: '2025-01-24' }
      ]
    },
    {
      studentId: 2,
      name: 'Sarah Wilson',
      avatar: 'SW',
      attendance: [
        { classId: 1, status: 'present', date: '2025-01-23' },
        { classId: 2, status: 'present', date: '2025-01-23' },
        { classId: 3, status: 'pending', date: '2025-01-24' }
      ]
    },
    {
      studentId: 3,
      name: 'Mike Johnson',
      avatar: 'MJ',
      attendance: [
        { classId: 1, status: 'absent', date: '2025-01-23' },
        { classId: 2, status: 'present', date: '2025-01-23' },
        { classId: 3, status: 'pending', date: '2025-01-24' }
      ]
    },
    {
      studentId: 4,
      name: 'Emily Davis',
      avatar: 'ED',
      attendance: [
        { classId: 1, status: 'present', date: '2025-01-23' },
        { classId: 2, status: 'present', date: '2025-01-23' },
        { classId: 3, status: 'pending', date: '2025-01-24' }
      ]
    },
    {
      studentId: 5,
      name: 'David Brown',
      avatar: 'DB',
      attendance: [
        { classId: 1, status: 'present', date: '2025-01-23' },
        { classId: 2, status: 'present', date: '2025-01-23' },
        { classId: 3, status: 'pending', date: '2025-01-24' }
      ]
    }
  ]
};


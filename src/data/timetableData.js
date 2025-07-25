export const timetableData = {
  schedule: [
    {
      id: 1,
      day: 'Monday',
      classes: [
        {
          id: 1,
          subject: 'Data Structures',
          time: '9:00 AM - 10:30 AM',
          room: 'E/17',
          instructor: 'Prof. Smith',
          type: 'Lecture',
          color: 'bg-blue-100 border-blue-300 text-blue-800'
        },
        {
          id: 2,
          subject: 'Mathematics',
          time: '11:00 AM - 12:30 PM',
          room: 'M/12',
          instructor: 'Prof. Johnson',
          type: 'Lecture',
          color: 'bg-green-100 border-green-300 text-green-800'
        },
        {
          id: 3,
          subject: 'Programming Lab',
          time: '2:00 PM - 4:00 PM',
          room: 'Lab-1',
          instructor: 'Prof. Davis',
          type: 'Lab',
          color: 'bg-purple-100 border-purple-300 text-purple-800'
        }
      ]
    },
    {
      id: 2,
      day: 'Tuesday',
      classes: [
        {
          id: 4,
          subject: 'Algorithms',
          time: '9:00 AM - 10:30 AM',
          room: 'E/17',
          instructor: 'Prof. Smith',
          type: 'Lecture',
          color: 'bg-orange-100 border-orange-300 text-orange-800'
        },
        {
          id: 5,
          subject: 'Database Systems',
          time: '11:00 AM - 12:30 PM',
          room: 'E/15',
          instructor: 'Prof. Wilson',
          type: 'Lecture',
          color: 'bg-red-100 border-red-300 text-red-800'
        },
        {
          id: 6,
          subject: 'Physics',
          time: '2:00 PM - 3:30 PM',
          room: 'P/10',
          instructor: 'Prof. Brown',
          type: 'Lecture',
          color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
        }
      ]
    },
    {
      id: 3,
      day: 'Wednesday',
      classes: [
        {
          id: 7,
          subject: 'Operating Systems',
          time: '9:00 AM - 10:30 AM',
          room: 'E/17',
          instructor: 'Prof. Smith',
          type: 'Lecture',
          color: 'bg-indigo-100 border-indigo-300 text-indigo-800'
        },
        {
          id: 8,
          subject: 'Data Structures Lab',
          time: '11:00 AM - 1:00 PM',
          room: 'Lab-2',
          instructor: 'Prof. Davis',
          type: 'Lab',
          color: 'bg-blue-100 border-blue-300 text-blue-800'
        },
        {
          id: 9,
          subject: 'English',
          time: '2:00 PM - 3:30 PM',
          room: 'H/5',
          instructor: 'Prof. Taylor',
          type: 'Lecture',
          color: 'bg-pink-100 border-pink-300 text-pink-800'
        }
      ]
    },
    {
      id: 4,
      day: 'Thursday',
      classes: [
        {
          id: 10,
          subject: 'Algorithms',
          time: '9:00 AM - 10:30 AM',
          room: 'E/17',
          instructor: 'Prof. Smith',
          type: 'Lecture',
          color: 'bg-orange-100 border-orange-300 text-orange-800'
        },
        {
          id: 11,
          subject: 'Database Lab',
          time: '11:00 AM - 1:00 PM',
          room: 'Lab-3',
          instructor: 'Prof. Wilson',
          type: 'Lab',
          color: 'bg-red-100 border-red-300 text-red-800'
        },
        {
          id: 12,
          subject: 'Mathematics',
          time: '2:00 PM - 3:30 PM',
          room: 'M/12',
          instructor: 'Prof. Johnson',
          type: 'Lecture',
          color: 'bg-green-100 border-green-300 text-green-800'
        }
      ]
    },
    {
      id: 5,
      day: 'Friday',
      classes: [
        {
          id: 13,
          subject: 'Operating Systems',
          time: '9:00 AM - 10:30 AM',
          room: 'E/17',
          instructor: 'Prof. Smith',
          type: 'Lecture',
          color: 'bg-indigo-100 border-indigo-300 text-indigo-800'
        },
        {
          id: 14,
          subject: 'Project Work',
          time: '11:00 AM - 1:00 PM',
          room: 'Lab-1',
          instructor: 'Prof. Davis',
          type: 'Project',
          color: 'bg-gray-100 border-gray-300 text-gray-800'
        }
      ]
    }
  ],
  timeSlots: [
    '9:00 AM - 10:30 AM',
    '11:00 AM - 12:30 PM',
    '2:00 PM - 3:30 PM',
    '4:00 PM - 5:30 PM'
  ],
  rooms: [
    'E/17', 'E/15', 'M/12', 'P/10', 'H/5', 'Lab-1', 'Lab-2', 'Lab-3'
  ],
  instructors: [
    'Prof. Smith', 'Prof. Johnson', 'Prof. Davis', 'Prof. Wilson', 'Prof. Brown', 'Prof. Taylor'
  ]
};


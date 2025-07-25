export const doubtsData = [
  {
    id: 1,
    title: 'Understanding Recursion in Data Structures',
    content: 'Could anyone please explain the concept of recursion in detail? I\'m having trouble understanding how the call stack works and when to use recursion vs iteration.',
    author: {
      id: 1,
      name: 'John Doe',
      avatar: 'JD',
      role: 'Student'
    },
    subject: 'Data Structures',
    tags: ['recursion', 'algorithms', 'data-structures'],
    createdAt: '2025-01-23T10:30:00Z',
    updatedAt: '2025-01-23T10:30:00Z',
    views: 45,
    likes: 12,
    status: 'open',
    replies: [
      {
        id: 1,
        content: 'Recursion is a programming technique where a function calls itself. The key is to have a base case that stops the recursion. Think of it like Russian dolls - each doll contains a smaller version of itself.',
        author: {
          id: 2,
          name: 'Prof. Smith',
          avatar: 'PS',
          role: 'Faculty'
        },
        createdAt: '2025-01-23T11:15:00Z',
        likes: 8,
        isAccepted: true
      },
      {
        id: 2,
        content: 'Great explanation! I\'d also add that recursion is particularly useful for problems that can be broken down into smaller, similar subproblems like tree traversal or factorial calculation.',
        author: {
          id: 3,
          name: 'Sarah Wilson',
          avatar: 'SW',
          role: 'Student'
        },
        createdAt: '2025-01-23T12:00:00Z',
        likes: 5,
        isAccepted: false
      }
    ]
  },
  {
    id: 2,
    title: 'Database Normalization Confusion',
    content: 'Will the next session cover all important topics for the exam? Specifically, I\'m confused about the different normal forms and when to apply them.',
    author: {
      id: 3,
      name: 'Sarah Wilson',
      avatar: 'SW',
      role: 'Student'
    },
    subject: 'Database Systems',
    tags: ['database', 'normalization', 'exam'],
    createdAt: '2025-01-23T09:45:00Z',
    updatedAt: '2025-01-23T09:45:00Z',
    views: 32,
    likes: 7,
    status: 'open',
    replies: [
      {
        id: 3,
        content: 'Yes, we\'ll cover all normal forms in the next session. I\'ll also provide practical examples to help you understand when and how to apply each normal form.',
        author: {
          id: 2,
          name: 'Prof. Smith',
          avatar: 'PS',
          role: 'Faculty'
        },
        createdAt: '2025-01-23T10:30:00Z',
        likes: 6,
        isAccepted: true
      }
    ]
  },
  {
    id: 3,
    title: 'Assignment Help - Data Structures',
    content: 'I\'m having trouble with today\'s assignment on data structures. Specifically, I\'m stuck on implementing a binary search tree. Can someone help me understand the insertion logic?',
    author: {
      id: 4,
      name: 'Mike Johnson',
      avatar: 'MJ',
      role: 'Student'
    },
    subject: 'Data Structures',
    tags: ['assignment', 'binary-tree', 'implementation'],
    createdAt: '2025-01-23T08:20:00Z',
    updatedAt: '2025-01-23T08:20:00Z',
    views: 28,
    likes: 4,
    status: 'open',
    replies: []
  },
  {
    id: 4,
    title: 'Operating System Process Scheduling',
    content: 'Can someone explain the difference between preemptive and non-preemptive scheduling algorithms? I understand the basic concepts but I\'m confused about their practical applications.',
    author: {
      id: 5,
      name: 'Emily Davis',
      avatar: 'ED',
      role: 'Student'
    },
    subject: 'Operating Systems',
    tags: ['os', 'scheduling', 'processes'],
    createdAt: '2025-01-22T16:30:00Z',
    updatedAt: '2025-01-22T16:30:00Z',
    views: 38,
    likes: 9,
    status: 'resolved',
    replies: [
      {
        id: 4,
        content: 'Preemptive scheduling allows the OS to interrupt a running process, while non-preemptive waits for the process to complete or yield control voluntarily. Preemptive is better for interactive systems, non-preemptive for batch processing.',
        author: {
          id: 2,
          name: 'Prof. Smith',
          avatar: 'PS',
          role: 'Faculty'
        },
        createdAt: '2025-01-22T17:15:00Z',
        likes: 12,
        isAccepted: true
      }
    ]
  }
];

export const feedData = [
  {
    id: 1,
    type: 'announcement',
    title: 'New Assignment Posted',
    content: 'Data Structures Assignment 3 has been posted. Due date: January 30, 2025.',
    author: {
      id: 2,
      name: 'Prof. Smith',
      avatar: 'PS',
      role: 'Faculty'
    },
    subject: 'Data Structures',
    createdAt: '2025-01-23T14:00:00Z',
    likes: 15,
    comments: 3
  },
  {
    id: 2,
    type: 'doubt',
    title: 'New Doubt Posted',
    content: 'John Doe posted a new doubt about "Understanding Recursion in Data Structures"',
    author: {
      id: 1,
      name: 'John Doe',
      avatar: 'JD',
      role: 'Student'
    },
    subject: 'Data Structures',
    createdAt: '2025-01-23T10:30:00Z',
    likes: 8,
    comments: 2
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Student Achievement',
    content: 'Sarah Wilson scored 95% in the recent Database Systems quiz!',
    author: {
      id: 3,
      name: 'Sarah Wilson',
      avatar: 'SW',
      role: 'Student'
    },
    subject: 'Database Systems',
    createdAt: '2025-01-23T09:15:00Z',
    likes: 24,
    comments: 5
  },
  {
    id: 4,
    type: 'notice',
    title: 'Library Hours Extended',
    content: 'The library will remain open until 10 PM starting from January 25, 2025.',
    author: {
      id: 6,
      name: 'Library Admin',
      avatar: 'LA',
      role: 'Staff'
    },
    subject: 'General',
    createdAt: '2025-01-22T18:00:00Z',
    likes: 18,
    comments: 2
  }
];


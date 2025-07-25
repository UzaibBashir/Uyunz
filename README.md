# College Portal - Student Management System

A comprehensive React-based college portal that manages student profiles, attendance, notes, notices, timetables, feed, and doubt discussions. Built with React, Tailwind CSS, and modern UI components.

## Features

### 🎯 Dashboard
- **Statistics Overview**: Total students, positive processes, attendance metrics, performance tracking
- **Today's Schedule**: Real-time class schedule with time slots and room information
- **Recent Student Doubts**: Quick access to latest student questions and discussions
- **Quick Actions**: Fast access to common tasks like uploading notes, marking attendance, posting notices

### 👥 Student Management
- **Student Profiles**: Comprehensive student information with avatars, contact details, academic records
- **Search & Filter**: Advanced search by name, ID, email with filtering by academic year
- **Student Details**: Detailed view with GPA, attendance, subjects, and grades
- **Performance Tracking**: Visual indicators for GPA and attendance performance

### 📊 Attendance Tracking
- **Class Management**: View and manage class schedules with attendance tracking
- **Student Records**: Individual student attendance history with visual indicators
- **Statistics**: Comprehensive attendance analytics and reporting
- **Mark Attendance**: Easy interface for recording student attendance

### 📚 Notes Management
- **File Upload**: Upload course materials and notes with categorization
- **Search & Filter**: Find notes by title, description, tags, or subject
- **Download Tracking**: Monitor note downloads and engagement
- **Subject Organization**: Organize notes by academic subjects

### 📢 Notices Management
- **Post Announcements**: Create and publish important notices with priority levels
- **Categorization**: Organize notices by type (examination, event, assignment, etc.)
- **Priority System**: High, medium, low priority with visual indicators
- **View Tracking**: Monitor notice engagement and views

### 📅 Timetable
- **Weekly View**: Complete weekly schedule overview with color-coded subjects
- **Daily View**: Detailed daily schedule with class information
- **Today's Classes**: Quick view of current day's classes
- **Class Management**: Add and manage class schedules

### 💬 Doubt Discussion System
- **Q&A Forum**: Students can post questions and get help from faculty and peers
- **Reply System**: Threaded discussions with accepted answers
- **Status Tracking**: Open/resolved status for doubts
- **Search & Filter**: Find doubts by subject, status, or content

### 📱 Activity Feed
- **Real-time Updates**: Stay updated with latest activities and announcements
- **Activity Types**: Announcements, doubts, achievements, notices
- **Engagement**: Like, comment, and share functionality
- **Progress Tracking**: Daily summary of activities and achievements

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Navigate to the project directory:
```bash
cd college-portal
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

## Project Structure

```
college-portal/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── layout/          # Layout components (Sidebar, Header)
│   │   └── ui/              # UI components (shadcn/ui)
│   ├── data/                # Sample data files
│   ├── pages/               # Page components
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
└── package.json
```

## Key Components

### Layout Components
- **Sidebar**: Navigation menu with active states
- **Header**: User profile and notifications
- **Layout**: Main layout wrapper

### Page Components
- **Dashboard**: Main overview page
- **Students**: Student management interface
- **Attendance**: Attendance tracking system
- **Notes**: Notes upload and management
- **Notices**: Notice posting and viewing
- **Timetable**: Schedule management
- **Doubts**: Q&A discussion forum
- **Feed**: Activity feed and progress tracking

## Features in Detail

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interfaces
- Optimized for all screen sizes

### User Experience
- Intuitive navigation
- Quick actions and shortcuts
- Real-time updates
- Professional UI design

### Data Management
- Local state management
- Sample data for demonstration
- Easy integration with backend APIs
- Structured data organization

## Customization

### Adding New Features
1. Create new components in appropriate directories
2. Add routing in `App.jsx`
3. Update navigation in `Sidebar.jsx`
4. Add sample data if needed

### Styling
- Modify Tailwind classes for custom styling
- Update color schemes in component files
- Customize UI components in `components/ui/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.


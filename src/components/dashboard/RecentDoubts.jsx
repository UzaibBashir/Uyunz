import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecentDoubts = () => {
  const doubts = [
    {
      id: 1,
      student: 'John Doe',
      avatar: 'JD',
      question: 'Could anyone please explain the concept of recursion in detail?',
      time: '2 hours ago',
      replies: 3
    },
    {
      id: 2,
      student: 'Sarah Wilson',
      avatar: 'SW',
      question: 'Will the next session cover all important topics for the exam?',
      time: '4 hours ago',
      replies: 1
    },
    {
      id: 3,
      student: 'Mike Johnson',
      avatar: 'MJ',
      question: "I'm having trouble with today's assignment on data structures",
      time: '6 hours ago',
      replies: 0
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Recent Student Doubts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {doubts.map((doubt) => (
          <div
            key={doubt.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={`/api/placeholder/40/40`} alt={doubt.student} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                {doubt.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-900">{doubt.student}</p>
                <span className="text-xs text-gray-500">{doubt.time}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{doubt.question}</p>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {doubt.replies} {doubt.replies === 1 ? 'reply' : 'replies'}
                </span>
              </div>
            </div>
            
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
          </div>
        ))}
        
        <div className="pt-2">
          <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            View All Doubts
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentDoubts;


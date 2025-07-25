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
  Activity, 
  ThumbsUp, 
  MessageCircle, 
  Share, 
  Megaphone,
  MessageCircleQuestion,
  Trophy,
  Bell,
  TrendingUp,
  Users,
  BookOpen
} from 'lucide-react';
import { feedData } from '../data/doubtsData';

const Feed = () => {
  const [feed, setFeed] = useState(feedData);
  const [filterType, setFilterType] = useState('all');

  // Filter feed based on type
  const filteredFeed = feed.filter(item => 
    filterType === 'all' || item.type === filterType
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement':
        return <Megaphone className="w-5 h-5 text-blue-600" />;
      case 'doubt':
        return <MessageCircleQuestion className="w-5 h-5 text-orange-600" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-600" />;
      case 'notice':
        return <Bell className="w-5 h-5 text-purple-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'announcement':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'doubt':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'notice':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const handleLike = (itemId) => {
    setFeed(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, likes: item.likes + 1 }
        : item
    ));
  };

  const getFeedStats = () => {
    const totalPosts = feed.length;
    const totalLikes = feed.reduce((sum, item) => sum + item.likes, 0);
    const totalComments = feed.reduce((sum, item) => sum + item.comments, 0);
    const todayPosts = feed.filter(item => {
      const itemDate = new Date(item.createdAt);
      const today = new Date();
      return itemDate.toDateString() === today.toDateString();
    }).length;

    return { totalPosts, totalLikes, totalComments, todayPosts };
  };

  const stats = getFeedStats();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
          <p className="text-gray-600">Stay updated with today's progress and activities</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold">{stats.totalPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold">{stats.totalLikes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Comments</p>
                <p className="text-2xl font-bold">{stats.totalComments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Today's Posts</p>
                <p className="text-2xl font-bold">{stats.todayPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter by type:</span>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="doubt">Doubts</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
                <SelectItem value="notice">Notices</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feed Items */}
      <div className="space-y-4">
        {filteredFeed.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`/api/placeholder/48/48`} alt={item.author.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {item.author.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <Badge className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                    </div>
                    <Badge variant="outline">{item.subject}</Badge>
                    <span className="text-sm text-gray-500">{formatTimeAgo(item.createdAt)}</span>
                  </div>

                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>By {item.author.name}</span>
                      <span>•</span>
                      <span>{item.author.role}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(item.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{item.comments}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center space-x-1 text-gray-600 hover:text-purple-600"
                      >
                        <Share className="w-4 h-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredFeed.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600">Try adjusting your filter or check back later for new updates.</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Today's Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">New Assignments</p>
                <p className="text-lg font-semibold text-gray-900">
                  {filteredFeed.filter(item => item.type === 'announcement').length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <MessageCircleQuestion className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">New Doubts</p>
                <p className="text-lg font-semibold text-gray-900">
                  {filteredFeed.filter(item => item.type === 'doubt').length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-lg font-semibold text-gray-900">
                  {filteredFeed.filter(item => item.type === 'achievement').length}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feed;


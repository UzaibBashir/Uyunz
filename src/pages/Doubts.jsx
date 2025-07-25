import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircleQuestion, 
  Plus, 
  Search, 
  ThumbsUp, 
  MessageCircle, 
  Eye,
  CheckCircle,
  Clock,
  Tag,
  Send
} from 'lucide-react';
import { doubtsData } from '../data/doubtsData';

const Doubts = () => {
  const [doubts, setDoubts] = useState(doubtsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [newReply, setNewReply] = useState('');

  // Get unique subjects for filter
  const subjects = [...new Set(doubts.map(doubt => doubt.subject))];

  // Filter doubts based on search, subject, and status
  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doubt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doubt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = filterSubject === 'all' || doubt.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' || doubt.status === filterStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handlePostDoubt = (formData) => {
    const newDoubt = {
      id: doubts.length + 1,
      title: formData.title,
      content: formData.content,
      author: {
        id: 1,
        name: 'Current User',
        avatar: 'CU',
        role: 'Student'
      },
      subject: formData.subject,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      status: 'open',
      replies: []
    };
    setDoubts([newDoubt, ...doubts]);
    setIsPostDialogOpen(false);
  };

  const handleAddReply = (doubtId) => {
    if (!newReply.trim()) return;

    const reply = {
      id: Date.now(),
      content: newReply,
      author: {
        id: 1,
        name: 'Current User',
        avatar: 'CU',
        role: 'Student'
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      isAccepted: false
    };

    setDoubts(prev => prev.map(doubt => 
      doubt.id === doubtId 
        ? { ...doubt, replies: [...doubt.replies, reply] }
        : doubt
    ));
    setNewReply('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'open':
        return <Clock className="w-4 h-4" />;
      default:
        return <MessageCircleQuestion className="w-4 h-4" />;
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

  const PostDoubtDialog = () => {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      subject: '',
      tags: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handlePostDoubt(formData);
      setFormData({ title: '', content: '', subject: '', tags: '' });
    };

    return (
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Post New Doubt</DialogTitle>
            <DialogDescription>
              Ask a question and get help from faculty and peers
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter a descriptive title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Data Structures">Data Structures</SelectItem>
                  <SelectItem value="Algorithms">Algorithms</SelectItem>
                  <SelectItem value="Operating Systems">Operating Systems</SelectItem>
                  <SelectItem value="Database Systems">Database Systems</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="content">Question Details</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Describe your question in detail..."
                rows={4}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="e.g., recursion, algorithms, help"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1">Post Doubt</Button>
              <Button type="button" variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const DoubtDetailDialog = ({ doubt }) => {
    if (!doubt) return null;

    return (
      <Dialog open={!!selectedDoubt} onOpenChange={() => setSelectedDoubt(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-xl mb-2">{doubt.title}</DialogTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{doubt.author.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{doubt.author.name}</span>
                  </div>
                  <span>{formatTimeAgo(doubt.createdAt)}</span>
                  <Badge variant="outline">{doubt.subject}</Badge>
                  <Badge className={getStatusColor(doubt.status)}>
                    {getStatusIcon(doubt.status)}
                    <span className="ml-1">{doubt.status}</span>
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Question Content */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800">{doubt.content}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-1">
                  {doubt.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{doubt.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{doubt.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Replies */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                Replies ({doubt.replies.length})
              </h3>
              
              {doubt.replies.map((reply) => (
                <div key={reply.id} className={`p-4 rounded-lg border-l-4 ${
                  reply.isAccepted ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-sm">{reply.author.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{reply.author.name}</p>
                        <p className="text-xs text-gray-600">{reply.author.role}</p>
                      </div>
                      {reply.isAccepted && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Accepted Answer
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{formatTimeAgo(reply.createdAt)}</span>
                  </div>
                  <p className="text-gray-800 mb-3">{reply.content}</p>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="text-xs">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {reply.likes}
                    </Button>
                    {!reply.isAccepted && doubt.author.id === 1 && (
                      <Button size="sm" variant="outline" className="text-xs">
                        Accept Answer
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Reply */}
              <div className="p-4 border rounded-lg">
                <Label htmlFor="reply">Add your reply</Label>
                <div className="flex space-x-2 mt-2">
                  <Textarea
                    id="reply"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write your reply..."
                    rows={3}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleAddReply(doubt.id)}
                    disabled={!newReply.trim()}
                    className="self-end"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Doubts</h1>
          <p className="text-gray-600">Ask questions and get help from faculty and peers</p>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setIsPostDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Post Doubt</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircleQuestion className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Doubts</p>
                <p className="text-2xl font-bold">{doubts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">
                  {doubts.filter(d => d.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-2xl font-bold">
                  {doubts.filter(d => d.status === 'open').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Replies</p>
                <p className="text-2xl font-bold">
                  {doubts.reduce((sum, doubt) => sum + doubt.replies.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search doubts by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.map((doubt) => (
          <Card key={doubt.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedDoubt(doubt)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{doubt.title}</h3>
                    <Badge className={getStatusColor(doubt.status)}>
                      {getStatusIcon(doubt.status)}
                      <span className="ml-1">{doubt.status}</span>
                    </Badge>
                    <Badge variant="outline">{doubt.subject}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{doubt.content}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {doubt.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {doubt.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{doubt.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{doubt.author.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{doubt.author.name}</span>
                  </div>
                  <span>{formatTimeAgo(doubt.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{doubt.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{doubt.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{doubt.replies.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredDoubts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageCircleQuestion className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doubts found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or post a new doubt.</p>
          </CardContent>
        </Card>
      )}

      <PostDoubtDialog />
      <DoubtDetailDialog doubt={selectedDoubt} />
    </div>
  );
};

export default Doubts;


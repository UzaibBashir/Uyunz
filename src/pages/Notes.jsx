import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Plus,
  Calendar,
  Eye,
  Tag
} from 'lucide-react';
import { notesData } from '../data/notesData';

const Notes = () => {
  const [notes, setNotes] = useState(notesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Get unique subjects for filter
  const subjects = [...new Set(notes.map(note => note.subject))];

  // Filter notes based on search and subject
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = filterSubject === 'all' || note.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const handleUploadNote = (formData) => {
    const newNote = {
      id: notes.length + 1,
      title: formData.title,
      subject: formData.subject,
      description: formData.description,
      fileType: 'PDF',
      fileSize: '2.0 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };
    setNotes([newNote, ...notes]);
    setIsUploadDialogOpen(false);
  };
  

  const UploadDialog = () => {
    const [formData, setFormData] = useState({
      title: '',
      subject: '',
      description: '',
      tags: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleUploadNote(formData);
      setFormData({ title: '', subject: '', description: '', tags: '' });
    };

    return (
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload New Notes</DialogTitle>
            <DialogDescription>
              Add new course materials for students
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter note title"
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
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of the notes"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="e.g., algorithms, sorting, complexity"
              />
            </div>
            
            <div>
              <Label htmlFor="file">File Upload</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1">Upload Notes</Button>
              <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
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
          <h1 className="text-2xl font-bold text-gray-900">Notes Management</h1>
          <p className="text-gray-600">Upload and manage course materials</p>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setIsUploadDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Upload Notes</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Unvisted Notes</p>
                <p className="text-2xl font-bold">{notes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Downloads</p>
                <p className="text-2xl font-bold">
                  {notes.reduce((sum, note) => sum + note.downloads, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Recents</p>
                <p className="text-2xl font-bold">{subjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">
                  {notes.filter(note => new Date(note.uploadDate).getMonth() === new Date().getMonth()).length}
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
                placeholder="Search notes by title, description, or tags..."
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
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{note.title}</CardTitle>
                  <Badge variant="outline" className="mb-2">{note.subject}</Badge>
                </div>
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{note.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Size: {note.fileSize}</span>
                  <span>Type: {note.fileType}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{note.uploadDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-3 h-3" />
                    <span>{note.downloads} downloads</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {note.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{note.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredNotes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or upload new notes.</p>
          </CardContent>
        </Card>
      )}

      <UploadDialog />
    </div>
  );
};

export default Notes;


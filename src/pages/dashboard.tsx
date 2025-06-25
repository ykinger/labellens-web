import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDropzone } from "react-dropzone";
import { authenticatedApiRequest } from "@/lib/auth";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  Upload, 
  Image as ImageIcon,
  Download,
  Eye
} from "lucide-react";
import type { LabelSubmission } from "@shared/schema";

export default function Dashboard() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['US']);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Fetch user stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: async () => {
      const response = await authenticatedApiRequest('GET', '/api/stats');
      return response.json();
    }
  });

  // Fetch submissions
  const { data: submissions, isLoading: submissionsLoading } = useQuery({
    queryKey: ['/api/submissions'],
    queryFn: async () => {
      const response = await authenticatedApiRequest('GET', '/api/submissions');
      return response.json() as LabelSubmission[];
    }
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ file, regions }: { file: File; regions: string[] }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('regions', JSON.stringify(regions));
      
      const response = await authenticatedApiRequest('POST', '/api/submissions', formData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/submissions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({
        title: "Success",
        description: "Label uploaded successfully! Processing will begin shortly.",
      });
      setShowUploadDialog(false);
      setUploadFile(null);
      setSelectedRegions(['US']);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload label",
        variant: "destructive",
      });
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleUpload = () => {
    if (!uploadFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate({ file: uploadFile, regions: selectedRegions });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Compliant
          </Badge>
        );
      case 'needs_review':
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Needs Review
          </Badge>
        );
      case 'non_compliant':
        return (
          <Badge className="bg-danger/10 text-danger border-danger/20">
            <XCircle className="w-3 h-3 mr-1" />
            Non-Compliant
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            Processing...
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (statsLoading || submissionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your label submissions and compliance reports</p>
            </div>
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-blue-700 text-white px-6 py-3 font-medium">
                  <Plus className="mr-2 h-4 w-4" />
                  New Submission
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload New Label</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Upload File
                    </Label>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragActive
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      <input {...getInputProps()} />
                      {uploadFile ? (
                        <div className="space-y-2">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                            {uploadFile.type.startsWith('image/') ? (
                              <ImageIcon className="text-gray-500 h-6 w-6" />
                            ) : (
                              <FileText className="text-gray-500 h-6 w-6" />
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900">{uploadFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            Drag & drop a file here, or click to select
                          </p>
                          <p className="text-xs text-gray-500">
                            Supports: JPG, PNG, GIF, PDF (max 10MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Regions for Compliance Check
                    </Label>
                    <Select value={selectedRegions[0]} onValueChange={(value) => setSelectedRegions([value])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="EU">European Union</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleUpload}
                    disabled={uploadMutation.isPending || !uploadFile}
                    className="w-full"
                  >
                    {uploadMutation.isPending ? "Uploading..." : "Upload & Analyze"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-3xl font-bold text-gray-900">{stats?.totalSubmissions || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-primary text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Compliant</p>
                  <p className="text-3xl font-bold text-success">{stats?.compliant || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-success text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Needs Review</p>
                  <p className="text-3xl font-bold text-warning">{stats?.needsReview || 0}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="text-warning text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Non-Compliant</p>
                  <p className="text-3xl font-bold text-danger">{stats?.nonCompliant || 0}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="text-danger text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {submissions && submissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Label
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                              {submission.mimeType.startsWith('image/') ? (
                                <ImageIcon className="text-gray-500 h-5 w-5" />
                              ) : (
                                <FileText className="text-gray-500 h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {submission.originalName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {(submission.fileSize / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(submission.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {submission.regions.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(submission.submittedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <Button variant="ghost" size="sm" className="text-primary hover:text-blue-700">
                            <Eye className="h-4 w-4 mr-1" />
                            View Report
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by uploading your first food label for compliance analysis.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setShowUploadDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Label
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

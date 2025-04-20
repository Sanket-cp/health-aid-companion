
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Trash2, Edit, Plus, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface InsurancePolicy {
  id: string;
  name: string;
  company: string;
  policyNumber: string;
  type: string;
  expiryDate: Date;
  coverage: string;
  documents?: string[];
}

const Insurance = () => {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([
    {
      id: "1",
      name: "Comprehensive Health Plan",
      company: "Blue Cross Insurance",
      policyNumber: "BC-12345-H",
      type: "Health",
      expiryDate: new Date(2025, 11, 31), // Dec 31, 2025
      coverage: "$500,000",
      documents: ["policy_document.pdf", "terms_conditions.pdf"]
    },
    {
      id: "2",
      name: "Dental Care Plus",
      company: "DentaSure",
      policyNumber: "DS-78901-D",
      type: "Dental",
      expiryDate: new Date(2025, 8, 15), // Sep 15, 2025
      coverage: "$10,000",
      documents: ["dental_policy.pdf"]
    }
  ]);

  const [newPolicy, setNewPolicy] = useState<Partial<InsurancePolicy>>({
    name: "",
    company: "",
    policyNumber: "",
    type: "",
    coverage: "",
  });
  
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPolicy(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPolicy = () => {
    if (!expiryDate) {
      toast.error("Please select an expiry date");
      return;
    }
    
    // In a real app, this would be sent to Supabase
    const policy: InsurancePolicy = {
      id: Date.now().toString(),
      name: newPolicy.name || "",
      company: newPolicy.company || "",
      policyNumber: newPolicy.policyNumber || "",
      type: newPolicy.type || "",
      expiryDate: expiryDate,
      coverage: newPolicy.coverage || "",
      documents: [],
    };
    
    setPolicies(prev => [...prev, policy]);
    toast.success("Insurance policy added successfully");
    
    // Reset form and close dialog
    setNewPolicy({
      name: "",
      company: "",
      policyNumber: "",
      type: "",
      coverage: "",
    });
    setExpiryDate(undefined);
    setIsAddDialogOpen(false);
  };

  const handleDeletePolicy = (id: string) => {
    setPolicies(policies.filter(policy => policy.id !== id));
    toast.success("Insurance policy deleted successfully");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Insurance Management</h1>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="policies">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="policies">My Policies</TabsTrigger>
              <TabsTrigger value="claims">Claims History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="policies">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Insurance Policies</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-medimate-primary hover:bg-medimate-secondary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Policy
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Insurance Policy</DialogTitle>
                      <DialogDescription>
                        Enter your insurance policy details below.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Policy Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={newPolicy.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Comprehensive Health Plan"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Insurance Company</Label>
                          <Input 
                            id="company" 
                            name="company"
                            value={newPolicy.company}
                            onChange={handleInputChange}
                            placeholder="e.g. Blue Cross"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="type">Policy Type</Label>
                          <Input 
                            id="type" 
                            name="type"
                            value={newPolicy.type}
                            onChange={handleInputChange}
                            placeholder="e.g. Health, Dental, Vision"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="policyNumber">Policy Number</Label>
                          <Input 
                            id="policyNumber" 
                            name="policyNumber"
                            value={newPolicy.policyNumber}
                            onChange={handleInputChange}
                            placeholder="e.g. ABC-12345"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="coverage">Coverage Amount</Label>
                          <Input 
                            id="coverage" 
                            name="coverage"
                            value={newPolicy.coverage}
                            onChange={handleInputChange}
                            placeholder="e.g. $500,000"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Expiry Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !expiryDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {expiryDate ? format(expiryDate, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={expiryDate}
                              onSelect={setExpiryDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Upload Documents (Optional)</Label>
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
                          <div className="text-center">
                            <FileText className="h-8 w-8 mx-auto text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">
                              PDF, PNG, JPG up to 10MB
                            </p>
                            <Button 
                              variant="outline" 
                              className="mt-4"
                              onClick={() => {
                                toast.info("Document upload", {
                                  description: "This would allow file uploads in a real app."
                                });
                              }}
                            >
                              Select Files
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="button" 
                        className="bg-medimate-primary hover:bg-medimate-secondary"
                        onClick={handleAddPolicy}
                      >
                        Add Policy
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {policies.length > 0 ? (
                <div className="space-y-4">
                  {policies.map((policy) => (
                    <Card key={policy.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Shield className="h-5 w-5 text-medimate-primary" />
                              {policy.name}
                            </CardTitle>
                            <CardDescription>{policy.company}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                toast.info("Edit policy", {
                                  description: "This would allow editing the policy in a real app."
                                });
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeletePolicy(policy.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                          <div>
                            <p className="font-semibold text-gray-500">Policy Number</p>
                            <p>{policy.policyNumber}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-500">Type</p>
                            <p>{policy.type}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-500">Coverage</p>
                            <p>{policy.coverage}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-500">Expiry Date</p>
                            <p className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(policy.expiryDate, "PPP")}
                            </p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="font-semibold text-gray-500">Documents</p>
                            {policy.documents && policy.documents.length > 0 ? (
                              <div className="flex flex-wrap gap-2 mt-1">
                                {policy.documents.map((doc, idx) => (
                                  <Button 
                                    key={idx} 
                                    variant="outline" 
                                    size="sm"
                                    className="text-xs"
                                    onClick={() => {
                                      toast.info(`Viewing ${doc}`, {
                                        description: "This would open the document in a real app."
                                      });
                                    }}
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    {doc}
                                  </Button>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-400">No documents uploaded</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="w-full flex justify-end gap-3">
                          <Button 
                            variant="outline"
                            className="border-medimate-primary text-medimate-primary"
                            onClick={() => {
                              toast.info("Download policy details", {
                                description: "This would download policy details in a real app."
                              });
                            }}
                          >
                            Download Details
                          </Button>
                          <Button 
                            className="bg-medimate-primary hover:bg-medimate-secondary"
                            onClick={() => {
                              toast.info("File claim", {
                                description: "This would allow filing a claim in a real app."
                              });
                            }}
                          >
                            File a Claim
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                  <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No insurance policies found</h3>
                  <p className="text-gray-500 mb-6">You haven't added any insurance policies yet.</p>
                  <Button 
                    className="bg-medimate-primary hover:bg-medimate-secondary"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Policy
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="claims">
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No claims history</h3>
                <p className="text-gray-500 mb-6">
                  You haven't filed any insurance claims yet. When you do, they'll appear here.
                </p>
                <Button 
                  className="bg-medimate-primary hover:bg-medimate-secondary"
                  onClick={() => {
                    toast.info("File a new claim", {
                      description: "This would allow filing a new claim in a real app."
                    });
                  }}
                >
                  File a New Claim
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Insurance;

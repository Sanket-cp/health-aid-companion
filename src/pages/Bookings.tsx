
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Booking {
  id: string;
  name: string;
  date: Date;
  time: string;
  reason: string;
  doctor: string;
  location: string;
}

const Bookings = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    time: "",
    reason: "",
    doctor: "",
    location: "",
  });
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      name: "General Checkup",
      date: new Date(2025, 3, 25), // April 25, 2025
      time: "10:00 AM",
      reason: "Annual physical examination",
      doctor: "Dr. Johnson",
      location: "City Medical Center"
    },
    {
      id: "2",
      name: "Dental Cleaning",
      date: new Date(2025, 4, 10), // May 10, 2025
      time: "2:30 PM",
      reason: "Regular cleaning and checkup",
      doctor: "Dr. Smith",
      location: "Smile Dental Clinic"
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error("Please select a date for your appointment");
      return;
    }
    
    // In a real app, this would be sent to Supabase
    const newBooking: Booking = {
      id: Date.now().toString(),
      name: bookingForm.name,
      date: date,
      time: bookingForm.time,
      reason: bookingForm.reason,
      doctor: bookingForm.doctor,
      location: bookingForm.location,
    };
    
    setBookings(prev => [...prev, newBooking]);
    toast.success("Appointment booked successfully", {
      description: `Your appointment on ${format(date, "PPP")} at ${bookingForm.time} has been scheduled.`
    });
    
    // Reset form
    setBookingForm({
      name: "",
      time: "",
      reason: "",
      doctor: "",
      location: "",
    });
    setDate(undefined);
  };

  const handleTabChange = (value: string) => {
    // No direct DOM manipulation needed
  };

  // Function to navigate to book tab
  const navigateToBookTab = () => {
    const bookTab = document.querySelector('[data-value="book"]') as HTMLElement;
    if (bookTab) {
      bookTab.click();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Health Checkup Bookings</h1>
        
        <Tabs defaultValue="upcoming" className="max-w-4xl mx-auto" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
            <TabsTrigger value="book">Book New Appointment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-4">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <CardTitle>{booking.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{format(booking.date, "PPP")}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold">Doctor</p>
                          <p>{booking.doctor}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {booking.location}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">Reason</p>
                          <p>{booking.reason}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-medimate-primary text-medimate-primary"
                          onClick={() => {
                            toast.info("Appointment rescheduling", {
                              description: "This would allow rescheduling in a real app."
                            });
                          }}
                        >
                          Reschedule
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setBookings(bookings.filter(b => b.id !== booking.id));
                            toast.success("Appointment cancelled successfully");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">You don't have any upcoming appointments.</p>
                  <Button 
                    className="mt-4 bg-medimate-primary hover:bg-medimate-secondary"
                    onClick={navigateToBookTab}
                  >
                    Book Your First Appointment
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="book" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Book a Health Checkup</CardTitle>
                <CardDescription>
                  Schedule an appointment with our healthcare professionals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Appointment Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      placeholder="e.g. Annual Physical, Dental Checkup"
                      value={bookingForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time" 
                        name="time"
                        placeholder="e.g. 10:00 AM"
                        value={bookingForm.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <Textarea 
                      id="reason" 
                      name="reason"
                      placeholder="Briefly describe your reason for the appointment..."
                      value={bookingForm.reason}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Doctor/Specialist (Optional)</Label>
                      <Input 
                        id="doctor" 
                        name="doctor"
                        placeholder="e.g. Dr. Smith"
                        value={bookingForm.doctor}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Preferred Location (Optional)</Label>
                      <Input 
                        id="location" 
                        name="location"
                        placeholder="e.g. City Medical Center"
                        value={bookingForm.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-medimate-primary hover:bg-medimate-secondary"
                    >
                      Book Appointment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Bookings;

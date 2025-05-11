
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateEvent = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Event form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [college, setCollege] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [image, setImage] = useState("");

  // Redirect if not authenticated or not an organizer
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/create-event");
      return;
    }
    
    if (user && user.role !== "organizer") {
      toast({
        title: "Access Denied",
        description: "Only organizers can create events",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!title || !description || !date || !time || !location || !college || !category || !price || !totalSeats) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would make an API call to create the event
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Event Created",
        description: "Your event has been created successfully",
      });
      navigate("/dashboard");
    }, 1500);
  };

  // Predefined categories
  const categories = ["Technical", "Cultural", "Sports", "Business", "Literary", "Workshop", "Other"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Create Event</h1>
          <p className="text-gray-600">
            Host your event and reach students across colleges
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>
                  Provide information about your event
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title<span className="text-red-500">*</span></Label>
                    <Input
                      id="title"
                      placeholder="e.g., Annual Tech Fest 2025"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description<span className="text-red-500">*</span></Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a detailed description of your event"
                      className="min-h-32"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date<span className="text-red-500">*</span></Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time<span className="text-red-500">*</span></Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Venue<span className="text-red-500">*</span></Label>
                      <Input
                        id="location"
                        placeholder="e.g., Main Auditorium"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="college">College/University<span className="text-red-500">*</span></Label>
                      <Input
                        id="college"
                        placeholder="e.g., IIT Delhi"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category<span className="text-red-500">*</span></Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Ticket Price (₹)<span className="text-red-500">*</span></Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        placeholder="e.g., 499"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalSeats">Total Seats<span className="text-red-500">*</span></Label>
                      <Input
                        id="totalSeats"
                        type="number"
                        min="1"
                        placeholder="e.g., 200"
                        value={totalSeats}
                        onChange={(e) => setTotalSeats(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Event Image URL<span className="text-red-500">*</span></Label>
                    <Input
                      id="image"
                      placeholder="e.g., https://example.com/image.jpg"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      Provide a URL to an image that represents your event. In a real app, you would upload an image here.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-eventx-purple hover:bg-eventx-dark-purple"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Event..." : "Create Event"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Tips for Creating Great Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eventx-purple h-5 w-5 flex-shrink-0">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>
                      <strong>Be specific with your title</strong>
                      <p className="text-gray-500">
                        Make it catchy and descriptive so students immediately understand what your event is about.
                      </p>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eventx-purple h-5 w-5 flex-shrink-0">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>
                      <strong>Add a detailed description</strong>
                      <p className="text-gray-500">
                        Include agenda, speakers, what attendees can expect, and any prerequisites.
                      </p>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eventx-purple h-5 w-5 flex-shrink-0">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>
                      <strong>Choose a compelling image</strong>
                      <p className="text-gray-500">
                        Use high-quality, relevant images that represent your event accurately.
                      </p>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eventx-purple h-5 w-5 flex-shrink-0">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>
                      <strong>Set a strategic price</strong>
                      <p className="text-gray-500">
                        Consider your audience and value delivered. Free events get more registrations, but paid events often have better attendance.
                      </p>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateEvent;

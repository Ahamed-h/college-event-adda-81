
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BadgeIndianRupee, 
  Share2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { events } from "@/data/mockEvents";
import { formatDate, formatCurrency } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Event not found</h1>
          <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/events")}>Browse Events</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookTickets = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book tickets",
        variant: "destructive",
      });
      navigate("/login?redirect=" + encodeURIComponent(`/events/${id}`));
      return;
    }

    // In a real app, this would navigate to checkout or make an API call
    toast({
      title: "Tickets Reserved!",
      description: `You've reserved ${quantity} ticket${quantity > 1 ? 's' : ''} for ${event.title}`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out ${event.title} at ${event.college}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Event link copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Event Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Event Image */}
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h1 className="text-3xl font-bold">{event.title}</h1>
                <Badge className="mt-2 sm:mt-0 bg-eventx-purple">{event.category}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span>{event.location}, {event.college}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span>Organized by {event.organizerName}</span>
                </div>
              </div>

              <Separator className="my-6" />
              
              <div>
                <h2 className="text-xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar (Booking) */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Book Tickets</h3>
                <div className="flex items-center">
                  <BadgeIndianRupee className="h-5 w-5 text-eventx-orange" />
                  <span className="text-2xl font-bold text-eventx-orange">{formatCurrency(event.price)}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">
                  Available: {event.seats.available} / {event.seats.total} seats
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${
                      event.seats.available < event.seats.total * 0.2 
                        ? "bg-red-500" 
                        : event.seats.available < event.seats.total * 0.5 
                          ? "bg-yellow-500" 
                          : "bg-green-500"
                    } h-2 rounded-full`} 
                    style={{ width: `${(event.seats.available / event.seats.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" htmlFor="quantity">
                  Number of Tickets
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(event.seats.available, quantity + 1))}
                    disabled={quantity >= event.seats.available}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Ticket Price</span>
                  <span>{formatCurrency(event.price)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Quantity</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between py-2 font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(event.price * quantity)}</span>
                </div>
              </div>

              <Button 
                className="w-full bg-eventx-purple hover:bg-eventx-dark-purple mb-4"
                onClick={handleBookTickets}
              >
                Book Now
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" /> 
                Share Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;


import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Event } from "@/data/mockEvents";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const {
    id,
    title,
    date,
    location,
    college,
    category,
    price,
    image,
    organizerName,
    seats,
  } = event;

  const availabilityPercentage = (seats.available / seats.total) * 100;
  let availabilityColor = "bg-green-500";
  
  if (availabilityPercentage <= 20) {
    availabilityColor = "bg-red-500";
  } else if (availabilityPercentage <= 50) {
    availabilityColor = "bg-yellow-500";
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <Badge className="absolute top-2 right-2 bg-eventx-purple">{category}</Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold line-clamp-1">{title}</h3>
          <span className="font-bold text-eventx-orange">₹{price}</span>
        </div>
        <p className="text-sm text-muted-foreground">{college}</p>
      </CardHeader>
      
      <CardContent className="space-y-2 pb-0">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>{formatDate(date)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-gray-500" />
          <span>{organizerName}</span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <span>{location}</span>
        </div>
        
        <div className="mt-2">
          <div className="text-xs text-gray-600 mb-1 flex justify-between">
            <span>Available seats: {seats.available}/{seats.total}</span>
            <span>{Math.round(availabilityPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${availabilityColor} h-2 rounded-full`} 
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button asChild className="w-full bg-eventx-purple hover:bg-eventx-dark-purple">
          <Link to={`/events/${id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;

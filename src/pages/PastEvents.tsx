import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pastEvents } from "@/data/mockPastEvents";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, Star, ImageIcon, History, BadgeIndianRupee, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { events } from "@/data/mockEvents";
import EventCard from "@/components/EventCard";
import { 
  Pagination,
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const PastEvents = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Events History</h1>
          <p className="text-gray-600">
            Browse through our past events and see what's coming up next
          </p>
        </header>

        {/* Tabs */}
        <Tabs defaultValue="past" className="w-full mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Past Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-eventx-purple">
                      {event.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{event.title}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{event.rating}/5</span>
                      </div>
                    </div>
                    <CardDescription>Organized by {event.organizerName}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>
                          {event.joinedParticipants}/{event.totalParticipants} participants
                        </span>
                      </div>
                    </div>
                    
                    {/* Revenue Statement */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <BadgeIndianRupee className="h-5 w-5 text-eventx-orange" />
                        <h4 className="font-medium">Revenue Earned</h4>
                      </div>
                      <p className="text-sm">
                        We received 10% of the ticket revenue from customers at this event.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Event Highlight</h4>
                      <p className="text-gray-700 text-sm italic">"{event.feedbackHighlight}"</p>
                    </div>
                    
                    {event.benefits && event.benefits.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Benefits</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {event.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {event.testimonials && event.testimonials.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Testimonials</h4>
                        <div className="space-y-3">
                          {event.testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded text-sm">
                              <div className="flex justify-between">
                                <p className="font-medium">{testimonial.name}</p>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs ml-1">{testimonial.rating}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 mt-1">"{testimonial.comment}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex flex-col sm:flex-row gap-2">
                    {event.hasGallery && (
                      <Button variant="outline" className="w-full sm:w-auto flex gap-2 items-center">
                        <ImageIcon className="h-4 w-4" />
                        <span>View Gallery</span>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Revenue Proof Section at the end of the page */}
            <div className="mt-12 bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-eventx-purple" />
                Proof of Revenue Earning
              </h3>
              
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-medium mb-2">Revenue Verification Policy</h4>
                  <p className="text-sm text-gray-700">
                    For each event, EventX collects 10% of ticket revenue directly from customers. 
                    This revenue is tracked through our secure payment system and verified by independent auditors.
                  </p>
                </div>
                
                <div className="border-b pb-3">
                  <h4 className="font-medium mb-2">Summary of Earnings (2025)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-500">Total Events</p>
                        <p className="font-semibold text-lg">{pastEvents.length}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-500">Revenue Share</p>
                        <p className="font-semibold text-lg">10%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-500">Total Participants</p>
                        <p className="font-semibold text-lg">20</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-500">Total Revenue</p>
                        <p className="font-semibold text-lg">{formatCurrency(2000)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Verification Documentation</h4>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Button variant="outline" className="text-sm">
                      <FileText className="h-4 w-4 mr-2" /> 
                      Revenue Audit Report
                    </Button>
                    <Button variant="outline" className="text-sm">
                      <FileText className="h-4 w-4 mr-2" /> 
                      Payment Transactions
                    </Button>
                    <Button variant="outline" className="text-sm">
                      <FileText className="h-4 w-4 mr-2" /> 
                      Financial Statement
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default PastEvents;

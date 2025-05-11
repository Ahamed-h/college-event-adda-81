
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/data/mockEvents";
import { formatDate, formatCurrency } from "@/lib/utils";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; // or loading indicator
  }

  // Mock data for tickets (in a real app, this would come from the API)
  const mockTickets = [
    {
      id: "ticket-1",
      eventId: "event-2",
      eventTitle: events.find(e => e.id === "event-2")?.title || "",
      eventDate: events.find(e => e.id === "event-2")?.date || "",
      eventLocation: events.find(e => e.id === "event-2")?.location || "",
      eventCollege: events.find(e => e.id === "event-2")?.college || "",
      quantity: 2,
      price: events.find(e => e.id === "event-2")?.price || 0,
      purchaseDate: "2025-05-05",
      status: "confirmed",
    },
  ];

  // Mock data for events created by the organizer
  const mockCreatedEvents = user.role === "organizer" ? [
    {
      ...events.find(e => e.id === "event-3"),
      tickets: {
        sold: 215,
        total: 300,
      },
      revenue: 214785,
    },
  ] : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            {user.role === "student" 
              ? "Manage your tickets and bookings" 
              : "Manage your events and track performance"}
          </p>
        </header>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {user.role === "student" && <TabsTrigger value="tickets">My Tickets</TabsTrigger>}
            {user.role === "organizer" && <TabsTrigger value="events">My Events</TabsTrigger>}
            {user.role === "organizer" && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome, {user.name}</CardTitle>
                  <CardDescription>
                    {user.role === "student" 
                      ? "Your student dashboard" 
                      : "Your organizer dashboard"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Type</span>
                      <Badge className="bg-eventx-purple">
                        {user.role === "student" ? "Student" : "Event Organizer"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {user.role === "student" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Events you've booked</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="font-bold text-3xl">
                        {mockTickets.length}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        You have {mockTickets.length} upcoming events
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <Button className="w-full bg-eventx-purple hover:bg-eventx-dark-purple" onClick={() => navigate("/events")}>
                        Explore Events
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => navigate("/profile")}>
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}

              {user.role === "organizer" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-3xl font-bold">
                            {mockCreatedEvents.length}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Active Events
                          </p>
                        </div>
                        <div>
                          <div className="text-3xl font-bold">
                            {mockCreatedEvents.reduce((acc, event) => acc + (event.tickets?.sold || 0), 0)}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Tickets Sold
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <Button className="w-full bg-eventx-purple hover:bg-eventx-dark-purple" onClick={() => navigate("/create-event")}>
                        Create Event
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => navigate("/profile")}>
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>
          
          {user.role === "student" && (
            <TabsContent value="tickets" className="mt-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Your Tickets</h3>
                </div>
                {mockTickets.length > 0 ? (
                  <div className="divide-y">
                    {mockTickets.map((ticket) => (
                      <div key={ticket.id} className="p-6">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h4 className="font-bold mb-1">{ticket.eventTitle}</h4>
                            <div className="text-sm text-gray-500">
                              {formatDate(ticket.eventDate)} • {ticket.eventLocation}, {ticket.eventCollege}
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge className={ticket.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                {ticket.status === "confirmed" ? "Confirmed" : "Pending"}
                              </Badge>
                              <span className="text-sm">
                                {ticket.quantity} {ticket.quantity > 1 ? "tickets" : "ticket"}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 md:text-right">
                            <div className="font-bold text-lg">{formatCurrency(ticket.price * ticket.quantity)}</div>
                            <div className="text-xs text-gray-500">Purchased on {formatDate(ticket.purchaseDate)}</div>
                            <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate(`/events/${ticket.eventId}`)}>
                              View Event
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500 mb-4">You haven't booked any events yet</p>
                    <Button onClick={() => navigate("/events")}>Explore Events</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          )}

          {user.role === "organizer" && (
            <>
              <TabsContent value="events" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b flex justify-between items-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Your Events</h3>
                    <Button onClick={() => navigate("/create-event")} className="bg-eventx-purple hover:bg-eventx-dark-purple">
                      Create Event
                    </Button>
                  </div>
                  {mockCreatedEvents.length > 0 ? (
                    <div className="divide-y">
                      {mockCreatedEvents.map((event) => (
                        <div key={event?.id} className="p-6">
                          {event && (
                            <div className="flex flex-col md:flex-row justify-between">
                              <div className="flex gap-4">
                                <div className="hidden sm:block">
                                  <img 
                                    src={event.image} 
                                    alt={event.title} 
                                    className="w-20 h-20 object-cover rounded-lg"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-bold mb-1">{event.title}</h4>
                                  <div className="text-sm text-gray-500">
                                    {formatDate(event.date)} • {event.location}, {event.college}
                                  </div>
                                  <div className="mt-2 flex items-center gap-2">
                                    <Badge className="bg-eventx-purple">{event.category}</Badge>
                                    <span className="text-sm">
                                      {formatCurrency(event.price)} per ticket
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0 md:text-right">
                                <div>
                                  <span className="font-bold">{event.tickets.sold}</span>
                                  <span className="text-gray-500">/{event.tickets.total} tickets sold</span>
                                </div>
                                <div className="font-bold text-lg text-eventx-orange">
                                  {formatCurrency(event.revenue)}
                                </div>
                                <div className="flex gap-2 mt-2 justify-end">
                                  <Button variant="outline" size="sm" onClick={() => navigate(`/events/${event.id}`)}>
                                    View
                                  </Button>
                                  <Button size="sm" className="bg-eventx-purple hover:bg-eventx-dark-purple">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500 mb-4">You haven't created any events yet</p>
                      <Button onClick={() => navigate("/create-event")} className="bg-eventx-purple hover:bg-eventx-dark-purple">
                        Create Your First Event
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Analytics</CardTitle>
                    <CardDescription>Track the performance of your events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockCreatedEvents.length > 0 ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Total Revenue</div>
                            <div className="text-3xl font-bold text-eventx-purple">
                              {formatCurrency(mockCreatedEvents.reduce((acc, event) => acc + (event.revenue || 0), 0))}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Tickets Sold</div>
                            <div className="text-3xl font-bold text-eventx-purple">
                              {mockCreatedEvents.reduce((acc, event) => acc + (event.tickets?.sold || 0), 0)}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Events Created</div>
                            <div className="text-3xl font-bold text-eventx-purple">
                              {mockCreatedEvents.length}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">In a real application, this would include:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>Ticket sales charts over time</li>
                            <li>Revenue breakdown</li>
                            <li>Attendee demographics</li>
                            <li>Marketing performance</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-500 mb-4">No analytics available. Create events to see analytics.</p>
                        <Button onClick={() => navigate("/create-event")} className="bg-eventx-purple hover:bg-eventx-dark-purple">
                          Create Your First Event
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { events } from "@/data/mockEvents";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  // Get featured events
  const featuredEvents = events.filter(event => event.featured);

  // Get categories
  const categories = [...new Set(events.map(event => event.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-eventx-purple to-eventx-dark-purple text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Amazing College Events
              </h1>
              <p className="text-lg mb-6 text-white/80">
                Find and book tickets for the best events happening in colleges across India. Connect with like-minded students and expand your horizons.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-eventx-orange hover:bg-eventx-orange/90 text-white" asChild>
                  <Link to="/events">Explore Events</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-eventx-purple" asChild>
                  <Link to="/create-event">Host an Event</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000" 
                    alt="Events" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-eventx-purple font-bold text-xl">500+</span>
                    <span className="text-gray-700">Events Monthly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Events</h2>
            <Link to="/events" className="text-eventx-purple hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/events?category=${category}`}
                className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
              >
                <Badge className="bg-eventx-light-purple text-eventx-purple mb-2">{category}</Badge>
                <h3 className="font-medium">{category} Events</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            How EventX Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-eventx-light-purple rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eventx-purple">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m16 10-4 4-2-2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Discover</h3>
              <p className="text-gray-600">
                Find the perfect event happening in colleges across India based on your interests.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-eventx-light-purple rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eventx-purple">
                  <rect width="20" height="14" x="2" y="5" rx="2"/>
                  <line x1="2" x2="22" y1="10" y2="10"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Book</h3>
              <p className="text-gray-600">
                Secure your tickets with easy online payments using UPI, cards, or netbanking.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-eventx-light-purple rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eventx-purple">
                  <path d="M18 8c0 2.5-2.5 4-5 4H9c-2.5 0-5-1.5-5-4s2.5-4 5-4h4c2.5 0 5-1.5 5-4s-2.5-4-5-4H9c-2.5 0-5 1.5-5 4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Attend</h3>
              <p className="text-gray-600">
                Get e-tickets directly on your phone and enjoy hassle-free entry to events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizer CTA Section */}
      <section className="py-16 bg-eventx-light-purple">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Are you organizing an event?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Reach thousands of college students across India. Create and promote your events on EventX.
              </p>
              <Button size="lg" className="bg-eventx-purple hover:bg-eventx-dark-purple text-white" asChild>
                <Link to="/create-event">Start Hosting</Link>
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <img 
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000" 
                alt="Organizer" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

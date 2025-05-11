
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { events } from "@/data/mockEvents";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Get unique categories and colleges
  const categories = [...new Set(events.map(event => event.category))];
  const colleges = [...new Set(events.map(event => event.college))];

  // Filter events based on search params and filters
  useEffect(() => {
    let result = events;

    // Filter by category from URL params
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    // Apply filters
    if (searchTerm) {
      result = result.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.college.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(event => event.category === selectedCategory);
    }

    if (selectedCollege) {
      result = result.filter(event => event.college === selectedCollege);
    }

    if (priceRange) {
      switch (priceRange) {
        case "free":
          result = result.filter(event => event.price === 0);
          break;
        case "under500":
          result = result.filter(event => event.price > 0 && event.price < 500);
          break;
        case "500to1000":
          result = result.filter(event => event.price >= 500 && event.price <= 1000);
          break;
        case "above1000":
          result = result.filter(event => event.price > 1000);
          break;
        default:
          break;
      }
    }

    setFilteredEvents(result);
  }, [searchParams, searchTerm, selectedCategory, selectedCollege, priceRange]);

  // Update search params when category changes
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value && value !== "all") {
      searchParams.set("category", value);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // No need to do anything, the useEffect will handle filtering
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedCollege("");
    setPriceRange("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Explore Events</h1>
          <p className="text-gray-600">
            Discover amazing events happening in colleges across India
          </p>
        </header>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events, colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="bg-eventx-purple hover:bg-eventx-dark-purple">
                Search
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">College</label>
              <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                <SelectTrigger>
                  <SelectValue placeholder="All Colleges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  {colleges.map((college) => (
                    <SelectItem key={college} value={college}>
                      {college}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Price Range</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="under500">Under ₹500</SelectItem>
                  <SelectItem value="500to1000">₹500 - ₹1000</SelectItem>
                  <SelectItem value="above1000">Above ₹1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters} className="w-full">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory || selectedCollege || priceRange) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory && selectedCategory !== "all" && (
              <Badge className="bg-eventx-light-purple text-eventx-purple">
                {selectedCategory}
                <button 
                  className="ml-1"
                  onClick={() => handleCategoryChange("all")}
                >
                  &times;
                </button>
              </Badge>
            )}
            {selectedCollege && selectedCollege !== "all" && (
              <Badge className="bg-eventx-light-purple text-eventx-purple">
                {selectedCollege}
                <button 
                  className="ml-1"
                  onClick={() => setSelectedCollege("all")}
                >
                  &times;
                </button>
              </Badge>
            )}
            {priceRange && priceRange !== "all" && (
              <Badge className="bg-eventx-light-purple text-eventx-purple">
                {priceRange === "free" && "Free"}
                {priceRange === "under500" && "Under ₹500"}
                {priceRange === "500to1000" && "₹500 - ₹1000"}
                {priceRange === "above1000" && "Above ₹1000"}
                <button 
                  className="ml-1"
                  onClick={() => setPriceRange("all")}
                >
                  &times;
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button onClick={resetFilters} variant="outline">Reset All Filters</Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Events;

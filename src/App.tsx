import React, { useState, useEffect, useRef } from 'react';
import eventImage1 from './assets/WhatsApp Image 2025-09-15 at 13.33.45.jpeg';
import eventImage2 from './assets/pic.jpg';
import autoImg1 from './assets/autoscroll/images.jpg';
import autoImg2 from './assets/autoscroll/life-bits-44.jpeg';
import { Calendar as CalendarIcon, MapPin, Clock, Users, Plus } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  speaker?: string;
  posterUrl: string;
  category: string;
  startDateTime: string;
  endDateTime: string;
}

function App() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [currentMonth, setCurrentMonth] = useState('September');

  const events: Event[] = [
    {
      id: 1,
      title: "Bridging the AI Gap: From Tools to Implementation",
      date: "16th September 2025",
      time: "6:00 PM to 7:00 PM",
      venue: "Virtual Webinar",
      speaker: "Mr. Ramesh Pattnaik, VP Sales & BD, PMI Pune Chapter",
      posterUrl: eventImage1,
      category: "Kaleidoscope Webinar Series",
      startDateTime: "20250916T180000Z",
      endDateTime: "20250916T190000Z"
    },
    {
      id: 2,
      title: "Mind, Market & Ministries",
      date: "27th September 2025",
      time: "11:30 AM to 12:30 PM",
      venue: "Room 6163, NAB, BITS Pilani, Pilani Campus",
      speaker: " Mr. Kunal Rahar, Deputy Commissioner, Bikaner Development Authority (Govt. of Rajasthan)",
      posterUrl:  eventImage2,
      category: "Industry Connect Series",
      startDateTime: "20250927T113000Z",
      endDateTime: "20250927T123000Z"
    },
    {
      id: 3,
      title: "Sustainable Business Practices Workshop",
      date: "28th September 2025",
      time: "10:00 AM to 12:00 PM",
      venue: "Conference Room B",
      speaker: "Prof. Michael Rodriguez, Sustainability Expert",
      posterUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Professional Development",
      startDateTime: "20250928T100000Z",
      endDateTime: "20250928T120000Z"
    },
    {
      id: 4,
      title: "Career Guidance Session",
      date: "30th September 2025",
      time: "2:00 PM to 4:00 PM",
      venue: "Main Auditorium",
      speaker: "Industry Panel of Experts",
      posterUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Student Development",
      startDateTime: "20250930T140000Z",
      endDateTime: "20250930T160000Z"
    }
  ];

  const generateGoogleCalendarUrl = (event: Event) => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams({
      text: event.title,
      dates: `${event.startDateTime}/${event.endDateTime}`,
      details: `Speaker: ${event.speaker || 'TBA'}\nCategory: ${event.category}`,
      location: event.venue,
      ctz: 'Asia/Kolkata'
    });
    return `${baseUrl}&${params.toString()}`;
  };



  // Carousel state for hero section (use images from assets/autoscroll)
  const autoScrollImages = [autoImg1, autoImg2];
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    carouselInterval.current = setInterval(() => {
      setCarouselIndex(idx => (idx + 1) % autoScrollImages.length);
    }, 3000); // Change image every 3 seconds
    return () => {
      if (carouselInterval.current) clearInterval(carouselInterval.current);
    };
  }, [autoScrollImages.length]);

  // Filter events by selected month
  const filteredEvents = events.filter(event => {
    // Try to extract month from event.date (e.g., "16th September 2025")
    const eventMonth = event.date.split(' ')[1];
    return eventMonth === currentMonth;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}

      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
        {/* Carousel Images from assets/autoscroll */}
        <div className="absolute inset-0 w-full h-full z-0">
          {autoScrollImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`Autoscroll ${idx + 1}`}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${carouselIndex === idx ? 'opacity-60' : 'opacity-0'}`}
              style={{ zIndex: carouselIndex === idx ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Department of Management</h1>
            <h2 className="text-2xl font-light mb-6">Calendar</h2>
            <p className="text-lg opacity-90">
              Stay updated with upcoming events, workshops, and seminars from the Department of Management
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Upcoming Events in {currentMonth}
              </h2>
              <p className="text-gray-600">Department of Management • BITS Pilani</p>
            </div>
            <div className="flex items-center space-x-2 text-blue-900">
              <CalendarIcon className="w-6 h-6" />
              <select
                className="font-medium bg-white border border-blue-300 rounded px-2 py-1 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={currentMonth}
                onChange={e => setCurrentMonth(e.target.value)}
                aria-label="Select month"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onAddToCalendar={generateGoogleCalendarUrl} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">No events for this month.</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm opacity-75">
              © 2025 Birla Institute of Technology and Science, Pilani. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function EventCard({ event, onAddToCalendar }: { 
  event: Event; 
  onAddToCalendar: (event: Event) => string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const calendarUrl = onAddToCalendar(event);
    window.open(calendarUrl, '_blank');
  };

  return (
    <div
      className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
        <img
          src={event.posterUrl}
          alt={event.title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-white backdrop-blur-sm bg-opacity-90">
            {event.category}
          </span>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="bg-black/40 backdrop-blur-sm p-3 rounded-lg mb-4">
              <h3 className="text-xl font-bold leading-tight drop-shadow-lg">
                {event.title}
              </h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CalendarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{event.date}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{event.venue}</span>
              </div>
              
              {event.speaker && (
                <div className="flex items-start text-sm mt-3 pt-2 border-t border-white/20">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">{event.speaker}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-white/20">
              <button
                onClick={handleAddToCalendar}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-yellow-400 transition-all duration-300 ${
            isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-60'
          }`}
        />
      </div>
    </div>
  );
}

export default App;

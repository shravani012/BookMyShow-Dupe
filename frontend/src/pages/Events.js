import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";

const eventsData = [
  { id: 1, name: "Music Concert", location: "Mumbai", date: "April 10, 2025", image: "https://via.placeholder.com/200" },
  { id: 2, name: "Stand-up Comedy", location: "Delhi", date: "April 15, 2025", image: "https://via.placeholder.com/200" },
  { id: 3, name: "Theatre Play", location: "Bangalore", date: "April 20, 2025", image: "https://via.placeholder.com/200" },
  { id: 4, name: "Food Festival", location: "Mumbai", date: "April 25, 2025", image: "https://via.placeholder.com/200" },
  { id: 5, name: "Art Exhibition", location: "Delhi", date: "April 30, 2025", image: "https://via.placeholder.com/200" },
  { id: 6, name: "Tech Conference", location: "Bangalore", date: "May 5, 2025", image: "https://via.placeholder.com/200" },
  { id: 7, name: "Bollywood Night", location: "Mumbai", date: "May 10, 2025", image: "https://via.placeholder.com/200" },
  { id: 8, name: "Gaming Convention", location: "Delhi", date: "May 15, 2025", image: "https://via.placeholder.com/200" },
  { id: 9, name: "Fitness Expo", location: "Bangalore", date: "May 20, 2025", image: "https://via.placeholder.com/200" },
  { id: 10, name: "Dance Workshop", location: "Mumbai", date: "May 25, 2025", image: "https://via.placeholder.com/200" },
  { id: 11, name: "Startup Meetup", location: "Hyderabad", date: "May 28, 2025", image: "https://via.placeholder.com/200" },
  { id: 12, name: "Coding Bootcamp", location: "Chennai", date: "June 2, 2025", image: "https://via.placeholder.com/200" },
  { id: 13, name: "Photography Expo", location: "Pune", date: "June 5, 2025", image: "https://via.placeholder.com/200" },
  { id: 14, name: "Book Fair", location: "Kolkata", date: "June 10, 2025", image: "https://via.placeholder.com/200" },
  { id: 15, name: "Poetry Slam", location: "Ahmedabad", date: "June 15, 2025", image: "https://via.placeholder.com/200" },
  { id: 16, name: "Fashion Show", location: "Chandigarh", date: "June 20, 2025", image: "https://via.placeholder.com/200" },
  { id: 17, name: "Yoga Retreat", location: "Jaipur", date: "June 25, 2025", image: "https://via.placeholder.com/200" },
  { id: 18, name: "Rock Band Night", location: "Lucknow", date: "June 30, 2025", image: "https://via.placeholder.com/200" },
  { id: 19, name: "Gaming Tournament", location: "Mumbai", date: "July 5, 2025", image: "https://via.placeholder.com/200" },
  { id: 20, name: "Cyber Security Summit", location: "Delhi", date: "July 10, 2025", image: "https://via.placeholder.com/200" },
  { id: 21, name: "Music Festival", location: "Bangalore", date: "July 15, 2025", image: "https://via.placeholder.com/200" },
  { id: 22, name: "Robotics Workshop", location: "Hyderabad", date: "July 20, 2025", image: "https://via.placeholder.com/200" },
  { id: 23, name: "AI & ML Conference", location: "Chennai", date: "July 25, 2025", image: "https://via.placeholder.com/200" },
  { id: 24, name: "Drama Festival", location: "Pune", date: "July 30, 2025", image: "https://via.placeholder.com/200" },
  { id: 25, name: "K-Pop Night", location: "Kolkata", date: "August 5, 2025", image: "https://via.placeholder.com/200" },
  { id: 26, name: "Motivational Talk", location: "Ahmedabad", date: "August 10, 2025", image: "https://via.placeholder.com/200" },
  { id: 27, name: "Space Exploration Expo", location: "Chandigarh", date: "August 15, 2025", image: "https://via.placeholder.com/200" },
  { id: 28, name: "E-Sports Championship", location: "Jaipur", date: "August 20, 2025", image: "https://via.placeholder.com/200" },
  { id: 29, name: "Travel Expo", location: "Lucknow", date: "August 25, 2025", image: "https://via.placeholder.com/200" },
  { id: 30, name: "Web3 Conference", location: "Mumbai", date: "August 30, 2025", image: "https://via.placeholder.com/200" },
];

const Events = () => {
  const [selectedCity, setSelectedCity] = useState("All");

  // Get unique cities from eventsData
  const uniqueCities = ["All", ...new Set(eventsData.map(event => event.location))];

  // Filter events based on selected city
  const filteredEvents = selectedCity === "All" 
    ? eventsData 
    : eventsData.filter(event => event.location === selectedCity);

  return (
    <div className="container mt-4">
      <h2>Upcoming Events</h2>

      {/* Dropdown for City Selection */}
      <Form.Group controlId="citySelect">
        <Form.Label>Select City</Form.Label>
        <Form.Control as="select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          {uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <div className="row mt-3">
        {filteredEvents.map((event) => (
          <div className="col-md-4" key={event.id}>
            <Card className="mb-4">
              <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                  Location: {event.location} <br />
                  Date: {event.date}
                </Card.Text>
                <Link to={`/event/${event.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;

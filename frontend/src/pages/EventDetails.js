import React from "react";
import { useParams } from "react-router-dom";

export const eventList = [
  {
    id: 1,
    title: "Music Concert",
    location: "Mumbai",
    date: "April 10, 2025",
    description: "Experience a night of electrifying music with top artists performing live.",
    image: "/images/music-concert.jpg",
  },
  {
    id: 2,
    title: "Stand-up Comedy",
    location: "Delhi",
    date: "April 15, 2025",
    description: "Get ready for a hilarious night with the best comedians in the country!",
    image: "/images/standup-comedy.jpg",
  },
  {
    id: 3,
    title: "Theatre Play",
    location: "Bangalore",
    date: "April 20, 2025",
    description: "A captivating theatre performance that brings drama to life.",
    image: "/images/theatre-play.jpg",
  },
  {
    id: 4,
    title: "Food Festival",
    location: "Mumbai",
    date: "April 25, 2025",
    description: "Taste the best dishes from around the world in this grand food festival.",
    image: "/images/food-festival.jpg",
  },
  {
    id: 5,
    title: "Art Exhibition",
    location: "Delhi",
    date: "April 30, 2025",
    description: "Explore mesmerizing artworks from talented artists across the country.",
    image: "/images/art-exhibition.jpg",
  },
  {
    id: 6,
    title: "Tech Conference",
    location: "Bangalore",
    date: "May 5, 2025",
    description: "Stay updated with the latest in technology, AI, and innovation.",
    image: "/images/tech-conference.jpg",
  },
  {
    id: 7,
    title: "Bollywood Night",
    location: "Mumbai",
    date: "May 10, 2025",
    description: "A Bollywood-themed dance party featuring famous DJs and performers.",
    image: "/images/bollywood-night.jpg",
  },
  {
    id: 8,
    title: "Gaming Convention",
    location: "Delhi",
    date: "May 15, 2025",
    description: "Meet gaming enthusiasts, try the latest games, and participate in challenges.",
    image: "/images/gaming-convention.jpg",
  },
  {
    id: 9,
    title: "Fitness Expo",
    location: "Bangalore",
    date: "May 20, 2025",
    description: "Discover fitness trends, interact with experts, and try new workouts.",
    image: "/images/fitness-expo.jpg",
  },
  {
    id: 10,
    title: "Dance Workshop",
    location: "Mumbai",
    date: "May 25, 2025",
    description: "Learn new dance styles from professional choreographers in this fun workshop.",
    image: "/images/dance-workshop.jpg",
  },
  {
    id: 11,
    title: "Startup Meetup",
    location: "Hyderabad",
    date: "May 28, 2025",
    description: "Network with budding entrepreneurs and industry experts.",
    image: "/images/startup-meetup.jpg",
  },
  {
    id: 12,
    title: "Coding Bootcamp",
    location: "Chennai",
    date: "June 2, 2025",
    description: "A hands-on coding workshop for beginners and professionals alike.",
    image: "/images/coding-bootcamp.jpg",
  },
  {
    id: 13,
    title: "Photography Expo",
    location: "Pune",
    date: "June 5, 2025",
    description: "Explore the latest in photography gear and techniques.",
    image: "/images/photography-expo.jpg",
  },
  {
    id: 14,
    title: "Book Fair",
    location: "Kolkata",
    date: "June 10, 2025",
    description: "A paradise for book lovers with a vast collection of books.",
    image: "/images/book-fair.jpg",
  },
  {
    id: 15,
    title: "Poetry Slam",
    location: "Ahmedabad",
    date: "June 15, 2025",
    description: "A stage for poets to showcase their talent through spoken word poetry.",
    image: "/images/poetry-slam.jpg",
  },
  {
    id: 16,
    title: "Fashion Show",
    location: "Chandigarh",
    date: "June 20, 2025",
    description: "Witness the latest trends in the fashion industry.",
    image: "/images/fashion-show.jpg",
  },
  {
    id: 17,
    title: "Yoga Retreat",
    location: "Jaipur",
    date: "June 25, 2025",
    description: "A peaceful getaway to rejuvenate your mind and body.",
    image: "/images/yoga-retreat.jpg",
  },
  {
    id: 18,
    title: "Rock Band Night",
    location: "Lucknow",
    date: "June 30, 2025",
    description: "A night of rock music with high-energy performances.",
    image: "/images/rock-band-night.jpg",
  },
  {
    id: 19,
    title: "Gaming Tournament",
    location: "Mumbai",
    date: "July 5, 2025",
    description: "Compete with top gamers in an exciting tournament.",
    image: "/images/gaming-tournament.jpg",
  },
  {
    id: 20,
    title: "Cyber Security Summit",
    location: "Delhi",
    date: "July 10, 2025",
    description: "A deep dive into the world of cybersecurity and data protection.",
    image: "/images/cyber-security-summit.jpg",
  },
  {
    id: 21,
    title: "Music Festival",
    location: "Bangalore",
    date: "July 15, 2025",
    description: "Experience a multi-genre music festival with international artists.",
    image: "/images/music-festival.jpg",
  },
  {
    id: 22,
    title: "Robotics Workshop",
    location: "Hyderabad",
    date: "July 20, 2025",
    description: "Hands-on robotics workshop for tech enthusiasts.",
    image: "/images/robotics-workshop.jpg",
  },
  {
    id: 23,
    title: "AI & ML Conference",
    location: "Chennai",
    date: "July 25, 2025",
    description: "A conference on Artificial Intelligence and Machine Learning advancements.",
    image: "/images/ai-ml-conference.jpg",
  },
  {
    id: 24,
    title: "Drama Festival",
    location: "Pune",
    date: "July 30, 2025",
    description: "A showcase of the finest theatre plays from across the country.",
    image: "/images/drama-festival.jpg",
  },
  {
    id: 25,
    title: "K-Pop Night",
    location: "Kolkata",
    date: "August 5, 2025",
    description: "An exciting evening of K-Pop performances and fan meetups.",
    image: "/images/kpop-night.jpg",
  },
  {
    id: 26,
    title: "Motivational Talk",
    location: "Ahmedabad",
    date: "August 10, 2025",
    description: "Get inspired by leading speakers and change-makers.",
    image: "/images/motivational-talk.jpg",
  },
  {
    id: 27,
    title: "Space Exploration Expo",
    location: "Chandigarh",
    date: "August 15, 2025",
    description: "Learn about space technology and upcoming space missions.",
    image: "/images/space-expo.jpg",
  },
  {
    id: 28,
    title: "E-Sports Championship",
    location: "Jaipur",
    date: "August 20, 2025",
    description: "Compete in or watch intense e-sports battles with top players.",
    image: "/images/esports-championship.jpg",
  },
  {
    id: 29,
    title: "Travel Expo",
    location: "Lucknow",
    date: "August 25, 2025",
    description: "Discover the best travel destinations and exclusive deals.",
    image: "/images/travel-expo.jpg",
  },
  {
    id: 30,
    title: "Web3 Conference",
    location: "Mumbai",
    date: "August 30, 2025",
    description: "Explore the future of decentralized technology and blockchain.",
    image: "/images/web3-conference.jpg",
  }
];
const EventDetails = () => {
  const { id } = useParams();
  const event = eventList.find((e) => e.id === parseInt(id));

  if (!event) {
    return <h2>Event not found</h2>;
  }

  return (
    <div className="container mt-4">
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} className="img-fluid mb-3" style={{ maxHeight: "300px" }} />
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p>{event.description}</p>
      <button className="btn btn-primary">Book Now</button>
    </div>
  );
};

export default EventDetails;

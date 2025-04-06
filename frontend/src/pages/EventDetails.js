import React from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import artExhibition from "../assets/images/art-exhibition.jpeg";
import bollywoodNight from "../assets/images/bollywood-night.jpeg";
import bookFair from "../assets/images/book-fair.jpeg";
import codingBootcamp from "../assets/images/coding-bootcamp.jpeg";
import cyberSecurityTournament from "../assets/images/cyber-security-tournament.jpeg";
import danceWorkshop from "../assets/images/dance-workshop.jpeg";
import fashionShow from "../assets/images/fashion-show.jpeg";
import fitnessExpo from "../assets/images/fitness-expo.jpeg";
import foodFestival from "../assets/images/food-festival.jpeg";
import gamingConvention from "../assets/images/gaming-convention.jpeg";
import motivationalTalk from "../assets/images/motivational-talk.jpeg";
import musicConcert from "../assets/images/music-concert.jpeg";
import photographyExpo from "../assets/images/photography-expo.jpeg";
import rockBand from "../assets/images/rock-band.jpeg";
import spaceExpo from "../assets/images/space-expo.jpeg";
import standupComedy from "../assets/images/standup-comedy.jpeg";
import startupMeeting from "../assets/images/startup-meeting.jpeg";
import techConference from "../assets/images/tech-conference.jpeg";
import theatrePlay from "../assets/images/theatre-play.jpeg";
import travelExpo from "../assets/images/travel-expo.jpeg";
import web3Conf from "../assets/images/web3-conf.png";
import yogaRetreat from "../assets/images/yoga retreat.jpeg";
import './Events.css';

export const eventList = [
  {
    id: 1,
    title: "Music Concert",
    category: "Music",
    location: "Mumbai",
    date: "April 10, 2025",
    description: "Experience a night of electrifying music with top artists performing live.",
    image: musicConcert,
  },
  {
    id: 2,
    title: "Stand-up Comedy",
    category: "Comedy",
    location: "Delhi",
    date: "April 15, 2025",
    description: "Get ready for a hilarious night with the best comedians in the country!",
    image: standupComedy,
  },
  {
    id: 3,
    title: "Theatre Play",
    category: "Theatre",
    location: "Bangalore",
    date: "April 20, 2025",
    description: "A captivating theatre performance that brings drama to life.",
    image: theatrePlay,
  },
  {
    id: 4,
    title: "Food Festival",
    category: "Food",
    location: "Mumbai",
    date: "April 25, 2025",
    description: "Taste the best dishes from around the world in this grand food festival.",
    image: foodFestival,
  },
  {
    id: 5,
    title: "Art Exhibition",
    category: "Art",
    location: "Delhi",
    date: "April 30, 2025",
    description: "Explore mesmerizing artworks from talented artists across the country.",
    image: artExhibition,
  },
  {
    id: 6,
    title: "Tech Conference",
    category: "Technology",
    location: "Bangalore",
    date: "May 5, 2025",
    description: "Stay updated with the latest in technology, AI, and innovation.",
    image: techConference,
  },
  {
    id: 7,
    title: "Bollywood Night",
    category: "Music",
    location: "Mumbai",
    date: "May 10, 2025",
    description: "A Bollywood-themed dance party featuring famous DJs and performers.",
    image: bollywoodNight,
  },
  {
    id: 8,
    title: "Gaming Convention",
    category: "Gaming",
    location: "Delhi",
    date: "May 15, 2025",
    description: "Meet gaming enthusiasts, try the latest games, and participate in challenges.",
    image: gamingConvention,
  },
  {
    id: 9,
    title: "Fitness Expo",
    category: "Fitness",
    location: "Bangalore",
    date: "May 20, 2025",
    description: "Discover fitness trends, interact with experts, and try new workouts.",
    image: fitnessExpo,
  },
  {
    id: 10,
    title: "Dance Workshop",
    category: "Dance",
    location: "Mumbai",
    date: "May 25, 2025",
    description: "Learn new dance styles from professional choreographers in this fun workshop.",
    image: danceWorkshop,
  },
  {
    id: 11,
    title: "Startup Meetup",
    category: "Business",
    location: "Hyderabad",
    date: "May 28, 2025",
    description: "Network with budding entrepreneurs and industry experts.",
    image: startupMeeting,
  },
  {
    id: 12,
    title: "Coding Bootcamp",
    category: "Technology",
    location: "Chennai",
    date: "June 2, 2025",
    description: "A hands-on coding workshop for beginners and professionals alike.",
    image: codingBootcamp,
  },
  {
    id: 13,
    title: "Photography Expo",
    category: "Art",
    location: "Pune",
    date: "June 5, 2025",
    description: "Explore the latest in photography gear and techniques.",
    image: photographyExpo,
  },
  {
    id: 14,
    title: "Book Fair",
    category: "Literature",
    location: "Kolkata",
    date: "June 10, 2025",
    description: "A paradise for book lovers with a vast collection of books.",
    image: bookFair,
  },
  {
    id: 16,
    title: "Fashion Show",
    category: "Fashion",
    location: "Chandigarh",
    date: "June 20, 2025",
    description: "Witness the latest trends in the fashion industry.",
    image: fashionShow,
  },
  {
    id: 17,
    title: "Yoga Retreat",
    category: "Fitness",
    location: "Jaipur",
    date: "June 25, 2025",
    description: "A peaceful getaway to rejuvenate your mind and body.",
    image: yogaRetreat,
  },
  {
    id: 18,
    title: "Rock Band Night",
    category: "Music",
    location: "Lucknow",
    date: "June 30, 2025",
    description: "A night of rock music with high-energy performances.",
    image: rockBand,
  },
  {
    id: 19,
    title: "Gaming Tournament",
    category: "Gaming",
    location: "Mumbai",
    date: "July 5, 2025",
    description: "Compete with top gamers in an exciting tournament.",
    image: gamingConvention,
  },
  {
    id: 20,
    title: "Cyber Security Summit",
    category: "Technology",
    location: "Delhi",
    date: "July 10, 2025",
    description: "A deep dive into the world of cybersecurity and data protection.",
    image: cyberSecurityTournament,
  },
  {
    id: 21,
    title: "Music Festival",
    category: "Music",
    location: "Bangalore",
    date: "July 15, 2025",
    description: "Experience a multi-genre music festival with international artists.",
    image: musicConcert,
  },
  {
    id: 22,
    title: "Robotics Workshop",
    category: "Technology",
    location: "Hyderabad",
    date: "July 20, 2025",
    description: "Hands-on robotics workshop for tech enthusiasts.",
    image: cyberSecurityTournament,
  },
  {
    id: 23,
    title: "AI & ML Conference",
    category: "Technology",
    location: "Chennai",
    date: "July 25, 2025",
    description: "A conference on Artificial Intelligence and Machine Learning advancements.",
    image: techConference,
  },
  {
    id: 24,
    title: "Drama Festival",
    category: "Theatre",
    location: "Pune",
    date: "July 30, 2025",
    description: "A showcase of the finest theatre plays from across the country.",
    image: theatrePlay,
  },
  {
    id: 25,
    title: "K-Pop Night",
    category: "Music",
    location: "Kolkata",
    date: "August 5, 2025",
    description: "An exciting evening of K-Pop performances and fan meetups.",
    image: rockBand,
  },
  {
    id: 26,
    title: "Motivational Talk",
    category: "Motivation",
    location: "Ahmedabad",
    date: "August 10, 2025",
    description: "Get inspired by leading speakers and change-makers.",
    image: motivationalTalk,
  },
  {
    id: 27,
    title: "Space Exploration Expo",
    category: "Science",
    location: "Chandigarh",
    date: "August 15, 2025",
    description: "Learn about space technology and upcoming space missions.",
    image: spaceExpo,
  },
  {
    id: 28,
    title: "E-Sports Championship",
    category: "Gaming",
    location: "Jaipur",
    date: "August 20, 2025",
    description: "Compete in or watch intense e-sports battles with top players.",
    image: gamingConvention,
  },
  {
    id: 29,
    title: "Travel Expo",
    category: "Travel",
    location: "Lucknow",
    date: "August 25, 2025",
    description: "Discover the best travel destinations and exclusive deals.",
    image: travelExpo,
  },
  {
    id: 30,
    title: "Web3 Conference",
    category: "Technology",
    location: "Mumbai",
    date: "August 30, 2025",
    description: "Explore the future of decentralized technology and blockchain.",
    image: web3Conf,
  }
];
const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Fixed: now properly imported

  const event = eventList.find((e) => e.id === parseInt(id));

  if (!event) {
    return <h2>Event not found</h2>;
  }

  const handleBookNow = () => {
    navigate(`/event-booking/${event.id}`);
  };

  return (
    <div className="container mt-4">
      <h2>{event.title}</h2>
      <img 
        src={event.image} 
        alt={event.title} 
        className="img-fluid mb-3" 
        style={{ maxHeight: "300px", width: "100%", objectFit: "cover", borderRadius: "8px" }} 
      />
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p>{event.description}</p>

      <button className="btn btn-primary" onClick={handleBookNow}>
        Book Now
      </button>
    </div>
  );
};

export default EventDetails;
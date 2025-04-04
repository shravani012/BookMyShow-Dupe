import React from "react";
import { useParams, Link } from "react-router-dom";
import { eventList } from "./EventDetails.js";

function CategoryPage() {
  const { category } = useParams();

  const categoryMap = {
    concert: "Music",       // ✅ Fix for music
    tech: "Technology",
    fitness: "Fitness",
    comedy: "Comedy",
    theatre: "Theatre",
    food: "Food",
    art: "Art",
    gaming: "Gaming",
    dance: "Dance",
    business: "Business",
    literature: "Literature",
    motivation: "Motivation",
    science: "Science",
    travel: "Travel",
    fashion: "Fashion",
    sports: "Sports",
  };

  const properCategory = categoryMap[category.toLowerCase()] || category;

  const filteredEvents = eventList.filter(
    (event) => event.category.toLowerCase() === properCategory.toLowerCase()
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{properCategory} Events</h2>
      {filteredEvents.length === 0 ? (
        <p>No events found in this category.</p>
      ) : (
        <div className="row">
          {filteredEvents.map((event) => (
            <div key={event.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={event.image} className="card-img-top" alt={event.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {event.date} • {event.location}
                    </small>
                  </p>
                  <div className="mt-auto">
                    <Link to={`/event/${event.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;

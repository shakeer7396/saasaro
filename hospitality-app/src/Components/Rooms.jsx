import React, { useState, useEffect } from "react";
import axios from "axios";

const Rooms = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://victorious-tan-bikini.cyclic.app/items"
        );
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  return (
    <>
    <div>
      <h1>Rooms</h1>
      {rooms.length ? (
        <div>
          {rooms.map((room) => (
            <div key={room.id}>
                <img src={room.image} alt="" />
                <div>
                    <h1>{room.title}</h1>
                    <h2>{room.price}</h2>
                    <h2>{room.MRP}</h2>
            </div>
            </div>
          ))}
          
        </div>
      ) : (
        <p>No rooms available.</p>
      )}
    </div>
    </>
  );
};

export default Rooms;

import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingConfirmation from "./bookingconfirmation";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [bookingModalIsOpen, setBookingModalIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, []);

  const handleBooking = (roomId, roomName, roomPrice) => {
    // In a real app, this logic would update the database record
    // For demonstration, we'll reduce the room count in memory

    // Find the selected room by roomId
    const selectedRoomIndex = rooms.findIndex((room) => room.id === roomId);

    if (selectedRoomIndex !== -1 && rooms[selectedRoomIndex].available > 0) {
      const updatedRooms = [...rooms];
      updatedRooms[selectedRoomIndex].available--;

      setSelectedRoom({ id: roomId, name: roomName, price: roomPrice });
      setRooms(updatedRooms);
      setBookingModalIsOpen(true);
    } else {
      alert("No more rooms available for booking.");
    }
  };

  const closeBookingModal = () => {
    setBookingModalIsOpen(false);
  };

  return (
    <div>
      <h1>Available Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <h2>{room.name}</h2>
            <p>Capacity: {room.capacity}</p>
            <p>Price: ${room.price} per night</p>
            <p>Available Rooms: {room.available}</p>
            <button
              onClick={() => handleBooking(room.id, room.name, room.price)}
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>

      {selectedRoom && (
        <BookingConfirmation
          isOpen={bookingModalIsOpen}
          onClose={closeBookingModal}
          roomName={selectedRoom.name}
          price={selectedRoom.price}
        />
      )}
    </div>
  );
};

export default RoomList;

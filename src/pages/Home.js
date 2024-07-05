import React, { useState, useRef } from "react";
import "../App.css";
import Input from "../utils/Input";
import Button from "../utils/Button";
import Textarea from "../utils/Textarea";
import DatePicker from "../utils/DatePicker";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [ticketId, setTicketId] = useState("");
  const [ticketNo, setTicketNo] = useState("");
  const [price, setPrice] = useState("");
  const [ticketData, setTicketData] = useState([]);
  const [toggleNewTicket, setToggleNewTicket] = useState(false);
  const [formData, setFormData] = useState({
    event_name: "",
    event_description: "",
    start_date: "",
    end_date: "",
    event_organizer: "",
    tickets: [],
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    try {
      const formDataToSend = {
        ...formData,
        tickets: ticketData.map((ticket) => ({
          ticket_id: ticket.ticketId,
          ticket_no: ticket.ticketNo,
          price: ticket.price,
        })),
      };
      const response = await axios.post(
        "http://localhost:5000/api/user/create",
        formDataToSend
      );
      toast.success(response.data.message, { autoClose: 1000 });
      resetForm();
    } catch (error) {
      toast.error(error.response.data.errors, { autoClose: 2000 });
    }
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addNewTicket = () => {
    setToggleNewTicket((prev) => !prev);
  };

  const saveTicket = () => {
    if (ticketId.trim() && ticketNo.trim() && price.trim()) {
      const newTicket = { ticketId, ticketNo, price, isEditable: false };
      setTicketData((prev) => [...prev, newTicket]);
      setTicketId("");
      setTicketNo("");
      setPrice("");
      toast.success("Ticket saved successfully!", { autoClose: 1000 });
    } else {
      toast.error("Please fill in all fields!", { autoClose: 1000 });
    }
  };

  const deleteTicket = (idx) => {
    setTicketData((prevSelected) =>
      prevSelected.filter((option, index) => index !== idx)
    );
    toast.success("Ticket Deleted successfully!", { autoClose: 1000 });
  };

  const editTicket = (index) => {
    const ticket = [...ticketData];
    ticket[index] = {
      ...ticket[index],
      isEditable: true,
    };
    setTicketData(ticket);
  };

  const onchangeeditableticket = (value, index, type) => {
    setTicketData((prevTickets) => {
      const updatedTickets = [...prevTickets];
      updatedTickets[index][type] = value;
      return updatedTickets;
    });
  };

  const saveEditableTicket = (index) => {
    const ticket = ticketData[index];
    if (
      !ticket.ticketId.trim() ||
      !ticket.ticketNo.trim() ||
      !ticket.price.trim()
    ) {
      toast.error("All fields are required to update the ticket!", {
        autoClose: 1000,
      });
      return;
    }
    setTicketData((prevTickets) => {
      const updatedTickets = [...prevTickets];
      updatedTickets[index].isEditable = false;
      return updatedTickets;
    });
    toast.success("Ticket updated successfully!", { autoClose: 1000 });
  };

  const resetForm = () => {
    setFormData({
      event_name: "",
      event_description: "",
      start_date: "",
      end_date: "",
      event_organizer: "",
    });
    setTicketData([]);
    setTicketId("");
    setTicketNo("");
    setPrice("");
  };

  return (
    <div className="container mx-auto px-4 ">
      <ToastContainer />
      <div className="text-center">
        <h1 className="text-12l font-bold">
          Create an Event Management System.
        </h1>
      </div>
      <div className="border-2 p-4 rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="event_name" className="text-base">
              Event Name<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.event_name}
              onChange={(e) => handleInputChange(e, "event_name")}
              customClass="w-full focus:outline-none my-2 px-3 py-2 border-2 border-black-800"
              placeholder="Enter your first name here.."
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="event_description" className="text-base">
              Event Description<span className="text-red-500">*</span>
            </label>
            <Textarea
              type="text"
              value={formData.event_description}
              onChange={(e) => handleInputChange(e, "event_description")}
              customClass="w-full focus:outline-none my-2 px-3 py-2 border-2 border-black-800"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="start_date" className="text-base">
              Start Date<span className="text-red-500">*</span>
            </label>
            <DatePicker
              value={formData.start_date}
              min={today}
              max={formData.end_date || ""}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, start_date: date }))
              }
              className="w-full focus:outline-none my-2 px-3 py-2 border-2 border-black-800"
            />
          </div>
          <div>
            <label htmlFor="end_date" className="text-base">
              End Date<span className="text-red-500">*</span>
            </label>
            <DatePicker
              value={formData.end_date}
              min={formData.start_date || today}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, end_date: date }))
              }
              className="w-full focus:outline-none my-2 px-3 py-2 border-2 border-black-800"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="event_organizer" className="text-base">
              Organizer<span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.event_organizer}
              onChange={(e) => handleInputChange(e, "event_organizer")}
              className="w-full focus:outline-none my-2 px-3 py-2 border-2 border-black-800"
            />
          </div>
        </div>
        <div className="flex items-center gap-8 mt-4">
          <h2>Tickets</h2>
          <button
            onClick={addNewTicket}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow text-sm w-40"
          >
            Add New Tickets
          </button>
        </div>
        {toggleNewTicket && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
            <div>
              <label htmlFor="first_name" className="text-base">
                Id<span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                customClass="focus:outline-none w-full my-2 px-3 py-2 border-2 border-black-800"
              />
            </div>
            <div>
              <label htmlFor="" className="text-base">
                Ticket No<span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={ticketNo}
                onChange={(e) => setTicketNo(e.target.value)}
                customClass="focus:outline-none w-full my-2 px-3 py-2 border-2 border-black-800"
              />
            </div>
            <div>
              <label htmlFor="" className="text-base">
                Price<span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                customClass="focus:outline-none w-full my-2 px-3 py-2 border-2 border-black-800"
              />
            </div>
            <div>
              <label htmlFor="" className="text-base">
                Action<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <button
                  onClick={saveTicket}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow text-sm w-32"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="my-4">
          {ticketData.map((ticket, index) => (
            <div
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-1"
              key={index}
            >
              {ticket.isEditable ? (
                <Input
                  type="number"
                  value={ticket.ticketId}
                  onChange={(e) =>
                    onchangeeditableticket(e.target.value, index, "ticketId")
                  }
                  customClass="focus:outline-none w-full my-2 px-3 py-2 border-2 border-black-800"
                />
              ) : (
                <div>{ticket.ticketId ? ticket.ticketId : ""} </div>
              )}
              {ticket.isEditable ? (
                <Input
                  type="number"
                  value={ticket.ticketNo}
                  onChange={(e) =>
                    onchangeeditableticket(e.target.value, index, "ticketNo")
                  }
                  customClass="focus:outline-none w-full my-2 px-3 py-2 border-2 border-black-800"
                />
              ) : (
                <div>{ticket.ticketNo ? ticket.ticketNo : ""}</div>
              )}
              {ticket.isEditable ? (
                <Input
                  type="number"
                  value={ticket.price}
                  onChange={(e) =>
                    onchangeeditableticket(e.target.value, index, "price")
                  }
                  customClass="focus:outline-none w-full my-2 px-3 py-2 border-2 border-black-800"
                />
              ) : (
                <div>{ticket.price ? ticket.price : ""}</div>
              )}
              <div>
                {ticket.isEditable ? (
                  <Button
                    onClick={() => saveEditableTicket(index)}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow text-sm w-32 mt-2"
                  >
                    Update
                  </Button>
                ) : (
                  <div>
                    <button
                      onClick={() => editTicket(index)}
                      className="bg-white mr-1 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow text-sm w-12"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTicket(index)}
                      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow text-sm w-16"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "5rem" }}>
          <Button
            type="button"
            onClick={handleSubmit}
            customButton="bg-black-500 bg-black text-white text-2xl w-60 py-2 px-3 rounded"
          >
            Save Event
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

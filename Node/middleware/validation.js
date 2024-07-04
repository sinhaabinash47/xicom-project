export const checkValidation = (data) => {
  if (data.event_name == "") {
    return "Event Name is required";
  } else if (data.event_description == "") {
    return "Event Description is required";
  } else if (data.start_date == "") {
    return "Start Date is required";
  } else if (data.end_date == "") {
    return "End Date is required";
  } else if (data.event_organizer == "") {
    return "Event Organizer is required";
  } else if (data.tickets.length == 0) {
    return "Ticket is required";
  } else {
    return "";
  }
};

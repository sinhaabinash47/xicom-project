import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true
    },
    event_description: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    event_organizer: {
        type: String,
        required: true
    },
    tickets: {
        type: Array,
        required: true
    }
});

export default mongoose.model("eventManagement", userSchema)
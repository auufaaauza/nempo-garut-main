"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Button from "@mui/material/Button";

export interface EventItem {
  id: number;
  name: string;
  category: string;
  date: string | Date;
  location: string;
  description: string;
  image: string;
}

const EventCard: React.FC<{ event: EventItem }> = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-48">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs px-3 py-1 rounded-full shadow">
          {event.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{event.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>

        <div className="flex items-center text-sm text-gray-600 mt-3">
          <Calendar className="w-4 h-4 mr-2 text-primary" />
          {format(new Date(event.date), "d MMMM yyyy", { locale: id })}
        </div>
        <div className="flex items-center text-sm text-gray-600 mt-1 mb-4">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          {event.location}
        </div>

        <div className="mt-auto">
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#0b73a3",
              textTransform: "none",
              borderRadius: "9999px",
              "&:hover": { backgroundColor: "#095e84" },
            }}
          >
            Lihat Detail
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;

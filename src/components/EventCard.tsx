import React from 'react';
import { Event } from '@prisma/client';
import { useInView } from 'react-intersection-observer';

interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isPast = false }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: 150,
  });

  const eventDate = new Date(event.tanggal);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('id-ID', { month: 'short' }).toUpperCase();

  return (
    <div ref={ref} className={`fade-in-section ${inView ? 'is-visible' : ''} h-full`}>
      <div
        className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col transform hover:-translate-y-2 ${
          isPast ? 'opacity-70 grayscale' : ''
        }`}
      >
        {/* Header Kartu dengan Tanggal */}
        <div className={`p-4 text-white ${isPast ? 'bg-gray-400' : 'bg-emerald-himp'}`}>
          <span className="font-bold text-2xl font-heading">{day}</span>
          <span className="ml-2 font-semibold">{month}</span>
        </div>

        {/* Konten Kartu */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-bold text-xl mb-2 text-gray-800 leading-tight flex-grow">
            {event.judul}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.deskripsi}</p>
          <div className="flex items-center text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{event.lokasi}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

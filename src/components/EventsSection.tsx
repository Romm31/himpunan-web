// src/components/EventsSection.tsx
import React from 'react';
import { Event } from '@prisma/client';

interface EventsSectionProps {
  events: Event[];
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  // Jika tidak ada data event, jangan tampilkan section ini
  if (!events || events.length === 0) {
    return null;
  }

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="event" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 font-serif">Kegiatan & Acara</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-50 rounded-lg shadow-md p-6 border-l-4 border-emerald-himp">
              <p className="text-sm text-gray-500 mb-2">{formatDate(event.tanggal)}</p>
              <h3 className="text-xl font-bold text-emerald-dark mb-3">{event.judul}</h3>
              <p className="text-gray-600 mb-4">{event.deskripsi}</p>
              <div className="flex items-center text-sm text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-emerald-himp" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.lokasi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
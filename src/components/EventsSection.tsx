// src/components/EventsSection.tsx
import React from 'react';
import { Event } from '@prisma/client';
import { useInView } from 'react-intersection-observer';

interface EventsSectionProps {
  events: Event[];
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!events || events.length === 0) return null;

  const formatDate = (date: Date) => ({
    day: new Date(date).getDate(),
    month: new Date(date).toLocaleDateString('id-ID', { month: 'short' }).toUpperCase(),
  });

  return (
    <section id="event" ref={ref} className={`py-20 bg-white fade-in-section ${inView ? 'is-visible' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-dark font-heading tracking-tight">Kegiatan & Acara</h2>
          <div className="mt-4 w-24 h-1 bg-emerald-himp mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex transform hover:-translate-y-2 border border-gray-100">
              <div className="flex flex-col justify-center items-center bg-emerald-himp text-white p-4 w-24 rounded-l-xl">
                <span className="text-4xl font-bold">{formatDate(event.tanggal).day}</span>
                <span className="font-semibold">{formatDate(event.tanggal).month}</span>
              </div>
              <div className="p-5 flex flex-col">
                <h3 className="font-bold text-lg text-gray-800">{event.judul}</h3>
                <p className="text-gray-500 text-sm mt-2">{event.lokasi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default EventsSection;
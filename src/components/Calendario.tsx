import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendario: React.FC = () => {
  return (
    <div className="bg-white p-2 md:p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Calendario</h2>
      <Calendar className="react-calendar" />
    </div>
  );
};

export default Calendario;

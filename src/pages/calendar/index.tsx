import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


const Calendar = () => {
  return (
    <div>
      <Fullcalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
      initialView={'dayGridMonth'} 
      weekends={true}
      events={[
        { title: '최후의 만찬', date: '2024-01-02' },
        { title: 'Check Chaek PT', date: '2024-01-03' },
      ]}
      />
    </div>
  );
};

export default Calendar;

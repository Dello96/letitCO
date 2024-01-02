import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CustomHeaderCenter } from './header';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks } from '../../api/supabaseData';
// import { Book } from '../../types/global.d';

const Calendar = () => {
  const { data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });

  // const filtered: Book[] = books?.filter(item => !!item.endDate)
  console.log('books', books);

  return (
    <div>
      <CustomHeaderCenter />
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        weekends={true}
        events={[
          { title: '최후의 만찬', date: '2024-01-02' },
          { title: 'Check Chaek PT', date: '2024-01-03' }
        ]}
        headerToolbar={{
          start: 'title',
          center: ''
        }}
      />
    </div>
  );
};

export default Calendar;

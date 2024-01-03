import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks } from '../../api/supabaseData';
import { Book } from '../../types/global.d';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Calendar: React.FC = () => {
const user = useSelector((state: RootState) => state.user.id)

  const { data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks,
  });

  const [events, setEvents] = useState<{ title: string; date: string }[]>([]);

  useEffect(() => {
    if (books && user) {
      const filteredEvents: { title: string; date: string }[] = books
        .filter((book: Book) => book.endDate && book.uid === user)
        .map((book: Book) => ({
          title: book.title || '',
          date: book.endDate || '',
        }));
      setEvents(filteredEvents);
    }
  }, [books, user]);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        weekends={true}
        events={events}
      />
    </div>
  );
};

export default Calendar;

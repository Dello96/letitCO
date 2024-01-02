import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks } from '../../api/supabaseData';
import { Book } from '../../types/global.d';

const Calendar: React.FC = () => {
  const authTokenStr = localStorage.getItem('sb-bsnozctogedtgqvbhqby-auth-token');
  
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (authTokenStr) {
      const authToken = JSON.parse(authTokenStr);
      const userId = authToken.user.id;
      setUser(userId);
      console.log('사용자 ID:', userId);
    } else {
      console.log('Auth 토큰을 찾을 수 없습니다.');
      setUser(null);
    }
  }, [authTokenStr]);

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

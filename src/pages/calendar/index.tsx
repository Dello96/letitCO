import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CustomHeaderCenter } from './header';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks } from '../../api/supabaseData';
import { EventContentArg } from '@fullcalendar/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Book } from '../../types/global.d';

const Calendar = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const { data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });

  // 현재 사용자의 책만 필터링
  const events = books?.filter((book: Book) => book.endDate && book.uid === currentUser.id)
    .map((book: Book) => ({
      title: book.title,
      date: book.endDate,
      image: book.cover
    }));

    const renderEventContent = (eventInfo: EventContentArg) => {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <img 
            src={eventInfo.event.extendedProps.image} 
            alt={eventInfo.event.title} 
            style={{ 
              width: '50px', 
              height: '50px', 
              objectFit: 'contain' // 'cover'로 설정하면 이미지가 칸을 넘지 않으면서 꽉 차게 조절됩니다.
            }} 
          />
          {/* 이미지 위에 텍스트가 오도록 설정할 수 있습니다. */}
        </div>
      );
    };
    
    
    

  return (
    <div>
      <CustomHeaderCenter />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        headerToolbar={{
          start: 'title',
          center: '',
        }}
      />
    </div>
  );
};

export default Calendar;

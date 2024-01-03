import styled from 'styled-components';

export const StMain = styled.div`
  width: 100%;
  height: 100%;
`;

export const StMainSection1 = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const StNotice = styled.div`
  font-size: 40px;
  margin: 80px 0 50px 0;
`;

export const StReadingBox = styled.div`
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 1200px;
  height: 250px;
  display: flex;
`;

export const StProgressBookTitle = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: #0e411d;
  margin-top: 10px;
`;

export const StMainSection2 = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const StAddBookWrap = styled.div`
  height: 250px;
  width: 1200px;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-top: 180px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const StAddIcon = styled.div`
  color: #0e411d;
  font-size: 90px;
  font-weight: 700;
  margin: 10px 0 10px 0;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s;
  }
`;

export const StAddNotice = styled.div`
  color: black;
  font-size: 18px;
`;

export const StBookcoverimg = styled.img`
  width: 150px;
  height: 200px;
`;

export const StBookcover = styled.div`
  width: 150px;
  height: 200px;
  margin: 25px;
`;

export const StBookProgressWrap = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin: 95px 0 100px 0;
  position: relative;
`;

export const StBookProgress = styled.div`
  width: 910px;
`;

export const StCompletedPercent = styled.div`
  margin-top: 40px;
  text-align: center;
  font-weight: 530;
  font-size: 20px;
`;

export const StMainSection3 = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StBookDoneTitle = styled.div`
  width: 1200px;
  font-size: 25px;
  font-weight: 700;
  margin-top: 100px;
`;

export const StBookDoneList = styled.div`
  width: 1200px;
  height: 250px;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin: 30px 0 30px 0;
  display: flex;
  cursor: pointer;
`;

export const StBookInfo = styled.div`
  display: flex;
  margin-top: 100px;
`;

export const StBookTitle = styled.h2`
  color: #0e411d;
  font-size: 22px;
  font-weight: border;
  margin-left: 20px;
`;

export const StBookAuthor = styled.div`
  font-size: 15px;
  margin: 7px 0 0 20px;
`;

export const StReadingPeriod = styled.p`
  margin: 10px 0 0 20px;
`;

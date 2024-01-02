
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
const dispatch = useDispatch()


const getCurrentUserId = () => {
    const authTokenStr = localStorage.getItem('sb-bsnozctogedtgqvbhqby-auth-token');
    
    if (authTokenStr) {
      const authToken = JSON.parse(authTokenStr);
      const userId = authToken.user.id;
      const user = {
        id: userId
      }
      dispatch(setUser(user))
      console.log('사용자 ID:', userId);
      return userId;
    } else {
      console.log('Auth 토큰을 찾을 수 없습니다.');
      return null; 
    }
  }
  
  export default getCurrentUserId;
  
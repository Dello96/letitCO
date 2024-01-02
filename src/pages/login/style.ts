import styled from 'styled-components';
import loginBgImg from '../../assets/loginBgImg.jpg';
// import logo from '../../assets/logo1.png';
// import logo2 from '../../assets/logo2.png';
import logo3 from '../../assets/logo3.png';

export const StWrapper = styled.div`
  display: flex;
`;

export const StWelcomeSection = styled.div`
  background-image: url(${loginBgImg});
  display: flex;
  flex-direction: column;
  align-items: center;
  object-fit: cover;
  text-align: center;
  width: 50%;
  float: left;
  height: 100vh;
`;

export const StFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;
  float: left;
  /* margin-bottom: 80px; */
`;

export const StIntroductionTitle = styled.h1`
  margin-top: 50px;
  font-weight: 550;
  color: #0e411d;
`;

export const StIntroduction = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  font-size: 10px;
  line-height: 1.6;
`;

export const StToggleBtn = styled.button`
  border-radius: 20px;
  width: 100px;
  height: 30px;
  border: 0px;
  margin-top: 80px;
  background-color: #0e411d;
  color: white;
  font-size: 12px;
`;

export const StLogo = styled.div`
  background-image: url(${logo3});
  background-size: cover;
  width: 120px;
  height: 80px;
`;

export const StTitle = styled.h1`
  margin-bottom: 50px;
  margin-top: 10px;
`;

export const StInput = styled.input`
  /* border-bottom: 1px solid lightgray; */
  border: none;
  border-bottom: 1px solid lightgray;
  margin-left: 10px;
  width: 300px;
`;

export const StSignUpButton = styled.button`
  margin-top: 10px;
  border-radius: 20px;
  border: 1.5px solid #0e411d;
  height: 30px;
  width: 200px;
  background-color: white;
  font-size: 12px;
`;

export const StLoginButton = styled.button`
  margin-top: 10px;
  border-radius: 20px;
  border: 1.5px solid #0e411d;
  height: 30px;
  width: 200px;
  background-color: white;
  font-size: 12px;
`;

export const StInputWrapper = styled.div`
  margin-bottom: 20px;
`;

export const StWarning = styled.div`
  font-size: 10px;
  color: red;
  margin: 10px;
`;
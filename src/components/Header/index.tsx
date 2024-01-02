import React from 'react';
import {
  StHeader,
  StLogo,
  StNav,
  StNavList,
  StDropdownIcon,
  StDropDownWrap,
  StDropDownContainer,
  StDropDownList
} from './style';
import { IoMenu } from 'react-icons/io5';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <>
      <StHeader>
        <StLogo>로고</StLogo>
        <StNav>
          <StNavList>도서검색</StNavList>
          <StNavList>내 서재</StNavList>
          <StNavList>독서 캘린더</StNavList>
        </StNav>
        <>
          <StDropdownIcon onClick={onToggle}>
            <IoMenu />
          </StDropdownIcon>
          <StDropDownWrap>
            <StDropDownContainer>
              {isOpen && (
                <>
                  <StDropDownList>내 프로필</StDropDownList>
                  <StDropDownList>로그아웃</StDropDownList>
                </>
              )}
            </StDropDownContainer>
          </StDropDownWrap>
        </>
      </StHeader>
    </>
  );
}

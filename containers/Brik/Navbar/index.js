import React, { useRef, useState } from 'react';
import Fade from 'react-reveal/Fade';
import ScrollSpyMenu from 'common/src/components/ScrollSpyMenu';
import Scrollspy from 'react-scrollspy';
import { Icon } from 'react-icons-kit';
import { androidMenu } from 'react-icons-kit/ionicons/androidMenu';
import { androidClose } from 'react-icons-kit/ionicons/androidClose';
import Link from 'common/src/components/Link';
import Button from 'common/src/components/Button';
import Logo from 'common/src/components/UIElements/Logo';
import Container from 'common/src/components/UI/Container';
import NavbarWrapper, { MenuArea, MobileMenu, NavbarRight } from './navbar.style';
import LogoImage from 'common/src/assets/image/brik/logo.png';
import logoutIcon from 'common/src/assets/image/brik/logout.png';

import { data } from 'common/src/data/Brik';
import { useRequestUser } from 'common/src/hooks/useRequestUser';
import useOnClickOutside from 'common/src/hooks/useOnClickOutside';
import { useLogoutUser } from 'common/src/hooks/useLogoutUser';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { fetchResponse, isFetchingUser, fetchError } = useRequestUser();
  const { logout } = useLogoutUser();
  const scrollItems = [];

  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setShowUserDropdown(false));

  let firstName,
    lastName,
    avatar = null;
  if (fetchResponse?.data) {
    firstName = fetchResponse?.data.UserCard?.firstName;
    lastName = fetchResponse?.data.UserCard?.lastName;
    avatar = fetchResponse?.data.UserCard?.Avatar?.url;
  }

  data.navItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleHandleMenuClose = () => {
    setMobileMenu(false);
  };

  return (
    <NavbarWrapper className="agencyModern-navbar navbar">
      <Container width="100%">
        <Logo href="/" logoSrc={LogoImage} title="Brik" className="main-logo" />
        <MenuArea>
          <ScrollSpyMenu className="menu-items menu-left" menuItems={data.navItems} offset={-84} />
          {!isFetchingUser && (!fetchResponse || fetchError) && (
            <NavbarRight>
              <li>
                <Link href="/login">Se connecter</Link>
              </li>
              <li>
                <Link href="/register" className="menu-register-btn">
                  <span className="glyph-icon flaticon-user" /> Créer un compte <strong>gratuit</strong>
                </Link>
              </li>
            </NavbarRight>
          )}
          {!!fetchResponse && !isFetchingUser && !fetchError && (
            <NavbarRight className="user-header-dropdown">
              <li>
                <div className="user-dropdown" ref={dropdownRef} onClick={() => setShowUserDropdown(!showUserDropdown)}>
                  <div className="user-dropdown-avatar">
                    <span>{`${firstName && firstName[0] ? firstName[0] : 'Firstname'}${
                      lastName && lastName[0] ? lastName[0] : 'Lastname'
                    }`}</span>
                  </div>
                  <h4>{`${firstName} ${lastName}`}</h4>
                  <div className={'user-dropdown-menu ' + (!showUserDropdown ? 'dpnone' : '')}>
                    <ul>
                      <li
                        onClick={(e) => {
                          logout();
                          setShowUserDropdown(!showUserDropdown);
                        }}
                      >
                        Déconnexion <img src={logoutIcon} />
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </NavbarRight>
          )}
          {isFetchingUser && (
            <NavbarRight>
              <li>
                <Link href="#" className="menu-register-btn">
                  <span className="glyph-icon flaticon-user" /> Vérification...{' '}
                </Link>
              </li>
            </NavbarRight>
          )}

          <Button
            className="menubar"
            icon={
              mobileMenu ? (
                <Icon style={{ color: '#FFF' }} className="bar" size={32} icon={androidClose} />
              ) : (
                <Fade>
                  <Icon style={{ color: '#FFF' }} className="close" icon={androidMenu} size={32} />
                </Fade>
              )
            }
            color="#0F2137"
            variant="textButton"
            onClick={handleMobileMenu}
          />
        </MenuArea>
      </Container>
      <MobileMenu className={`mobile-menu ${mobileMenu ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          {!!fetchResponse && !isFetchingUser && !fetchError && (
            <ul>
              <li>
                <a href={`${process.env.NEXT_PUBLIC_WEBAPP_URL}/user/profile`} className="menu-register-btn">
                  <span className="glyph-icon flaticon-user" /> Mon compte{' '}
                </a>
              </li>
            </ul>
          )}
          {!isFetchingUser && (!fetchResponse || fetchError) && (
            <ul>
              <li>
                <Link href="/register" className="menu-register-btn">
                  <span className="glyph-icon flaticon-user" /> Créer un compte <strong>gratuit</strong>
                </Link>
              </li>
              <li className="login-link">
                <Link href="/login">Se connecter</Link>
              </li>
            </ul>
          )}
        </div>
        <Container>
          <Scrollspy className="menu" items={scrollItems} offset={-84} currentClassName="active">
            {data.navItems.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <Link href={menu.path} offset={menu.offset} onClick={handleHandleMenuClose}>
                  {menu.label}
                </Link>
              </li>
            ))}
          </Scrollspy>
        </Container>
      </MobileMenu>
    </NavbarWrapper>
  );
};

export default Navbar;

import React, { useState } from 'react';
import styled from 'styled-components';
import SubMenu from './Submenu';
import Fun from 'dataset/sets/Fun';
import Games from 'dataset/sets/Games';
import Geography from 'dataset/sets/Geography';
import Humanity from 'dataset/sets/Humanities';
import Language from 'dataset/sets/Language';
import Science from 'dataset/sets/Science';
import { Registry } from '../scenes/constants';
let sets = {
  All: Registry.QUIZLET_SET_ALL,
  Fun,
  Games,
  Geography,
  Humanity,
  Language,
  Science,
};

const NavIcon = styled.a`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 5;
`;

const SidebarNav = styled.nav<{ $sidebar: boolean }>`
  background: #15171c;
  width: 250px;
  height: 100dvh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ $sidebar }) => ($sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Sidebar = ({ target }: { target: (word: string) => void }) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <NavIcon href="#">
        <button onClick={showSidebar}>Click Me</button>
      </NavIcon>

      <SidebarNav $sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon href="#">
            <button onClick={showSidebar}>Click Me</button>
          </NavIcon>
          {Object.keys(sets).map((item, index) => {
            return (
              <SubMenu
                item={sets[item]}
                title={item}
                key={index}
                target={target}
              />
            );
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;

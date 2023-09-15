import styled from 'styled-components';
import { useState } from 'react';
import { Dataset } from 'dataset/types';

const SidebarLink = styled.a`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled.a`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

type Base = {
  getAllSets(): Dataset[];
};
const SubMenu = ({
  item,
  title,
  target,
}: {
  item?: Base | string;
  title: string;
  target: (word: string) => void;
}) => {
  let hasSubnav = true;
  if (typeof item == 'string') {
    hasSubnav = false;
  } else {
    var sets = item.getAllSets();
  }
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const handleClick = () => {
    target(item as string);
  };

  return (
    <>
      <SidebarLink
        onClick={
          (hasSubnav && showSubnav) ||
          (() => {
            target(item as string);
          })
        }
      >
        <div>
          <SidebarLabel>{title}</SidebarLabel>
        </div>
        <div>{hasSubnav && subnav ? '^' : hasSubnav ? 'v' : null}</div>
      </SidebarLink>
      {subnav &&
        sets.map((item, index) => {
          return (
            <DropdownLink
              onClick={() => {
                target(item.set.title);
              }}
              key={index}
            >
              <SidebarLabel>{item.set.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;

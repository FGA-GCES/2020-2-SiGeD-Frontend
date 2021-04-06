import React, { useState } from 'react';
import {
  RightBox, ContentBox, NameDiv, Line,
  CreatedBy, UserIcon, PersonIcon, P,
  UserName, UserP, CategoryName,
  CategoryField, MobileHeader,
  PlusButton, LessButton, ButtonsDiv,
} from './Style';
import SendDemandModal from '../SendDemandModal';
import DropdownComponent from '../DropdownComponent';
import colors from '../../Constants/colors';

const ViewDemandSidebar = ({
  clientName, userName, category, demand, getDemandApi, showUpdates,
}) => {
  const [sidebarState, setSidebarState] = useState(true);
  const [sectorOption, setSectorOption] = useState('');
  return (
    <RightBox>
      <ContentBox>
        <ButtonsDiv>
          { sidebarState && <LessButton onClick={() => setSidebarState(false)} />}
          { !sidebarState && <PlusButton onClick={() => setSidebarState(true)} />}
        </ButtonsDiv>
        <MobileHeader>
          Cliente:
        </MobileHeader>
        <NameDiv>
          <PersonIcon />
          <P>
            { clientName }
          </P>
        </NameDiv>
        <Line />
        { sidebarState
          && (
            <CreatedBy>
              <p>Criado por:</p>
              <UserName>
                <UserIcon />
                <UserP>
                  { userName }
                </UserP>
              </UserName>
            </CreatedBy>
          )}
        <p style={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
          marginTop: '2vh',
        }}
        >
          Setor:
        </p>
        <DropdownComponent
          OnChangeFunction={(Option) => setSectorOption(Option.target.value)}
          style={{
            display: 'flex',
            color: `${colors.secondary}`,
            width: '90%',
            height: 'min-content',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            borderRadius: '8px',
            border: '1px solid #ffffff',
          }}
          optionStyle={{
            backgroundColor: `${colors.navHeaders}`,
          }}
          optionList={['option1', 'option2', 'option3']}
        />
        { sidebarState
      && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '3%',
            width: '100%',
            marginTop: '10%',
          }}
        >
          <SendDemandModal
            sectorOption={sectorOption}
            getDemandApi={getDemandApi}
            showUpdates={showUpdates}
            demand={demand}
          />
        </div>
      )}
        { sidebarState
              && (
              <CategoryField>
                <p>
                  Categoria:
                </p>
                <CategoryName style={{ backgroundColor: category.color }}>
                  {category.name}
                </CategoryName>
              </CategoryField>
              )}
      </ContentBox>
    </RightBox>
  );
};

export default ViewDemandSidebar;

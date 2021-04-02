import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDemands, getCategories } from '../../Services/Axios/demandsServices';
import ViewDemandSidebar from '../../Components/ViewDemandSidebar';
import ViewDemandCard from '../../Components/ViewDemandCard';
import { Main, CardsContainer } from './Style';
import { getClients } from '../../Services/Axios/clientServices';
import { getUser } from '../../Services/Axios/userServices';

const ViewDemandsScreen = () => {
  const [client, setClient] = useState('');
  const [demand, setDemand] = useState('');
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState('');
  const { id } = useParams();

  const getDemandApi = async () => {
    await getDemands(`demand/${id}`)
      .then((response) => setDemand(response.data));
  };

  const getClientApi = async () => {
    await getClients(`clients/${demand.clientID}`)
      .then((response) => setClient(response.data));
    console.log(client);
  };

  const getUserApi = async () => {
    await getUser(`users/${demand.userID}`)
      .then((response) => { setUser(response.data); });
    console.log(user);
  };

  const getCategoryApi = async () => {
    await getCategories(`/category/${demand.categoryID}`)
      .then((response) => setCategory(response.data));
    console.log(category);
  };

  useEffect(() => {
    if (demand) {
      getClientApi();
      getUserApi();
      getCategoryApi();
    } else {
      getDemandApi();
    }
  }, [demand]);

  return (
    <>
      { demand && client && user && category
      && (
      <Main>
        <CardsContainer>
          <ViewDemandCard
            demand={demand}
          />
        </CardsContainer>
        <ViewDemandSidebar clientName={client.name} userName={user.name} category={category} />
      </Main>
      )}
    </>
  );
};

export default ViewDemandsScreen;

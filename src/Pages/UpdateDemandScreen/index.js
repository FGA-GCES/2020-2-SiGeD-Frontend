import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Main, Footer } from './Style';
import SectorDropdown from '../../Components/SectorDropdown';
import CategoryDiv from '../../Components/AddCategoryComponent';
import RightBoxComponent from '../../Components/RightBoxComponent';
import { updateDemand, getDemands } from '../../Services/Axios/demandsServices';
import { getClients } from '../../Services/Axios/clientServices';
import { validateProcess } from '../../Utils/validations';
import DemandsDescription from '../../Components/DemandsDescription';
import SelectedCategories from '../../Components/SelectedCategories';
import TinyButton from '../../Components/TinyButton';
import ConfirmDemandModal from '../../Components/ConfirmDemandModal';

const UpdateDemandsScreen = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [process, setProcess] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [clientID, setClientID] = useState('');
  const [userID, setUserID] = useState('');
  const [sectorID, setSectorID] = useState('');
  const [categoriesIDs, setCategoriesIDs] = useState([]);
  const [clientName, setClientName] = useState('');
  const { id } = useParams();

  const getClientFromApi = async (client) => {
    await getClients(`clients/${client}`)
      .then((response) => {
        const { data } = response;
        setClientName(data?.name);
      });
  };

  const getDemandsFromApi = async () => {
    await getDemands(`demand/${id}`)
      .then((response) => {
        const { data } = response;
        setName(data?.name);
        setDescription(data?.description);
        setProcess(data?.process);
        setSectorID(data?.sectorID);
        setSelectedCategories(data?.categoryID);
        setClientID(data?.clientID);
        setUserID(data?.userID);
        getClientFromApi(data?.clientID);
      });
  };

  useEffect(() => {
    getDemandsFromApi();
  }, []);

  // Aprimorar
  useEffect(() => {
    const IDs = selectedCategories?.map((selectedCategory) => selectedCategory._id);
    console.log(IDs, 'AKI poca');
    setCategoriesIDs(IDs);
    console.log(categoriesIDs, 'porque');
  }, [selectedCategories]);

  const pushCategory = (category) => {
    let alreadySelected = false;
    for (let c = 0; c < selectedCategories.length; c += 1) {
      if (category._id === selectedCategories[c]._id) {
        alreadySelected = true;
      }
    }
    if (!alreadySelected) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      alert('A categoria escolhida ja foi selecionada');
    }
  };

  const validateInputs = () => {
    if (!name || !description || !validateProcess(process)
      || !sectorID || !clientID || categoriesIDs === undefined) {
      return false;
    }
    return true;
  };

  const submit = () => {
    console.log('nome:', name, 'description:', description, 'process:', process,
      'categoriesIDs:', categoriesIDs, 'sectorID:', sectorID, 'userID:', userID,
      'clientID:', clientID, id);
    if (validateInputs()) {
      updateDemand(
        name, description, process, categoriesIDs, sectorID, userID, clientID, id,
      );
      alert('Demanda criada com sucesso!');
      setProcess('');
      setDescription('');
      setName('');
      setSelectedCategories([]);
      setSectorID('');
      setCategoriesIDs([]);
    } else {
      alert('Preencha todos os campos antes de cadastrar uma nova demanda');
    }
  };

  const cancel = () => {
    setName('');
    setProcess('');
    setDescription('');
    setSelectedCategories([]);
    setSectorID('');
    setCategoriesIDs([]);
  };

  return (
    <Main>
      <DemandsDescription
        name={name}
        setName={setName}
        process={process}
        setProcess={setProcess}
        description={description}
        setDescription={setDescription}
        submit={handleShow}
        cancel={cancel}
        buttomName="Editar"
      />
      {/* Começa aki */}
      <RightBoxComponent
        clientName={clientName}
      >
        <div display="none" />
        <SectorDropdown
          setSector={setSectorID}
          sectorID={sectorID}
        />
        <CategoryDiv
          selectedCategories={selectedCategories}
          pushCategory={pushCategory}
        />
        <SelectedCategories
          selectedCategories={selectedCategories}
        />
      </RightBoxComponent>
      <Footer>
        <TinyButton type="secondary" title="Cancelar" click={cancel} />
        <TinyButton type="primary" title="Editar" click={handleShow} />
      </Footer>
      <ConfirmDemandModal
        show={show}
        handleClose={handleClose}
        submit={submit}
        actionName=" editar "
      />
    </Main>
  );
};

export default UpdateDemandsScreen;

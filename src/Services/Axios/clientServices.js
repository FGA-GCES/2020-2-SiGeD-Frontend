import "../../Constants/Errors";
import { FILL_ALL_FIELDS_EDIT } from "../../Constants/Errors";
import { APIClients, APICargos } from './baseService/index';

export async function getClients(url, startModal) {
  try {
    const response = await APIClients.get(url);
    return response;
  } catch (error) {
    if (error.response?.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response?.status !== 401) {
      startModal(NO_CLIENT_LIST);
    }
    console.error(`An unexpected error ocourred while retrieving the clients list.${error}`);
  }
  return false;
}

export async function getClientData(id, startModal) {
  try {
    const response = await APIClients.get(`clients/${id}`);
    return response;
  } catch (error) {
    if (error.response?.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response?.status !== 401) {
      startModal(NO_CLIENT_DATAS);
    }
    console.error(`An unexpected error ocourred while retrieving the client data.${error}`);
  }
  return false;
}

export async function getFourClients(startModal) {
  try {
    const response = await APIClients.get('/clients/newest-four');
    return response;
  } catch (error) {
    if (error.response?.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response?.status !== 401) {
      startModal(NO_LIST_4CLIENTS);
    }
    console.error(`An unexpected error ocourred while retrieving newest four clients list.${error}`);
  }
  return false;
}

export async function postClient(
  inputName, inputEmail, inputCpf, inputPhone, inputSecondaryPhone,
  inputAddress,
  inputGender, inputBirthdate, inputHealthRestrictions,
  inputAdministrativeRestrictions,
  officeOption, locationOption,
  selectedFeatures, startModal, userContext, baseImage,
) {
  try {
    const response = await APIClients.post('clients/create', {
      name: inputName,
      email: inputEmail,
      cpf: inputCpf,
      phone: inputPhone,
      secondaryPhone: inputSecondaryPhone,
      address: inputAddress,
      gender: inputGender,
      birthdate: inputBirthdate,
      healthRestrictions: inputHealthRestrictions,
      administrativeRestrictions: inputAdministrativeRestrictions,
      office: officeOption,
      location: locationOption,
      features: selectedFeatures,
      userID: userContext,
      image: baseImage,
    });
    return response;
  } catch (error) {
    if (error.response.status === 400 && error.response.data.message.email) {
      startModal(EMAIL_REGISTER);
    } else if (error.response.status === 400 && error.response.data.message.cpf) {
      startModal(CPF_REGISTER);
    } else if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_CREATE_CLIENT);
    }
    console.error(`An unexpected error ocourred while creating a new client.${error}`);
  }
  return false;
}

export async function updateClient(
  inputName, inputEmail, inputCpf, inputPhone, inputSecondaryPhone,
  inputAddress, inputGender, inputBirthdate, inputHealthRestrictions,
  inputAdministrativeRestrictions, officeOption, locationOption,
  features, id, startModal, userContext, baseImage,
) {
  try {
    const response = await APIClients.put(`/clients/update/${id}`, {
      name: inputName,
      email: inputEmail,
      cpf: inputCpf,
      phone: inputPhone,
      secondaryPhone: inputSecondaryPhone,
      address: inputAddress,
      gender: inputGender,
      birthdate: inputBirthdate,
      healthRestrictions: inputHealthRestrictions,
      administrativeRestrictions: inputAdministrativeRestrictions,
      office: officeOption,
      location: locationOption,
      userID: userContext,
      features,
      image: baseImage,
    });
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_UPDATE_CLIENT);
    }
    console.error(`An unexpected error ocourred while updating the client data.${error}`);
  }
  return false;
}

export const toggleStatus = async (id, startModal) => {
  try {
    await APIClients.put(`/clients/toggleStatus/${id}`);
  } catch (error) {
    console.error(error);
    startModal(CLIENT_OPEN_DEMAND);
  }
};

export const getFeatures = async (url, startModal) => {
  try {
    const res = await APIClients.get(url);
    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response?.status !== 401) {
      startModal(NO_LIST_CARACT);
    }
    console.error(`An unexpected error ocourred while retrieving the features list.${error}`);
  }
  return false;
};

export const getClientFeatures = async (featuresList, startModal) => {
  try {
    const res = await APIClients.post('/featuresbyid', {
      featuresList,
    });
    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response?.status !== 401) {
      startModal(NO_LIST_CATEGORY);
    }
    console.error(`An unexpected error ocourred while retrieving the client features list.${error}`);
  }
  return false;
};

export const createFeature = async (
  name, description, color, startModal,
) => {
  try {
    const res = await APIClients.post('feature/create', {
      name,
      description,
      color,
    });
    if (res.data.status) {
      startModal(CREATE_NEW_CARACT);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_CREATE_CARACT);
    }
    console.error(`An unexpected error ocourred while creating a new feature.${error}`);
  }
  return false;
};

export const updateFeature = async (
  name, description, color, id, startModal,
) => {
  try {
    const res = await APIClients.put(`feature/update/${id}`, {
      name,
      description,
      color,
    });
    if (res.data.status) {
      startModal(FILL_ALL_FIELDS_EDIT);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_UPDATE_DEMAND);
    }
    console.error(`An unexpected error ocourred while updating an already created demand.${error}`);
  }
};

export const deleteFeature = async (id, startModal) => {
  try {
    const res = await APIClients.delete(`/feature/delete/${id}`);
    return res;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(`Não foi possivel deletar a categoria.\n${error}`);
    }
    console.error(error);
  }
  return false;
};

export async function createWorkspace(name, description, startModal) {
  try {
    const response = await APIClients.post('lotacao/create', {
      name,
      description,
    });
    if (response.data.status) {
      startModal(FILL_ALL_FIELDS_CREATE);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_CREATE_LOTATION);
    }
    console.error(`An unexpected error ocourred while creating a new workspace.${error}`);
  }
}

export const updateWorkspace = async (
  name, description, id, startModal,
) => {
  try {
    const res = await APIClients.put(`lotacao/update/${id}`, {
      name,
      description,
    });
    if (res.data.status) {
      startModal(FILL_ALL_FIELDS_EDIT_LOTATION);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_UPDATE_LOTATION);
    }
    console.error(`An unexpected error ocourred while updating an already created workspace.${error}`);
  }
};

export const deleteWorkspace = async (id, startModal) => {
  try {
    const res = await APIClients.delete(`/lotacao/delete/${id}`);
    return res;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_DELETE_LOTATION);
    }
    console.error(error);
  }
  return false;
};

export async function getCargos(url, startModal) {
  try {
    const response = await APICargos.get(url);
    return response;
  } catch (error) {
    if (error.response?.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response?.status !== 401) {
      startModal(NO_CLIENT_LIST);
    }
    console.error(`An unexpected error ocourred while retrieving the clients list.${error}`);
  }
  return false;
}

export async function createCargo(name, description, startModal) {
  try {
    const response = await APICargos.post('role', {
      name,
      description,
    });
    if (response.data.status) {
      startModal(FILL_ALL_FIELDS_CREATE_CARGO);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_CREATE_LOTATION);
    }
    console.error(`An unexpected error ocourred while creating a new workspace.${error}`);
  }
}

export const updateCargo = async (
  name, description, id, startModal,
) => {
  try {
    const res = await APICargos.patch(`role/${id}`, {
      name,
      description,
    });
    if (res.data.status) {
      startModal(FILL_FIELDS_EDIT_CARGO);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_UPDATE_LOTATION);
    }
    console.error(`An unexpected error ocourred while updating an already created workspace.${error}`);
  }
};

export const deleteCargo = async (id, startModal) => {
  try {
    const res = await APICargos.delete(`/role/${id}`);
    return res;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_DELETE_LOTATION);
    }
    console.error(error);
  }
  return false;
};

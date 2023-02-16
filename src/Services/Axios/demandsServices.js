import { APIDemands } from './baseService';
import "../../Constants/Errors";

export async function getCategories(url, startModal) {
  try {
    const response = await APIDemands.get(url);
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_CATEGORY_CREATED);
    }
    console.error(`An unexpected error ocourred while getting categories.${error}`);
  }
  return false;
}

export async function createCategory(name, description, color, startModal) {
  try {
    const response = await APIDemands.post('category/create', {
      name,
      description,
      color,
    });
    if (response.data.status) {
      startModal(FILL_ALL_FIELDS_CREATE_CATEGORY);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_CREATE_CATEGORY);
    }
    console.error(`An unexpected error ocourred while creating a new category.${error}`);
  }
}

export async function updateCategory(name, description, color, id, startModal) {
  try {
    const response = await APIDemands.put(`category/update/${id}`, {
      name,
      description,
      color,
    });
    if (response.data.status) {
      startModal(FILL_ALL_FIELDS_EDIT);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal('Não foi possível atualizar a categoria, tente novamente mais tarde.');
    }
    console.error(`An unexpected error ocourred while updating an already created category.${error}`);
  }
}

export const deleteCategory = async (id, startModal) => {
  try {
    await APIDemands.delete(`/category/delete/${id}`);
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(`Não foi possivel deletar a categoria.\n${error}`);
    }
    console.error(error);
  }
};

export async function getDemands(url, startModal) {
  try {
    const response = await APIDemands.get(url);
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal('Não foi possível carregar as demandas já criadas, tente novamente mais tarde.');
    }
    console.error(`An unexpected error ocourred while getting demands.${error}`);
  }
  return false;
}

export async function getFourDemands(startModal) {
  try {
    const response = await APIDemands.get('/demand/newest-four');
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal('Não foi possível listar as últimas quatro demandas, tente novamente mais tarde.');
    }
    console.error(`An unexpected error ocourred while getting the last four demands.${error}`);
  }
  return false;
}

export async function createDemand(
  name, description, process, categoryID, sectorID, userID, clientID, startModal, demandDate,
) {
  try {
    const response = await APIDemands.post('demand/create', {
      name,
      description,
      process,
      categoryID,
      sectorID,
      userID,
      clientID,
      demandDate,
    });
    if (response.data.status) {
      startModal(FILL_ALL_FIELDS_CREATE_CATEGORY);
    }
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal('Não foi possível criar a nova demanda, tente novamente mais tarde.');
    }
    console.error(`An unexpected error ocourred while creating a new demand.${error}`);
    return false;
  }
}

export async function updateDemand(
  name, description, process, categoryID, sectorID, userID, clientID, id, startModal,
) {
  try {
    const response = await APIDemands.put(`demand/update/${id}`, {
      name,
      description,
      process,
      categoryID,
      sectorID,
      userID,
      clientID,

    });
    if (response.data.status) {
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
}

export async function toggleDemand(id, startModal) {
  try {
    await APIDemands.put(`demand/toggle/${id}`);
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_FINALIZE_DEMAND);
    }
    console.error(`An unexpected error ocourred while closing an already created demand.${error}`);
  }
}

export async function updateDemandSector(sectorID, id, startModal) {
  try {
    const response = await APIDemands.put(`demand/sectorupdate/${id}`, {
      sectorID,
    });
    if (response.data.status) {
      startModal(SELECT_SECTOR);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_UPDATE_SECTOR);
    }
    console.error(`An unexpected error occurred while updating a demand's sector.${error}`);
  }
}

export async function forwardDemand(sectorID, id, startModal) {
  try {
    const response = await APIDemands.put(`demand/forward/${id}`, {
      sectorID,
    });
    if (response.data.status) {
      startModal(SEND_DEMAND);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(SEND_DEMAND_SECTOR);
    }
    console.error(`An unexpected error occurred while forwarding a demand to another sector.${error}`);
  }
}

export async function createDemandUpdate(
  userName,
  userSector,
  userID,
  description,
  visibilityRestriction,
  id,
  important,
  startModal,
) {
  try {
    const response = await APIDemands.put(`demand/create-demand-update/${id}`, {
      userName,
      userSector,
      userID,
      description,
      visibilityRestriction,
      important,
    });
    if (response.data.status) {
      startModal(FILL_FIELD_DESCRIPTION);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_SEND_ATUALIZATION);
    }
    console.error(`An unexpected error occurred while sending a demand update.${error}`);
  }
}

export async function getDemandsWithClientsNames(url, startModal) {
  try {
    const response = await APIDemands.get(url);
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_ATUALIZE_CATEGORY);
    }
    console.error(`An unexpected error ocourred while getting demands with clients names.${error}`);
  }
  return false;
}

export async function getDemandsStatistics(url, startModal) {
  try {
    const response = await APIDemands.get(url);
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_ATUALIZE_ESTATISTIC);
      console.error(`An unexpected error ocourred while getting demands with clients names.${error}`);
    }
  }
  return false;
}

export async function deleteDemandUpdate(id, updateListID, startModal) {
  try {
    const response = await APIDemands.put(`demand/delete-demand-update/${id}`, {
      updateListID,
    });
    if (response.data.status) {
      startModal(NO_DELETE_ATUALIZATION);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_DELETE_ATUALIZATION_DEMAND);
    }
    console.error(`An unexpected error occurred while deleting a demand update.${error}`);
  }
}

export async function DemandUploadFile(
  id, startModal, file, info,
) {
  try {
    const dataArray = new FormData();
    dataArray.append('name', file.name);

    dataArray.append('userName', info.userName);
    dataArray.append('userSector', info.userSector);
    dataArray.append('userId', info.userId);
    dataArray.append('description', info.description);
    dataArray.append('important', info.important);
    dataArray.append('visibility', info.visibility);

    dataArray.append('file', file);

    const response = await APIDemands.post(`/demand/upload-file/${id}`, dataArray);
    if (response.status === 200) {
      startModal(PDF_SUCSESS);
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // eslint-disable-next-line no-undef
      startModal(SESSION_EXPIRED);
    } else {
      // eslint-disable-next-line no-undef
      startModal(PDF_ERROR);
    }
  }
}

export async function updateDemandUpdate(
  userName,
  userSector,
  userID,
  description,
  id,
  updateListID,
  visibilityRestriction,
  important,
  startModal,
) {
  try {
    const response = await APIDemands.put(`demand/update-demand-update/${id}`, {
      userName,
      userSector,
      userID,
      description,
      visibilityRestriction,
      updateListID,
      important,
    });
    if (response.data.status) {
      startModal(NO_EDIT_ATUALIZATION);
    }
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_EDIT_ATUALIZATION_DEMAND);
    }
    console.error(`An unexpected error occurred while updating a demand update.${error}`);
  }
}

export async function getDemandData(id, startModal) {
  try {
    const response = await APIDemands.get(`demand/${id}`);
    return response?.data;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_DATAS_DEMAND);
    }
    console.error(`An unexpected error ocourred while gettint a demand.${error}`);
    return null;
  }
}

export async function createAlert(
  name, description, date, alertClient, checkbox, demandID, sectorID, startModal,
) {
  try {
    const response = await APIDemands.post('alert/create', {
      name,
      description,
      date,
      alertClient,
      checkbox,
      demandID,
      sectorID,
    });
    startModal(ALERT_SUCCESS);
    return response?.data;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.data.status) {
      startModal(FILL_FIELDS_ALERT);
    } else if (error.response.status !== 401) {
      startModal(NO_CREATED_ALERT);
    }
    console.error(`An unexpected error ocourred while creating a new alert.${error}`);
    return null;
  }
}

export async function updateAlert(
  id, name, description, date, alertClient, checkbox,
  demandID, sectorID, startModal,
) {
  try {
    const response = await APIDemands.put(`alert/update/${id}`, {
      name,
      description,
      date,
      alertClient,
      checkbox,
      demandID,
      sectorID,
    });
    if (response.data.status) {
      startModal(FILL_ALL_FIELDS_EDIT_ALERT);
    }
    return response?.data;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_UPDATE_ALERT);
    }
    console.error(`An unexpected error ocourred while updating an already created alert.${error}`);
  }
  return null;
}

export const deleteAlert = async (id, startModal) => {
  try {
    await APIDemands.delete(`/alert/delete/${id}`);
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(`Não foi possivel deletar o alerta.\n${error}`);
    }
    console.error(error);
  }
};

export async function getAlerts(url, startModal) {
  try {
    const response = await APIDemands.get(url);
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_ATUALIZE_ALERT);
    }
    console.error(`An unexpected error ocourred while getting alerts.${error}`);
  }
  return false;
}

export async function getAlertsByDemand(id, startModal) {
  try {
    const response = await APIDemands.get(`alert/demand/${id}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_ATUALIZE_ALERT_DEMAND);
    }
    console.error(`An unexpected error ocourred while getting alerts by demand.${error}`);
  }
  return null;
}

export async function getAlertsBySector(id, startModal) {
  if (!id) {
    return null;
  }
  try {
    const response = await APIDemands.get(`alert/sector/${id}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_ATUALIZE_ALERT_SECTOR);
    }
    console.error(`An unexpected error ocourred while getting alerts by sector.${error}`);
  }
  return null;
}

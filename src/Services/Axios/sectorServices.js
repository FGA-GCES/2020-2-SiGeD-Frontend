import { APISectors } from './baseService/index';
import "../../Constants/Errors";

export async function getSectors(startModal) {
  try {
    const response = await APISectors.get('sector');
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_LIST_SECTOR);
    }
    console.error(`An unexpected error ocourred while retrieving the sectors list.${error}`);
  }
  return false;
}

export async function getFourSectors(startModal) {
  try {
    const response = await APISectors.get('/sector/newest-four');
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_LIST_4SECTORS);
    }
    console.error(`An unexpected error ocourred while retrieving the newest four sectors list.${error}`);
  }
  return false;
}

export async function getSector(url, startModal) {
  try {
    const response = await APISectors.get(url);
    return response;
  } catch (error) {
    startModal(NO_SECTOR);
    console.error(`An unexpected error ocourred while retrieving the sectors list.${error}`);
  }
  return false;
}

export async function postSectors(
  inputName, inputDescription, startModal,
) {
  try {
    const response = await APISectors.post('sector/create', {
      name: inputName,
      description: inputDescription,
    });
    return response;
  } catch (error) {
    if (error.response.data.error === 11000) {
      startModal(SECTOR_DUPLICATE);
    } else if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_CREATE_SECTOR);
    }
    console.error(`An unexpected error ocourred while creating a new sector.${error}`);
  }
  return null;
}

export const updateSectors = async (
  inputName, inputDescription, id, startModal,
) => {
  try {
    await APISectors.put(`/sector/update/${id}`, {
      name: inputName,
      description: inputDescription,
    })
      .catch((error) => {
        startModal(NO_ATUALIZE_SECTOR);
        console.error(`An unexpected error ocourred while updating the sector data.${error}`);
      });
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    }
  }
};

export const deleteSector = async (id, startModal) => {
  try {
    await APISectors.delete(`/sector/delete/${id}`);
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_DELETE_SECTOR);
    }
    console.error(error);
  }
};

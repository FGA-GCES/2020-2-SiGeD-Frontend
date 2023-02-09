import {
  APIUsers, APIDemands, APIClients, APISectors,
} from './baseService/index';
import "../../Constants/Errors";


export async function getUser(url, startModal) {
  try {
    const response = await APIUsers.get(url);
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_USER);
    }
    console.error(error);
  }
  return false;
}

export async function getFourUsers(startModal) {
  try {
    const response = await APIUsers.get('/users/newest-four');
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_LIST_4USERS);
    }
    console.error(error);
  }
  return false;
}

export async function postUser(
  inputName, inputEmail, inputRole, inputSector, baseImage, startModal,
) {
  try {
    await APIUsers.post('signup', {
      name: inputName,
      email: inputEmail,
      role: inputRole,
      sector: inputSector,
      image: baseImage,
    });
    startModal(USER_SUCCESS);
  } catch (error) {
    if (error.response?.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response?.status !== 401) {
      startModal(EMAIL_REGISTER);
      console.error(`An unexpected error ocourred while registering a new user.${error}`);
    }
  }
}

export async function loginUser(
  inputEmail, inputPassword, startModal,
) {
  try {
    const response = await APIUsers.post('login', {
      email: inputEmail,
      pass: inputPassword,
    });
    if (response.data.message) {
      startModal(USER_PASSWORD_INVALID);
    } else {
      APIUsers.defaults.headers = { 'x-access-token': response.data.token };
      APIClients.defaults.headers = { 'x-access-token': response.data.token };
      APIDemands.defaults.headers = { 'x-access-token': response.data.token };
      APISectors.defaults.headers = { 'x-access-token': response.data.token };
    }
    return response.data;
  } catch (error) {
    startModal(NO_LOGIN);
    console.error(error);
    return null;
  }
}

export const updateUser = async (
  inputName, inputEmail, inputRole, inputSector, baseImage, id, startModal,
) => {
  try {
    await APIUsers.put(`/users/update/${id}`, {
      name: inputName,
      email: inputEmail,
      role: inputRole,
      sector: inputSector,
      image: baseImage,
    });
    startModal(USER_ATUALIZE_SUCCESS);
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_ATUALIZE_USER);
    }
    console.error(`An unexpected error occurred while updating the user data.${error}`);
  }
};

export async function deleteUser(id, startModal) {
  try {
    await APIUsers.delete(`/users/delete/${id}`);
  } catch (error) {
    if (error.response.status === 500) {
      startModal(SESSION_EXPIRED);
    } else if (error.response.status !== 401) {
      startModal(NO_DELETE_USER);
    }
    console.error(error);
  }
}

export async function recoverPassword(
  inputEmail, startModal,
) {
  try {
    await APIUsers.post('recover-password', {
      email: inputEmail,
    });
    startModal(SEND_PASSWORD);
  } catch (error) {
    if (error.response.status === 400) {
      startModal(NO_SEND_RECUPERATION_EMAIL);
      console.error(error);
    } else if (error.response.status === 404) {
      startModal(NO_USER_EMAIL);
      console.error(error);
    }
  }
}

export async function changePassword(
  id, pass, startModal,
) {
  try {
    const response = await APIUsers.put(`change-password/${id}`, {
      pass,
    });
    if (response.status === 400) {
      startModal(PASSWORD_6CARACT);
      console.error(response.data.error);
      return null;
    }
    if (response.status === 404) {
      startModal(ERROR_PASSWORD);
      console.error(response.data.error);
      return null;
    }
    startModal(PASSWORD_SUCCESS);
    return response.data;
  } catch (error) {
    startModal(ERROR_PASSWORD);
    console.error(error);
    return null;
  }
}

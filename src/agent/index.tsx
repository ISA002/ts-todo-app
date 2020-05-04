import commonStore from "../store/stores/commonStore";

export const constructGenericRequestHeaders = () => ({
  "Content-Type": "application/json",
});

export const constructRequestHeaders = (params = {}) => {
  const authToken = commonStore.token;
  return {
    ...constructGenericRequestHeaders(),
    ...(authToken ? { Authorization: `JWT ${authToken}` } : {}),
    ...params,
  };
};

export const getRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "GET",
    headers: constructRequestHeaders(),
  }).then((response: Response) => {
    if (response.ok) {
      return response.json();
    }
    console.error("Error");
  });
};

export const postRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "POST",
    headers: constructRequestHeaders(),
    body: JSON.stringify(body),
  }).then((response: Response) => {
    if (response.ok) {
      return response.json();
    }
    console.error("Error");
  }).catch((error: any) => {
    console.error("getRequestError", error);
  });
};

export const deleteRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "DELETE",
    headers: constructRequestHeaders(),
    body: JSON.stringify(body),
  }).then((response: Response) => {
    if (response.ok) {
      return;
    }
    console.error("Error");
  });
};

export const patchRequest = (url: string, body = {}) => {
  return fetch(url, {
    method: "PATCH",
    headers: constructRequestHeaders(),
    body: JSON.stringify(body),
  }).then((response: Response) => {
    if (response.ok) {
      return response.json();
    }
    console.error("Error");
  });
};

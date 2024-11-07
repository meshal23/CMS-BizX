/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class Image {
  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}item-image`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.images;
  };

  edit = async (data: any, id: any) => {
    const response = await axios({
      method: "put",
      url: `${API_URL}item-image/${id}`,
      data: data,
    }).catch((e) => {
      throw e.message;
    });

    return response.data;
  };
}

export default new Image();

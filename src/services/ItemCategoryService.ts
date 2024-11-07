import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class ItemCategory {
  getAll = async () => {
    const res = await axios({
      method: "get",
      url: `${API_URL}item-category`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("BizX_accessToken")}`,
      },
    }).catch((err) => {
      throw err.message;
    });

    return res.data.category;
  };
}

export default new ItemCategory();

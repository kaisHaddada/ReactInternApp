import axios from "../helpers/axios";

export const getAllInterns = async (page, perPage, search) => {
  const response = await axios.get("/interns", {
    params: {
      page: page,
      per_page: perPage,
      search: search,
    },
  });
  return response.data;
};

export const deleteUserById = async (id) => {
  await axios.delete("/interns/" + id);
};
export const createIntern = (data) => {
  return axios.post("/interns", {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    university: data.university,
    level: data.level,
  });
};

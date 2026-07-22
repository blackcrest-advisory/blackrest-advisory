import axios from "./client";

type RegisterResponse = {
  success: true;
  userId: string;
};

type UpdateIndustryResponse = {
  success: true;
};

type LogoutResponse = {
  success: true;
};

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const response = await axios.post<RegisterResponse>("/api/register", {
    name,
    email,
    password,
  });

  return response.data;
}

export async function updateIndustry(userId: string, industry: string) {
  const response = await axios.post<UpdateIndustryResponse>(
    "/api/register/industry",
    {
      userId,
      industry,
    },
  );

  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await axios.post<Record<string, unknown>>(
    "/api/auth/signin",
    {
      email,
      password,
      redirect: false,
    },
  );

  return response.data;
}

export async function logoutUser() {
  const response = await axios.post<LogoutResponse>("/api/auth/logout");

  return response.data;
}

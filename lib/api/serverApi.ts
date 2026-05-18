import axios from 'axios';

export async function getServerApi() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
}

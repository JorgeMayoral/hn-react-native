import { API_URL } from '../constants/apiConstants';

export default async function fetchNewsIds() {
  const idsResponse = await fetch(`${API_URL}/beststories.json`);
  const allIds = await idsResponse.json();
  return allIds;
}

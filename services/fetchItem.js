import { API_URL } from '../constants/apiConstants';

export default async function fetchItem(itemId) {
  const response = await fetch(`${API_URL}/item/${itemId}.json`);
  const item = await response.json();
  return item;
}

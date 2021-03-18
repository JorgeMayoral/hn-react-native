import { API_URL } from '../constants/apiConstants';

export default async function fetchNewsIds(storyId) {
  const response = await fetch(`${API_URL}/item/${storyId}.json`);
  const story = await response.json();
  return story;
}

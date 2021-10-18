import axios from "axios";
const key = "23131793-6d85f6b0cc60a2b86f77a0160";

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (query, currentPage) => {
  const { data } = await axios.get(
    `/?q=${query}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data;
};

export default fetchImages;

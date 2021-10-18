import { useState, useEffect } from "react";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Modal from "./components/Modal";
import IconButton from "./components/IconButton";
import { ReactComponent as CloseIcon } from "./icons/close.svg";

import fetchImages from "./api/api-services";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [searchQuery, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [largeImage, setlargeImage] = useState("");
  const [error, setError] = useState(null);

  // Запрос за картинками при обновлении инпута
  useEffect(() => {
    if (!searchQuery) return;

    getImages();
    // eslint-disable-next-line
  }, [searchQuery]);

  // Принимает с формы запрос и пишем в стейт и сбрасывает после отправки стейт
  const onChangeQuery = (query) => {
    setImages([]);
    setPage(1);
    setQuery(query);
    setLoading(false);
    setModal(false);
    setlargeImage("");
    setError(null);
  };

  // Получаем дату из фетча
  const getImages = async () => {
    setLoading(true);

    try {
      const { hits } = await fetchImages(searchQuery, currentPage);

      setImages((prev) => [...prev, ...hits]);

      setPage((prevPage) => prevPage + 1);

      if (currentPage !== 1) {
        scrollOnLoadButton();
      }
    } catch (error) {
      console.log("Smth wrong with App fetch", error);
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  // Получает полное изображение, пишет его в стейт и открывает модалку
  const handleGalleryItem = (fullImageUrl) => {
    setlargeImage(fullImageUrl);
    setModal(true);
  };

  // Переключение модалки
  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  // Скролл при клике на кнопку
  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const needToShowLoadMore = images.length > 0 && images.length >= 12;

  return (
    <>
      <Searchbar onSearch={onChangeQuery} />

      {images.length < 1 && (
        <Message>
          <h2>The gallery is empty ⚛</h2>
          <p>Use search field!</p>
        </Message>
      )}

      <ImageGallery images={images} onImageClick={handleGalleryItem} />

      {needToShowLoadMore && <Button onClick={getImages} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <div className="Close-box">
            <IconButton onClick={toggleModal} aria-label="Close modal">
              <CloseIcon width="20px" height="20px" fill="#7e7b7b" />
            </IconButton>
          </div>
          <img src={largeImage} alt="" className="Modal-image" />
        </Modal>
      )}

      {isLoading && <Loader />}

      {error && (
        <Message>
          <h2>Oops!😭</h2>
          <p>
            Sorry, something went wrong. Please try again, or{" "}
            <a href="/">refresh the page</a>.
          </p>
        </Message>
      )}
    </>
  );
};

export default App;

import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.scss";

const ImageGalleryItem = ({ image, onImageClick }) => {
  const fullImage = () => onImageClick(image.largeImageURL);

  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={s["ImageGalleryItem-image"]}
        onClick={fullImage}
      />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  tags: "",
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

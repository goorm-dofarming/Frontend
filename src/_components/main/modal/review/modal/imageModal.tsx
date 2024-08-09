import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import styles from '@/src/_components/main/modal/review/modal/imagemodal.module.scss';

import Slider from 'react-slick';

import { Review } from '@/src/types/aboutReview';

import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

interface ImageModalProps {
  review: Review | undefined;
  imageModal: boolean;
  openImage: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  review,
  imageModal,
  openImage,
}) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <>
        <BsFillCaretRightFill
          className={className}
          style={{
            ...style,
            width: '40px',
            height: '40px',
            zIndex: '1',
            right: '-35px',
          }}
          fontSize={'40px'}
          fill="white"
          onClick={onClick}
        />
      </>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <>
        <BsFillCaretLeftFill
          className={className}
          style={{ ...style, width: '40px', height: '40px', left: '-35px' }}
          fontSize={'40px'}
          fill="white"
          onClick={onClick}
        />
      </>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <NextArrow
        style={{ left: '-35px' }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      />
    ),
    prevArrow: (
      <PrevArrow
        style={{ rigth: '-35px' }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      />
    ),
  };

  useEffect(() => {
    const root = document.querySelector(
      '#modal-container'
    ) as HTMLElement | null;
    setModalRoot(root);
  }, []);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.container}
      style={{ visibility: imageModal ? 'visible' : 'hidden' }}
      onClick={openImage}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* <div className={styles.header} onClick={openImage}>
          <MdClose fill="white" size={'28px'} />
        </div> */}
        {review && review.images.length > 1 ? (
          <Slider {...settings} className={styles.slider}>
            {review.images.map((image) => (
              <div
                key={image.imageId}
                className={styles.imageContainer}
                onClick={openImage}
              >
                <Image
                  src={image.imageUrl}
                  alt={'이미지'}
                  className={styles.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))}
          </Slider>
        ) : (
          review &&
          review.images.length > 0 && (
            <div className={styles.imageContainer} onClick={openImage}>
              <Image
                src={review.images[0].imageUrl}
                alt={'이미지'}
                className={styles.image}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )
        )}
      </div>
    </div>,
    modalRoot
  );
};

export default ImageModal;

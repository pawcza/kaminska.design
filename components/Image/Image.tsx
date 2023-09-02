import { AnimatePresence, m } from 'framer-motion';
import NextImage, { ImageProps } from 'next/image';
import React, { useState } from 'react';

type Props = {
  src: string;
  key: string;
  alt?: string;
  data64Blur?: string;
  children?: React.ReactNode;
  zoom?: boolean;
  fullHeight?: boolean;
  fit?: 'contain' | 'cover';
} & ImageProps;

const Image: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadedSize, setLoadedSize] = useState({ width: 0, height: 0 });

  const handleLoadingComplete = (image: HTMLImageElement) => {
    setLoaded(true);
    setSize(image);
  };

  const setSize = (image: HTMLImageElement) => {
    const { width, height } = image.getBoundingClientRect();
    setLoadedSize({ width, height });
  };

  const handleClick = (open: boolean) => setOpen(open);

  return props.zoom ? (
    <>
      {open && (
        <div style={{ height: loadedSize.height, width: loadedSize.width }} />
      )}
      <div
        className={`${
          open
            ? 'flex justify-center items-center fixed top-0 left-0 z-50 h-full w-full'
            : 'cursor-zoom-in relative'
        }`}
      >
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              key="shade"
              className="h-full w-full bg-black fixed left-0 z-0 cursor-zoom-out"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        <ImageInsides
          {...props}
          zoom
          handleClick={handleClick}
          handleClose={() => setOpen(false)}
          handleLoadingComplete={handleLoadingComplete}
          loaded={loaded}
          open={open}
          fullHeight={props.fullHeight}
          fit={props.fit}
        />
      </div>
    </>
  ) : (
    <ImageInsides
      {...props}
      handleLoadingComplete={handleLoadingComplete}
      loaded={loaded}
      fullHeight={props.fullHeight}
      fit={props.fit}
    />
  );
};

export default Image;

const ImageInsides: React.FC<
  Props & {
    handleLoadingComplete: (image: HTMLImageElement) => void;
    handleClick?: (open: boolean) => void;
    handleClose?: () => void;
    loaded: boolean;
    open?: boolean;
    zoom?: boolean;
    fit?: 'contain' | 'cover';
  }
> = (props) => {
  const {
    key,
    alt,
    src,
    data64Blur,
    loaded,
    handleClick,
    handleClose,
    handleLoadingComplete,
    fullHeight,
    children,
    open,
    zoom,
    fit = 'contain',
  } = props;
  return (
    <div
      className={`overflow-hidden h-full flex justify-center align-center  ${
        open ? 'max-w-[calc(100%-4rem)] max-h-[calc(100%-4rem)]' : ''
      }`}
    >
      {zoom && open && (
        <m.div
          onClick={handleClose}
          className="absolute top-8 right-8 text-5xl font-black text-white z-50 cursor-pointer drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        >
          X
        </m.div>
      )}
      <NextImage
        key={key}
        alt={alt || ''}
        onClick={() => (!open && zoom ? handleClick(true) : '')}
        src={`${src}/m/filters:quality(75)`}
        width={0}
        height={0}
        placeholder={data64Blur ? 'blur' : 'empty'}
        className={`bg-transparent transition duration-300 w-auto ${
          loaded ? 'scale-100 bg-gray-400 blur-0' : 'scale-120 blur-md'
        } ${fullHeight ? 'h-full w-full' : 'h-auto'} `}
        onLoadingComplete={handleLoadingComplete}
        blurDataURL={`data:image/${data64Blur}`}
        style={{
          objectFit: fit,
        }}
      />
      {children}
    </div>
  );
};

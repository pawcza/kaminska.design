import { AnimatePresence, m, useDomEvent } from 'framer-motion';
import NextImage, { ImageProps } from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  key: string;
  alt?: string;
  data64Blur?: string;
  children?: React.ReactNode;
  zoom?: boolean;
  fullHeight?: boolean;
} & ImageProps;

const Image: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [finishedAnimation, setFinishedAnimation] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadedSize, setLoadedSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFinishedAnimation(true);
      }, 500);
    } else {
      setFinishedAnimation(false);
    }
  }, [open]);
  useDomEvent(
    useRef(window),
    'scroll',
    () => props.zoom && open && setOpen(false),
  );

  useDomEvent(useRef(window), 'resize', () => setSize);

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
            ? 'flex justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 h-full w-full cursor-zoom-out'
            : 'cursor-zoom-in'
        } ${finishedAnimation ? '' : 'z-50'}`}
      >
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              key="shade"
              className="h-full w-full bg-black fixed left-0 -top-[1px] z-0"
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
          handleLoadingComplete={handleLoadingComplete}
          loaded={loaded}
          open={open}
          allowToggle={finishedAnimation || open}
          fullHeight={props.fullHeight}
        />
      </div>
    </>
  ) : (
    <ImageInsides
      {...props}
      handleLoadingComplete={handleLoadingComplete}
      loaded={loaded}
      fullHeight={props.fullHeight}
    />
  );
};

export default Image;

const ImageInsides: React.FC<
  Props & {
    handleLoadingComplete: (image: HTMLImageElement) => void;
    handleClick?: (open: boolean) => void;
    loaded: boolean;
    open?: boolean;
    zoom?: boolean;
    allowToggle?: boolean;
  }
> = (props) => {
  const {
    key,
    alt,
    src,
    data64Blur,
    loaded,
    handleClick,
    handleLoadingComplete,
    fullHeight,
    children,
    open,
    zoom,
    allowToggle,
  } = props;
  return (
    <m.div
      key={key}
      className={`relative overflow-hidden ${
        zoom && open ? 'z-10 max-w-[80%]' : ''
      } ${fullHeight ? 'h-full' : ''}`}
      onClick={() => (allowToggle && zoom ? handleClick(!open) : '')}
      layout
    >
      <NextImage
        alt={alt || ''}
        src={`${src}/m/filters:quality(75)`}
        width={0}
        height={0}
        placeholder={data64Blur ? 'blur' : 'empty'}
        className={`bg-gray-400 transition duration-300 w-full object-cover ${
          loaded ? 'scale-100 bg-gray-400 blur-0' : 'scale-120 blur-2xl'
        } ${fullHeight ? 'h-full' : 'h-auto'}`}
        onLoadingComplete={handleLoadingComplete}
        blurDataURL={`data:image/${data64Blur}`}
      />
      {children}
    </m.div>
  );
};

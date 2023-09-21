import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { ImageType } from '@/components/Image/Image';

type BackgroundImage = {
  className: string;
} & Partial<ImageType>;
const BackgroundImage = (props) => {
  const { src, data64Blur, className, hoverZoom } = props;

  const [loaded, setLoaded] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [seen, setSeen] = useState(false);
  const optimizedSrc = `${src}/m/filters:quality(75)`;
  const ref = useRef();
  const isInView = useInView(ref);

  const bgClasses = 'bg-no-repeat bg-center';

  useEffect(() => {
    if (!seen && isInView) {
      setSeen(true);
      const bgImg = new Image();
      bgImg.src = optimizedSrc;
      bgImg.onload = () => {
        setTimeout(() => {
          setAnimated(true);
        }, 500);
        setLoaded(true);
      };
    }
  }, [isInView, optimizedSrc, seen]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`h-full bg-contain w-full absolute blur-sm transition-opacity ${bgClasses} duration-500 ${
          animated && 'opacity-0'
        }`}
        ref={ref}
        style={{ backgroundImage: `url(data:image/${data64Blur})` }}
      />
      <div
        className={`h-full bg-contain absolute w-full top-0 opacity-0 transition-all duration-1000 ${
          hoverZoom && 'hover:scale-110'
        } ${loaded && 'opacity-100'} ${bgClasses}`}
        ref={ref}
        style={{ backgroundImage: `url('${optimizedSrc}')` }}
      />
    </div>
  );
};

export default BackgroundImage;

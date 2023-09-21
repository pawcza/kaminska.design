// "use server";
import { storyblokEditable } from '@storyblok/react/rsc';

import BackgroundImage from '@/components/Image/BackgroundImage';
import Image from '@/components/Image/Image';
import Link from '@/components/Link/Link';

const Project = ({ blok }) => {
  const { mainImage, descImage, description, gallery, shortDesc, title } = blok;

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className="w-screen md:h-[85vh] flex md:flex-row flex-col relative mt-8 md:mt-0"
      >
        <div className="h-full md:w-1/3 md:min-w-[500px] grow-0 relative">
          <BackgroundImage
            src={mainImage.filename}
            data64Blur={mainImage.data64Blur}
            className="h-full w-[calc(100%-4rem)] bg-cover mix-blend-multiply min-h-[200px] m-4"
            fit="contain"
          />
        </div>
        <div className="p-4 md:p-8 flex flex-col justify-center mt-auto md:mt-0">
          <div className="-mt-8 absolute h-12 md:relative top-0 left-0 pl-4 md:-ml-8 z-40 py-2 cursor-pointer w-full md:w-fit backdrop-grayscale bg-[rgba(255,255,255,.75)]">
            <Link
              slug={'/#projects-section'}
              arrowDirection="left"
              text="Wszystkie projekty"
            />
          </div>
          <div>
            {title.split(' ').map((word, i) => (
              <span
                key={`title-word-${i}`}
                className={`text-2xl md:text-4xl font-light border-t-2 py-2 md:-mt-2 border-t-gray-950 ${
                  !(i % 2) ? '' : 'font-thin'
                }`}
              >
                {word}{' '}
              </span>
            ))}
            <p className="px-4 md:p-4 -ml-4 text-md md:text-xl font-light text-gray-800 max-w-xl">
              {shortDesc}
            </p>
          </div>
        </div>
      </section>
      <section
        id="project-details"
        className="w-screen p-4 flex md:flex-row flex-col-reverse justify-center items-center relative max-w-7xl m-auto"
      >
        <div className="h-auto mt-8 md:mt-0 w-full md:w-1/2 shrink-0 relative">
          <Image
            src={descImage.filename}
            key={descImage.id}
            alt={descImage.alt}
            data64Blur={descImage.data64Blur}
            zoom
          />
        </div>
        <div className="md:p-4 h-full md:min-h-[600px] flex flex-col justify-center">
          <p className="text-md md:text-lg font-light text-gray-800 md:p-4 leading-8">
            {description}
          </p>
        </div>
      </section>
      <section className="p-4 md:p-8 grid gap-4 md:gap-8 grid-cols-2 justify-items-center auto-rows-auto max-w-7xl m-auto">
        {gallery.map(({ filename, id, alt, data64Blur }) => (
          <Image
            src={filename}
            key={id}
            alt={alt}
            data64Blur={data64Blur}
            zoom
          />
        ))}
      </section>
    </>
  );
};
export default Project;

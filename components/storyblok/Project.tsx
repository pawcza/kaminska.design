// "use server";
import { storyblokEditable } from '@storyblok/react/rsc';
import { LayoutGroup, m } from 'framer-motion';

import Image from '@/components/Image/Image';
import Link from '@/components/Link/Link';

const Project = ({ blok }) => {
  const { mainImage, descImage, description, gallery, shortDesc, title } = blok;

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className="w-screen md:h-[85vh] flex md:flex-row flex-col relative"
      >
        <m.div
          className="h-full md:w-1/3 md:min-w-[500px] grow-0 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Image
            src={mainImage.filename}
            key={mainImage.id}
            alt={mainImage.alt}
            fullHeight
            data64Blur={mainImage.data64Blur}
            fit="cover"
            className="bg-fixed"
          />
        </m.div>
        <div className="p-4 md:p-8 flex flex-col justify-center relative mt-auto md:mt-0">
          <m.div
            className="fixed h-12 md:relative top-0 left-0 pl-8 md:-ml-8 z-50 py-2 cursor-pointer w-full md:w-fit backdrop-grayscale bg-[rgba(255,255,255,.75)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              slug={'/#projects-section'}
              arrowDirection="left"
              text="Wszystkie projekty"
            />
          </m.div>
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            {title.split(' ').map((word, i) => (
              <span
                key={`title-word-${i}`}
                className={`text-2xl md:text-4xl font-light border-t-2 py-2 md:-mt-2 border-t-black ${
                  !(i % 2) ? '' : 'font-thin'
                }`}
              >
                {word}{' '}
              </span>
            ))}
            <p className="px-4 md:p-4 -ml-4 text-md md:text-xl font-light text-gray-800 bg-white max-w-xl">
              {shortDesc}
            </p>
          </m.div>
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
          <p className="text-md md:text-lg font-light text-gray-800 bg-white md:p-4 leading-8">
            {description}
          </p>
        </div>
      </section>
      <section className="p-4 md:p-8 grid gap-4 md:gap-8 grid-cols-2 justify-items-center auto-rows-auto max-w-7xl m-auto">
        <LayoutGroup>
          {gallery.map(({ filename, id, alt, data64Blur }) => (
            <Image
              src={filename}
              key={id}
              alt={alt}
              data64Blur={data64Blur}
              zoom
            />
          ))}
        </LayoutGroup>
      </section>
    </>
  );
};
export default Project;

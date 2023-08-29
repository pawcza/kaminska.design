// "use server";
import { storyblokEditable } from '@storyblok/react/rsc';
import { m } from 'framer-motion';

import Image from '@/components/Image/Image';
import Link from '@/components/Link';
import Mousey from '@/components/Mousey';

const Project = ({ blok }) => {
  const {
    mainImage,
    descImage,
    description,
    gallery,
    shortDesc,
    title,
    number,
  } = blok;

  console.log(blok);

  const handleOnClick = () => {
    document
      .getElementById('project-details')
      .scrollIntoView({ behavior: 'smooth' });
    // Doesnt' seem to work on Firefox?
  };

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className="w-screen h-screen flex md:flex-row flex-col justify-between relative"
      >
        <m.div
          className="h-[58vh] md:h-full md:w-1/2 shrink-0 relative"
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
          >
            <span className="text-9xl text-white italic absolute right-8 bottom-2 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] font-black">
              #0{number}
            </span>
          </Image>
        </m.div>
        <div className="p-8 h-full flex flex-col justify-between relative">
          <m.div
            className="left-0 bg-white border-b-2 border-black py-2 cursor-pointer w-fit"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              slug={'/#projects-section'}
              arrowDirection="left"
              text="Back to all projects"
            />
          </m.div>
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-light">{title}</h1>
            <p className="p-4 -ml-4 text-xl font-thin text-gray-800 bg-white">
              {shortDesc}
            </p>
          </m.div>
          <div />
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Mousey onClick={handleOnClick} />
          </m.div>
        </div>
      </section>
      <section
        id="project-details"
        className="w-screen p-4 flex md:flex-row flex-col justify-center items-center relative max-w-7xl m-auto"
      >
        <div className="h-auto w-1/2 shrink-0 relative">
          <Image
            src={descImage.filename}
            key={descImage.id}
            alt={descImage.alt}
            zoom
          />
        </div>
        <div className="md:p-4 h-full md:min-h-[600px] flex flex-col justify-center">
          <p className="text-xl font-thin text-gray-800 bg-white p-4">
            {description}
          </p>
        </div>
      </section>
      <section className="p-8 grid gap-8 grid-cols-2 justify-items-center max-w-5xl m-auto">
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

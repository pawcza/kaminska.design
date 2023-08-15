// "use server";
import { storyblokEditable } from '@storyblok/react/rsc';
import { motion } from 'framer-motion';

import Link from '@/components/Link';
import Mousey from '@/components/Mousey';

const Project = ({ blok }) => {
  const { mainImage, descImage, description, gallery, shortDesc, title } = blok;

  const handleOnClick = () => {
    document
      .getElementById('project-details')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className="w-screen h-screen flex justify-center relative"
      >
        <motion.div
          style={{ backgroundImage: `url(${mainImage?.filename})` }}
          className="h-full w-1/2 bg-no-repeat bg-cover shrink-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        ></motion.div>
        <div className="p-16 h-full flex flex-col justify-between relative">
          <div className="left-0 bg-white border-2 border-black py-2 px-4 cursor-pointer border-r-8 w-fit rounded-3xl">
            <Link
              slug={'/#projects-section'}
              arrowDirection="left"
              text="Back to all projects"
            />
          </div>
          <div>
            <h1 className="text-4xl font-black">{title}</h1>
            <p className="p-4 text-xl font-thin text-gray-800 w-1/2 bg-white">
              {shortDesc}
            </p>
          </div>
          <div />
          <Mousey onClick={handleOnClick} />
        </div>
      </section>
      <section
        id="project-details"
        className="w-screen p-16 flex justify-center relative max-w-7xl m-auto"
      >
        <div
          style={{ backgroundImage: `url(${descImage.filename})` }}
          className="h-auto w-1/2 bg-no-repeat bg-contain bg-center shrink-0 relative"
        ></div>
        <div className="p-4 h-full flex flex-col justify-center">
          <p className="text-xl font-thin text-gray-800 bg-white p-4">
            {description}
          </p>
        </div>
      </section>
      <section className="p-16 grid gap-16 grid-cols-2 justify-items-center max-w-5xl m-auto">
        {gallery.map(({ filename, id }) => (
          <motion.img
            className="object-cover"
            src={filename}
            key={id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        ))}
      </section>
    </>
  );
};
export default Project;

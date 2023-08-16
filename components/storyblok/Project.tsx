// "use server";
import { storyblokEditable } from '@storyblok/react/rsc';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

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

  const handleOnClick = () => {
    document
      .getElementById('project-details')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className="w-screen h-screen flex justify-between relative"
      >
        <motion.div
          style={{ backgroundImage: `url(${mainImage?.filename})` }}
          className="h-full w-1/2 bg-no-repeat bg-cover shrink-0 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-9xl text-white italic absolute right-8 bottom-2 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] font-black">
            #0{number}
          </span>
        </motion.div>
        <div className="p-16 h-full flex flex-col justify-between relative">
          <motion.div
            className="left-0 bg-white border-2 border-black py-2 px-4 cursor-pointer border-r-8 w-fit rounded-3xl"
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-black">{title}</h1>
            <p className="p-4 -ml-4 text-xl font-thin text-gray-800 w-1/2 bg-white">
              {shortDesc}
            </p>
          </motion.div>
          <div />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Mousey onClick={handleOnClick} />
          </motion.div>
        </div>
      </section>
      <section
        id="project-details"
        className="w-screen p-16 flex justify-center items-center relative max-w-7xl m-auto"
      >
        <div className="h-auto w-1/2 shrink-0 relative">
          <Image src={descImage.filename} key={descImage.id} />
        </div>
        <div className="p-4 h-full min-h-[600px] flex flex-col justify-center">
          <p className="text-xl font-thin text-gray-800 bg-white p-8">
            {description}
          </p>
        </div>
      </section>
      <section className="p-16 grid gap-16 grid-cols-2 justify-items-center max-w-5xl m-auto">
        <LayoutGroup>
          {gallery.map(({ filename, id }) => (
            <Image src={filename} key={id} />
          ))}
        </LayoutGroup>
      </section>
    </>
  );
};
export default Project;

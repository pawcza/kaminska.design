// "use server";
import { storyblokEditable } from '@storyblok/react/rsc';

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
        <div
          style={{ backgroundImage: `url(${mainImage.filename})` }}
          className="h-full w-7/12 bg-no-repeat bg-cover shrink-0"
        ></div>
        <div className="p-16 h-full flex flex-col justify-between relative">
          <div className="left-0 bg-white border-2 border-black p-2 cursor-pointer w-full">
            <Link
              slug={'/'}
              arrowDirection="left"
              text="Back to all projects"
            />
          </div>
          <div>
            <h1 className="text-6xl font-light border-b border-black">
              {title}
            </h1>
            <p className="py-8 text-xl font-thin text-gray-800 w-1/2">
              {shortDesc}
            </p>
          </div>
          <div />
          <Mousey onClick={handleOnClick} />
        </div>
      </section>
      <section id="project-details" className="w-screen h-screen"></section>
    </>
  );
};
export default Project;

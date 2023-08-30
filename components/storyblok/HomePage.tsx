// "use server";
import { storyblokEditable } from '@storyblok/react/rsc';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Mousey from '@/components/Mousey';

const HomePage = ({ blok }) => {
  const router = useRouter();
  const {
    thinIntroText,
    fatIntroText,
    projects,
    contactEmail,
    contactIntro,
    contactText,
  } = blok;
  const handleOnClick = () => {
    document
      .getElementById('projects-section')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main {...storyblokEditable(blok)}>
      <section className="w-screen h-screen p-4 flex justify-center items-center overflow-hidden">
        <div className="flex justify-center items-center p-16 bg-white">
          {thinIntroText.split('').map((el, i) => (
            <m.h4
              key={`letter-thin-${el}-${i}`}
              className="text-4xl lg:text-6xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i / 10 }}
              viewport={{ once: true }}
            >
              {el}
            </m.h4>
          ))}
          {fatIntroText.split('').map((el, i) => (
            <m.h4
              key={`letter-fat-${el}-${i}`}
              className="font-thin text-4xl lg:text-6xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: (fatIntroText.length - i) / 10 }}
              viewport={{ once: true }}
            >
              {el}
            </m.h4>
          ))}
        </div>
        <Mousey onClick={handleOnClick} delay={1} />
      </section>
      <section
        id="projects-section"
        className="w-screen h-screen grid gap-4 lg:gap-16 p-4 grid-cols-1 md:grid-cols-2 justify-items-center content-center"
      >
        {projects.map(({ content, uuid, slug }, i) => {
          const { thumbnail, thumbTitle, thumbDesc } = content;
          return (
            <m.div
              key={uuid}
              className="h-32 lg:h-64 flex cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i / 10 }}
              onClick={() => router.push(`/projects/${slug}`)}
              viewport={{ once: true }}
            >
              <div
                style={{ backgroundImage: `url(${thumbnail.filename})` }}
                className="h-full w-32 md:w-64 bg-no-repeat bg-cover relative grayscale hover:grayscale-0"
              >
                <span className="text-2xl lg:text-8xl absolute bottom-0 right-2 lg:-bottom-8 lg:-right-10 italic text-white md:text-black lg:font-thin">
                  #0{i + 1}
                </span>
              </div>
              <div className="pl-2 md:pl-4">
                <p className="text-xl -ml-4 pl-4 lg:text-4xl border-black border-b-2 pb-2">
                  {thumbTitle}
                </p>
                <p className="text-xs lg:text-lg uppercase text-gray-800 font-light pt-2">
                  {thumbDesc}
                </p>
              </div>
            </m.div>
          );
        })}
      </section>
      <section
        id="contact-section"
        className="w-screen h-screen flex justify-center items-center flex-col"
      >
        <span>{contactIntro}</span>
        <m.a
          className="italic font-light text-2xl md:text-4xl md:p-16 bg-white text-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          href={`mailto:${contactEmail}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {contactText}
        </m.a>
      </section>
    </main>
  );
};
export default HomePage;

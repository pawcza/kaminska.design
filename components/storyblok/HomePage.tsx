// "use server";
import { storyblokEditable } from '@storyblok/react/rsc';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';

import BackgroundImage from '@/components/Image/BackgroundImage';
// import Image from '@/components/Image/Image';
import Mousey from '@/components/Mousey/Mousey';

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
        <div className="flex justify-center items-center">
          {thinIntroText.split('').map((el, i) => (
            <m.h4
              key={`letter-thin-${el}-${i}`}
              className="text-4xl lg:text-6xl pt-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i / 10,
                type: 'spring',
                damping: 8,
              }}
              viewport={{ once: true }}
            >
              {el}
            </m.h4>
          ))}
          {fatIntroText.split('').map((el, i) => (
            <m.h4
              key={`letter-fat-${el}-${i}`}
              className="font-thin text-4xl lg:text-6xl"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: (fatIntroText.length - i) / 10,
                type: 'spring',
                stiffness: 100,
              }}
              viewport={{ once: true }}
            >
              {el}
            </m.h4>
          ))}
        </div>
        <Mousey onClick={handleOnClick} />
      </section>
      <section
        id="projects-section"
        className="w-screen h-screen grid gap-8 lg:gap-32 p-4 md:px-32 grid-cols-1 md:grid-cols-2 lg:justify-items-center content-center"
      >
        {projects?.map(({ content, uuid, slug }, i) => {
          if (!content) return;

          const { thumbnail, thumbTitle, thumbDesc } = content;

          return (
            <m.div
              key={uuid}
              className="h-32 lg:h-64 flex cursor-pointer w-full max-w-xl"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: i / 10,
                default: { duration: 0.3, ease: 'easeInOut' },
              }}
              onClick={() => router.push(`/projects/${slug}`)}
              viewport={{ once: true }}
            >
              <BackgroundImage
                className="h-full flex-shrink-0 w-32 sm:w-52 md:w-44 lg:w-64 relative bg-blend-multiply mix-blend-multiply grayscale hover:grayscale-0"
                src={thumbnail.filename}
                data64Blur={thumbnail.data64Blur}
              />
              <div className="pl-6 flex-grow">
                <p className="text-xl -ml-2 lg:text-4xl border-gray-950 border-b-2 pb-2">
                  {thumbTitle.split(' ').map((word, i) => (
                    <span
                      key={`thumb-word-${i}`}
                      className={
                        !(i % 2)
                          ? 'pb-2 backdrop-grayscale bg-[rgba(255,255,255,.75)]'
                          : 'font-thin'
                      }
                    >
                      {word}{' '}
                    </span>
                  ))}
                </p>
                <p className="text-xs lg:text-lg text-gray-800 font-light pt-2 -ml-2">
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
        <m.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="font-bold text-2xl md:text-4xl pb-2 mb-2 border-b-2 border-gray-950 px-4 relative before:content-[''] before:bg-[rgba(255,255,255,.8)] before:w-full before:h-2 before:block before:absolute before:-bottom-1 before:left-1/8 before:w-1/2 before:absolute"
        >
          {contactIntro}
        </m.span>
        <m.a
          className="font-light text-lg md:text-xl text-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          href={`mailto:${contactEmail}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          {contactText}
        </m.a>
      </section>
    </main>
  );
};
export default HomePage;

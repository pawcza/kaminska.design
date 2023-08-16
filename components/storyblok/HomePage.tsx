// "use server";
import { storyblokEditable } from '@storyblok/react/rsc';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Mousey from '@/components/Mousey';

const HomePage = ({ blok }) => {
  const router = useRouter();
  const { thinIntroText, fatIntroText, projects } = blok;
  const handleOnClick = () => {
    document
      .getElementById('projects-section')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main {...storyblokEditable(blok)}>
      <section className="w-screen h-screen flex justify-center items-center p-16">
        {thinIntroText.split('').map((el, i) => (
          <motion.h4
            key={`letter-${el}-${i}`}
            className="font-black text-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i / 10 }}
            viewport={{ once: true }}
          >
            {el}
          </motion.h4>
        ))}
        {fatIntroText.split('').map((el, i) => (
          <motion.h4
            className="font-thin text-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i / 10 }}
            viewport={{ once: true }}
          >
            {el}
          </motion.h4>
        ))}
        <Mousey onClick={handleOnClick} />
      </section>
      <section
        id="projects-section"
        className="w-screen h-screen flex gap-16 p-32 justify-center items-center flex-wrap"
      >
        {projects.map(({ content, uuid, slug }, i) => {
          const { thumbnail, thumbTitle, thumbDesc } = content;
          return (
            <motion.div
              key={uuid}
              className="h-64 flex w-1/3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i / 10 }}
              onClick={() => router.push(`/projects/${slug}`)}
              viewport={{ once: true }}
            >
              <div
                style={{ backgroundImage: `url(${thumbnail.filename})` }}
                className="h-full w-64 bg-no-repeat bg-cover relative cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-9xl absolute -bottom-14 -right-20 italic font-thin">
                  #0{i + 1}
                </span>
              </div>
              <div className="pl-4">
                <p className="text-4xl font-black">{thumbTitle}</p>
                <p className="uppercase text-gray-800">{thumbDesc}</p>
              </div>
            </motion.div>
          );
        })}
      </section>
    </main>
  );
};
export default HomePage;

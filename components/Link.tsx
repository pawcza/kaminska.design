import { useRouter } from 'next/navigation';

const Link = ({ slug, arrowDirection, text }) => {
  const router = useRouter();
  const arrow = arrowDirection === 'left' ? '<' : '>';

  return (
    <span className="block w-full h-full" onClick={() => router.push(slug)}>
      {arrow} {text}
    </span>
  );
};

export default Link;

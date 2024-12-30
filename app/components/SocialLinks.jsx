import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="absolute right-1 top-24 flex flex-col items-center gap-4 w-16 p-4 bg-white border border-gray-300 shadow-md ">
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-black group transition-colors"
      >
        <Github size={24} className="text-gray-600 group-hover:text-white transition-colors" />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-black group transition-colors"
      >
        <Twitter size={24} className="text-gray-600 group-hover:text-white transition-colors" />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2  hover:bg-black group transition-colors"
      >
        <Linkedin size={24} className="text-gray-600 group-hover:text-white transition-colors" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2  hover:bg-black group transition-colors"
      >
        <Instagram size={24} className="text-gray-600 group-hover:text-white transition-colors" />
      </a>
    </div>
  );
};

export default SocialLinks;

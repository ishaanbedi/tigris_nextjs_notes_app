import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-gray-400">
          <Link
            href="https://www.ishaanbedi.in/"
            className="text-gray-400 hover:text-gray-500 flex justify-center items-center space-x-2"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-code"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7 8l-4 4l4 4"></path>
              <path d="M17 8l4 4l-4 4"></path>
              <path d="M14 4l-4 16"></path>
            </svg>
            Ishaan Bedi
          </Link>
        </p>
        <Link
          href="https://www.github.com/ishaanbedi/tigris_nextjs_notes_app"
          className="text-gray-400 hover:text-gray-500"
          target="_blank"
        >
          Source code on GitHub
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
const NavBar = () => {
  const router = useRouter();
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-auto">
                <Link
                  href={
                    router.pathname === "/"
                      ? "https://www.tigrisdata.com/"
                      : "/"
                  }
                  target={router.pathname === "/" ? "_blank" : "_self"}
                >
                  <Image
                    src="/tigris.svg"
                    alt="Tigris Logo"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
              <>
                {router.pathname !== "/" ? (
                  <Link
                    href="/"
                    className="flex justify-between items-center mr-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
                  >
                    Go back to home
                  </Link>
                ) : (
                  <Link
                    href="/new-note"
                    className="flex justify-between items-center mr-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
                  >
                    Add a new note
                  </Link>
                )}
              </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

interface SidebarProps {
  sidebarVisible: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ sidebarVisible, closeSidebar }: SidebarProps) => {
  const { data: session } = useSession();

  return (
    <div
      className={`sidebar md:hidden fixed top-3 right-0 h-full w-64 bg-neutral z-10 transform transition-transform ease-in-out duration-300 
      ${sidebarVisible ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-4 flex justify-between items-center">
        {sidebarVisible && session ? (
          <Link href="/documents">
            <div className="text-neutral-content font-semibold">Documents</div>
          </Link>
        ) : null}
        <button
          onClick={closeSidebar}
          className="close-button text-neutral-content mt-[-30px] ml-auto"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      {sidebarVisible && session ? (
        <nav className="flex flex-col gap-4 p-4">
          <Link href="/create">
            <div className="text-neutral-content font-semibold">Create new</div>
          </Link>
          <Link href="/login">
            <div className="text-neutral-content font-semibold">Sign out</div>
          </Link>
        </nav>
      ) : null}
      {sidebarVisible && !session ? (
        <div className="login-button p-4">
          <Link href="/login">
            <div className="text-neutral-content font-semibold">Login</div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;





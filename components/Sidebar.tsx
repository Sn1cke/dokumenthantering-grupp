import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  sidebarVisible: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ sidebarVisible, closeSidebar }: SidebarProps) => {
  return (
    <div
      className={`sidebar md:hidden fixed top-3 right-0 h-full w-64 bg-neutral z-10 transform transition-transform ease-in-out duration-300 
      ${ sidebarVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        {sidebarVisible ? (
          <Link href="/documents">
            <div className="text-neutral-content font-semibold">Documents</div>
          </Link>
        ) : null}
        <button
          onClick={closeSidebar}
          className="close-button text-neutral-content mt-[-30px]"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      {sidebarVisible ? (
        <nav className="flex flex-col gap-4 p-4">
          <Link href="/create">
            <div className="text-neutral-content font-semibold">Create new</div>
          </Link>
        </nav>
      ) : null}
      {sidebarVisible ? (
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

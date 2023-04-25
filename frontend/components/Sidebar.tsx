import { ImFeed, ImCog, ImUsers, ImImages, ImTrophy } from "react-icons/im";

import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
        <ul className="space-y-2 font-medium">
          <li>
            <span className="text-blue-500 text-xl font-bold">PopIt Web</span>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <ImFeed />
              <span className="ml-3">User Feed</span>
            </Link>
          </li>

          <li>
            <Link
              href={"/challenges"}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <ImTrophy />
              <span className="flex-1 ml-3 whitespace-nowrap">Challenges</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
              <ImCog />
              <span className="flex-1 ml-3 whitespace-nowrap">Admin</span>
            </div>
            <ul className="ml-6">
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <ImUsers />
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/challenges"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <ImTrophy />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Challenges
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/contents"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <ImImages />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Contents
                  </span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

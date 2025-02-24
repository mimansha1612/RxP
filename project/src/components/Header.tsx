import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Stethoscope, BookOpen } from "lucide-react";

interface HeaderProps {
  onNewChat: () => void;
  onHome: () => void;
}

function Header({ onNewChat, onHome }: HeaderProps) {
  return (
    <header className="absolute w-full z-10 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onHome}
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <Stethoscope className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold">RO.AI</span>
            </button>

            <nav className="hidden md:flex ml-10 space-x-4">
              <button
                onClick={onNewChat}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-2"
              >
                <BookOpen size={18} />
                New Chat
              </button>
            </nav>
          </div>

          <div className="flex items-center">
            <SignedIn>
              <UserButton/>
            </SignedIn>
            <SignedOut>
            <button onClick={onNewChat} className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>{`LogIn/SignIn`}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                  ></path>
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

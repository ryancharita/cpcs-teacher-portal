import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="relative z-10 flex justify-end items-center p-4 gap-4 h-16 bg-white/90 backdrop-blur-md border-b border-white/20">
      <SignedOut>
        <SignInButton>
          <button className="text-gray-800 hover:text-gray-900 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton>
          <button className="text-gray-800 hover:text-gray-900 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Profile
          </button>
        </UserButton>
      </SignedIn>
    </header>
  )
}

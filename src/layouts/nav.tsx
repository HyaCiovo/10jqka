import { pageTitleAtom } from "@/store/page-title"
import { useAtomValue } from "jotai"
import toast from "react-hot-toast"

const Nav = () => {
  const pageTitle = useAtomValue(pageTitleAtom)
  const navigateBack = () => {
    toast('返回按钮已点击')
  }

  return (
    <nav className="bg-[#1f2120] px-4 py-2 fixed top-0 left-0 w-full">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <svg onClick={navigateBack} className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
        </svg>
        <span className="flex-grow text-center">{pageTitle}</span>
      </div>
    </nav>
  )
}

export default Nav
import React from 'react'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  function logout() {
    localStorage.clear() // Remove only the 'token' from local storage
    navigate('/') // Navigate to the home page
  }
  return (
    <div className="bg-green-500  sticky top-0 z-20 px-[5px] md:px-[30px] overflow-x-hidden">
      <marquee
        className=" text-[15px] font-semibold py-[4px] mb-[-10px]"
        dir="ltr">
        Subscribe for 24/7 add free music.
      </marquee>
      <div className="lg:flex justify-between  mt-[-1px]">
        <Link to="/home">
          <div className="flex">
            <svg
              className=" w-[50px] md:w-[100px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M9.772 4.28c.56-.144 1.097.246 1.206.814.1.517-.263 1.004-.771 1.14A7 7 0 1 0 19 12.9c.009-.5.4-.945.895-1 .603-.067 1.112.371 1.106.977L21 13c0 .107-.002.213-.006.32a.898.898 0 0 1 0 .164l-.008.122a9 9 0 0 1-9.172 8.392A9 9 0 0 1 9.772 4.28z"
                  fill="#000000"></path>
                <path
                  d="M15.93 13.753a4.001 4.001 0 1 1-6.758-3.581A4 4 0 0 1 12 9c.75 0 1.3.16 2 .53 0 0 .15.09.25.17-.1-.35-.228-1.296-.25-1.7a58.75 58.75 0 0 1-.025-2.035V2.96c0-.52.432-.94.965-.94.103 0 .206.016.305.048l4.572 1.689c.446.145.597.23.745.353.148.122.258.27.33.446.073.176.108.342.108.801v1.16c0 .518-.443.94-.975.94a.987.987 0 0 1-.305-.049l-1.379-.447-.151-.05c-.437-.14-.618-.2-.788-.26a5.697 5.697 0 0 1-.514-.207 3.53 3.53 0 0 1-.213-.107c-.098-.05-.237-.124-.521-.263L16 6l.011 7c0 .255-.028.507-.082.753h.001z"
                  fill="#000000"></path>
              </g>
            </svg>
            <h1 className="text-[20px] place-content-center">BEATBOXX</h1>
          </div>
        </Link>

        <div className=" my-auto ">
          <ul className="flex gap-[20px] sm:gap-[30px] md:gap-[50px] justify-end">
            <Link to="/home">
              <div className="flex link-underline link-underline-black py-[10px] gap-[10px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 self-center">
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>

                <a className="font-medium">HOME</a>
              </div>
            </Link>

            <div className="border-r-4 border-black"></div>
            <Link to="/playlist">
              <div className="flex link-underline link-underline-black py-[10px] gap-[10px]">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      opacity="0.5"
                      d="M15 6L3 6"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"></path>{' '}
                    <path
                      opacity="0.5"
                      d="M13 10L3 10"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"></path>{' '}
                    <path
                      opacity="0.5"
                      d="M9 14H3"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"></path>{' '}
                    <path
                      opacity="0.5"
                      d="M8 18H3"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"></path>{' '}
                    <path
                      d="M17 16.5V12.5V8"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"></path>{' '}
                    <circle
                      cx="14.5"
                      cy="16.5"
                      r="2.5"
                      stroke="#000000"
                      stroke-width="1.5"></circle>{' '}
                    <path
                      d="M21 12C18.7909 12 17 10.2091 17 8"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"></path>{' '}
                  </g>
                </svg>

                <a className="font-medium ">Playlists</a>
              </div>
            </Link>

            <div className="hidden md:flex link-underline link-underline-black py-[10px] gap-[10px]">
              <svg
                className="h-6 w-6"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <title>about-filled</title>{' '}
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd">
                    {' '}
                    <g
                      id="drop"
                      fill="#000000"
                      transform="translate(42.666667, 42.666667)">
                      {' '}
                      <path
                        d="M213.333333,3.55271368e-14 C331.154987,3.55271368e-14 426.666667,95.51168 426.666667,213.333333 C426.666667,331.153707 331.154987,426.666667 213.333333,426.666667 C95.51296,426.666667 3.55271368e-14,331.153707 3.55271368e-14,213.333333 C3.55271368e-14,95.51168 95.51296,3.55271368e-14 213.333333,3.55271368e-14 Z M234.713387,192 L192.04672,192 L192.04672,320 L234.713387,320 L234.713387,192 Z M213.55008,101.333333 C197.99616,101.333333 186.713387,112.5536 186.713387,127.704107 C186.713387,143.46752 197.698773,154.666667 213.55008,154.666667 C228.785067,154.666667 240.04672,143.46752 240.04672,128 C240.04672,112.5536 228.785067,101.333333 213.55008,101.333333 Z"
                        id="Shape">
                        {' '}
                      </path>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>
              </svg>

              <a className="font-medium ">About Us</a>
            </div>

            <div
              onClick={logout}
              className=" cursor-pointer flex link-underline link-underline-black py-[10px] gap-[10px]">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.5 9.56757V14.4324C3.5 16.7258 3.5 17.8724 4.22161 18.5849C4.87719 19.2321 5.89578 19.2913 7.81846 19.2968C7.71686 18.6224 7.69563 17.8168 7.69029 16.8689C7.68802 16.4659 8.01709 16.1374 8.42529 16.1351C8.83348 16.1329 9.16624 16.4578 9.16851 16.8608C9.17451 17.9247 9.20249 18.6789 9.30898 19.2512C9.41158 19.8027 9.57634 20.1219 9.81626 20.3588C10.089 20.6281 10.4719 20.8037 11.1951 20.8996C11.9395 20.9985 12.9261 21 14.3407 21H15.3262C16.7407 21 17.7273 20.9985 18.4717 20.8996C19.1949 20.8037 19.5778 20.6281 19.8505 20.3588C20.1233 20.0895 20.3011 19.7114 20.3983 18.9975C20.4984 18.2626 20.5 17.2885 20.5 15.8919V8.10811C20.5 6.71149 20.4984 5.73743 20.3983 5.0025C20.3011 4.28855 20.1233 3.91048 19.8505 3.6412C19.5778 3.37192 19.1949 3.19635 18.4717 3.10036C17.7273 3.00155 16.7407 3 15.3262 3H14.3407C12.9261 3 11.9395 3.00155 11.1951 3.10036C10.4719 3.19635 10.089 3.37192 9.81626 3.6412C9.57634 3.87807 9.41158 4.19728 9.30898 4.74877C9.20249 5.32112 9.17451 6.07525 9.16851 7.1392C9.16624 7.54221 8.83348 7.8671 8.42529 7.86485C8.01709 7.86261 7.68802 7.53409 7.69029 7.13107C7.69563 6.18322 7.71686 5.37758 7.81846 4.70325C5.89578 4.70867 4.87719 4.76789 4.22161 5.41515C3.5 6.12759 3.5 7.27425 3.5 9.56757ZM5.93385 12.516C5.6452 12.231 5.6452 11.769 5.93385 11.484L7.90484 9.53806C8.19348 9.25308 8.66147 9.25308 8.95011 9.53806C9.23876 9.82304 9.23876 10.2851 8.95011 10.5701L8.24088 11.2703L15.3259 11.2703C15.7341 11.2703 16.0651 11.597 16.0651 12C16.0651 12.403 15.7341 12.7297 15.3259 12.7297L8.24088 12.7297L8.95011 13.4299C9.23876 13.7149 9.23876 14.177 8.95011 14.4619C8.66147 14.7469 8.19348 14.7469 7.90484 14.4619L5.93385 12.516Z"
                    fill="#1C274C"></path>{' '}
                </g>
              </svg>

              <a className="font-medium ">Logout</a>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

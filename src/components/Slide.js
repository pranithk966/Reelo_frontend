import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useSelector } from 'react-redux'

export default function Slide({
  data,
  audioRefs,
  duration,
  handleTimeUpdate,
  addToPlay,
  addedSongs,
  handleSeek,
  progress,
  formatTime,
  currentPlaying,
  togglePlayPause,
}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10, // Number of slides to show at once
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 1000, // 1 second
    verticalSwiping: true,
  }
  return (
    <div className="lg:h-screen xl:w-[27%] bg-gray-300 xl:fixed right-0 xl:top-[125px] overflow-y-scroll ">
      <h1 className="text-white bg-black xl:fixed top-[100px] xl:z-50 mt-[20px] ml-[38px] text-[30px] underline font-serif underline-offset-2 ">
        BEATBOXX TOP PICKS
      </h1>
      <div className="pb-[150px] mx-[30px] relative">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div
              key={index}
              className=" bg-gray-100 px-[20px] py-[20px]  rounded-lg my-[4px]">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-[20px]">
                  <img
                    src={item.poster}
                    className="w-[60px] rounded-full"
                    alt={item.name}
                  />
                  <div className="flex flex-col w-[200px]">
                    {' '}
                    {/* Set a max width to control overflow */}
                    <h1 className="text-gray-800 truncate font-bold text-[15px] ">
                      {item.name}
                    </h1>
                    <h1 className=" text-gray-600 truncate overflow-hidden whitespace-nowrap  text-[12px]">
                      {item.artist}
                    </h1>
                  </div>
                </div>
                <div>
                  <audio
                    ref={(el) => (audioRefs.current[index] = el)}
                    src={item.songPath}
                    controls={false}
                    onTimeUpdate={() => handleTimeUpdate(index)}
                  />
                  <div className="flex space-x-[20px]">
                    <button
                      onClick={() => togglePlayPause(index)}
                      className="rounded-full block my-2 ">
                      {currentPlaying === index &&
                      !audioRefs.current[index]?.paused ? (
                        <i
                          className="fa fa-pause-circle"
                          aria-hidden="true"
                          style={{ fontSize: '40px', color: 'green' }}></i>
                      ) : (
                        <i
                          className="fa fa-play-circle"
                          aria-hidden="true"
                          style={{ fontSize: '40px', color: 'green' }}></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="relative flex items-center my-[10px] space-x-[15px]">
                  {/* Progress Bar */}
                  <div
                    className="bg-gray-600 h-2 rounded flex-grow"
                    style={{ flexBasis: '80%', cursor: 'pointer' }}
                    onClick={(e) => handleSeek(e, index)}>
                    <div
                      className="bg-black h-full rounded"
                      style={{ width: `${progress[index] || 0}%` }}
                    />
                  </div>

                  {/* Timer */}
                  {/* <div
                    className="text-black text-sm flex-grow"
                    style={{ flexBasis: '20%' }}>
                    {formatTime(audioRefs.current[index]?.currentTime || 0)} /{' '}
                    {formatTime(duration[index] || 0)}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

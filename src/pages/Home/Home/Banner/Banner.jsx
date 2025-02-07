function Banner() {
  return (
    <div>
      <div
        className="md:relative h-[400px] md:h-[80vh] bg-no-repeat bg-cover bg-center scale-bg-animation  backdrop-blur-2xl"
        style={{
          backgroundImage: `url(./banner.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 bg-opacity-70"></div>
        <div className="relative h-full flex flex-col lg:flex-row items-center ">
          {/* left-side */}
          <div className=" ">
            <p className="z-10 md:px-14  md:w-2/4  text-base md:text-5xl text-white text-center lg:text-left  font-bold tracking-wider leading-normal moment">
              Where Soulmates Meet — Your Love Story Begins Here!
            </p>
          </div>
          {/* right side */}
        </div>
      </div>
    </div>
  );
}

export default Banner;

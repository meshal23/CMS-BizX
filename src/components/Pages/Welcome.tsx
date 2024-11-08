import { NavLink } from "react-router-dom";

function Welcome() {
  return (
    <section className="bg-white w-[99%] overflow-hidden h-screen flex justify-center items-center dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
      <div className="relative z-10 max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16">
        <a
          href="#"
          className="inline-flex items-center justify-between px-1 py-1 text-sm text-blue-700 bg-blue-100 rounded-full motion-preset-slide-right motion-ease-spring-bounciest motion-duration-1500 pe-4 mb-7 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
            New
          </span>{" "}
          <span className="text-sm font-medium">
            BizX <span className="text-primaryBtn">Catelog</span> was launched!
            See what's new
          </span>
          <svg
            className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 motion-preset-slide-left motion-duration-1500 motion-ease-spring-bouncy md:text-5xl lg:text-6xl dark:text-white">
          We invest in the world’s potential
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 motion-preset-fade motion-duration-1000 motion-ease-spring-smooth lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>

        <NavLink to="/login">
          <button
            type="submit"
            className="text-white text-center w-64 p-5 motion-preset-bounce motion-duration-1000 motion-ease-spring-bouncy end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </NavLink>
        <div className="relative">
          {/* <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div> */}
          {/* <input
              type="email"
              id="default-email"
              className="block w-full p-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email here..."
              required
            /> */}
        </div>
      </div>
      <div className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900"></div>
    </section>
  );
}

export default Welcome;

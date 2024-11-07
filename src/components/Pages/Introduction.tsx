function Introduction() {
  return (
    <section className="grid w-full h-screen grid-cols-2 gap-4 m-3">
      <div className="relative pocket:max-desktop:hidden col-span-1 mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[450px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
        <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image.png"
            className="dark:hidden h-[426px] md:h-[654px]"
            alt=""
          />
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image-dark.png"
            className="hidden dark:block h-[426px] md:h-[654px]"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center col-span-1 gap-4 p-3 mr-3 text-center pocket:max-desktop:col-span-2">
        <h1 className="text-4xl text-gray-900 font-roboto-extrabold md:text-5xl lg:text-6xl">
          BizX <span className="text-green-400">Catelog</span>
        </h1>
        <p className="mb-3 text-gray-500 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">
          BizXCatalog is an all-in-one solution designed for businesses to
          streamline key operations. It enables efficient item creation,
          customer management, and sales quotation generation. With BizXCatalog,
          you can easily create and organize product inventories, maintain
          customer records, and generate accurate, professional sales quotes,
          all in one place.
        </p>
      </div>
    </section>
  );
}

export default Introduction;

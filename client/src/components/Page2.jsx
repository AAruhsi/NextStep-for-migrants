import { motion } from "framer-motion";

export default function Page2() {
  return (
    <>
      <section className="relative bg-[#f5f0e3] py-5 md:py-24 min-h-screen w-full flex items-center">
        <div className="w-full">
          {/* Background Blob */}
          <div className="absolute top-10 md:top-30 left-5 md:left-10 bg-amber-500/25 h-[150px] w-[150px] md:h-[200px] md:w-[200px] rounded-full z-0"></div>

          {/* Content Section */}
          <div className="absolute top-10 md:top-[25%] left-5 md:left-10 px-5 md:px-10 w-full md:w-auto">
            <motion.div
              className="max-w-xl z-40"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-fit py-4 mb-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight md:leading-13">
                  Empowering people through tailored support and authentic
                  connection.
                </h1>
              </div>
              <p className="text-gray-700 mt-4 text-base md:text-lg">
                Empowering people through tailored support and authentic
                connections, helping young migrants navigate jobs, education,
                healthcare, and government policies in a new city with ease.
              </p>
            </motion.div>
          </div>

          {/* Iframe - Hidden on small screens */}
          <div className="hidden lg:block absolute right-5 lg:right-10 xl:right-20 top-20 md:top-25">
            <iframe
              src="https://lottie.host/embed/1ff6dc53-3640-47a8-af53-eef20040e913/VWOwYru1fi.lottie"
              width={600}
              height={400}
              loop={false}
              title="Animation"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

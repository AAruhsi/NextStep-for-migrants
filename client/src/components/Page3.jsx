// ...existing code...
import { useState } from "react";
import { Link } from "react-router-dom";
import healthcare from "../assets/job.svg";
import gov from "../assets/gov.svg";
import edu from "../assets/edu.svg";
import jobs from "../assets/job.svg";
import { motion } from "framer-motion";

export default function Page3() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const cardData = [
    {
      title: "Healthcare",
      image: healthcare,
      description:
        "We provide information on healthcare facilities to ensure better medical accessibility for all.",
    },
    {
      title: "Government",
      image: gov,
      description:
        "Stay informed about government policies and schemes that can benefit your career and well-being.",
    },
    {
      title: "Education",
      image: edu,
      description:
        "Explore educational opportunities and resources for students and professionals seeking growth.",
    },
    {
      title: "Jobs",
      image: jobs,
      description:
        "Find job opportunities and career guidance to help you settle in a new city with ease.",
    },
  ];
  return (
    <section className="bg-[#f5f0e3] py-12 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
          What we do
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              whileHover={{ translateY: -6 }}
              className="bg-white shadow-md rounded-lg p-6 text-center flex flex-col items-center"
            >
              <motion.div
                animate={{ scale: hoverIndex === index ? 1.05 : 1 }}
                transition={{ duration: 0.25 }}
                className="w-full flex justify-center mb-4"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-24 sm:h-28 md:h-32 lg:h-36 object-contain"
                />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold mt-2 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// ...existing code...

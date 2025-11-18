// import { Users, BookOpen, MapPin } from "lucide-react";
// import { motion, useInView } from "framer-motion";
// import { useState, useEffect, useRef } from "react";

// export default function Page5() {
//   const impactStats = [
//     {
//       id: 1,
//       number: 100,
//       description:
//         "Individuals successfully guided through their city transitions",
//       icon: <Users className="w-8 h-8 text-gray-700" />,
//     },
//     {
//       id: 2,
//       number: 146,
//       description: "Healthcare facilities mapped and made accessible",
//       icon: <BookOpen className="w-8 h-8 text-gray-700" />,
//     },
//     {
//       id: 3,
//       number: 120,
//       description: "Users connected with local community networks for support",
//     },
//   ];

//   return (
//     <div className="relative w-screen h-[120vh] bg-[#f5f0e3] overflow-x-hidden">
//       {/* Impact Overview */}
//       <section className="absolute top-10 container mx-auto p-8 py-8">
//         {/* Impact Headline */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="absolute top-40 max-w-6xl mb-10"
//         >
//           <h1 className="text-5xl font-bold text-gray-900 leading-tight">
//             Breaking barriers to a smooth transition by simplifying access to
//             essential services and local knowledge.
//           </h1>
//         </motion.div>

//         {/* Impact Statistics */}
//         <div className="absolute top-100 w-[90%] grid grid-cols-3 gap-8 md:gap-12 mt-20">
//           {impactStats.map((stat) => (
//             <motion.div
//               key={stat.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: stat.id * 0.2 }}
//               className="flex flex-col items-start h-full"
//             >
//               <p className="mb-10 border-t-1 border-gray-300 pr-5 w-full text-lg">
//                 {stat.description}
//               </p>
//               <div className="flex-grow"></div>

//               {/* Animated Number Counter */}
//               <motion.h3
//                 className="text-7xl font-bold text-gray-900 self-start tracking-tighter"
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.2 }}
//               >
//                 <AnimatedNumber targetNumber={stat.number} />
//               </motion.h3>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// // Number Animation Component (Triggers only when in view)
// const AnimatedNumber = ({ targetNumber }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (isInView) {
//       let start = 0;
//       const duration = 1500;
//       const increment = targetNumber / (duration / 16);

//       const interval = setInterval(() => {
//         start += increment;
//         if (start >= targetNumber) {
//           start = targetNumber;
//           clearInterval(interval);
//         }
//         setCount(Math.floor(start));
//       }, 16);

//       return () => clearInterval(interval);
//     }
//   }, [isInView, targetNumber]);

//   return <span ref={ref}>{count.toLocaleString()}</span>;
// };

// ...existing code...
import { Users, BookOpen, MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Page5() {
  const impactStats = [
    {
      id: 1,
      number: 100,
      description:
        "Individuals successfully guided through their city transitions",
      icon: <Users className="w-8 h-8 text-gray-700" />,
    },
    {
      id: 2,
      number: 146,
      description: "Healthcare facilities mapped and made accessible",
      icon: <BookOpen className="w-8 h-8 text-gray-700" />,
    },
    {
      id: 3,
      number: 120,
      description: "Users connected with local community networks for support",
      icon: <MapPin className="w-8 h-8 text-gray-700" />,
    },
  ];

  return (
    <section className="bg-[#f5f0e3] py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-8"
        >
          Breaking barriers to a smooth transition by simplifying access to
          essential services and local knowledge.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {impactStats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stat.id * 0.15 }}
              className="bg-white rounded-lg p-6 shadow-md flex flex-col items-start"
            >
              <div className="flex items-center gap-4 mb-4">{stat.icon}</div>
              <p className="text-gray-700 mb-6">{stat.description}</p>
              <h3 className="text-4xl font-bold text-gray-900">
                <AnimatedNumber targetNumber={stat.number} />
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Number Animation Component (Triggers only when in view)
const AnimatedNumber = ({ targetNumber }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1000;
      const stepTime = 16;
      const increment = targetNumber / (duration / stepTime);

      const interval = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          start = targetNumber;
          clearInterval(interval);
        }
        setCount(Math.floor(start));
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [isInView, targetNumber]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};
// ...existing code...

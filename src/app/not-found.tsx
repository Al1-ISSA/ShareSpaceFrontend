"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/partials/Navbar";

export default function NotFound() {
  const colors = [
    "text-red-300",
    "text-blue-300",
    "text-green-300",
    "text-yellow-300",
    "text-purple-300",
    "text-pink-300",
    "text-indigo-300",
  ];

  const [randomValues, setRandomValues] = useState([]);

  useEffect(() => {
    // Generate fewer random values to improve performance
    const values = Array.from({ length: 20 }).map(() => ({
      // Reduced from 100 to 30
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      rotate: Math.random() * 360,
      duration: Math.random() * 20 + 20,
    }));
    setRandomValues(values);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background text */}
      <div className="absolute inset-0 overflow-hidden select-none">
        {randomValues.map((value, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              colors[i % colors.length]
            } text-opacity-10 font-bold text-[8rem] whitespace-nowrap`}
            initial={{
              x: "100%",
              y: value.y,
              rotate: value.rotate,
            }}
            animate={{
              x: "-100%",
              transition: {
                repeat: Infinity,
                repeatType: "loop",
                duration: value.duration,
                ease: "linear",
              },
            }}>
            ShareSpace
          </motion.div>
        ))}
      </div>
      {/* 404 Content */}
      <motion.div
        className="z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <motion.h1
          className="text-9xl font-extrabold text-white tracking-widest mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}>
          404
        </motion.h1>
        <motion.p
          className="text-2xl text-gray-300 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}>
          Oops! Page not found
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}>
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="text-white border-black">
              Go back home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

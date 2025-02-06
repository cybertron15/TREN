"use client";
import { SignIn } from "@clerk/nextjs";

import { motion } from "framer-motion";
import {
  Target,
  Calendar,
  LineChart,
  CheckSquare,
  BrainCircuit,
  NotebookPen,
} from "lucide-react";

const features = [
  { icon: Target, text: "Set clear, actionable goals with deadlines" },
  { icon: Calendar, text: "Create daily task templates linked to your goals" },
  { icon: CheckSquare, text: "Log and rate your daily tasks" },
  { icon: BrainCircuit, text: "AI-powered analysis and suggestions" },
  { icon: LineChart, text: "Comprehensive analytics to track progress" },
  { icon: NotebookPen, text: "Integrated journaling for self-reflection" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F44949] via-[#FF7676] to-[#FFA8A8] p-4">
      <motion.div
        className="w-full max-w-6xl p-8 flex flex-col md:flex-row gap-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl border border-white border-opacity-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left side - Branding and Features */}
        <motion.div className="flex-1 space-y-6" variants={itemVariants}>
          <motion.h1
            className="text-5xl font-bold text-white"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            TREN
          </motion.h1>
          <motion.p
            className="text-2xl text-white/80"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform Your Goals into Reality with AI-Powered Productivity
          </motion.p>

          <motion.div className="space-y-4" variants={containerVariants}>
            {features.map((feature, index) => (
              <motion.div key={index} className="flex items-center space-x-3" variants={itemVariants}>
                <feature.icon className="w-6 h-6 text-white" />
                <span className="text-white/90">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Sign In Form */}
        <motion.div
          className="flex-1 p-6 space-y-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl border border-white border-opacity-20"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-center text-white">Start Your Productivity Journey</h2>

          <div className="flex justify-center">
            <SignIn
              appearance={{
                elements: {
                  card: "bg-white/20 p-6 rounded-lg border border-white/30 backdrop-blur-md",
                  headerTitle: "text-white text-lg font-semibold",
                  socialButtonsBlockButton: "bg-white/30 hover:bg-white/40 text-white",
                  formFieldInput: "bg-white/20 border border-white/30 text-white",
                  formButtonPrimary: "bg-white/30 hover:bg-white/40 text-white font-semibold",
                },
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

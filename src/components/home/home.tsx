import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

const Home = () => {
  const welcomeVariant = {
    initial: {
      y: -100,
    },
    animate: {
      y: 0,
    },
  };
  const toVariant = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
      },
    },
  };

  const jotifyVariant = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
      },
    },
  };

  const loginButtonVariant = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1,
        type: "spring",
        damping: 20,
        stiffness: 200
      }
    }
  }

  const signupButtonVariant = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.3,
        type: "spring",
        damping: 20,
        stiffness: 200
      }
    }
  }

  return (
    <section className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col text-center gap-1">
        <span className="flex justify-center items-center gap-2 md:gap-4 text-[8vw] md:text-[5vw]">
          <motion.h1
            variants={welcomeVariant}
            initial="initial"
            animate="animate"
          >
            Welcome
          </motion.h1>
          <motion.h1 variants={toVariant} initial="initial" animate="animate">
            To
          </motion.h1>
          <motion.h1
            variants={jotifyVariant}
            initial="initial"
            animate="animate"
          >
            Jotify!
          </motion.h1>
        </span>
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.8 } }}
          className="md:text-[2vw] text-[4.5vw] font-[200]"
        >
          Empower Your Productivity with Jotify Notes!
        </motion.h4>

        <div className="flex gap-4 mt-4 items-center justify-center">
          <motion.a whileHover={{scale: 1.2}} href="/login" variants={loginButtonVariant} initial='initial' animate='animate' >
            <Button className="bg-[#2E2E2E] text-[11px] text-[#EDEDED] border border-[#3E3E3E]">
              Login
            </Button>
          </motion.a>
          <motion.a whileHover={{scale: 1.2}} variants={signupButtonVariant} initial='initial' animate='animate' href="/sign-up">
            <Button className="bg-[#37996B] text-[11px] text-[#EDEDED] border border-[#3DCF8E]">
              Sign up
            </Button>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Home;

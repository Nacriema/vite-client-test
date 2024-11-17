export const transition = { type: 'spring', duration: 0.8 };


export const slideAnimation = (direction) => {
   return {
      initial: {
         x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
         y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
         opacity: 0,
         transition: { ...transition, delay: 0.5 }
      },
      animate: {
         x: 0,
         y: 0,
         opacity: 1,
         transition: {
            ...transition,
            delay: 0,
            damping: 6,
            restDelta: 0.0091,
            stiffness: 40,

         }
      },
      exit: {
         x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
         y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
         transition: { ...transition, delay: 0 }
      }
   }
};

export const toTopSlideAnimation = {
   initial: { y: 10, opacity: 0 },
   animate: { y: 0, opacity: 1 },
   exit: { y: -10, opacity: 0 },
   transition: { duration: 0.6 },
}

export const fadeAnimation = {
   initial: {
      opacity: 0,
      transition: { ...transition, delay: 0.5 }
   },
   animate: {
      opacity: 1,
      transition: { ...transition, delay: 0 }
   },
   exit: {
      opacity: 0,
      transition: { ...transition, delay: 0 }
   }
};


export const headTextAnimation = {
   initial: {
      x: 100, opacity: 0
   },
   animate: {
      x: 0, opacity: 1
   },
   transition: {
      type: 'spring',
      duration: 0.3,
      damping: 40,
      restDelta: 0.001,
      stiffness: 40
   }
};

export const topDownAnimation = {
   initial: { y: -50, opacity: 0, transition: { ...transition, delay: 0.5 } },
   animate: { y: 0, opacity: 1, transition: { ...transition, delay: 0 } },
   exit: { y: -50, opacity: 0, transition: { ...transition, delay: 0 } }
}

export const bottomUpAnimation = {
   initial: { y: 100, opacity: 0, transition: { ...transition, delay: 0.5 } },
   animate: { y: 0, opacity: 1, transition: { ...transition, delay: 0 } },
   exit: { y: 100, opacity: 0, transition: { ...transition, delay: 0 } }
}

export const headContainerAnimation = {
   initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
   animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
   exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};
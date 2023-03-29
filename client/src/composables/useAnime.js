import gsap from "gsap";

const useAnime = () => {
  const tableRowBeforeEnter = (el) => {
    el.style.opacity = 0;
  };

  const tableRowEnter = (el, done) => {
    gsap.to(el, {
      opacity: 1,
      duration: 0.8,
      delay: el.dataset.index * 0.2,
      onComplete: done,
    });
  };

  return {
    tableRowBeforeEnter,
    tableRowEnter,
  };
};

export default useAnime;

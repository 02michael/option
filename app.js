class CheckboxEffect {
  constructor(groups) {
    this.setStroke();

    groups.forEach((group) => {
      const checkbox = gsap.utils.selector(group)("input[type='checkbox']")[0];

      checkbox.addEventListener("change", () => {
        const nodes = this.getNodes(checkbox);
        this.changeEffect(nodes, checkbox.checked);
      });
    });
  }

  setStroke() {
    document
      .querySelectorAll(".checkbox-btn-group g.checked path")
      .forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      });
  }

  getNodes(input) {
    const container = input.closest(".checkbox-btn-group");
    return [
      gsap.utils.selector(container)("path.blue")[0],
      gsap.utils.selector(container)("path.pink")[0]
    ];
  }

  changeEffect(nodes, isChecked) {
    const blueCircle = nodes[0];
    const pinkCircle = nodes[1];
    const length = blueCircle.getTotalLength();

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const duration = 1.6;

    if (isChecked) {
      gsap.killTweensOf([blueCircle, pinkCircle]);

      gsap.set([blueCircle, pinkCircle], {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      const endOffset = length * 0.02;
      const modifiers = isMobile
        ? { strokeDashoffset: (value) => Math.abs(parseFloat(value)) }
        : undefined;

      gsap.to(pinkCircle, {
        strokeDashoffset: endOffset,
        duration: duration,
        ease: "elastic.out(1.4, 0.2)",
        delay: 0.035,
        modifiers
      });

      gsap.to(blueCircle, {
        strokeDashoffset: endOffset,
        duration: duration,
        ease: "elastic.out(1.4, 0.2)",
        modifiers
      });
    } else {
      gsap.killTweensOf([blueCircle, pinkCircle]);

      gsap.to([blueCircle, pinkCircle], {
        strokeDasharray: length,
        strokeDashoffset: length,
        duration: 0.2,
        ease: "power2.inOut"
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(EasePack);
  const groups = document.querySelectorAll(".checkbox-btn-group");
  new CheckboxEffect(groups);
});

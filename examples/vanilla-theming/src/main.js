import "@ds-gn/tokens/public";
import "@ds-gn/tokens/theme";
import "@ds-gn/tokens/properties";
import "@ds-gn/ui/button";
import "@ds-gn/ui/card";
import "@ds-gn/ui/heading";
import "@ds-gn/ui/stack";
import "@ds-gn/ui/text";
import { sequence } from "@ds-gn/motion";
// Application overrides must load after the public token and theme styles.
import "./brand-overrides.css";
import "./style.css";

// Wait for the slotted components to render before animating their hosts.
Promise.all(
  ["card", "heading", "stack", "text", "button"].map((name) =>
    customElements.whenDefined(`dsgn-${name}`),
  ),
).then(setupMotion);

function setupMotion() {
  const targets = document.querySelectorAll("[data-motion-item]");
  const replay = document.querySelector("#replay-motion");
  let playback;

  function play() {
    playback?.cancel();
    playback = sequence(targets, {
      preset: "slideUp",
      duration: "moderate",
      easing: "emphasized",
      stagger: 80,
      reducedMotion: "jump",
    });
  }

  function stop() {
    playback?.cancel();
  }

  function resume(event) {
    if (event.persisted) play();
  }

  replay.addEventListener("click", play);
  window.addEventListener("pagehide", stop);
  window.addEventListener("pageshow", resume);
  play();

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      stop();
      replay.removeEventListener("click", play);
      window.removeEventListener("pagehide", stop);
      window.removeEventListener("pageshow", resume);
    });
  }
}

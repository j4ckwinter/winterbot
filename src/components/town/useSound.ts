import { useEffect, useRef, useState } from "preact/hooks";

type Cue = "inspect" | "door";
const cueNotes = {
  inspect: [660, 880, 990],
  door: [220, 330, 440],
} satisfies Record<Cue, number[]>;

export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const pending = useRef(false);
  const mounted = useRef(true);
  const context = useRef<AudioContext | null>(null);
  const play = (cue: Cue = "inspect") => {
    const audio = context.current;
    if (!audio || audio.state !== "running") return;
    const note = audio.createOscillator();
    const volume = audio.createGain();
    note.type = "triangle";
    cueNotes[cue].forEach((frequency, index) =>
      note.frequency.setValueAtTime(
        frequency,
        audio.currentTime + index * 0.05,
      ),
    );
    volume.gain.setValueAtTime(0.035, audio.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.16);
    note.connect(volume).connect(audio.destination);
    note.start();
    note.stop(audio.currentTime + 0.17);
    note.onended = () => {
      note.disconnect();
      volume.disconnect();
    };
  };
  const toggle = async () => {
    if (pending.current) return;
    pending.current = true;
    try {
      if (enabled) {
        await context.current?.suspend();
        if (mounted.current) setEnabled(false);
      } else {
        context.current ??= new AudioContext();
        await context.current.resume();
        if (mounted.current) {
          setEnabled(true);
          play();
        }
      }
    } catch {
      if (mounted.current) setEnabled(false);
    } finally {
      pending.current = false;
    }
  };
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      void context.current?.close().catch(() => {});
    };
  }, []);
  return {
    enabled,
    toggle,
    play: (cue: Cue = "inspect") => {
      if (enabled) play(cue);
    },
  };
}

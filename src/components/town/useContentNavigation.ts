import type { RefObject } from "preact";
import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { contentHash, parseContentHash, type Content } from "./navigation";

export function useContentNavigation(
  dialog: RefObject<HTMLDialogElement>,
  stopMovement: () => void,
  onVisit: (content: Content) => void,
) {
  const [content, setContent] = useState<Content | null>(null);
  const [copyState, setCopyState] = useState("");
  const previousFocus = useRef<HTMLElement | null>(null);
  const copyRequest = useRef(0);
  const previousPlace = useRef<Content["place"] | null>(null);
  const callbacks = useRef({ stopMovement, onVisit });
  callbacks.current = { stopMovement, onVisit };

  const applyContent = (value: Content | null) => {
    copyRequest.current++;
    setCopyState("");
    setContent(value);
    if (value) callbacks.current.onVisit(value);
    else {
      dialog.current?.close();
      previousFocus.current?.focus();
    }
  };
  const selectContent = (value: Content | null) => {
    const hash = contentHash(value);
    if (window.location.hash !== hash)
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${hash}`,
      );
    applyContent(value);
  };
  const openContent = (value: Content) => {
    callbacks.current.stopMovement();
    previousFocus.current = document.activeElement as HTMLElement;
    selectContent(value);
  };
  const closeContent = () => selectContent(null);

  useEffect(() => {
    const sync = () => {
      callbacks.current.stopMovement();
      applyContent(parseContentHash(window.location.hash));
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      copyRequest.current++;
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useLayoutEffect(() => {
    if (content && !dialog.current?.open) dialog.current?.showModal();
    else if (!content && dialog.current?.open) dialog.current.close();
    else if (content && previousPlace.current !== content.place)
      dialog.current?.querySelector<HTMLHeadingElement>("h2")?.focus();
    previousPlace.current = content?.place ?? null;
  }, [content]);

  const copyLink = async () => {
    const request = ++copyRequest.current;
    let message: string;
    try {
      await navigator.clipboard.writeText(window.location.href);
      message = "Link copied";
    } catch {
      message = "Copy the URL from your address bar.";
    }
    if (request === copyRequest.current) setCopyState(message);
  };

  return {
    content,
    copyState,
    openContent,
    closeContent,
    selectContent,
    copyLink,
    permalink: contentHash(content),
  };
}

/**
 * Sets data-theme on <html> before first paint: the stored choice, else the system setting, else dark.
 * Must stay in <head>; anywhere later and light-mode visitors see a dark flash.
 */
const script = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

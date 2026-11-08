import localFont from "next/font/local";

/*
  StretchPro, self-hosted via next/font/local. Display face used only for the
  "PASAJERO" wordmark in the Hero; loaded there, not in the root layout.
*/
export const stretchPro = localFont({
  src: "./StretchPro.otf",
  weight: "400",
  style: "normal",
  variable: "--font-stretch-pro",
  display: "swap",
});

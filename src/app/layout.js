import "@/assets/font/bootstrap-font/bootstrap-icons.min.css";
import "@/assets/font/font-awsome/css-js/all.min.css";
import "@/assets/font/font-awsome/css-js/all.min.js";
import "@/assets/scss/main.scss";
import PathNameLoad from "@/utils/pathNameLoad";
import Bootstrap from "@/components/Bootstrap";

export const metadata = {
  title: "Coworking Café - Le meilleur espace de coworking en ville",
  description:
    "Découvrez Coworking Café, l'espace de coworking idéal pour stimuler votre productivité et votre créativité. Profitez d'un environnement moderne, convivial et équipé de toutes les commodités nécessaires pour travailler efficacement. Rejoignez notre communauté dynamique dès aujourd'hui !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Bootstrap />
        <PathNameLoad />
        {children}
      </body>
    </html>
  );
}

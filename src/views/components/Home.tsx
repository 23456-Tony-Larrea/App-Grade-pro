import NavMain from "./main-page/NavMain";
import DescriptionMain from "./main-page/DescriptionMain";
import FooterMain from "./main-page/FooterMain";

export default function HomeComponent() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <NavMain />
      <DescriptionMain />
      <FooterMain />
    </div>
  );
}

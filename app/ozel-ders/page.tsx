import { DersCta } from "@/components/ders/DersCta";
import { DersHero } from "@/components/ders/DersHero";
import { DersMarquee } from "@/components/ders/DersMarquee";
import { DersNav } from "@/components/ders/DersNav";
import { DersTutors } from "@/components/ders/DersTutors";

export default function OzelDersPage() {
  return (
    <>
      <DersNav />
      <main>
        <DersHero />
        <DersMarquee />
        <DersTutors />
        <DersCta />
      </main>
    </>
  );
}

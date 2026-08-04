import { KafeFeatures } from "@/components/kafe/KafeFeatures";
import { KafeEmbed } from "@/components/kafe/KafeEmbed";
import { KafeFooter } from "@/components/kafe/KafeFooter";
import { KafeHero } from "@/components/kafe/KafeHero";
import { KafeHoursLocation } from "@/components/kafe/KafeHoursLocation";
import { KafeMarquee } from "@/components/kafe/KafeMarquee";
import { KafeMenu } from "@/components/kafe/KafeMenu";
import { KafeNav } from "@/components/kafe/KafeNav";
import { KafeStory } from "@/components/kafe/KafeStory";

export default function KafePage() {
  return (
    <>
      <KafeNav />
      <main>
        <KafeHero />
        <KafeMarquee />
        <KafeStory />
        <KafeFeatures />
        <KafeMenu />
        <KafeHoursLocation />
        <KafeEmbed />
      </main>
      <KafeFooter />
    </>
  );
}

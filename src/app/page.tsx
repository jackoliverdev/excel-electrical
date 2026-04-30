import { ElectricsHero } from "@/components/Electrics/ElectricsHero";
import { ElectricsServices } from "@/components/Electrics/ElectricsServices";
import { ElectricsWhyUs } from "@/components/Electrics/ElectricsWhyUs";
import { ElectricsAreas } from "@/components/Electrics/ElectricsAreas";
import { ElectricsSmallJobs } from "@/components/Electrics/ElectricsSmallJobs";
import { ElectricsContact } from "@/components/Electrics/ElectricsContact";

export default function Home() {
  return (
    <>
      <ElectricsHero />
      <ElectricsServices />
      <ElectricsWhyUs />
      <ElectricsAreas />
      <ElectricsSmallJobs />
      <ElectricsContact />
    </>
  );
}

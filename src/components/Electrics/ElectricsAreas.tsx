import { HomeLocations } from "@/components/Home/HomeLocations";

export function ElectricsAreas() {
  return (
    <HomeLocations
      variant="electrics"
      sectionId="areas"
      heading={{
        kicker: "Local & reliable",
        title: "Areas we cover",
        lead:
          "We cover Essex, Suffolk, Cambridgeshire, Hertfordshire, central London and Greater London — tap the map or a county for detail.",
      }}
    />
  );
}

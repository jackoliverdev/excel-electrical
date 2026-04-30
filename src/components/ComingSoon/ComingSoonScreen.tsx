import Image from "next/image";

export function ComingSoonScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#03060a] px-6 text-center">
      <div className="space-y-6">
        <Image
          src="/ExcelElectrics/ExcelElectrics.png"
          alt="Excel Electrics — Wire & Fire"
          width={280}
          height={72}
          priority
          className="mx-auto h-auto w-auto max-w-[min(100%,280px)]"
        />
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200 md:text-base">
          Coming Soon
        </p>
      </div>
    </main>
  );
}

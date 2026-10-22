import {
  Allura,
  Great_Vibes,
  Herr_Von_Muellerhoff,
  Italianno,
  Mea_Culpa,
  Monsieur_La_Doulaise,
  Mrs_Saint_Delafield,
  Pinyon_Script,
} from "next/font/google";

const mrsSaintDelafield = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--sig-mrs-saint-delafield",
});

const meaCulpa = Mea_Culpa({
  subsets: ["latin"],
  weight: "400",
  variable: "--sig-mea-culpa",
});

const herrVonMuellerhoff = Herr_Von_Muellerhoff({
  subsets: ["latin"],
  weight: "400",
  variable: "--sig-herr-von-muellerhoff",
});

const monsieurLaDoulaise = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: "400",
  variable: "--sig-monsieur-la-doulaise",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--sig-allura",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--sig-great-vibes",
});

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--sig-pinyon-script",
});

const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
  variable: "--sig-italianno",
});

const fonts = [
  { name: "Mrs Saint Delafield", variable: "--sig-mrs-saint-delafield" },
  { name: "Mea Culpa", variable: "--sig-mea-culpa" },
  { name: "Herr Von Muellerhoff", variable: "--sig-herr-von-muellerhoff" },
  { name: "Monsieur La Doulaise", variable: "--sig-monsieur-la-doulaise" },
  { name: "Allura", variable: "--sig-allura" },
  { name: "Great Vibes", variable: "--sig-great-vibes" },
  { name: "Pinyon Script", variable: "--sig-pinyon-script" },
  { name: "Italianno", variable: "--sig-italianno" },
];

export const metadata = {
  title: "Signature fonts",
};

export default function SigTestPage() {
  return (
    <div
      className={`${mrsSaintDelafield.variable} ${meaCulpa.variable} ${herrVonMuellerhoff.variable} ${monsieurLaDoulaise.variable} ${allura.variable} ${greatVibes.variable} ${pinyonScript.variable} ${italianno.variable}`}
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 py-16 md:px-10 lg:px-16">
        {fonts.map((font) => (
          <div key={font.name} className="border-b border-ink/10 py-10">
            <p
              style={{ fontFamily: `var(${font.variable})`, fontSize: "120px" }}
              className="leading-[1.15] text-ink"
            >
              Krishnendu
            </p>
            <p className="mt-2 text-sm text-ink-dim">{font.name}</p>
            <p
              style={{ fontFamily: `var(${font.variable})`, fontSize: "64px" }}
              className="mt-4 leading-[1.2] text-ink"
            >
              K Krishnendu Adak
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

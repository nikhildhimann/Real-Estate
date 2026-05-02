import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPinned, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `About ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} helps clients buy, sell, and rent properties with confidence.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || ""}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 relative z-10">
      <section className="container mx-auto px-4">
        <div className="relative z-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white text-slate-950 shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-14 space-y-6">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">About {siteConfig.brandName}</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">About {siteConfig.brandName}</h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                We are a trusted real estate agency helping clients buy, sell, and rent properties with confidence.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our mission is to simplify property buying and deliver transparent, reliable service.
              </p>
              <Button size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800" asChild>
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
            </div>
            <div className="min-h-[360px] bg-[url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200')] bg-cover bg-center" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-6">
            {[
            { icon: ShieldCheck, title: "Verified Listings", text: "Browse properties reviewed for trust and accuracy." },
            { icon: MapPinned, title: "Market Expertise", text: "Get guidance for top locations and fair pricing." },
            { icon: Clock, title: "Fast Response", text: "Speak with our team quickly when you are ready." },
            { icon: UserRoundCheck, title: "Personalized Service", text: "Get recommendations matched to your goals." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <item.icon className="h-8 w-8 text-primary mb-5" />
              <h2 className="font-bold text-xl mb-2 text-slate-900">{item.title}</h2>
              <p className="text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

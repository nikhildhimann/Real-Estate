"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, Calendar } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/data/siteConfig";

interface AgentCardProps {
  property: {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    phone?: string;
  };
  agent: {
    name: string;
    image?: string;
    phone: string;
    email: string;
  };
}

export function AgentCard({ property, agent }: AgentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in "${property.title}" (${formatPrice(property.price, siteConfig.currency)}) located at ${property.address}. ${window.location.href}`;
    const url = `https://wa.me/${agent.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="sticky top-24 border-slate-200 bg-white text-slate-950">
      <CardHeader>
        <CardTitle>Listed By</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {agent.image ? (
              <img src={agent.image} alt={agent.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xl font-bold">{agent.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
            <p className="text-sm font-medium text-slate-600">Real Estate Company</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" className="w-full justify-start border-slate-300 bg-white text-slate-800 hover:bg-slate-100" onClick={() => window.location.href = `tel:${agent.phone}`}>
            <Phone className="mr-2 h-4 w-4 text-blue-600" />
            {agent.phone}
          </Button>
          <Button variant="outline" className="w-full justify-start border-slate-300 bg-white text-slate-800 hover:bg-slate-100" onClick={handleWhatsApp}>
            <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
            WhatsApp
          </Button>
          <Button variant="outline" className="w-full justify-start border-slate-300 bg-white text-slate-800 hover:bg-slate-100" onClick={() => window.location.href = `mailto:${agent.email}`}>
            <Mail className="mr-2 h-4 w-4 text-red-500" />
            Email Agent
          </Button>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Button className="w-full" onClick={() => setIsModalOpen(true)}>
            Enquire Now
          </Button>
          <Button variant="secondary" className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule a Visit
          </Button>
        </div>
      </CardContent>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={property}
      />
    </Card>
  );
}

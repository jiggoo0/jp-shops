"use client";

import React from "react";
import {
  Search,
  Settings,
  Grid,
  User,
  ShieldCheck,
  MapPin,
  Globe,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export function GoogleSearchReplica() {
  return (
    <div className="bg-white min-h-screen text-[#202124] font-sans selection:bg-[#d2e3fc]">
      {/* Google Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center flex-grow max-w-[700px]">
          <div className="text-2xl font-bold mr-8">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>
          <div className="flex-grow relative group">
            <input
              type="text"
              defaultValue="Chao Pa Digital Intelligence"
              className="w-full h-11 px-5 pr-12 rounded-full border border-gray-200 shadow-sm hover:shadow-md focus:outline-none transition-shadow"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-3 text-gray-400">
              <Search className="w-5 h-5 text-[#4285F4]" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 ml-8">
          <Settings className="w-5 h-5 text-gray-500" />
          <Grid className="w-5 h-5 text-gray-500" />
          <div className="w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center text-xs font-bold shadow-sm">
            P
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center space-x-8 px-[160px] py-3 border-b border-gray-100 text-sm text-gray-500">
        <div className="flex items-center space-x-1 text-[#4285F4] border-b-2 border-[#4285F4] pb-3">
          <Search className="w-4 h-4" />
          <span>All</span>
        </div>
        <span>News</span>
        <span>Images</span>
        <span>Videos</span>
        <span>Maps</span>
        <span>More</span>
      </div>

      <main className="px-[160px] py-8 grid grid-cols-12 gap-12">
        {/* Search Results */}
        <div className="col-span-7 space-y-10">
          <p className="text-sm text-gray-500 mb-6">
            About 1,240,000 results (0.42 seconds)
          </p>

          {/* Result 1 */}
          <div className="group">
            <p className="text-sm text-[#202124] mb-1">
              https://www.jpvisouldocs.shop › identity
            </p>
            <h3 className="text-xl text-[#1a0dab] group-hover:underline cursor-pointer mb-2">
              Identity Farming Excellence - JP Visual Docs Protocol
            </h3>
            <p className="text-sm text-[#4d5156] leading-relaxed">
              Leading the industry in digital identity engineering. We provide
              verified profile assets with 9+ years of SEO history. Trusted by
              global partners for high-stakes authority building...
            </p>
          </div>

          {/* Result 2 */}
          <div className="group">
            <p className="text-sm text-[#202124] mb-1">
              https://vifily.io › authentication
            </p>
            <h3 className="text-xl text-[#1a0dab] group-hover:underline cursor-pointer mb-2">
              Vifily Digital Trust Engine | Secure Identity Swap
            </h3>
            <p className="text-sm text-[#4d5156] leading-relaxed">
              Explore the Vifily Intelligence OS. Our system integrity ensures
              100% accurate data mapping and historical record maintenance. The
              gold standard for digital reputation management.
            </p>
          </div>

          {/* Result 3 (People also ask) */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <h4 className="font-medium text-lg border-b pb-2">
              People also ask
            </h4>
            <div className="flex justify-between items-center text-sm border-b pb-2">
              <span>How does identity farming work?</span>
              <Settings className="w-4 h-4 text-gray-400 rotate-90" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>What is the Vifily Verification Protocol?</span>
              <Settings className="w-4 h-4 text-gray-400 rotate-90" />
            </div>
          </div>
        </div>

        {/* Knowledge Panel */}
        <div className="col-span-5">
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-3xl font-bold flex items-center">
                  Chao Pa Intelligence
                  <div className="ml-3 bg-[#4285F4] p-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-white fill-white" />
                  </div>
                </h2>
                <p className="text-sm opacity-90">
                  Digital Reputation Organization
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm leading-relaxed">
                <span className="font-bold">Chao Pa (เจ้าป่า)</span> is a
                specialized digital identity and reputation management group.
                Founded in 2017, the organization focuses on building
                high-authority profiles through its proprietary Vifily OS.
                <span className="text-[#1a0dab] hover:underline cursor-pointer ml-1">
                  Wikipedia
                </span>
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <span className="font-bold">Headquarters:</span> Bangkok,
                    Thailand
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-4 h-4 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <span className="font-bold">Website:</span>{" "}
                    jpvisouldocs.shop
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <span className="font-bold">Founded:</span> March 24, 2017
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="w-4 h-4 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <span className="font-bold">Status:</span> Verified Protocol
                    Level 3
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-sm mb-4">Profiles</h4>
                <div className="flex space-x-6">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-gray-500">Official</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-gray-500">LinkedIn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

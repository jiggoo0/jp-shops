"use client";

import React from "react";
import {
  CheckCircle2,
  Search,
  FileText,
  Calendar,
  User,
  ShieldCheck,
  Globe,
  Info,
} from "lucide-react";

export function VisaPortalReplica() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans text-gray-800">
      {/* Portal Header */}
      <header className="bg-[#002d62] text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#002d62]">
              <Globe className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight leading-none">
                Global Visa Protocol
              </h1>
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1">
                E-Service Verification Node
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
            <span className="hover:text-blue-300 cursor-pointer transition-colors">
              Apply
            </span>
            <span className="text-blue-300 border-b-2 border-blue-300 pb-1">
              Track Application
            </span>
            <span className="hover:text-blue-300 cursor-pointer transition-colors">
              Contact
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-16 px-6">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gray-50 px-10 py-8 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">
              Track Application Status
            </h2>
            <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">
                Live from Registry
              </span>
            </div>
          </div>

          <div className="p-10 space-y-12">
            {/* Status Highlight */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-[#002d62]/5 p-10 rounded-[2.5rem] border border-[#002d62]/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#002d62]/5 rounded-full -mr-16 -mt-16"></div>
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-green-600 border border-gray-50 flex-shrink-0">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="text-center md:text-left space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                  Current Status
                </p>
                <h3 className="text-4xl font-black text-[#002d62] uppercase tracking-tighter italic">
                  Application Verified & Active
                </h3>
                <p className="text-gray-600 font-medium italic">
                  Your jurisdiction protocol has been fully processed and
                  authenticated by our central node.
                </p>
              </div>
            </div>

            {/* Application Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 border-b pb-2">
                  Applicant Information
                </h4>
                <div className="space-y-6">
                  {[
                    { icon: <User />, label: "Full Name", value: "JOHN DOE" },
                    {
                      icon: <FileText />,
                      label: "Passport Number",
                      value: "AA******89",
                    },
                    {
                      icon: <Globe />,
                      label: "Jurisdiction",
                      value: "SCHENGEN NODE (EU)",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#002d62]">
                        {React.isValidElement(item.icon) &&
                          React.cloneElement(
                            item.icon as React.ReactElement<
                              Record<string, unknown>
                            >,
                            {
                              className: "w-5 h-5",
                            },
                          )}
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 border-b pb-2">
                  Record Metadata
                </h4>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Search />,
                      label: "Reference Number",
                      value: "GV-99283-XPL",
                    },
                    {
                      icon: <Calendar />,
                      label: "Date of Integrity",
                      value: "MARCH 24, 2026",
                    },
                    {
                      icon: <ShieldCheck />,
                      label: "Protocol Level",
                      value: "VERIFIED LEVEL 3",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#002d62]">
                        {React.isValidElement(item.icon) &&
                          React.cloneElement(
                            item.icon as React.ReactElement<
                              Record<string, unknown>
                            >,
                            {
                              className: "w-5 h-5",
                            },
                          )}
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instruction Box */}
            <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl flex items-start space-x-6 border-4 border-gray-800">
              <Info className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <div className="space-y-4">
                <h4 className="text-lg font-black uppercase tracking-tight">
                  Next Steps Protocol
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  The verification process is complete. Your authenticated
                  digital asset is now mirrored in our global registry. Please
                  ensure your local device trust level is maintained for secure
                  downloading of the official itinerary records.
                </p>
                <button className="h-14 px-8 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30">
                  Download Secure Record
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">
            Official E-Registry Service &bull; Global Integrity Protocol v4.2
          </p>
        </div>
      </main>
    </div>
  );
}

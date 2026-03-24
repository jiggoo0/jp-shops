import React from "react";
import Image from "next/image";
import { TicketProps } from "./KLMTemplate";

export const ANATemplate: React.FC<TicketProps> = ({
  passengerName,
  pnr,
  eTicket,
  issueDate,
  flights,
  isPreview = false,
  ticketId = "MOCK-ID-ANA",
}) => {
  const verifyUrl = `https://www.jpvisouldocs.shop/verify/flight/${ticketId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyUrl)}`;

  return (
    <div
      className={`bg-white text-black font-sans p-8 w-full max-w-4xl mx-auto border border-gray-200 ${isPreview ? "blur-[2px] opacity-70 select-none pointer-events-none relative" : ""}`}
    >
      {isPreview && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-red-600 text-white px-8 py-4 text-4xl font-bold uppercase tracking-widest transform -rotate-45 opacity-80 border-4 border-white shadow-2xl">
            PREVIEW ONLY
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-blue-900 pb-4 mb-6">
        <div className="flex items-start space-x-6">
          <div>
            <h1 className="text-4xl font-black text-blue-900 tracking-tighter">
              ANA
            </h1>
            <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mt-1">
              All Nippon Airways
            </p>
          </div>
          {/* QR Code for Verification */}
          {!isPreview && (
            <div className="border-2 border-blue-900 p-1 bg-white">
              <Image
                src={qrCodeUrl}
                alt="Verification QR"
                width={64}
                height={64}
                className="w-16 h-16"
              />
              <p className="text-[6px] text-center font-bold mt-0.5 text-blue-900">
                ANA VERIFIED
              </p>
            </div>
          )}
        </div>
        <div className="text-right">...</div>
      </div>

      {/* Passenger Info */}
      <div className="bg-blue-50/50 border border-blue-100 p-6 mb-8 rounded-sm">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">
              Passenger Name
            </p>
            <p className="text-xl font-bold text-gray-900">{passengerName}</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                Reservation Number
              </p>
              <p className="text-lg font-mono font-bold text-blue-900">{pnr}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                Ticket Number
              </p>
              <p className="text-lg font-mono font-bold text-gray-900">
                {eTicket}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-100 flex text-xs">
          <div className="mr-8">
            <span className="text-gray-500 uppercase font-bold mr-2">
              Issue Date:
            </span>
            <span className="font-semibold">{issueDate}</span>
          </div>
          <div>
            <span className="text-gray-500 uppercase font-bold mr-2">
              Issuing Airline:
            </span>
            <span className="font-semibold">All Nippon Airways</span>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="mb-8">
        <div className="bg-blue-900 text-white px-4 py-2 font-bold uppercase text-sm mb-4">
          Itinerary
        </div>
        <div className="space-y-4">
          {flights.map((flight, idx) => (
            <div
              key={idx}
              className="border border-gray-200 p-4 flex flex-col md:flex-row gap-6"
            >
              <div className="md:w-1/4">
                <p className="text-sm font-bold text-blue-900 mb-1">
                  {flight.date}
                </p>
                <p className="text-lg font-bold">{flight.flightNumber}</p>
                <p className="text-xs text-gray-500 uppercase">
                  Class: {flight.cabinClass}
                </p>
                <p className="text-xs text-green-600 font-bold mt-1">
                  Confirmed
                </p>
              </div>
              <div className="md:w-3/4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                    From
                  </p>
                  <p className="font-bold text-lg">{flight.departure}</p>
                  <p className="text-gray-700">{flight.departureTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                    To
                  </p>
                  <p className="font-bold text-lg">{flight.arrival}</p>
                  <p className="text-gray-700">{flight.arrivalTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal & Footer */}
      <div className="text-[10px] text-gray-500 text-justify mt-12 border-t border-gray-200 pt-4">
        <p className="mb-2">
          This document is automatically generated. Please present this receipt
          along with a valid passport at check-in.
        </p>
        <p className="mb-2">
          Carriage is subject to the conditions of carriage of the carrier,
          which limits the carrier&apos;s liability.
        </p>
        <p className="font-bold text-center mt-6">
          Thank you for flying with All Nippon Airways.
        </p>
      </div>
    </div>
  );
};

import React from "react";
import Image from "next/image";
import { TicketProps } from "./KLMTemplate";

export const EtihadTemplate: React.FC<TicketProps> = ({
  passengerName,
  pnr,
  eTicket,
  issueDate,
  flights,
  isPreview = false,
  ticketId = "MOCK-ID-EY",
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
      <div className="flex justify-between items-center border-b-[8px] border-[#C3A16A] pb-6 mb-6">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#3B3331] tracking-tighter">
              ETIHAD
            </h1>
            <p className="text-[10px] font-bold text-[#C3A16A] tracking-[0.2em] uppercase mt-1">
              Airways
            </p>
          </div>
          {/* QR Code for Verification */}
          {!isPreview && (
            <div className="border border-[#C3A16A] p-1 bg-white">
              <Image
                src={qrCodeUrl}
                alt="Verification QR"
                width={64}
                height={64}
                className="w-16 h-16"
              />
              <p className="text-[6px] text-center font-bold mt-0.5 text-[#C3A16A]">
                EY VERIFIED
              </p>
            </div>
          )}
        </div>
        <div className="text-right">
          ...
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
            Itinerary & Receipt
          </p>
        </div>
      </div>

      {/* Passenger Info */}
      <div className="flex flex-wrap justify-between items-start mb-10 bg-[#F9F8F6] p-6 border border-[#EAE6DF]">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
            Passenger Name
          </p>
          <p className="text-2xl font-serif font-bold text-[#3B3331] uppercase">
            {passengerName}
          </p>
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
              Booking Reference
            </p>
            <p className="text-lg font-mono font-bold text-[#3B3331]">{pnr}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
              Ticket Number
            </p>
            <p className="text-lg font-mono font-bold text-[#3B3331]">
              {eTicket}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
              Date of Issue
            </p>
            <p className="text-sm font-semibold">{issueDate}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
              Issued By
            </p>
            <p className="text-sm font-semibold">ETIHAD WWW</p>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="mb-10">
        <h3 className="text-lg font-serif font-bold text-[#C3A16A] border-b border-[#EAE6DF] pb-2 mb-4 uppercase tracking-widest">
          Travel Itinerary
        </h3>
        <div className="space-y-6">
          {flights.map((flight, idx) => (
            <div key={idx} className="border-l-4 border-[#C3A16A] pl-4 py-2">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xl font-bold text-[#3B3331]">
                    {flight.flightNumber}
                  </p>
                  <p className="text-sm text-gray-600">{flight.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#3B3331]">
                    Class:{" "}
                    <span className="font-normal">{flight.cabinClass}</span>
                  </p>
                  <p className="text-xs text-green-700 font-bold uppercase tracking-widest">
                    Confirmed
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 bg-[#F9F8F6] p-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    Departing
                  </p>
                  <p className="font-bold text-lg text-[#3B3331]">
                    {flight.departure}
                  </p>
                  <p className="text-sm text-gray-600 font-mono mt-1">
                    {flight.departureTime}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    Arriving
                  </p>
                  <p className="font-bold text-lg text-[#3B3331]">
                    {flight.arrival}
                  </p>
                  <p className="text-sm text-gray-600 font-mono mt-1">
                    {flight.arrivalTime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal & Footer */}
      <div className="text-[9px] text-gray-500 text-justify border-t border-[#EAE6DF] pt-6">
        <p className="mb-2">
          Notice: Carriage and other services provided by the carrier are
          subject to conditions of carriage, which are hereby incorporated by
          reference. These conditions may be obtained from the issuing carrier.
        </p>
        <p className="mb-2">
          Please ensure you check the latest travel requirements before your
          flight. We look forward to welcoming you on board.
        </p>
        <div className="mt-8 text-center text-[#C3A16A] font-serif italic text-lg">
          Choose Well.
        </div>
      </div>
    </div>
  );
};

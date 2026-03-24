import React from "react";
import Image from "next/image";

export interface FlightSegment {
  flightNumber: string;
  departure: string;
  departureTime: string;
  arrival: string;
  arrivalTime: string;
  date: string;
  cabinClass: string;
  seat: string;
}

export interface TicketProps {
  passengerName: string;
  pnr: string;
  eTicket: string;
  issueDate: string;
  flights: FlightSegment[];
  isPreview?: boolean;
  ticketId?: string;
}

export const KLMTemplate: React.FC<TicketProps> = ({
  passengerName,
  pnr,
  eTicket,
  issueDate,
  flights,
  isPreview = false,
  ticketId = "MOCK-ID-123",
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
      <div className="flex justify-between items-start border-b-2 border-blue-800 pb-6 mb-6">
        <div className="flex items-start space-x-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-800 tracking-tighter">
              KLM
            </h1>
            <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase mt-1">
              Royal Dutch Airlines
            </p>
          </div>
          {/* QR Code for Verification */}
          {!isPreview && (
            <div className="border border-gray-200 p-1 bg-white">
              <Image
                src={qrCodeUrl}
                alt="Verification QR"
                width={64}
                height={64}
                className="w-16 h-16"
              />
              <p className="text-[6px] text-center font-bold mt-0.5">
                SCAN TO VERIFY
              </p>
            </div>
          )}
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold uppercase">Electronic Ticket</h2>
          <p className="text-sm text-gray-600 mt-1">
            Passenger Itinerary Receipt
          </p>
        </div>
      </div>

      {/* Passenger Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-xs text-gray-500 uppercase">Passenger Name</p>
          <p className="text-lg font-bold">{passengerName}</p>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase">
                Booking Ref (PNR)
              </p>
              <p className="text-lg font-mono font-bold text-blue-800">{pnr}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Ticket Number</p>
              <p className="text-lg font-mono font-bold">{eTicket}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Date of Issue</p>
              <p className="text-sm font-semibold">{issueDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Issuing Office</p>
              <p className="text-sm font-semibold">KLM WEB WWW</p>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="mb-8">
        <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">
          Your Itinerary
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="pb-2 font-normal">Flight</th>
              <th className="pb-2 font-normal">Date</th>
              <th className="pb-2 font-normal">Departing</th>
              <th className="pb-2 font-normal">Arriving</th>
              <th className="pb-2 font-normal">Class</th>
              <th className="pb-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="py-3 font-bold">{flight.flightNumber}</td>
                <td className="py-3">{flight.date}</td>
                <td className="py-3">
                  <div className="font-bold">{flight.departure}</div>
                  <div className="text-xs text-gray-500">
                    {flight.departureTime}
                  </div>
                </td>
                <td className="py-3">
                  <div className="font-bold">{flight.arrival}</div>
                  <div className="text-xs text-gray-500">
                    {flight.arrivalTime}
                  </div>
                </td>
                <td className="py-3">{flight.cabinClass}</td>
                <td className="py-3 text-green-600 font-bold">CONFIRMED</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Details */}
      <div className="mb-8 border border-gray-200 p-4 bg-gray-50">
        <h3 className="text-sm font-bold mb-2">Payment Details</h3>
        <div className="grid grid-cols-2 text-xs">
          <div>
            <p>
              <span className="text-gray-500">Fare:</span> THB 34,500.00
            </p>
            <p>
              <span className="text-gray-500">Taxes/Fees/Charges:</span> THB
              4,250.00
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm">
              <span className="text-gray-500 font-normal">Total Amount:</span>{" "}
              THB 38,750.00
            </p>
            <p className="mt-1">
              <span className="text-gray-500">Form of Payment:</span> Credit
              Card (VI)
            </p>
          </div>
        </div>
      </div>

      {/* Legal & Footer */}
      <div className="text-[10px] text-gray-500 text-justify">
        <p className="mb-2">
          Carriage and other services provided by the carrier are subject to
          conditions of carriage, which are hereby incorporated by reference.
          These conditions may be obtained from the issuing carrier.
        </p>
        <p className="mb-2">
          The itinerary/receipt constitutes the passenger ticket for the
          purposes of article 3 of the Warsaw convention, except where the
          carrier delivers to the passenger another document complying with the
          requirements of article 3.
        </p>
        <p className="font-bold">
          Thank you for choosing KLM Royal Dutch Airlines.
        </p>
      </div>
    </div>
  );
};

import React from "react";
import Image from "next/image";

export interface HotelBookingProps {
  hotelName: string;
  guestName: string;
  confirmationNo: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  address: string;
  price?: string;
  isPreview?: boolean;
  ticketId?: string;
}

export const HotelTemplate: React.FC<HotelBookingProps> = ({
  hotelName,
  guestName,
  confirmationNo,
  checkInDate,
  checkOutDate,
  roomType,
  address,
  price = "€ 1,240.00",
  isPreview = false,
  ticketId = "MOCK-HOTEL-ID",
}) => {
  const verifyUrl = `https://www.jpvisouldocs.shop/verify/hotel/${ticketId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyUrl)}`;

  // Simplified logic to determine branding color
  const isPeninsula = hotelName.toLowerCase().includes("peninsula");
  const isEmirates = hotelName.toLowerCase().includes("emirates");
  const brandColor = isPeninsula
    ? "border-[#961E32]"
    : isEmirates
      ? "border-[#C3A16A]"
      : "border-[#003580]";
  const textColor = isPeninsula
    ? "text-[#961E32]"
    : isEmirates
      ? "text-[#C3A16A]"
      : "text-[#003580]";

  return (
    <div
      className={`bg-white text-black font-serif p-10 w-full max-w-4xl mx-auto border-t-[12px] ${brandColor} shadow-sm ${isPreview ? "blur-[2px] opacity-70 select-none pointer-events-none relative" : ""}`}
    >
      {isPreview && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-red-600 text-white px-8 py-4 text-4xl font-sans font-bold uppercase tracking-widest transform -rotate-12 opacity-80 border-4 border-white shadow-2xl">
            PREVIEW ONLY
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-start space-x-6">
          <div>
            <h1
              className={`text-4xl font-black uppercase tracking-tighter ${textColor}`}
            >
              {hotelName.split(" ")[0]}
            </h1>
            <p className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase mt-1">
              {hotelName.split(" ").slice(1).join(" ")}
            </p>
          </div>
          {!isPreview && (
            <div className={`border p-1 bg-white ${brandColor}`}>
              <Image
                src={qrCodeUrl}
                alt="Hotel Verify QR"
                width={64}
                height={64}
                className="w-16 h-16"
              />
              <p className="text-[6px] text-center font-bold mt-0.5">
                VERIFY BOOKING
              </p>
            </div>
          )}
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase tracking-tight">
            Booking Confirmation
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
            Confirmed & Guaranteed
          </p>
        </div>
      </div>

      {/* Main Reservation Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 border-y border-gray-100 py-10">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
              Confirmation Number
            </p>
            <p className="text-xl font-bold font-mono">{confirmationNo}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
              Guest Name
            </p>
            <p className="text-xl font-bold">{guestName}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
              Hotel Address
            </p>
            <p className="text-sm font-medium italic leading-relaxed text-gray-600">
              {address}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-sm space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                Check-in
              </p>
              <p className="text-lg font-bold">{checkInDate}</p>
              <p className="text-[10px] text-gray-500">From 15:00</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                Check-out
              </p>
              <p className="text-lg font-bold">{checkOutDate}</p>
              <p className="text-[10px] text-gray-500">Until 12:00</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
              Accommodation Type
            </p>
            <p className="text-lg font-bold">{roomType}</p>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="mb-12">
        <h3 className="text-sm font-black uppercase tracking-widest border-b pb-2 mb-4">
          Financial Summary
        </h3>
        <div className="flex justify-between items-end">
          <div className="text-xs space-y-1 text-gray-500">
            <p>Room Rate & Taxes included</p>
            <p>Guaranteed with Credit Card</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase font-bold">
              Total Price
            </p>
            <p className={`text-3xl font-black ${textColor}`}>{price}</p>
          </div>
        </div>
      </div>

      {/* Footer / Policy */}
      <div className="text-[9px] text-gray-400 leading-relaxed text-justify pt-6 border-t border-gray-100">
        <p className="mb-2">
          Cancellation Policy: Reservations must be cancelled at least 48 hours
          prior to arrival to avoid a penalty of one night&apos;s room and tax.
          Special conditions may apply for promotional rates.
        </p>
        <p>
          This is an automated confirmation from the {hotelName} reservation
          system. We look forward to welcoming you soon.
        </p>
        <div className="mt-8 text-center">
          <p className="font-bold tracking-[0.5em] text-gray-300 uppercase italic">
            Your Sanctuary Awaits
          </p>
        </div>
      </div>
    </div>
  );
};

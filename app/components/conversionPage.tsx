"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { pageType, Token, WalletOption } from "../types";
import { Banks, currencies, Tokens, Wallets } from "../data";
import { Header } from "./recipientHeader";
import nigeria from "../../public/nigeria.png";

export default function ConversionForm() {
  // Global  State
  const [page, setPage] = useState<pageType>(1);

  //  Page 1 State
  const [payAmount, setPayAmount] = useState("1.00");
  const [selectedToken, setSelectedToken] = useState<Token>(Tokens[0]);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  //  Bank Details
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  //Recipient Details
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedCurrency, setselectedCurrency] = useState(currencies[0]);
  const [isCurrencyModalOpen, setisCurrencyModalOpen] = useState(false);

  //  effect
  useEffect(() => {
    if (accountNumber.length === 10) {
      setAccountName("ODUTUGA GBEKE");
    } else {
      setAccountName("");
    }
  }, [accountNumber]);

  // Handler functions
  const handleNext = () => {
    if (page < 3) setPage((prev: number) => (prev + 1) as pageType);
  };

  const handleBack = () => {
    if (page > 1) setPage((prev: number) => (prev - 1) as pageType);
  };

  const filteredTokens = Tokens.filter(
    (t) =>
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.network && t.network.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full max-w-160.5  min-h-screen bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 mx-auto relative overflow-visible">
      {/* Header  */}
      {page > 1 && <Header />}

      {/*Conversio */}
      {page === 1 && (
        <div className="animate-in pb-20 fade-in slide-in-from-right-4 duration-300">
          {/* Tabs */}
          <div className="flex px-6 md:px-20  p-1 rounded-full mb-8 relative z-0">
            <button className="flex-1 py-2 text-xs md:text-sm font-medium font-family-outfit rounded-full -mr-2.5 z-100 bg-primary-green text-[#F8FEFB] shadow-md">
              Crypto to cash
            </button>
            <button className="flex-1 py-2 text-xs md:text-sm font-medium font-outfit bg-[#F2F2F2] text-primary-grey">
              Cash to crypto
            </button>
            <button className="flex-1 py-2 text-xs md:text-sm font-medium rounded-tr-full rounded-br-full bg-[#F2F2F2] text-primary-grey">
              Crypto to flat loan
            </button>
          </div>

          <div className="px-7.5 space-y-6">
            {/* Input */}

            <div className="border  border-slate-200 rounded-2xl p-4 flex flex-col gap-2 relative z-50">
              <label className=" font-family-outfit text-sm text-primary-grey font-medium">
                You pay
              </label>
              <div className="flex justify-between items-center relative">
                <input
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="text-2xl text-clash text-primary-black font-bold bg-transparent outline-none w-full"
                />

                {/* Token select button */}
                <button
                  onClick={() => setIsTokenModalOpen(!isTokenModalOpen)}
                  className="flex items-center gap-2 bg-[#F9FAFB] border border-slate-200 rounded-full px-3 py-1.5 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                    {selectedToken.icon}
                  </div>

                  <span className="font-semibold text-primary-green font-clash ">
                    {selectedToken.code}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {/* Token dropdown */}
                {isTokenModalOpen && (
                  <div className="absolute top-12 pt-7 -mt-2 right-0 w-65 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 animate-in fade-in zoom-in-95 duration-200 z-100">
                    {/* Search Bar */}
                    <div className="relative mb-3  rounded-2xl">
                      <Search className="absolute  left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        autoFocus
                        placeholder="Search"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#003B3B] placeholder:text-slate-400"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    {/* List */}
                    <div className="max-h-50 overflow-y-auto space-y-1 custom-scrollbar">
                      {filteredTokens.map((token) => (
                        <button
                          key={token.id}
                          onClick={() => {
                            setSelectedToken(token);
                            setIsTokenModalOpen(false);
                          }}
                          className="w-full flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-xl text-left transition-colors group"
                        >
                          <div className="w-8 h-8 flex shrink-0 items-center justify-center bg-slate-100 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                            {token.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold font-clash text-slate-800">
                              {token.code}{" "}
                              {token.network && `- ${token.network}`}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}

            <div className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-2 relative z-40">
              <label className="text-sm text-slate-500 font-medium">
                You receive
              </label>
              <div className="flex justify-between items-center relative">
                <input
                  readOnly
                  value={(
                    parseFloat(payAmount || "0") * selectedCurrency.rate
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  className="text-2xl text-clash text-primary-black font-bold bg-transparent outline-none w-full"
                />

                {/* Currency Select Button */}
                <button
                  onClick={() => setisCurrencyModalOpen(!isCurrencyModalOpen)}
                  className="flex items-center gap-2 bg-[#F9FAFB] border border-slate-200 rounded-full px-3 py-1.5 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-sm">{selectedCurrency.icon}</span>
                  <span className="font-clash text-primary-green ">
                    {selectedCurrency.code}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {/* Currency Dropdown */}
                {isCurrencyModalOpen && (
                  <div className="absolute top-12 right-0 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-in fade-in zoom-in-95 duration-200 z-100">
                    <div className="max-h-40 overflow-y-auto space-y-1 custom-scrollbar">
                      {currencies.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setselectedCurrency(c);
                            setisCurrencyModalOpen(false);
                          }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl text-left transition-colors"
                        >
                          <span className="text-lg">{c.icon}</span>
                          <div>
                            <p className="text-sm font-bold font-clash text-slate-800">
                              {c.code}
                            </p>
                            <p className="text-xs text-slate-500">{c.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Pay From Selector */}
            <div className="space-y-2 relative z-40">
              <label className="text-sm font-medium text-[#003B3B]">
                Pay from
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsWalletModalOpen(!isWalletModalOpen)}
                  className="w-full bg-white mt-3 border border-slate-200 rounded-full py-4 px-6 text-slate-700 flex justify-between items-center hover:border-[#003B3B] transition-colors"
                >
                  <div className="flex items-center  gap-3">
                    {selectedWallet ? (
                      <>
                        <div className="w-6 h-6 flex items-center justify-center overflow-hidden rounded-full">
                          {selectedWallet.icon}
                        </div>
                        <span className="font-medium">
                          {selectedWallet.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-primary-green ">
                        Select an option
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      isWalletModalOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Wallet Dropdown*/}
                {isWalletModalOpen && (
                  <div className="absolute top-[80%] left-6 max-w-11/12 w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-100">
                    {Wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => {
                          setSelectedWallet(wallet);
                          setIsWalletModalOpen(false);
                        }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl text-left transition-colors"
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          {wallet.icon}
                        </div>
                        <span className="font-bold text-slate-700">
                          {wallet.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pay To  */}
            <div className="space-y-2 relative z-0">
              <label className="text-sm font-medium  text-[#003B3B]">
                Pay to
              </label>
              <div className="w-full bg-white border mt-3 border-slate-200 rounded-full py-4 px-6 text-primary-green flex justify-between items-center">
                Select an option{" "}
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-[#003B3B] hover:opacity-80 text-white font-semibold py-4 rounded-full mt-4 hover:shadow-lg hover:shadow-[#003B3B]/20 transition-all active:scale-[0.99] relative z-0"
            >
              Convert now
            </button>
          </div>
        </div>
      )}

      {/* Bank details*/}
      {page === 2 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300 px-5 space-y-6">
          {/* Bank Select */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary-green">Bank</label>
            <div className="relative mt-4">
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full text-[16px] font-normal appearance-none text-primary-green bg-white border border-slate-200 rounded-full py-4 px-6 focus:outline-none focus:border-[#063b3b] cursor-pointer"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {Banks.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Account Number Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary-green">
              Account number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter your account number"
              className="w-full mt-4 bg-white border border-slate-200 rounded-full py-4 px-6 text-slate-700 focus:outline-none focus:border-[#003B3B] placeholder:text-primary-grey"
            />
          </div>

          {/* Account Name Result */}
          {accountName && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <label className="text-sm font-bold text-[#003B3B]">
                Account name
              </label>
              <div className="w-full bg-[#F3F4F6] border border-transparent rounded-full py-4 px-6 text-slate-700 font-bold uppercase tracking-wide">
                {accountName}
              </div>
            </div>
          )}

          <div className="pt-8">
            <button
              onClick={handleNext}
              disabled={!accountName || !selectedBank}
              className="w-full bg-[#003B3B] disabled:bg-slate-300 text-white font-semibold py-4 rounded-full transition-all hover:shadow-lg active:scale-[0.99]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Recipient email */}
      {page === 3 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#003B3B]">
              Recipient email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter recipient email"
              className="w-full mt-4 bg-white border border-slate-200 rounded-full py-4 px-6 text-slate-700 focus:outline-none focus:border-[#003B3B] placeholder:text-primary-grey"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#003B3B]">
              Recipient phone number
            </label>
            <div className="flex gap-3 mt-4">
              {/* Country Code */}
              <div className="flex items-center gap-2 justify-center bg-[#F9FAFB] border border-slate-200 rounded-full px-4 py-4 min-w-27.5 cursor-pointer hover:bg-slate-50">
                <span className="text-primary-grey font-medium">+234</span>
                <span className="w-5 h-7 mt-3">
                  <img src={nigeria.src} alt="nigeria" />
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
              </div>

              {/* Number Input */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="000 - 000 - 00000"
                className="flex-1 bg-white border border-slate-200 rounded-full py-4 px-6 text-primary-grey focus:outline-none focus:border-[#003B3B] placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="pt-24">
            <Link href="/recipient" className="block w-full">
              <button className="w-full bg-[#003B3B] hover: opacity-80 text-white font-semibold py-4 rounded-full mt-4 hover:shadow-lg hover:shadow-[#003B3B]/20 transition-all active:scale-[0.99] relative z-0">
                Convert now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

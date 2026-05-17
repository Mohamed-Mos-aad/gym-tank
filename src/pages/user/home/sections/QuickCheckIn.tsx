"use client";

// ** Hooks && Tools
import { useState, useRef, useEffect } from "react";
import { quickCheckInAction } from "@/actions/user/attendance.actions";
import { CheckCircle2, XCircle, AlertTriangle, ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";

// ** Audio helper using browser Web Audio API (Zero external assets, instant play)
const playFeedbackSound = (type: "success" | "error" | "warning") => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === "success") {
      // Pleasant double beep (high pitch)
      const playBeep = (time: number, freq: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.15, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        osc.start(time);
        osc.stop(time + duration);
      };
      playBeep(ctx.currentTime, 880, 0.15); // A5
      playBeep(ctx.currentTime + 0.18, 1174.66, 0.2); // D6
    } else if (type === "error") {
      // Deep warning buzz (low pitch / sawtooth)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 130; // C3
      osc.type = "sawtooth";
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "warning") {
      // Warm alert tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 440; // A4
      osc.type = "sine";
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch (error) {
    console.error("Audio playback error:", error);
  }
};

export default function QuickCheckIn() {
  // ** State
  const [identifier, setIdentifier] = useState("");
  const [mode, setMode] = useState<"CHECKIN" | "CHECKOUT">("CHECKIN");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    code: string;
    message: string;
    member?: {
      name: string;
      phone: string;
      subscriptionType: string;
      endDate?: Date | string;
    };
  } | null>(null);

  // ** Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ** Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !identifier.trim()) return;

    setLoading(true);
    setResult(null);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    try {
      const response = await quickCheckInAction(identifier, mode);
      
      // Determine response types and play sound
      if (response.success) {
        setResult({
          success: true,
          code: response.code || "SUCCESS",
          message: response.message,
          member: response.member,
        });
        playFeedbackSound("success");
      } else {
        setResult({
          success: false,
          code: response.code || "ERROR",
          message: response.message,
          member: response.member,
        });
        if (response.code === "ALREADY_CHECKED_IN" || response.code === "ALREADY_CHECKED_OUT") {
          playFeedbackSound("warning");
        } else {
          playFeedbackSound("error");
        }
      }
    } catch (error: any) {
      setResult({
        success: false,
        code: "UNEXPECTED_ERROR",
        message: error.message || "حدث خطأ غير متوقع",
      });
      playFeedbackSound("error");
    } finally {
      setLoading(false);
      setIdentifier("");
      
      // Keep focused!
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);

      // Auto-clear result after 6 seconds
      timerRef.current = setTimeout(() => {
        setResult(null);
      }, 6000);
    }
  };

  // ** Maintain focus
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Re-focus on window click for ease of scanning
    const handleGlobalClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="w-full flex flex-col gap-6 rounded-[32px] bg-white p-6 sm:p-8 border border-neutral-100 shadow-sm relative overflow-hidden">
      {/* Subtle brand glow decorator */}
      <div className="absolute -top-16 -left-16 w-36 h-36 bg-brand-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
        <div>
          <h2 className="text-xl font-black text-neutral-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-brand-500 rounded-full animate-pulse"></span>
            تسجيل الحضور والانصراف السريع
          </h2>
          <p className="text-neutral-500 text-xs mt-1 font-bold">
            اكتب رقم الموبايل الخاص بالعضو وسيقوم النظام بتأكيد الحالة فوراً.
          </p>
        </div>

        {/* Mode Selector Toggle (Matching the clean design) */}
        <div className="flex bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 self-start sm:self-center">
          <button
            type="button"
            onClick={() => {
              setMode("CHECKIN");
              setResult(null);
              inputRef.current?.focus();
            }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black transition-all duration-300 ${
              mode === "CHECKIN"
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            <ArrowDownLeft size={14} strokeWidth={2.5} />
            تسجيل دخول
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("CHECKOUT");
              setResult(null);
              inputRef.current?.focus();
            }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black transition-all duration-300 ${
              mode === "CHECKOUT"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            <ArrowUpRight size={14} strokeWidth={2.5} />
            تسجيل خروج
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            inputMode="tel"
            autoComplete="off"
            placeholder="اكتب رقم الموبايل الخاص بالعضو واضغط Enter..."
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            disabled={loading}
            className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-500 rounded-2xl py-4.5 pl-6 pr-12 text-lg text-neutral-900 font-extrabold placeholder-neutral-400 tracking-wide transition-all duration-300 focus:outline-none focus:bg-white focus:shadow-[0_0_15px_rgba(244,63,94,0.06)]"
          />
          <div className="absolute right-4 text-neutral-400">
            <Search size={22} />
          </div>
          <button
            type="submit"
            disabled={loading || !identifier.trim()}
            className="absolute left-3 bg-brand-500 hover:bg-brand-600 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-black px-6 py-2.5 rounded-xl text-sm transition-all duration-300 shadow-md shadow-brand-500/10"
          >
            {loading ? "جاري..." : "تأكيد"}
          </button>
        </div>
      </form>

      {/* Visual Feedback Display Banners (Clean Light Theme) */}
      {result && (
        <div
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl border transition-all duration-500 animate-in fade-in slide-in-from-top-4 relative z-10 ${
            result.success
              ? result.code === "SUCCESS_CHECKOUT"
                ? "bg-indigo-50/70 border-indigo-200 text-indigo-900"
                : "bg-emerald-50/70 border-emerald-200 text-emerald-900"
              : result.code === "ALREADY_CHECKED_IN" || result.code === "ALREADY_CHECKED_OUT"
              ? "bg-amber-50/70 border-amber-200 text-amber-900"
              : "bg-rose-50/70 border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="mt-1">
              {result.success ? (
                <CheckCircle2
                  className={result.code === "SUCCESS_CHECKOUT" ? "text-indigo-600" : "text-emerald-600"}
                  size={26}
                  strokeWidth={2.5}
                />
              ) : result.code === "ALREADY_CHECKED_IN" || result.code === "ALREADY_CHECKED_OUT" ? (
                <AlertTriangle className="text-amber-600" size={26} strokeWidth={2.5} />
              ) : (
                <XCircle className="text-rose-600" size={26} strokeWidth={2.5} />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-extrabold text-[16px] tracking-wide">
                {result.message}
              </h3>
              
              {result.member && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500 mt-1 font-bold">
                  <span>اسم العضو: <strong className="text-neutral-900 font-extrabold">{result.member.name}</strong></span>
                  <span className="border-r border-neutral-200 pr-4">رقم الهاتف: <strong className="text-neutral-900 font-extrabold">{result.member.phone}</strong></span>
                  <span className="border-r border-neutral-200 pr-4">الباقة: <strong className="text-neutral-900 font-extrabold">{result.member.subscriptionType || "بدون"}</strong></span>
                  {result.member.endDate && (
                    <span className="border-r border-neutral-200 pr-4">
                      تاريخ الانتهاء: {" "}
                      <strong className={`${result.code === "EXPIRED" ? "text-rose-600 font-black" : "text-neutral-900 font-extrabold"}`}>
                        {new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium" }).format(new Date(result.member.endDate))}
                      </strong>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Clear Button */}
          <button
            type="button"
            onClick={() => setResult(null)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-100 transition-all border border-neutral-200 text-neutral-600 hover:text-neutral-900 shadow-sm"
          >
            إغلاق التنبيه
          </button>
        </div>
      )}
    </section>
  );
}

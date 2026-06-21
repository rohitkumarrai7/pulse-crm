import { SignUp } from "@clerk/nextjs";
import { PulseLogo } from "@/components/logo";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-8">
        <PulseLogo size="lg" />
        <p className="text-slate-400 text-sm -mt-4">Intelligence-Driven Healthcare CRM</p>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-slate-800/80 border border-slate-700 shadow-2xl backdrop-blur-sm rounded-xl",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
              socialButtonsBlockButton: "bg-slate-700 border-slate-600 text-white hover:bg-slate-600",
              dividerLine: "bg-slate-700",
              dividerText: "text-slate-500",
              formFieldLabel: "text-slate-300",
              formFieldInput: "bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-teal-500",
              formButtonPrimary: "bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500",
              footerActionLink: "text-teal-400 hover:text-teal-300",
            },
          }}
        />
        <p className="text-xs text-slate-600">PulseCRM © 2026 · CEO.Agency · sp@ceo.agency</p>
      </div>
    </div>
  );
}

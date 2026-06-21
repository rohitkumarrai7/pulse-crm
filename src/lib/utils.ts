import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function getIntentLabel(score: number): "HOT" | "WARM" | "COLD" | "DEAD" {
  if (score >= 80) return "HOT";
  if (score >= 50) return "WARM";
  if (score >= 20) return "COLD";
  return "DEAD";
}

export function getIntentColor(score: number): string {
  if (score >= 80) return "text-rose-400 bg-rose-400/10";
  if (score >= 50) return "text-amber-400 bg-amber-400/10";
  if (score >= 20) return "text-blue-400 bg-blue-400/10";
  return "text-slate-400 bg-slate-400/10";
}

export function getSlaStatus(
  urgency: string,
  receivedAt: Date,
  completedAt?: Date | null
): { status: "OK" | "WARNING" | "BREACH"; remainingMinutes: number } {
  const limits: Record<string, number> = {
    EMERGENCY: 30,
    URGENT: 120,
    ROUTINE: 480,
  };
  const limitMin = limits[urgency] || 480;
  const now = completedAt ? new Date(completedAt) : new Date();
  const elapsedMin = (now.getTime() - new Date(receivedAt).getTime()) / 60000;
  const remaining = limitMin - elapsedMin;

  if (remaining < 0) return { status: "BREACH", remainingMinutes: remaining };
  if (remaining < limitMin * 0.2) return { status: "WARNING", remainingMinutes: remaining };
  return { status: "OK", remainingMinutes: remaining };
}

export function getAvailabilityColor(availability: string): string {
  const map: Record<string, string> = {
    AVAILABLE: "text-green-400",
    BUSY: "text-amber-400",
    OFFLINE: "text-slate-400",
    ON_LEAVE: "text-rose-400",
  };
  return map[availability] || "text-slate-400";
}

export function getBurnoutColor(risk: string): string {
  const map: Record<string, string> = {
    LOW: "text-green-400",
    MEDIUM: "text-amber-400",
    HIGH: "text-rose-400",
  };
  return map[risk] || "text-slate-400";
}

export function daysUntil(date: Date | string): number {
  const diff = new Date(date).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

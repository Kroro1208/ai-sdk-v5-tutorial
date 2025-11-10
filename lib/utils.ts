import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// 警告が出るなら以下コマンド実行
// pnpm install clsx tailwind-merge

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
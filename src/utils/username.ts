import { createHash } from "crypto";

export function buildUsernameFromWalletAddress(walletAddress?: string): string {
  if (!walletAddress) return "Anonymous";

  const hash = createHash("sha256").update(walletAddress).digest("hex");
  return `User_${hash.slice(0, 8)}`;
}

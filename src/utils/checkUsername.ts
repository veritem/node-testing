export function validUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,16}$/.test(username);
}

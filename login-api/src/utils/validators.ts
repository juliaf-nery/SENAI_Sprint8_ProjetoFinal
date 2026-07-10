/**
 * Valida se a string contém estritamente dígitos numéricos (Matrícula ou CPF).
 * Não permite letras, espaços, pontos, traços ou qualquer outro caractere.
 */
export function isNumericIdentifier(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^\d+$/.test(value.trim());
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

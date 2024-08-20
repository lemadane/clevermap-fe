export function responseErrorCheck(response: Response) {
  if (!response.ok) {
    throw new Error(`Status code ${response.status} - ${response.statusText}`);
  }
}

export function calculateAge(birthDate: string): number {
  const dob = new Date(birthDate);
  const today = new Date();
  const diff = today.getTime() - dob.getTime();
  const yearAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  return yearAge;
}

export function delay(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
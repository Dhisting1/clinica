export function validateCPF(cpf) {
  // Remove any non-digit characters from the CPF
  cpf = cpf.replace(/\D/g, "");

  // Check if the CPF has 11 digits
  if (cpf.length !== 11) {
    return false;
  }

  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Calculate the first verification digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) {
    digit = 0;
  }

  // Check the first verification digit
  if (parseInt(cpf.charAt(9)) !== digit) {
    return false;
  }

  // Calculate the second verification digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit > 9) {
    digit = 0;
  }

  // Check the second verification digit
  if (parseInt(cpf.charAt(10)) !== digit) {
    return false;
  }

  // CPF is valid
  return true;
}

export function removeText(remove) {
  return remove.replace(/[^0-9]/g, "");
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// ===================================================================
// Split the Bill — ანგარიშის გამოთვლები
// ===================================================================

const SERVICE_RATES = [10, 15, 20];

/**
 * ანგარიშის ქვეჯამი — ყველა კერძის ფასი × რაოდენობა
 */
export function calculateSubtotal(items) {
  console.log("📊 calculateSubtotal() — Entry", { itemCount: items.length });

  let subtotal = 0;

  /* 
 ძველი კოდი (ბაგი #1): ციკლი იწყებოდა 1-დან (let i = 1), 
რის გამოც პირველი ელემენტი (items[0]) გამოტოვებული იყო
   
  for (let i = 1; i < items.length; i++) {
    subtotal += items[i].price * items[i].quantity;
  }
  */
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].quantity;
  }

  console.log("📊 calculateSubtotal() — Exit", { subtotal });
  return subtotal;
}

/**
 * რაოდენობის გაზრდა — „+" ღილაკისთვის
 */
export function nextQuantity(value) {
  console.log("➕ nextQuantity() — Entry", { value });

  const result = Number(value) + 1;

  console.log("➕ nextQuantity() — Exit", { result });
  return result;
}

/**
 * რაოდენობის შემცირება — „−" ღილაკისთვის (მინიმუმ 1)
 */
export function prevQuantity(value) {
  console.log("➖ prevQuantity() — Entry", { value });

  const result = Number(value) - 1;

  console.log("➖ prevQuantity() — Exit", { result });
  return result < 1 ? 1 : result;
}

/**
 * მომსახურების საფასური (ჩაი) — ქვეჯამის პროცენტი
 */
export function calculateServiceFee(subtotal, servicePercent) {
  console.log("🧾 calculateServiceFee() — Entry", { subtotal, servicePercent });

  const fee = subtotal * (servicePercent / 100);

  /* 
  const roundedFee = parseInt(fee);
  */
  const roundedFee = Math.round(fee * 100) / 100;

  console.log("🧾 calculateServiceFee() — Exit", { fee, roundedFee });
  return roundedFee;
}

/**
 * საბოლოო ჯამი
 */
export function calculateTotal(subtotal, serviceFee) {
  console.log("💵 calculateTotal() — Entry", { subtotal, serviceFee });

  const total = subtotal + serviceFee;

  console.log("💵 calculateTotal() — Exit", { total });
  return total;
}

/**
 * თითო ადამიანზე გასაყოფი თანხა
 */
export function splitPerPerson(total, people) {
  console.log("👥 splitPerPerson() — Entry", { total, people });

  if (!people || people < 1) {
    return total;
  }

  const share = Math.round((total / people) * 100) / 100;

  console.log("👥 splitPerPerson() — Exit", { share });
  return share;
}

export { SERVICE_RATES };
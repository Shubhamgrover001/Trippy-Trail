'use strict';
// Server-side price calculation. All money is integer paise. The browser never decides the price.
const GROUP_MIN = 8;
const GROUP_PERCENT = 5;
const MAX_TRAVELLERS = 30;

function quote({ unitPaise, travellers }) {
  if (!Number.isInteger(unitPaise) || unitPaise <= 0) throw new RangeError('bad unit price');
  if (!Number.isInteger(travellers) || travellers < 1 || travellers > MAX_TRAVELLERS) throw new RangeError('bad travellers');
  const subtotal = unitPaise * travellers;
  const groupDiscount = travellers >= GROUP_MIN ? Math.round((subtotal * GROUP_PERCENT) / 100) : 0;
  return {
    subtotalPaise: subtotal,
    groupDiscountPaise: groupDiscount,
    totalPaise: subtotal - groupDiscount,
  };
}

module.exports = { quote, GROUP_MIN, GROUP_PERCENT, MAX_TRAVELLERS };

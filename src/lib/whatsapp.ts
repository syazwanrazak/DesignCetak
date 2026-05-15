import { Product, OrderFormValues, SelectedOptions } from '@/types';
import { WHATSAPP_NUMBER } from '@/constants';

export function buildWaMessage(
  product: Product,
  selectedOptions: SelectedOptions,
  form: OrderFormValues,
  uploadedFileName: string,
): string {
  let msg = `Assalamualaikum Design & Cetak! Saya ingin membuat order:\n\n`;
  msg += `📦 *Produk:* ${product.name}\n💰 *Harga:* ${product.price}\n`;

  const optEntries = Object.entries(selectedOptions);
  if (optEntries.length) {
    msg += `\n⚙️ *Pilihan:*\n`;
    for (const [k, v] of optEntries) msg += `  • ${k}: ${v}\n`;
  }

  msg += `\n👤 *Nama:* ${form.name || '-'}\n`;
  msg += `📞 *No. Tel:* ${form.phone || '-'}\n`;
  msg += `🔢 *Kuantiti:* ${form.quantity || '-'}\n`;
  msg += `📝 *Nota:* ${form.notes || '-'}\n`;

  if (uploadedFileName) msg += `📎 *Fail Design:* ${uploadedFileName} (akan dihantar berasingan)\n`;
  msg += `\nTerima kasih! 🙏`;

  return msg;
}

export function buildWaUrl(product: Product, selectedOptions: SelectedOptions, form: OrderFormValues, uploadedFileName: string): string {
  const msg = buildWaMessage(product, selectedOptions, form, uploadedFileName);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

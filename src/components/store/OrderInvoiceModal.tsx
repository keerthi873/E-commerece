import * as React from "react";
import { X, Printer, Download, ShieldCheck, CheckCircle2, FileText, Store } from "lucide-react";
import { Order, getGstBreakdown, getGstRate } from "./store-context";
import { inr } from "./catalog";

export function OrderInvoiceModal({
  order,
  open,
  onOpenChange,
}: {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!order || !open) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNo = `INV-2026-${order.id.replace(/[^0-9]/g, "").slice(0, 6) || "982410"}`;
  
  // Calculate Totals & Taxes
  let calculatedSubtotal = 0;
  let calculatedGst = 0;

  const itemsBreakdown = order.items.map((line, idx) => {
    const unitPrice = line.product.price;
    const qty = line.qty;
    const rate = getGstRate(unitPrice);
    const lineSubtotal = unitPrice * qty;
    const lineGst = Math.round((lineSubtotal * rate) / 100);
    const lineTotal = lineSubtotal + lineGst;

    calculatedSubtotal += lineSubtotal;
    calculatedGst += lineGst;

    return {
      sno: idx + 1,
      product: line.product,
      qty,
      unitPrice,
      hsnCode: `HSN-${8471 + idx * 13}`,
      rate,
      lineSubtotal,
      lineGst,
      lineTotal,
    };
  });

  const subtotal = order.subtotal || calculatedSubtotal;
  const gstTotal = order.gstTotal || calculatedGst;
  const cgst = Math.round(gstTotal / 2);
  const sgst = gstTotal - cgst;
  const deliveryFee = order.deliveryAddress ? 0 : 0;
  const discount = order.savings ? Math.min(order.savings, 200) : 0;
  const grandTotal = order.totalAmount || subtotal + gstTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto space-y-6 print:max-w-none print:shadow-none print:border-none print:p-0 print:m-0 print:bg-white print:text-black">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-border pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-2.5 rounded-xl bg-brand/10 text-brand">
              <FileText className="size-6" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Official Tax Invoice</h2>
              <p className="text-xs text-muted-foreground font-medium">Order #{order.id} • GST Compliant Bill Receipt</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-brand text-primary-foreground font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-brand-deep cursor-pointer shadow-md transition-all"
            >
              <Printer className="size-4" /> Print / Download PDF
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE TAX INVOICE CONTAINER */}
        <div className="p-6 border border-border/80 rounded-2xl bg-card space-y-6 print:border-none print:p-0">
          {/* Header & Seller/Buyer Grid */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-border pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-brand px-2.5 py-1 text-lg font-black italic tracking-tight text-primary-foreground">
                  Kartly
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  TAX INVOICE
                </span>
              </div>
              <p className="text-xs font-bold text-foreground pt-1">Kartly Retail Solutions Pvt Ltd</p>
              <p className="text-[11px] text-muted-foreground">
                GSTIN: <strong className="text-foreground">29AAACK1234F1Z9</strong> • PAN: AAACK1234F
              </p>
              <p className="text-[11px] text-muted-foreground">
                Reg Office: Outer Ring Road, Devarabeesanahalli, Bengaluru, KA - 560103
              </p>
              <p className="text-[11px] text-muted-foreground">Support: support@kartly.com | 1800-200-9999</p>
            </div>

            {/* Invoice Reference Metadata */}
            <div className="sm:text-right space-y-1 text-xs">
              <div className="inline-block bg-brand/10 border border-brand/20 px-3 py-1 rounded-lg text-brand font-bold">
                Invoice No: {invoiceNo}
              </div>
              <p className="text-muted-foreground pt-1">
                Order ID: <strong className="text-foreground">#{order.id}</strong>
              </p>
              <p className="text-muted-foreground">
                Order Date: <strong className="text-foreground">{order.date}</strong>
              </p>
              <p className="text-muted-foreground">
                Payment Status: <strong className="text-emerald-600">PAID ({order.paymentMethod || "UPI"})</strong>
              </p>
            </div>
          </div>

          {/* Billed To / Shipping Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-muted/40 border border-border/60 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand block">
                Billed To & Shipping Address
              </span>
              <p className="font-bold text-foreground text-sm">{order.deliveryAddress?.fullName || "Customer"}</p>
              <p className="text-muted-foreground">{order.deliveryAddress?.addressLine}</p>
              <p className="text-muted-foreground">
                {order.deliveryAddress?.city}, {order.deliveryAddress?.state} — {order.deliveryAddress?.pincode}
              </p>
              <p className="text-muted-foreground font-semibold">Phone: +91 {order.deliveryAddress?.phone}</p>
            </div>

            <div className="space-y-1 sm:border-l sm:border-border sm:pl-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand block">
                Supplier & Order Status
              </span>
              <p className="font-bold text-foreground">Kartly Verified Fulfilment Hub</p>
              <p className="text-muted-foreground">Dispatch Depot: KA-BLR-LOGISTICS-04</p>
              <p className="text-muted-foreground">
                Status: <strong className="text-brand">{order.status || "Ordered"}</strong>
              </p>
              <p className="text-muted-foreground">
                Expected Delivery: <strong className="text-foreground">{order.estimatedDelivery}</strong>
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto border border-border/80 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/80 text-foreground border-b border-border font-bold uppercase text-[10px]">
                  <th className="p-3 w-10 text-center">#</th>
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">HSN</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-center">GST</th>
                  <th className="p-3 text-right">GST Amount</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-medium">
                {itemsBreakdown.map((item) => (
                  <tr key={item.product.id} className="hover:bg-muted/30">
                    <td className="p-3 text-center font-bold text-muted-foreground">{item.sno}</td>
                    <td className="p-3 font-bold text-foreground">
                      {item.product.title}
                      <span className="block text-[10px] text-muted-foreground font-normal">
                        Brand: {item.product.brand} | Category: {item.product.category}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono text-[11px] text-muted-foreground">{item.hsnCode}</td>
                    <td className="p-3 text-center font-bold text-foreground">{item.qty}</td>
                    <td className="p-3 text-right">{inr(item.unitPrice)}</td>
                    <td className="p-3 text-center font-bold text-brand">{item.rate}%</td>
                    <td className="p-3 text-right text-muted-foreground">{inr(item.lineGst)}</td>
                    <td className="p-3 text-right font-bold text-foreground">{inr(item.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Calculation Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2 text-xs">
              <span className="font-bold text-foreground block uppercase text-[10px] tracking-wider">
                Tax Summary Breakdown
              </span>
              <div className="flex justify-between text-muted-foreground">
                <span>Central GST (CGST)</span>
                <span className="font-semibold text-foreground">{inr(cgst)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>State GST (SGST)</span>
                <span className="font-semibold text-foreground">{inr(sgst)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground border-t border-border pt-1 font-bold">
                <span className="text-foreground">Total GST Liability</span>
                <span className="text-brand">{inr(gstTotal)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground pt-1">
                *This invoice is computer generated and valid without signature under Information Technology Act, 2000.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-brand/40 bg-brand/5 space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal (Base Price)</span>
                <span className="font-bold text-foreground">{inr(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Total GST Amount</span>
                <span className="font-bold text-brand">+{inr(gstTotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery / Shipping Fee</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount</span>
                  <span>-{inr(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-foreground border-t border-brand/30 pt-2">
                <span>Grand Total</span>
                <span className="text-brand">{inr(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

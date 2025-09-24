import React from 'react';
import { ShieldCheck } from 'lucide-react';

// 1. Mendefinisikan tipe untuk objek metode pembayaran
interface PaymentMethod {
  name: string;
}

// 2. Memberikan tipe pada array 'paymentMethods'
const paymentMethods: PaymentMethod[] = [
  { name: 'GoPay' },
  { name: 'Mandiri' },
  { name: 'BRI' },
  { name: 'BNI' },
  { name: 'CIMB Niaga' },
  { name: 'Permata' },
  { name: 'Danamon' },
];

// 3. Mendefinisikan komponen sebagai React.FC (Functional Component)
const PaymentMethodsInfo: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Metode Pembayaran</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Login atau daftar untuk menyimpan metode pembayaran pilihan Anda.
        </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {paymentMethods.map(method => (
          <div 
            key={method.name} 
            className="flex items-center justify-center p-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 text-center h-10"
          >
            {method.name}
          </div>
        ))}
      </div>

       <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gray-400" />
          <p>Transaksi aman dan terenkripsi oleh penyedia pembayaran.</p>
      </div>
    </div>
  );
};

export default PaymentMethodsInfo;
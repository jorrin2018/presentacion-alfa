import React from 'react';

const formatCurrency = (value: number | null) => {
  if (value === null || isNaN(value)) return <span className="text-gray-400">-</span>;
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(value);
};

const machinery = [
    { ehi: 'Cortadora de varilla Ofmer C56', ehiPrice: 202500, cmh: null, cmhPrice: null, alfacyh: 'Cortadora de varilla Simpedil C54', alfacyhPrice: 195000 },
    { ehi: 'Dobladora de varilla Ofmer P56', ehiPrice: 212500, cmh: null, cmhPrice: null, alfacyh: 'Dobladora de varilla Simpedil P54', alfacyhPrice: 197500 },
    { ehi: 'Roscadora Roller', ehiPrice: 295500, cmh: null, cmhPrice: null, alfacyh: 'Roscadora Roller', alfacyhPrice: 290000 },
    { ehi: 'Sierra Cinta', ehiPrice: 71000, cmh: null, cmhPrice: null, alfacyh: 'Sierra Cinta', alfacyhPrice: 70000 },
];

const connectors = [
  { ehi: 'Conector Roller #10 (acero 45C)', ehiPrice: 94.34, cmh: 'Conector Roller #10 (acero A1045)', cmhPrice: 115.00, alfacyh: 'Conector Roller #10 (acero 40CR)', alfacyhPrice: 100.00 },
  { ehi: 'Conector Roller #12 (acero 45C)', ehiPrice: 104.94, cmh: 'Conector Roller #12 (acero A1045)', cmhPrice: 125.00, alfacyh: 'Conector Roller #12 (acero 40CR)', alfacyhPrice: 110.00 },
];

const consumables = [
  { ehi: 'Sierra Cinta refacción', ehiPrice: 1600, cmh: null, cmhPrice: null, alfacyh: 'Sierra Cinta refacción', alfacyhPrice: 1650 },
  { ehi: 'Soluble para roscadora', ehiPrice: 220, cmh: null, cmhPrice: null, alfacyh: 'Soluble para roscadora', alfacyhPrice: 250 },
  { ehi: 'Juego de buriles para roscadora', ehiPrice: 2500, cmh: null, cmhPrice: null, alfacyh: 'Juego de buriles para roscadora', alfacyhPrice: 3000 },
  { ehi: 'Juego de cuchillas', ehiPrice: 3400, cmh: null, cmhPrice: null, alfacyh: 'Juego de cuchillas', alfacyhPrice: 5300 },
  { ehi: 'Juego de rodillos', ehiPrice: 6300, cmh: null, cmhPrice: null, alfacyh: 'Juego de rodillos', alfacyhPrice: 6300 },
  { ehi: null, ehiPrice: null, cmh: null, cmhPrice: null, alfacyh: 'Juego de tornillos para cuchillas de cortadora', alfacyhPrice: 80 },
  { ehi: null, ehiPrice: null, cmh: null, cmhPrice: null, alfacyh: 'Tornillo calibrador para navaja o buril', alfacyhPrice: 52 },
  { ehi: null, ehiPrice: null, cmh: null, cmhPrice: null, alfacyh: 'Tornillo presor para navaja o buril', alfacyhPrice: 45 },
];

const TableSection = ({ title, data }: { title: string, data: any[] }) => (
  <div className="mb-4">
    <h3 className="text-lg font-bold text-white bg-[#f36e21] p-2 rounded-t-lg">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-2 py-2 border">EHI</th>
            <th scope="col" className="px-2 py-2 border">P.U EHI</th>
            <th scope="col" className="px-2 py-2 border">CMH</th>
            <th scope="col" className="px-2 py-2 border">P.U CMH</th>
            <th scope="col" className="px-2 py-2 border bg-yellow-200">ALFACYH</th>
            <th scope="col" className="px-2 py-2 border bg-yellow-200">P.U ALFACYH</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-2 py-2 border">{row.ehi || '-'}</td>
              <td className="px-2 py-2 border text-right">{formatCurrency(row.ehiPrice)}</td>
              <td className="px-2 py-2 border">{row.cmh || '-'}</td>
              <td className="px-2 py-2 border text-right">{formatCurrency(row.cmhPrice)}</td>
              <td className="px-2 py-2 border font-semibold bg-yellow-50">{row.alfacyh || '-'}</td>
              <td className="px-2 py-2 border text-right font-semibold bg-yellow-50">{formatCurrency(row.alfacyhPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function PriceTable() {
  return (
    <div className="text-xs scale-90 origin-top">
      <TableSection title="MAQUINARIA" data={machinery} />
      <TableSection title="CONECTORES" data={connectors} />
      <TableSection title="CONSUMBLES" data={consumables} />
    </div>
  );
}

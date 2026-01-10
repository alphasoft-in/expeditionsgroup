import React, { useMemo } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

export default function DashboardCharts({ operations }) {
    // --- 1. Process Data for Income/Trends ---
    const trendData = useMemo(() => {
        // Only include APPROVED transactions for "Income"
        const validOps = operations.filter(op => op.status === 'approved');

        // Group by date (YYYY-MM-DD) to ensure unique days across years
        const grouped = {};

        // Sort opertions by date ascending
        const sortedOps = [...validOps].sort((a, b) => new Date(a.date) - new Date(b.date));

        sortedOps.forEach(op => {
            // Use ISO string YYYY-MM-DD as key for unique sorting
            const dateKey = new Date(op.date).toISOString().split('T')[0];
            // Display label (e.g. 05 Ene)
            const displayLabel = new Date(op.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });

            if (!grouped[dateKey]) {
                grouped[dateKey] = {
                    name: displayLabel, // x-axis label
                    date: dateKey,      // sorting key
                    PEN: 0,
                    USD: 0
                };
            }

            // Ensure amount is a number
            let amount = parseFloat(op.amount);
            if (isNaN(amount)) amount = 0;

            if (op.currency === 'Dólares (USD)') {
                grouped[dateKey].USD += amount;
            } else {
                grouped[dateKey].PEN += amount;
            }
        });

        return Object.values(grouped);
    }, [operations]);

    // --- 2. Process Data for Status ---
    const statusData = useMemo(() => {
        const counts = { pending: 0, approved: 0, rejected: 0 };
        operations.forEach(op => {
            if (counts[op.status] !== undefined) {
                counts[op.status]++;
            } else {
                // Handle unexpected statuses if any
                counts[op.status] = (counts[op.status] || 0) + 1;
            }
        });

        return [
            { name: 'Aprobado', value: counts.approved, color: '#059669' }, // emerald-600
            { name: 'Pendiente', value: counts.pending, color: '#d97706' }, // amber-600
            { name: 'Rechazado', value: counts.rejected, color: '#dc2626' }, // red-600
        ].filter(item => item.value > 0);
    }, [operations]);

    // --- 3. Process Data for Service Type ---
    const serviceData = useMemo(() => {
        const counts = {};
        operations.forEach(op => {
            let type = op.serviceType || 'Otros';

            // Normalize labels
            const lowerType = type.toLowerCase();
            if (lowerType.includes('escolar')) {
                type = 'Turismo Escolar';
            } else if (lowerType.includes('paquete')) {
                type = 'Paquetes Turísticos';
            }

            counts[type] = (counts[type] || 0) + 1;
        });

        const COLORS = ['#0e2a98', '#7c3aed', '#db2777', '#ea580c']; // Blue, Violet, Pink, Orange

        return Object.keys(counts).map((key, index) => ({
            name: key,
            value: counts[key],
            color: COLORS[index % COLORS.length]
        }));
    }, [operations]);

    // --- 4. Process Statistics for Cards ---
    const stats = useMemo(() => {
        const approvedOps = operations.filter(op => op.status === 'approved');

        const incomePEN = approvedOps
            .filter(op => op.currency !== 'Dólares (USD)')
            .reduce((acc, op) => acc + (parseFloat(op.amount) || 0), 0);

        const incomeUSD = approvedOps
            .filter(op => op.currency === 'Dólares (USD)')
            .reduce((acc, op) => acc + (parseFloat(op.amount) || 0), 0);

        return {
            totalRegistrations: operations.length,
            incomePEN: incomePEN.toLocaleString('es-PE', { minimumFractionDigits: 2 }),
            incomeUSD: incomeUSD.toLocaleString('en-US', { minimumFractionDigits: 2 }),
            approvedCount: approvedOps.length
        };
    }, [operations]);

    return (
        <div className="space-y-8 mb-8">
            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Registros Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Registros</p>
                        <h4 className="text-2xl font-black text-slate-800">{stats.totalRegistrations}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Operaciones procesadas</p>
                    </div>
                </div>

                {/* Ingresos Soles Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1c-1.11 0-2.08-.402-2.599-1M12 8V7m0 11v1m0-1c1.11 0 2.08.402 2.599-1M12 18V7" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Ingresos (Soles)</p>
                        <h4 className="text-2xl font-black text-slate-800">S/ {stats.incomePEN}</h4>
                        <p className="text-[10px] text-emerald-500 font-bold mt-1">{stats.approvedCount} Aprobadas</p>
                    </div>
                </div>

                {/* Ingresos Dólares Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1c-1.11 0-2.08-.402-2.599-1M12 8V7m0 11v1m0-1c1.11 0 2.08.402 2.599-1M12 18V7" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Ingresos (USD)</p>
                        <h4 className="text-2xl font-black text-slate-800">$ {stats.incomeUSD}</h4>
                        <p className="text-[10px] text-indigo-500 font-bold mt-1">Moneda Extranjera</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Chart 1: Income Trends */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm [&_.recharts-wrapper]:!outline-none [&_.recharts-surface]:!outline-none [&_:focus]:!outline-none">
                    <h3 className="text-slate-700 font-bold text-lg mb-4">Tendencia de Ingresos</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUSD" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0e2a98" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#0e2a98" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPEN" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Area type="monotone" dataKey="USD" name="Dólares (USD)" stroke="#0e2a98" fillOpacity={1} fill="url(#colorUSD)" />
                                <Area type="monotone" dataKey="PEN" name="Soles (PEN)" stroke="#10b981" fillOpacity={1} fill="url(#colorPEN)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Status Distribution */}
                <div className="col-span-1 bg-white p-6 rounded-2xl shadow-sm [&_.recharts-wrapper]:!outline-none [&_.recharts-surface]:!outline-none [&_:focus]:!outline-none">
                    <h3 className="text-slate-700 font-bold text-lg mb-4">Estado de Solicitudes</h3>
                    <div className="h-[250px] w-full flex items-center justify-center">
                        {statusData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                                    <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-slate-400 text-sm">No hay datos</p>
                        )}
                    </div>
                </div>

                {/* Chart 3: Service Type Distribution */}
                <div className="col-span-1 bg-white p-6 rounded-2xl shadow-sm [&_.recharts-wrapper]:!outline-none [&_.recharts-surface]:!outline-none [&_:focus]:!outline-none">
                    <h3 className="text-slate-700 font-bold text-lg mb-4">Tipos de Servicio</h3>
                    <div className="h-[250px] w-full flex items-center justify-center">
                        {serviceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={serviceData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {serviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                                    <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-slate-400 text-sm">No hay datos</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

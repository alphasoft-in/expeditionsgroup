import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx-js-style';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
    const [operations, setOperations] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOperations();
    }, []);

    const fetchOperations = async () => {
        try {
            // Check session
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                // Fallback to local check if needed, or redirect
                if (!localStorage.getItem('isAuthenticated')) {
                    window.location.href = '/login';
                    return;
                }
            }

            // Set User info from Supabase or Local
            if (session?.user) {
                setUser({
                    email: session.user.email,
                    name: session.user.user_metadata?.name || 'Usuario'
                });
            } else {
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                setUser(userData);
            }

            // Fetch Data
            const { data, error } = await supabase
                .from('operations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Transform snake_case to camelCase for UI compatibility
            const transformedOps = (data || []).map(op => ({
                id: op.id,
                date: op.created_at,
                status: op.status,
                serviceType: op.service_type,
                studentName: op.student_name,
                studentDoc: op.student_doc,
                clientName: op.client_name,
                clientDoc: op.client_doc,
                amount: op.amount,
                currency: op.currency,
                operationNumber: op.operation_number,
                bank: op.bank,
                voucherUrl: op.voucher_url
            }));

            setOperations(transformedOps);
        } catch (error) {
            console.error('Error loading dashboard:', error);
            // Optional: fallback to localStorage if offline? For now just log.
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const handleStatusChange = async (id, newStatus) => {
        // Optimistic Update
        setOperations(prev => prev.map(op =>
            op.id === id ? { ...op, status: newStatus } : op
        ));

        try {
            const { error } = await supabase
                .from('operations')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error al actualizar estado');
            // Revert on error could go here
            fetchOperations();
        }
    };

    const exportToExcel = () => {
        // 1. Prepare Data
        const data = operations.map(op => ({
            Fecha: new Date(op.date).toLocaleDateString() + ' ' + new Date(op.date).toLocaleTimeString(),
            Servicio: op.serviceType,
            Cliente: op.studentName || op.clientName || 'N/A',
            Documento: op.studentDoc || op.clientDoc || 'N/A',
            Moneda: op.currency === 'Dólares (USD)' ? 'USD' : 'PEN',
            Monto: Number(op.amount),
            Estado: op.status === 'pending' ? 'Pendiente' : op.status === 'approved' ? 'Aprobado' : 'Rechazado',
            Operacion: op.operationNumber,
            Banco: op.bank
        }));

        // 2. Create Workbook and Worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        // 3. Define Styles
        const headerStyle = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "0081C9" } }, // Secondary Blue
            alignment: { horizontal: "center" }
        };

        const cellStyle = {
            alignment: { horizontal: "left" }
        };

        const statusStyles = {
            'Pendiente': { font: { color: { rgb: "B45309" } }, fill: { fgColor: { rgb: "FEF3C7" } } }, // Amber
            'Aprobado': { font: { color: { rgb: "047857" } }, fill: { fgColor: { rgb: "D1FAE5" } } }, // Emerald
            'Rechazado': { font: { color: { rgb: "B91C1C" } }, fill: { fgColor: { rgb: "FEE2E2" } } } // Red
        };

        // 4. Apply Styles
        // Headers (Row 0 - A1:I1)
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const address = XLSX.utils.encode_cell({ r: 0, c: C });
            if (!worksheet[address]) continue;
            worksheet[address].s = headerStyle;
        }

        // Data Rows
        data.forEach((row, index) => {
            const rowIdx = index + 1; // 1-based index (0 is header)

            // Apply Status Color (Column G is "Estado" -> Index 6)
            const statusCell = XLSX.utils.encode_cell({ r: rowIdx, c: 6 });
            if (worksheet[statusCell]) {
                worksheet[statusCell].s = statusStyles[row.Estado] || cellStyle;
            }

            // Format Amount (Column F -> Index 5)
            const amountCell = XLSX.utils.encode_cell({ r: rowIdx, c: 5 });
            if (worksheet[amountCell]) {
                worksheet[amountCell].t = 'n';
                worksheet[amountCell].z = '#,##0.00';
            }
        });

        // 5. Set Column Widths
        worksheet['!cols'] = [
            { wch: 25 }, // Fecha
            { wch: 20 }, // Servicio
            { wch: 40 }, // Cliente
            { wch: 20 }, // Documento
            { wch: 12 }, // Moneda
            { wch: 20 }, // Monto
            { wch: 20 }, // Estado
            { wch: 20 }, // Operacion
            { wch: 20 }  // Banco
        ];

        XLSX.utils.book_append_sheet(workbook, worksheet, "Operaciones");
        XLSX.writeFile(workbook, `reporte_expeditions_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(18);
        doc.text("Reporte de Operaciones - Expeditions Group", 14, 22);

        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generado por: ${user?.name || 'Usuario'}`, 14, 30);
        doc.text(`Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 36);

        // Table
        const tableColumn = ["Fecha", "Servicio", "Cliente", "Monto", "Estado", "Op. Bancaria"];
        const tableRows = [];

        operations.forEach(op => {
            const opData = [
                new Date(op.date).toLocaleDateString(),
                op.serviceType,
                op.studentName || op.clientName || 'N/A',
                `${op.currency === 'Dólares (USD)' ? '$' : 'S/'} ${op.amount}`,
                op.status === 'pending' ? 'Pendiente' : op.status === 'approved' ? 'Aprobado' : 'Rechazado',
                op.operationNumber || '-'
            ];
            tableRows.push(opData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 44,
            theme: 'grid',
            headStyles: { fillColor: [0, 129, 201] }, // Secondary color #0081C9
            styles: { fontSize: 9 }
        });

        doc.save(`reporte_expeditions_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Topbar */}
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-800 tracking-wide">
                            Expeditions <span className="text-secondary">Dashboard</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-600 hidden md:block">
                            Hola, {user?.name || 'Usuario'}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Total Operaciones</h3>
                        <p className="text-3xl font-bold text-slate-800">{operations.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Pendientes</h3>
                        <p className="text-3xl font-bold text-secondary">{operations.filter(op => op.status === 'pending').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Aprobados</h3>
                        <p className="text-3xl font-bold text-emerald-600">{operations.filter(op => op.status === 'approved').length}</p>
                    </div>
                </div>

                {/* Operations Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Operaciones Recientes</h2>
                        <div className="flex gap-2">
                            {operations.length > 0 && (
                                <>
                                    <button
                                        onClick={exportToExcel}
                                        className="px-4 py-2 text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                                    >
                                        Exportar Excel
                                    </button>
                                    <button
                                        onClick={exportToPDF}
                                        className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                                    >
                                        Exportar PDF
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-xs sm:text-sm font-semibold border-b border-slate-200">
                                    <th className="px-4 sm:px-6 py-4">Fecha</th>
                                    <th className="px-4 sm:px-6 py-4 hidden md:table-cell">Servicio</th>
                                    <th className="px-4 sm:px-6 py-4">Cliente / Alumno</th>
                                    <th className="px-4 sm:px-6 py-4">Monto</th>
                                    <th className="px-4 sm:px-6 py-4">Estado</th>
                                    <th className="px-4 sm:px-6 py-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs sm:text-sm">
                                {operations.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                                            No hay operaciones registradas aún.
                                        </td>
                                    </tr>
                                ) : (
                                    operations.map((op) => (
                                        <tr key={op.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-4 sm:px-6 py-4 text-slate-600">
                                                <span className="whitespace-nowrap">{new Date(op.date).toLocaleDateString()}</span>
                                                <span className="text-[10px] text-slate-400 block md:hidden">{new Date(op.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                <span className="text-xs text-slate-400 hidden md:block">{new Date(op.date).toLocaleTimeString()}</span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold capitalize ${op.serviceType === 'escolar' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                                    {op.serviceType}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 font-medium text-slate-800">
                                                <div className="truncate max-w-[120px] sm:max-w-none">
                                                    {op.studentName || op.clientName || 'N/A'}
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-normal">
                                                    {op.studentDoc || op.clientDoc}
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 font-bold text-slate-700 whitespace-nowrap">
                                                {op.currency === 'Dólares (USD)' ? '$' : 'S/'} {op.amount}
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="relative inline-block">
                                                    <select
                                                        value={op.status}
                                                        onChange={(e) => handleStatusChange(op.id, e.target.value)}
                                                        className={`appearance-none pl-2 sm:pl-3 pr-6 sm:pr-8 py-1 rounded-full text-[10px] sm:text-xs font-bold cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 transition-all
                                                            ${op.status === 'pending' ? 'bg-amber-100 text-amber-700 focus:ring-amber-500' : ''}
                                                            ${op.status === 'approved' ? 'bg-emerald-100 text-emerald-700 focus:ring-emerald-500' : ''}
                                                            ${op.status === 'rejected' ? 'bg-red-100 text-red-700 focus:ring-red-500' : ''}
                                                        `}
                                                    >
                                                        <option value="pending">Pend.</option>
                                                        <option value="approved">Apro.</option>
                                                        <option value="rejected">Rech.</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center px-1.5 sm:px-2 pointer-events-none text-current opacity-60">
                                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                {op.voucherUrl ? (
                                                    <a href={op.voucherUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 font-bold text-xs sm:text-sm transition-colors">
                                                        Ver
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-400 italic text-[10px]">Sin voucher</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination or view more could go here */}
                </motion.div>
            </main>
        </div>
    );
}

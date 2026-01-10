import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx-js-style';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '../lib/supabase';
import DashboardCharts from './DashboardCharts';



export default function Dashboard({ logo }) {
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
                    name: session.user.user_metadata?.name || 'Administrador'
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
                clientPhone: op.client_phone,
                clientEmail: op.client_email,
                parentPhone: op.parent_phone,
                parentEmail: op.parent_email,
                tripDestination: op.trip_destination,
                tripDate: op.trip_date,
                adultsCount: op.adults_count,
                childrenCount: op.children_count,
                amount: op.amount,
                currency: op.currency,
                operationNumber: op.operation_number,
                bank: op.bank,
                voucherUrl: op.voucher_url,
                groupName: op.group_name,
                paymentMethod: op.payment_method,
                paymentHolderName: op.payment_holder_name
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

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedOp, setSelectedOp] = useState({});
    const [editServiceType, setEditServiceType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // all, pending, approved, rejected
    const [serviceFilter, setServiceFilter] = useState('all'); // all, escolar, paquete
    const [groupFilter, setGroupFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, serviceFilter, groupFilter]);

    // Get unique groups
    const uniqueGroups = [...new Set(operations.map(op => op.groupName).filter(Boolean))].sort();

    const handleViewDetails = (op) => {
        setSelectedOp(op);
        setViewModalOpen(true);
    };

    const handleEdit = (op) => {
        setSelectedOp(op);
        setEditServiceType(op.serviceType || '');
        setEditModalOpen(true);
    };

    const handleDeleteOperation = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta operación? Esta acción no se puede deshacer.')) {
            try {
                const { error } = await supabase
                    .from('operations')
                    .delete()
                    .eq('id', id);

                if (error) throw error;

                // Refresh data
                fetchOperations();
            } catch (error) {
                console.error('Error deleting operation:', error);
                alert('Error al eliminar la operación');
            }
        }
    };

    const handleSaveEdit = async (updatedOp) => {
        if (!window.confirm('¿Estás seguro de que deseas guardar los cambios realizados en esta operación?')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('operations')
                .update({
                    service_type: updatedOp.serviceType,
                    // Turismo Escolar fields
                    student_name: updatedOp.studentName,
                    student_doc: updatedOp.studentDoc,
                    group_name: updatedOp.groupName,
                    parent_phone: updatedOp.parentPhone,
                    parent_email: updatedOp.parentEmail,
                    // Paquetes Turísticos fields
                    client_name: updatedOp.clientName,
                    client_doc: updatedOp.clientDoc,
                    client_phone: updatedOp.clientPhone,
                    client_email: updatedOp.clientEmail,
                    trip_destination: updatedOp.tripDestination,
                    trip_date: updatedOp.tripDate,
                    adults_count: updatedOp.adultsCount,
                    children_count: updatedOp.childrenCount,
                    amount: updatedOp.amount,
                    currency: updatedOp.currency,
                    operation_number: updatedOp.operationNumber,
                    payment_method: updatedOp.paymentMethod,
                    bank: updatedOp.bank,
                    payment_holder_name: updatedOp.paymentHolderName
                })
                .eq('id', updatedOp.id);

            if (error) throw error;

            alert('¡Cambios guardados exitosamente!');
            setOperations(prev => prev.map(op => op.id === updatedOp.id ? updatedOp : op));
            setEditModalOpen(false);
        } catch (error) {
            console.error('Error saving edit:', error);
            alert('Error al guardar cambios');
            fetchOperations();
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta operación? Esta acción no se puede deshacer.')) return;

        // Optimistic delete
        setOperations(prev => prev.filter(op => op.id !== id));

        try {
            const { error } = await supabase
                .from('operations')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Error al eliminar operación');
            fetchOperations(); // Revert
        }
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

    const filteredOperations = operations.filter(op => {
        const matchesSearch = (
            (op.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (op.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (op.clientDoc || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (op.studentDoc || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(op.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(op.operationNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesStatus = statusFilter === 'all' || op.status === statusFilter;

        const type = (op.serviceType || '').toLowerCase();
        const isSchool = type.includes('escolar');
        const matchesService = serviceFilter === 'all' || (serviceFilter === 'escolar' ? isSchool : !isSchool);

        const matchesGroup = groupFilter === 'all' || op.groupName === groupFilter;

        return matchesSearch && matchesStatus && matchesService && matchesGroup;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOperations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOperations.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        // 1. Prepare Data
        const data = filteredOperations.map(op => {
            const type = (op.serviceType || '').toLowerCase();
            const serviceLabel = type.includes('escolar') ? 'Turismo Escolar' : 'Paquetes Turísticos';

            return {
                Fecha: new Date(op.date).toLocaleDateString() + ' ' + new Date(op.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                Servicio: serviceLabel,
                Grupo: op.groupName || '-',
                Cliente: op.studentName || op.clientName || 'N/A',
                Documento: op.studentDoc || op.clientDoc || 'N/A',
                Moneda: op.currency === 'Dólares (USD)' ? 'USD' : 'PEN',
                Monto: Number(op.amount),
                Estado: op.status === 'pending' ? 'Pendiente' : op.status === 'approved' ? 'Aprobado' : 'Rechazado',
                MetodoPago: op.paymentMethod || '-',
                Titular: op.paymentHolderName || '-',
                Operacion: op.operationNumber,
                Banco: op.bank
            };
        });

        // 2. Create Workbook and Worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        // 3. Define Styles
        const headerStyle = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "0e2a98" } }, // Corporate Blue
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

            // Format Status (Column H -> Index 7)
            const statusCell = XLSX.utils.encode_cell({ r: rowIdx, c: 7 });
            if (worksheet[statusCell]) {
                worksheet[statusCell].s = statusStyles[row.Estado] || cellStyle;
            }

            // Format Amount (Column G -> Index 6)
            const amountCell = XLSX.utils.encode_cell({ r: rowIdx, c: 6 });
            if (worksheet[amountCell]) {
                worksheet[amountCell].t = 'n';
                worksheet[amountCell].z = '#,##0.00';
            }
        });

        // 5. Set Column Widths
        worksheet['!cols'] = [
            { wch: 25 }, // Fecha
            { wch: 20 }, // Servicio
            { wch: 25 }, // Grupo
            { wch: 50 }, // Cliente
            { wch: 20 }, // Documento
            { wch: 12 }, // Moneda
            { wch: 15 }, // Monto
            { wch: 20 }, // Estado
            { wch: 25 }, // MetodoPago
            { wch: 40 }, // Titular
            { wch: 30 }, // Operacion
            { wch: 25 }  // Banco
        ];

        XLSX.utils.book_append_sheet(workbook, worksheet, "Operaciones");
        XLSX.writeFile(workbook, `reporte_expeditions_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF({ orientation: "landscape" });
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header Background / Border - Corporate Style
        doc.setDrawColor(14, 42, 152); // #0e2a98
        doc.setLineWidth(0.4);
        doc.line(14, 42, pageWidth - 14, 42);

        // Logo context - moved to the RIGHT side and refined
        try {
            // Reduced and centered vertically relative to the title
            doc.addImage(logo, 'PNG', pageWidth - 46, 20, 32, 10);
        } catch (e) {
            console.error("Could not add logo to PDF:", e);
        }

        // Title - Left Aligned
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(14, 42, 152);
        doc.text("REPORTE DE OPERACIONES", 14, 22);

        // Metadata - Left side stacked
        doc.setFontSize(7);
        doc.setTextColor(100);
        doc.setFont("helvetica", "normal");
        doc.text(`GENERADO POR: ${user?.name || 'ADMINISTRADOR'}`, 14, 28);
        doc.text(`FECHA REPORTE: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 14, 32);

        const statusLabel = statusFilter === 'all' ? 'Todos' : statusFilter.toUpperCase();
        const serviceLabel = serviceFilter === 'all' ? 'Todos' : serviceFilter.toUpperCase();
        const groupLabel = groupFilter === 'all' ? 'Todos' : groupFilter;
        const searchLabel = searchTerm ? ` | Búsqueda: "${searchTerm}"` : '';

        doc.text(`FILTROS: Estado: ${statusLabel} | Servicio: ${serviceLabel} | Grupo: ${groupLabel}${searchLabel}`, 14, 36);

        // Table
        const tableColumn = ["Fecha/Hora", "Servicio", "Grupo", "Cliente", "Documento", "Monto", "Estado", "Banco", "Pago", "Titular", "Op. Bancaria"];
        const tableRows = [];

        filteredOperations.forEach(op => {
            const type = (op.serviceType || '').toLowerCase();
            const serviceLabel = type.includes('escolar') ? 'Turismo Escolar' : 'Paquetes Turísticos';

            const opData = [
                `${new Date(op.date).toLocaleDateString()} ${new Date(op.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                serviceLabel,
                op.groupName || '-',
                op.studentName || op.clientName || 'N/A',
                op.studentDoc || op.clientDoc || 'N/A',
                `${op.currency === 'Dólares (USD)' ? '$' : 'S/'} ${op.amount}`,
                op.status === 'pending' ? 'Pendiente' : op.status === 'approved' ? 'Aprobado' : 'Rechazado',
                op.bank || '-',
                op.paymentMethod || '-',
                op.paymentHolderName || '-',
                op.operationNumber || '-'
            ];
            tableRows.push(opData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 46,
            theme: 'grid',
            headStyles: {
                fillColor: [14, 42, 152],
                fontSize: 8,
                halign: 'center'
            },
            columnStyles: {
                0: { cellWidth: 25 }, // Fecha/Hora
                5: { halign: 'right' }, // Monto
                10: { fontSize: 7 } // Titular small
            },
            styles: {
                fontSize: 8,
                cellPadding: 2
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252] // Slate-50
            }
        });

        doc.save(`reporte_expeditions_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Topbar */}
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img
                            src={logo}
                            alt="Expeditions Group Logo"
                            className="h-10 w-auto object-contain"
                        />
                        <div className="hidden sm:block h-6 w-[1px] bg-slate-200"></div>
                        <span className="text-lg font-bold text-slate-800 tracking-tight hidden sm:block">
                            Dashboard
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] leading-none mb-1">
                                Hola
                            </span>
                            <span className="text-sm font-bold text-slate-700 leading-none">
                                {user?.email || 'Usuario'}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            title="Cerrar Sesión"
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100 group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">


                {/* Charts Section */}
                <DashboardCharts operations={operations} />

                {/* Operations Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Operaciones Recientes</h2>
                            <p className="text-slate-400 text-sm mt-1">Gestiona y revisa todas las transacciones</p>
                        </div>
                        <div className="flex gap-2">
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
                        </div>
                    </div>

                    {/* Filters Bar */}
                    <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Buscar por cliente, documento o ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex gap-3">
                            <div className="relative group/sel">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-all"
                                >
                                    <option value="all">Todos los estados</option>
                                    <option value="pending">Pendientes</option>
                                    <option value="approved">Aprobadas</option>
                                    <option value="rejected">Rechazadas</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover/sel:text-slate-600 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative group/sel">
                                <select
                                    value={serviceFilter}
                                    onChange={(e) => setServiceFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-all"
                                >
                                    <option value="all">Todos los servicios</option>
                                    <option value="escolar">Turismo Escolar</option>
                                    <option value="paquete">Paquetes Turísticos</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover/sel:text-slate-600 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative group/sel">
                                <select
                                    value={groupFilter}
                                    onChange={(e) => setGroupFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-all max-w-[200px]"
                                >
                                    <option value="all">Todos los grupos</option>
                                    {uniqueGroups.map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover/sel:text-slate-600 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-3 px-2">
                            <thead>
                                <tr className="bg-slate-100/80 text-slate-600 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                    <th className="px-6 py-4 rounded-l-2xl whitespace-nowrap">Fecha</th>
                                    <th className="px-6 py-4 hidden md:table-cell whitespace-nowrap">Servicio</th>
                                    <th className="px-6 py-4 w-1/3 min-w-[200px]">Cliente</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Monto</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Estado</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Voucher</th>
                                    <th className="px-6 py-4 rounded-r-2xl text-right whitespace-nowrap">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {currentItems.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center text-slate-400 bg-white/40 rounded-2xl border border-slate-100/50 backdrop-blur-sm">
                                            <div className="flex flex-col items-center gap-3">
                                                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                                <span className="font-medium">No se encontraron operaciones con estos filtros.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    currentItems.map((op) => (
                                        <tr
                                            key={op.id}
                                            className="bg-white/70 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group rounded-2xl border border-transparent hover:border-slate-100"
                                            style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}
                                        >
                                            {/* Date Column */}
                                            <td className="px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y first:border-l last:border-r border-slate-100/60 group-hover:border-slate-200/60 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700">{new Date(op.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}</span>
                                                    <span className="text-xs text-slate-400">{new Date(op.date).getFullYear()}</span>
                                                    <span className="text-[10px] text-slate-400 mt-1">{new Date(op.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </td>

                                            {/* Service Column */}
                                            <td className="px-6 py-5 hidden md:table-cell first:rounded-l-2xl last:rounded-r-2xl border-y border-slate-100/60 group-hover:border-slate-200/60 whitespace-nowrap">
                                                {(() => {
                                                    const type = (op.serviceType || '').toLowerCase();
                                                    const isSchool = type.includes('escolar');
                                                    const label = isSchool ? 'Turismo Escolar' : 'Paquetes Turísticos';

                                                    return (
                                                        <div className="flex items-center gap-2">
                                                            <div className={`p-1.5 rounded-lg ${isSchool ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'}`}>
                                                                {isSchool ? (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                                                ) : (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                )}
                                                            </div>
                                                            <span className="font-semibold text-slate-700 text-xs">{label}</span>
                                                        </div>
                                                    );
                                                })()}
                                            </td>

                                            {/* Client Column */}
                                            <td className="px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-slate-100/60 group-hover:border-slate-200/60">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-200 shrink-0">
                                                        {(op.studentName || op.clientName || 'N').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-bold text-slate-800 text-sm truncate block" title={op.studentName || op.clientName}>{op.studentName || op.clientName || 'Sin Nombre'}</span>
                                                        <span className="text-[10px] text-slate-400 font-mono tracking-tight">{op.studentDoc || op.clientDoc}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Amount Column */}
                                            <td className="px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-slate-100/60 group-hover:border-slate-200/60">
                                                <div className="font-bold text-slate-800 flex items-baseline gap-1">
                                                    <span className="text-xs text-slate-400 font-normal">{op.currency === 'Dólares (USD)' ? 'USD' : 'S/'}</span>
                                                    {op.amount}
                                                </div>
                                            </td>

                                            {/* Status Column */}
                                            <td className="px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-slate-100/60 group-hover:border-slate-200/60">
                                                <div className="relative inline-block group/select">
                                                    <div className={`absolute inset-0 rounded-full opacity-20 pointer-events-none transition-colors duration-300
                                                        ${op.status === 'pending' ? 'bg-amber-500' : ''}
                                                        ${op.status === 'approved' ? 'bg-emerald-500' : ''}
                                                        ${op.status === 'rejected' ? 'bg-red-500' : ''}
                                                    `}></div>
                                                    <select
                                                        value={op.status}
                                                        onChange={(e) => handleStatusChange(op.id, e.target.value)}
                                                        className={`relative appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-bold cursor-pointer outline-none border border-transparent focus:ring-2 focus:ring-offset-1 transition-all bg-transparent
                                                            ${op.status === 'pending' ? 'text-amber-700 focus:ring-amber-500' : ''}
                                                            ${op.status === 'approved' ? 'text-emerald-700 focus:ring-emerald-500' : ''}
                                                            ${op.status === 'rejected' ? 'text-red-700 focus:ring-red-500' : ''}
                                                        `}
                                                    >
                                                        <option value="pending">Pendiente</option>
                                                        <option value="approved">Aprobada</option>
                                                        <option value="rejected">Rechazada</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none opacity-60">
                                                        <svg className={`w-3 h-3 ${op.status === 'pending' ? 'text-amber-700' :
                                                            op.status === 'approved' ? 'text-emerald-700' :
                                                                'text-red-700'
                                                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Voucher Column */}
                                            <td className="px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-slate-100/60 group-hover:border-slate-200/60">
                                                {op.voucherUrl ? (
                                                    <a
                                                        href={op.voucherUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 text-xs font-bold transition-all duration-300 group/link"
                                                    >
                                                        <span>Ver</span>
                                                        <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                    </a>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-400 text-xs font-medium border border-slate-100">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                        <span>N/A</span>
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action Column */}
                                            <td className="px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-slate-100/60 group-hover:border-slate-200/60">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOp(op);
                                                            setViewModalOpen(true);
                                                        }}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                                                        title="Ver detalles"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOp(op);
                                                            setEditServiceType(op.serviceType || '');
                                                            setEditModalOpen(true);
                                                        }}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
                                                        title="Editar"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteOperation(op.id)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                                                        title="Eliminar"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    {filteredOperations.length > 0 && (
                        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                            <span className="text-sm text-slate-500 font-medium">
                                Mostrando <span className="text-slate-900 font-bold">{indexOfFirstItem + 1}</span> a <span className="text-slate-900 font-bold">{Math.min(indexOfLastItem, filteredOperations.length)}</span> de <span className="text-slate-900 font-bold">{filteredOperations.length}</span> resultados
                            </span>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(num => num === 1 || num === totalPages || (num >= currentPage - 1 && num <= currentPage + 1))
                                        .map((number, index, array) => {
                                            const isGap = index > 0 && number - array[index - 1] > 1;
                                            return (
                                                <React.Fragment key={number}>
                                                    {isGap && <span className="text-slate-400 px-1">...</span>}
                                                    <button
                                                        onClick={() => paginate(number)}
                                                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${currentPage === number
                                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                                            : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200'
                                                            }`}
                                                    >
                                                        {number}
                                                    </button>
                                                </React.Fragment>
                                            );
                                        })}
                                </div>

                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </main>

            {/* Modals for View & Edit */}
            {viewModalOpen && selectedOp && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-4 transition-all duration-300">
                    <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-4xl relative flex flex-col max-h-[90vh] overflow-hidden border border-white/20 ring-1 ring-black/5">
                        {/* Header */}
                        <div className="flex justify-between items-center px-8 py-6 border-b border-black/5 bg-white/50 z-10 transition-colors duration-300">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Detalles de Operación</h3>
                                <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                                    ID: <span className="font-mono font-medium text-slate-700 bg-slate-100 px-2 rounded-md">{selectedOp.id?.slice(0, 8)}</span>
                                </p>
                            </div>
                            <button
                                onClick={() => setViewModalOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 hover:rotate-90 transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
                            {/* Status Banner */}
                            <div className={`mb-8 p-4 rounded-xl border flex items-center justify-between ${selectedOp.status === 'approved' ? 'bg-emerald-50 border-emerald-100' :
                                selectedOp.status === 'rejected' ? 'bg-red-50 border-red-100' :
                                    'bg-amber-50 border-amber-100'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedOp.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                                        selectedOp.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                            'bg-amber-100 text-amber-600'
                                        }`}>
                                        {selectedOp.status === 'approved' ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        ) : selectedOp.status === 'rejected' ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        )}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold uppercase tracking-wide ${selectedOp.status === 'approved' ? 'text-emerald-800' :
                                            selectedOp.status === 'rejected' ? 'text-red-800' :
                                                'text-amber-800'
                                            }`}>
                                            {selectedOp.status === 'pending' ? 'Operación Pendiente' : selectedOp.status === 'approved' ? 'Operación Aprobada' : 'Operación Rechazada'}
                                        </p>
                                        <p className="text-xs opacity-70 font-medium">
                                            {new Date(selectedOp.date).toLocaleString('es-PE', { dateStyle: 'full', timeStyle: 'short', hour12: true })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Monto Total</p>
                                    <p className="text-2xl font-bold text-slate-900 leading-none">
                                        {selectedOp.currency === 'Dólares (USD)' ? '$' : 'S/'} {selectedOp.amount}
                                        <span className="text-sm text-slate-400 font-normal ml-1">{selectedOp.currency === 'Dólares (USD)' ? 'USD' : 'PEN'}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                                {/* Section: Detalles del Servicio */}
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Información del Cliente</h4>
                                    <dl className="space-y-5">
                                        <div className="grid grid-cols-[120px_1fr] gap-4">
                                            <dt className="text-sm font-medium text-slate-500">Cliente / Alumno</dt>
                                            <dd className="text-sm font-bold text-slate-900">{selectedOp.studentName || selectedOp.clientName || '-'}</dd>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4">
                                            <dt className="text-sm font-medium text-slate-500">Documento ID</dt>
                                            <dd className="text-sm font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded inline-block w-fit border border-slate-200">
                                                {selectedOp.studentDoc || selectedOp.clientDoc || '-'}
                                            </dd>
                                        </div>
                                        {selectedOp.groupName && (
                                            <div className="grid grid-cols-[120px_1fr] gap-4">
                                                <dt className="text-sm font-medium text-slate-500">Grupo / Colegio</dt>
                                                <dd className="text-sm text-slate-900">{selectedOp.groupName}</dd>
                                            </div>
                                        )}
                                        {selectedOp.serviceType?.toLowerCase().includes('escolar') ? (
                                            <>
                                                <div className="grid grid-cols-[120px_1fr] gap-4">
                                                    <dt className="text-sm font-medium text-slate-500">Tel. Apoderado</dt>
                                                    <dd className="text-sm text-slate-900">{selectedOp.parentPhone || '-'}</dd>
                                                </div>
                                                <div className="grid grid-cols-[120px_1fr] gap-4">
                                                    <dt className="text-sm font-medium text-slate-500">Email Apoderado</dt>
                                                    <dd className="text-sm text-slate-900">{selectedOp.parentEmail || '-'}</dd>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-[120px_1fr] gap-4">
                                                    <dt className="text-sm font-medium text-slate-500">Tel. Cliente</dt>
                                                    <dd className="text-sm text-slate-900">{selectedOp.clientPhone || '-'}</dd>
                                                </div>
                                                <div className="grid grid-cols-[120px_1fr] gap-4">
                                                    <dt className="text-sm font-medium text-slate-500">Email Cliente</dt>
                                                    <dd className="text-sm text-slate-900">{selectedOp.clientEmail || '-'}</dd>
                                                </div>
                                            </>
                                        )}
                                        <div className="grid grid-cols-[120px_1fr] gap-4">
                                            <dt className="text-sm font-medium text-slate-500">Tipo Servicio</dt>
                                            <dd>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${selectedOp.serviceType?.toLowerCase().includes('escolar')
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                                    : 'bg-purple-50 text-purple-700 border border-purple-100'
                                                    }`}>
                                                    {selectedOp.serviceType?.toLowerCase().includes('escolar') ? 'Turismo Escolar' : 'Paquetes Turísticos'}
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Section: Detalles Financieros */}
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Detalles del Pago</h4>
                                    <dl className="space-y-5">
                                        <div className="grid grid-cols-[120px_1fr] gap-4">
                                            <dt className="text-sm font-medium text-slate-500">Método de Pago</dt>
                                            <dd className="text-sm font-semibold text-slate-900 capitalize">{selectedOp.paymentMethod || '-'}</dd>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4">
                                            <dt className="text-sm font-medium text-slate-500">Entidad Bancaria</dt>
                                            <dd className="text-sm text-slate-900">{selectedOp.bank || '-'}</dd>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4">
                                            <dt className="text-sm font-medium text-slate-500">N° Operación</dt>
                                            <dd className="text-sm font-mono text-slate-900 tracking-wide">{selectedOp.operationNumber || '-'}</dd>
                                        </div>
                                        <div className="grid grid-cols-[120px_1fr] gap-4">
                                            <dt className="text-sm font-medium text-slate-500">Titular Cuenta</dt>
                                            <dd className="text-sm text-slate-900 uppercase">{selectedOp.paymentHolderName || '-'}</dd>
                                        </div>
                                        {!selectedOp.serviceType?.toLowerCase().includes('escolar') && (
                                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                                                <div className="grid grid-cols-[120px_1fr] gap-4">
                                                    <dt className="text-sm font-medium text-slate-500">Destino</dt>
                                                    <dd className="text-sm font-bold text-slate-900">{selectedOp.tripDestination || '-'}</dd>
                                                </div>
                                                <div className="grid grid-cols-[120px_1fr] gap-4">
                                                    <dt className="text-sm font-medium text-slate-500">Fecha Viaje</dt>
                                                    <dd className="text-sm text-slate-900">{selectedOp.tripDate ? new Date(selectedOp.tripDate).toLocaleDateString() : '-'}</dd>
                                                </div>
                                                <div className="grid grid-cols-[120px_1fr] gap-4">
                                                    <dt className="text-sm font-medium text-slate-500">Pasajeros</dt>
                                                    <dd className="text-sm text-slate-900">
                                                        {selectedOp.adultsCount || 0} Adultos, {selectedOp.childrenCount || 0} Niños
                                                    </dd>
                                                </div>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>

                            {/* Section: Voucher */}
                            <div className="mt-10">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 flex items-center justify-between">
                                    Voucher de Pago
                                    {selectedOp.voucherUrl && (
                                        <a href={selectedOp.voucherUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-[10px] font-bold flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            ABRIR EN NUEVA PESTAÑA
                                        </a>
                                    )}
                                </h4>

                                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex justify-center p-4">
                                    {selectedOp.voucherUrl ? (
                                        <img
                                            src={selectedOp.voucherUrl}
                                            alt="Voucher"
                                            className="max-h-96 w-auto object-contain rounded shadow-sm"
                                        />
                                    ) : (
                                        <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                                            <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            <span className="text-sm font-medium">No se adjuntó voucher digital</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editModalOpen && selectedOp && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-4 transition-all duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative flex flex-col max-h-[95vh] overflow-hidden border border-slate-200">
                        {/* Header */}
                        <div className="bg-slate-900 px-8 py-6 flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Editar Operación</h3>
                                <p className="text-slate-400 text-xs mt-1 font-mono tracking-wider">REG-ID: {selectedOp.id?.toUpperCase()}</p>
                            </div>
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleSaveEdit({
                                    ...selectedOp,
                                    serviceType: formData.get('serviceType'),
                                    // School fields (with transformations)
                                    studentName: formData.get('studentName')?.toString().toUpperCase(),
                                    studentDoc: formData.get('studentDoc'),
                                    groupName: formData.get('groupName')?.toString().toUpperCase(),
                                    parentPhone: formData.get('parentPhone'),
                                    parentEmail: formData.get('parentEmail')?.toString().toLowerCase(),
                                    // Package fields (with transformations)
                                    clientName: formData.get('clientName')?.toString().toUpperCase(),
                                    clientDoc: formData.get('clientDoc'),
                                    clientPhone: formData.get('clientPhone'),
                                    clientEmail: formData.get('clientEmail')?.toString().toLowerCase(),
                                    tripDestination: formData.get('tripDestination')?.toString().toUpperCase(),
                                    tripDate: formData.get('tripDate'),
                                    adultsCount: formData.get('adultsCount'),
                                    childrenCount: formData.get('childrenCount'),
                                    // Financial fields
                                    amount: formData.get('amount'),
                                    currency: formData.get('currency'),
                                    operationNumber: formData.get('operationNumber')?.toString().toUpperCase(),
                                    paymentMethod: formData.get('paymentMethod'),
                                    bank: formData.get('bank'),
                                    paymentHolderName: formData.get('paymentHolderName')?.toString().toUpperCase()
                                });
                            }}>
                                {/* Status & Amount Summary Banner */}
                                <div className={`mb-10 p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${selectedOp.status === 'approved' ? 'bg-emerald-50/50 border-emerald-100' :
                                    selectedOp.status === 'rejected' ? 'bg-red-50/50 border-red-100' :
                                        'bg-amber-50/50 border-amber-100'
                                    }`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 min-w-[56px] h-14 rounded-2xl flex items-center justify-center shadow-sm ${selectedOp.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                                            selectedOp.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                                'bg-amber-100 text-amber-600'
                                            }`}>
                                            {selectedOp.status === 'approved' ? (
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            ) : selectedOp.status === 'rejected' ? (
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            ) : (
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className={`text-xs font-black uppercase tracking-widest ${selectedOp.status === 'approved' ? 'text-emerald-800/60' :
                                                selectedOp.status === 'rejected' ? 'text-red-800/60' :
                                                    'text-amber-800/60'
                                                }`}>Estado Actual</p>
                                            <p className={`text-xl font-bold ${selectedOp.status === 'approved' ? 'text-emerald-900' :
                                                selectedOp.status === 'rejected' ? 'text-red-900' :
                                                    'text-amber-900'
                                                }`}>
                                                {selectedOp.status === 'pending' ? 'Pendiente de Revisión' : selectedOp.status === 'approved' ? 'Operación Aprobada' : 'Operación Rechazada'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="flex-1 md:w-44">
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pl-1">Moneda</label>
                                            <div className="relative group/sel">
                                                <select
                                                    name="currency"
                                                    defaultValue={selectedOp.currency}
                                                    className="w-full bg-white border border-slate-200 rounded-xl pl-3 pr-10 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none cursor-pointer"
                                                >
                                                    <option value="Dólares (USD)">Dólares (USD)</option>
                                                    <option value="Soles (PEN)">Soles (PEN)</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover/sel:text-slate-600 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 md:w-36">
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pl-1">Importe Total</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                                                    {selectedOp.currency === 'Dólares (USD)' ? '$' : 'S/'}
                                                </span>
                                                <input
                                                    type="text"
                                                    name="amount"
                                                    defaultValue={selectedOp.amount}
                                                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-lg font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8">
                                    {/* Section: Client & Service Details */}
                                    <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 space-y-6">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-2">Información del Cliente</h4>
                                        <div className="space-y-5">
                                            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                <label className="text-sm font-medium text-slate-500">Tipo Servicio</label>
                                                <div className="relative group/sel">
                                                    <select
                                                        name="serviceType"
                                                        value={editServiceType}
                                                        onChange={(e) => setEditServiceType(e.target.value)}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                                                    >
                                                        <option value="escolar">Turismo Escolar</option>
                                                        <option value="paquetes">Paquetes Turísticos</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover/sel:text-slate-600 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {editServiceType?.toLowerCase().includes('escolar') ? (
                                                <>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Nombre Alumno</label>
                                                        <input
                                                            name="studentName"
                                                            defaultValue={selectedOp.studentName}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Doc. Alumno</label>
                                                        <input
                                                            name="studentDoc"
                                                            defaultValue={selectedOp.studentDoc}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Grupo/Colegio</label>
                                                        <input
                                                            name="groupName"
                                                            defaultValue={selectedOp.groupName}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Tel. Apoderado</label>
                                                        <input
                                                            name="parentPhone"
                                                            defaultValue={selectedOp.parentPhone}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Email Apoderado</label>
                                                        <input
                                                            name="parentEmail"
                                                            defaultValue={selectedOp.parentEmail}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Nombre Cliente</label>
                                                        <input
                                                            name="clientName"
                                                            defaultValue={selectedOp.clientName}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Doc. Cliente</label>
                                                        <input
                                                            name="clientDoc"
                                                            defaultValue={selectedOp.clientDoc}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Tel. Cliente</label>
                                                        <input
                                                            name="clientPhone"
                                                            defaultValue={selectedOp.clientPhone}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Email Cliente</label>
                                                        <input
                                                            name="clientEmail"
                                                            defaultValue={selectedOp.clientEmail}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Section: Financial & Other Details */}
                                    <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 space-y-6">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-2">Detalles de Pago</h4>
                                        <div className="space-y-5">
                                            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                <label className="text-sm font-medium text-slate-500">Método de Pago</label>
                                                <div className="relative group/sel">
                                                    <select
                                                        name="paymentMethod"
                                                        defaultValue={selectedOp.paymentMethod}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                                                    >
                                                        <option value="Depósito en Cuenta">Depósito en Cuenta</option>
                                                        <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                                                        <option value="Transferencia interbancaria">Transferencia interbancaria</option>
                                                        <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                                                        <option value="Efectivo">Efectivo</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover/sel:text-slate-600 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            {!editServiceType?.toLowerCase().includes('escolar') && (
                                                <>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Destino</label>
                                                        <input
                                                            name="tripDestination"
                                                            defaultValue={selectedOp.tripDestination}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Fecha Viaje</label>
                                                        <input
                                                            name="tripDate"
                                                            type="date"
                                                            defaultValue={selectedOp.tripDate}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                        <label className="text-sm font-medium text-slate-500">Pasajeros</label>
                                                        <div className="flex gap-2">
                                                            <div className="flex-1">
                                                                <input
                                                                    name="adultsCount"
                                                                    type="number"
                                                                    defaultValue={selectedOp.adultsCount}
                                                                    placeholder="Ad."
                                                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 outline-none"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <input
                                                                    name="childrenCount"
                                                                    type="number"
                                                                    defaultValue={selectedOp.childrenCount}
                                                                    placeholder="Niñ."
                                                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                <label className="text-sm font-medium text-slate-500">N° Operación</label>
                                                <input
                                                    name="operationNumber"
                                                    defaultValue={selectedOp.operationNumber}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                />
                                            </div>

                                            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                <label className="text-sm font-medium text-slate-500">Entidad Bancaria</label>
                                                <input
                                                    name="bank"
                                                    defaultValue={selectedOp.bank}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                                                <label className="text-sm font-medium text-slate-500">Titular Pago</label>
                                                <input
                                                    name="paymentHolderName"
                                                    defaultValue={selectedOp.paymentHolderName}
                                                    placeholder="Nombre del titular"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none uppercase placeholder:normal-case"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-12 flex items-center justify-end gap-4 border-t border-slate-100 pt-8 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setEditModalOpen(false)}
                                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 active:scale-95"
                                    >
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

import Link from 'next/link';
import {
    buildDashboardSnapshot,
    DEFAULT_TARGET_MONTH,
    formatCurrency,
    formatPercentage,
    getStatusLabel,
    samplePortfolio,
} from '../../../lib/property-management';

const dashboard = buildDashboardSnapshot(samplePortfolio, DEFAULT_TARGET_MONTH);
const propertySummaryMap = new Map(dashboard.propertySummaries.map((s) => [s.propertyId, s]));

export default function PropertiesPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">物件一覧</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            保有物件の稼働率・当月収支・要対応件数を一覧で確認できます。
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                            <thead>
                            <tr className="text-slate-500 dark:text-slate-400">
                                <th scope="col" className="px-3 py-3 font-medium">物件名</th>
                                <th scope="col" className="px-3 py-3 font-medium">種別</th>
                                <th scope="col" className="px-3 py-3 font-medium">所在地</th>
                                <th scope="col" className="px-3 py-3 font-medium">総部屋数</th>
                                <th scope="col" className="px-3 py-3 font-medium">空室数</th>
                                <th scope="col" className="px-3 py-3 font-medium">稼働率</th>
                                <th scope="col" className="px-3 py-3 font-medium">当月収支</th>
                                <th scope="col" className="px-3 py-3 font-medium">要対応件数</th>
                                <th scope="col" className="px-3 py-3 font-medium">ステータス</th>
                                <th scope="col" className="px-3 py-3 font-medium"></th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {samplePortfolio.properties.map((property) => {
                                const summary = propertySummaryMap.get(property.id);
                                return (
                                    <tr key={property.id} className="align-middle hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-3 py-3 font-medium">{property.name}</td>
                                        <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{property.type}</td>
                                        <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{property.address}</td>
                                        <td className="px-3 py-3 text-center">{summary?.totalUnits ?? 0}</td>
                                        <td className="px-3 py-3 text-center">{summary?.vacantUnits ?? 0}</td>
                                        <td className="px-3 py-3">{formatPercentage(summary?.occupancyRate ?? 0)}</td>
                                        <td className="px-3 py-3">{formatCurrency(summary?.monthlyBalance ?? 0)}</td>
                                        <td className="px-3 py-3 text-center">{summary?.attentionCount ?? 0}件</td>
                                        <td className="px-3 py-3">
                                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                                                {getStatusLabel(property.ownershipStatus)}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <Link
                                                href={`/properties/${property.id}`}
                                                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                詳細
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}

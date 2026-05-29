import {
    buildDashboardSnapshot,
    DEFAULT_TARGET_MONTH,
    formatCurrency,
    formatDateLabel,
    getStatusLabel,
    samplePortfolio,
} from '../../../lib/property-management';

const dashboard = buildDashboardSnapshot(samplePortfolio, DEFAULT_TARGET_MONTH);
const propertyMap = new Map(samplePortfolio.properties.map((p) => [p.id, p]));
const unitMap = new Map(samplePortfolio.units.map((u) => [u.id, u]));

export default function RepairsPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">修繕履歴</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            修繕の履歴と対応状況を確認できます。
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    {dashboard.repairs.length === 0 ? (
                        <p className="text-sm text-slate-400">修繕履歴はありません。</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                                <thead>
                                <tr className="text-slate-500 dark:text-slate-400">
                                    <th scope="col" className="px-3 py-3 font-medium">発生日</th>
                                    <th scope="col" className="px-3 py-3 font-medium">物件名</th>
                                    <th scope="col" className="px-3 py-3 font-medium">部屋番号</th>
                                    <th scope="col" className="px-3 py-3 font-medium">カテゴリ</th>
                                    <th scope="col" className="px-3 py-3 font-medium">内容</th>
                                    <th scope="col" className="px-3 py-3 font-medium">費用</th>
                                    <th scope="col" className="px-3 py-3 font-medium">対応日</th>
                                    <th scope="col" className="px-3 py-3 font-medium">ステータス</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {dashboard.repairs.map((repair) => {
                                    const property = propertyMap.get(repair.propertyId);
                                    const unit = repair.unitId ? unitMap.get(repair.unitId) : undefined;
                                    return (
                                        <tr key={repair.id} className="align-top hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="px-3 py-3">{formatDateLabel(repair.occurredOn)}</td>
                                            <td className="px-3 py-3 font-medium">{property?.name ?? '-'}</td>
                                            <td className="px-3 py-3">{unit?.roomNumber ?? '-'}</td>
                                            <td className="px-3 py-3">{repair.repairCategory}</td>
                                            <td className="px-3 py-3">{repair.description}</td>
                                            <td className="px-3 py-3">{repair.cost ? formatCurrency(repair.cost) : '未設定'}</td>
                                            <td className="px-3 py-3">{formatDateLabel(repair.repairedOn)}</td>
                                            <td className="px-3 py-3">
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                    {getStatusLabel(repair.status)}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

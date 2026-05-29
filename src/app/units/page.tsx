import {
    buildDashboardSnapshot,
    DEFAULT_TARGET_MONTH,
    formatCurrency,
    formatDateLabel,
    getStatusLabel,
    samplePortfolio,
} from '../../../lib/property-management';

const dashboard = buildDashboardSnapshot(samplePortfolio, DEFAULT_TARGET_MONTH);

export default function UnitsPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">部屋一覧</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            全物件の部屋ごとの稼働状況・賃料・契約終了予定日を確認できます。
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                            <thead>
                            <tr className="text-slate-500 dark:text-slate-400">
                                <th scope="col" className="px-3 py-3 font-medium">物件名</th>
                                <th scope="col" className="px-3 py-3 font-medium">部屋番号</th>
                                <th scope="col" className="px-3 py-3 font-medium">間取り</th>
                                <th scope="col" className="px-3 py-3 font-medium">面積</th>
                                <th scope="col" className="px-3 py-3 font-medium">賃料</th>
                                <th scope="col" className="px-3 py-3 font-medium">共益費</th>
                                <th scope="col" className="px-3 py-3 font-medium">ステータス</th>
                                <th scope="col" className="px-3 py-3 font-medium">契約終了予定日</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {dashboard.units.map((unit) => (
                                <tr key={unit.id} className="align-top hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-3 py-3 font-medium">{unit.propertyName}</td>
                                    <td className="px-3 py-3">{unit.roomNumber}</td>
                                    <td className="px-3 py-3">{unit.layout}</td>
                                    <td className="px-3 py-3">{unit.floorArea.toFixed(1)}㎡</td>
                                    <td className="px-3 py-3">{formatCurrency(unit.rentAmount)}</td>
                                    <td className="px-3 py-3">{formatCurrency(unit.commonFee)}</td>
                                    <td className="px-3 py-3">
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                            {getStatusLabel(unit.status)}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3">{formatDateLabel(unit.contractEndDate)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}

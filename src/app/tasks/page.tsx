import {
    buildDashboardSnapshot,
    DEFAULT_TARGET_MONTH,
    getPriorityLabel,
    samplePortfolio,
} from '../../../lib/property-management';

const dashboard = buildDashboardSnapshot(samplePortfolio, DEFAULT_TARGET_MONTH);

const badgeClassNames = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200',
    low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200',
};

export default function TasksPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">要対応一覧</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            空室・契約更新・未完了修繕・手動タスクをまとめて確認できます。
                            全{dashboard.attentionCount}件
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    {dashboard.attentionItems.length === 0 ? (
                        <p className="text-sm text-slate-400">要対応事項はありません。</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                                <thead>
                                <tr className="text-slate-500 dark:text-slate-400">
                                    <th scope="col" className="px-3 py-3 font-medium">優先度</th>
                                    <th scope="col" className="px-3 py-3 font-medium">タイトル</th>
                                    <th scope="col" className="px-3 py-3 font-medium">物件名</th>
                                    <th scope="col" className="px-3 py-3 font-medium">部屋番号</th>
                                    <th scope="col" className="px-3 py-3 font-medium">期限/基準日</th>
                                    <th scope="col" className="px-3 py-3 font-medium">ステータス</th>
                                    <th scope="col" className="px-3 py-3 font-medium">種別</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {dashboard.attentionItems.map((item) => (
                                    <tr key={item.id} className="align-top hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-3 py-3">
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClassNames[item.priority]}`}>
                                                {getPriorityLabel(item.priority)}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 font-medium">{item.title}</td>
                                        <td className="px-3 py-3">{item.propertyName}</td>
                                        <td className="px-3 py-3">{item.roomNumber}</td>
                                        <td className="px-3 py-3">{item.dueLabel}</td>
                                        <td className="px-3 py-3">{item.status}</td>
                                        <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{item.type}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

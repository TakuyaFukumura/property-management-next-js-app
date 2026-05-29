import {
    buildDashboardSnapshot,
    DEFAULT_REFERENCE_DATE,
    DEFAULT_TARGET_MONTH,
    formatCurrency,
    formatMonthLabel,
    formatPercentage,
    samplePortfolio,
} from '../../lib/property-management';

describe('property-management helpers', () => {
    it('月次ダッシュボード集計を正しく計算する', () => {
        const snapshot = buildDashboardSnapshot(samplePortfolio, DEFAULT_TARGET_MONTH, DEFAULT_REFERENCE_DATE);

        expect(snapshot.totalProperties).toBe(3);
        expect(snapshot.totalUnits).toBe(6);
        expect(snapshot.vacantUnits).toBe(2);
        expect(snapshot.totalIncome).toBe(425000);
        expect(snapshot.totalExpense).toBe(102000);
        expect(snapshot.cashflow).toBe(323000);
        expect(snapshot.propertySummaries).toHaveLength(3);
    });

    it('要対応一覧に空室長期化・契約更新・未完了修繕を含める', () => {
        const snapshot = buildDashboardSnapshot(samplePortfolio, DEFAULT_TARGET_MONTH, DEFAULT_REFERENCE_DATE);
        const titles = snapshot.attentionItems.map((item) => item.title);

        expect(titles).toContain('102号室の募集条件を見直す');
        expect(titles).toContain('空室長期化フォロー');
        expect(titles).toContain('契約終了が近い部屋');
        expect(titles).toContain('退去後クリーニングとクロス補修');
    });

    it('表示用フォーマッタが日本語表記を返す', () => {
        expect(formatCurrency(323000)).toMatch(/323,000/);
        expect(formatPercentage(66.666)).toBe('66.7%');
        expect(formatMonthLabel('2026-05')).toBe('2026年05月');
    });
});

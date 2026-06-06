import React from 'react';
import {render, screen} from '@testing-library/react';
import UnitFormPage from '../../../src/app/units/new/page';
import IncomeFormPage from '../../../src/app/finance/income/new/page';
import ExpenseFormPage from '../../../src/app/finance/expense/new/page';
import SettingsPage from '../../../src/app/settings/page';
import FinancePage from '../../../src/app/finance/page';

describe('未実装だった画面の追加', () => {
    it('部屋登録・編集画面の入力項目が表示される', () => {
        render(<UnitFormPage/>);

        expect(screen.getByRole('heading', {name: '部屋登録・編集'})).toBeInTheDocument();
        expect(screen.getByLabelText('物件 *')).toBeInTheDocument();
        expect(screen.getByRole('option', {name: '入居中'})).toHaveValue('occupied');
        expect(screen.getByRole('option', {name: '空室'})).toHaveValue('vacant');
        expect(screen.getByRole('option', {name: '募集中'})).toHaveValue('recruiting');
        expect(screen.getByRole('option', {name: '募集停止'})).toHaveValue('unavailable');
        expect(screen.getByRole('button', {name: '保存'})).toBeInTheDocument();
    });

    it('収入登録画面の入力項目が表示される', () => {
        render(<IncomeFormPage/>);

        expect(screen.getByRole('heading', {name: '収入登録'})).toBeInTheDocument();
        expect(screen.getByLabelText('収入カテゴリ *')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: '登録'})).toBeInTheDocument();
    });

    it('支出登録画面の入力項目が表示される', () => {
        render(<ExpenseFormPage/>);

        expect(screen.getByRole('heading', {name: '支出登録'})).toBeInTheDocument();
        expect(screen.getByLabelText('支出カテゴリ *')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: '登録'})).toBeInTheDocument();
    });

    it('設定画面のカテゴリ設定が表示される', () => {
        render(<SettingsPage/>);

        expect(screen.getByRole('heading', {name: '設定画面'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: '収入カテゴリ設定'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: '支出カテゴリ設定'})).toBeInTheDocument();
    });

    it('月次収支画面から収入/支出登録画面に遷移できるリンクが表示される', () => {
        render(<FinancePage/>);

        expect(screen.getByRole('link', {name: '収入を登録'})).toHaveAttribute('href', '/finance/income/new');
        expect(screen.getByRole('link', {name: '支出を登録'})).toHaveAttribute('href', '/finance/expense/new');
    });
});

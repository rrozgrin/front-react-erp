import { FiCalendar } from 'react-icons/fi';
import { Botao } from '../../../../common/components/Buttons/Botao';
import {
    FilterCard,
    FilterGroup,
    PeriodRow,
    DateInput,
    Separator,
    ShortcutGroup,
    Shortcuts,
} from './FinanceiroClientePage.styles';

type AtalhoPeriodo = 'hoje' | '7dias' | '30dias' | 'mes';

type Props = {
    dataInicio: string;
    dataFim: string;
    onDataInicioChange: (value: string) => void;
    onDataFimChange: (value: string) => void;
    onAplicarAtalho: (tipo: AtalhoPeriodo) => void;
};

export function FiltroPeriodoFinanceiro({
    dataInicio,
    dataFim,
    onDataInicioChange,
    onDataFimChange,
    onAplicarAtalho,
}: Props) {
    return (
        <FilterCard>
            <FilterGroup>
                <label>Período</label>
                <PeriodRow>
                    <DateInput
                        type="date"
                        value={dataInicio}
                        onChange={(e) => onDataInicioChange(e.target.value)}
                    />
                    <Separator>até</Separator>
                    <DateInput
                        type="date"
                        value={dataFim}
                        onChange={(e) => onDataFimChange(e.target.value)}
                    />
                    <Botao nome="OK" action={() => undefined} />
                </PeriodRow>
            </FilterGroup>

            <ShortcutGroup>
                <label>Atalhos</label>
                <Shortcuts>
                    <Botao nome="Hoje" icone={<FiCalendar />} action={() => onAplicarAtalho('hoje')} />
                    <Botao nome="7 dias" icone={<FiCalendar />} action={() => onAplicarAtalho('7dias')} />
                    <Botao nome="30 dias" icone={<FiCalendar />} action={() => onAplicarAtalho('30dias')} />
                    <Botao nome="Este mês" icone={<FiCalendar />} action={() => onAplicarAtalho('mes')} />
                </Shortcuts>
            </ShortcutGroup>
        </FilterCard>
    );
}

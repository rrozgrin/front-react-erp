import React, { useContext, useState } from 'react';
import { PageLayout } from '../../../common/components/PageLayout';
import { ThemeContext } from '../../../context/ThemeContext';
import { themes } from '../../../context/themes';
import {
    NewClientsHowToCard,
    SearchNewClientsCard,
    SuppliesCards,
    UsageInstructionsCard,
    type LabelFormat,
    type PersonType,
    type SearchMode,
} from './components';
import {
    DashboardGrid,
    PageRoot,
} from './styled';

export const MalaDiretaNovosClientesPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const activeTheme = theme && themes[theme] ? themes[theme] : themes.purple;
    const [searchMode, setSearchMode] = useState<SearchMode>('cep');
    const [labelFormat, setLabelFormat] = useState<LabelFormat>('pimaco');
    const [personType, setPersonType] = useState<PersonType>('ambos');

    return (
        <PageLayout
            title="Mala Direta | Novos Clientes"
        >
            <PageRoot
                $accent={activeTheme.main}
                $accentStrong={activeTheme.secondary}
                $accentSoft={activeTheme.quaternary}
            >
                <DashboardGrid>
                    <SearchNewClientsCard
                        searchMode={searchMode}
                        onSearchModeChange={setSearchMode}
                        labelFormat={labelFormat}
                        onLabelFormatChange={setLabelFormat}
                        personType={personType}
                        onPersonTypeChange={setPersonType}
                    />
                    <NewClientsHowToCard />
                </DashboardGrid>

                <DashboardGrid>
                    <SuppliesCards />
                    <UsageInstructionsCard />
                </DashboardGrid>
            </PageRoot>
        </PageLayout>
    );
};

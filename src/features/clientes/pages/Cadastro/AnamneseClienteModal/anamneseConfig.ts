export interface ProcedimentoSelecionado { id: string; procedimento: string; areas: string[]; }

export interface AnamneseFormData {
    condicoesSaude: string; linhasExpressao?: string; condicoesSaudeDescricao?: string; alergia: string; medicamentos: string;
    acompanhamentoMedico: string; procedimentoInteresse: string; areasTratamento: string; procedimentosAnteriores: string;
    procedimentosSelecionados: ProcedimentoSelecionado[]; sensibilidade: string; observacoesCliente?: string; observacoesGerais: string;
    restricoes: string; rugas?: string; rugasDescricao?: string; flacidez?: string; flacidezDescricao?: string; rosacea?: string;
    rosaceaDescricao?: string; melasma?: string; melasmaDescricao?: string; manchas?: string; manchasDescricao?: string; acne?: string;
    acneDescricao?: string; limpezaPele?: string; limpezaPeleDescricao?: string; cosmeticos?: string; cosmeticosDescricao?: string;
    protetorSolar?: string; protetorSolarDescricao?: string; tipoPele?: string; tipoPeleDescricao?: string; procedimentosEsteticos?: string;
    procedimentosEsteticosDescricao?: string; menstruacao?: string; menstruacaoDescricao?: string; amamentando?: string;
    amamentandoDescricao?: string; gestante?: string; gestanteDescricao?: string; cardiaco?: string; cardiacoDescricao?: string;
    diabetes?: string; diabetesDescricao?: string; hipertensao?: string; hipertensaoDescricao?: string; alergiaDescricao?: string;
    medicamentosDescricao?: string; doencaCronica?: string; doencaCronicaDescricao?: string; acompanhamentoMedicoDescricao?: string;
}

export const initialAnamneseFormData: AnamneseFormData = {
    condicoesSaude: '', linhasExpressao: '', condicoesSaudeDescricao: '', alergia: '', medicamentos: '', acompanhamentoMedico: '',
    procedimentoInteresse: '', areasTratamento: '', procedimentosAnteriores: '', procedimentosSelecionados: [], sensibilidade: '',
    observacoesCliente: '', observacoesGerais: '', restricoes: '', rugas: '', rugasDescricao: '', flacidez: '', flacidezDescricao: '',
    rosacea: '', rosaceaDescricao: '', melasma: '', melasmaDescricao: '', manchas: '', manchasDescricao: '', acne: '', acneDescricao: '',
    limpezaPele: '', limpezaPeleDescricao: '', cosmeticos: '', cosmeticosDescricao: '', protetorSolar: '', protetorSolarDescricao: '',
    tipoPele: '', tipoPeleDescricao: '', procedimentosEsteticos: '', procedimentosEsteticosDescricao: '', menstruacao: '',
    menstruacaoDescricao: '', amamentando: '', amamentandoDescricao: '', gestante: '', gestanteDescricao: '', cardiaco: '',
    cardiacoDescricao: '', diabetes: '', diabetesDescricao: '', hipertensao: '', hipertensaoDescricao: '', alergiaDescricao: '',
    medicamentosDescricao: '', doencaCronica: '', doencaCronicaDescricao: '', acompanhamentoMedicoDescricao: '',
};

export const anamneseSteps = [
    { id: 'historico-saude', title: 'Histórico de saúde', description: 'Condições, alergias, medicamentos e acompanhamento médico.' },
    { id: 'procedimentos-areas', title: 'Procedimentos e áreas', description: 'Procedimentos de interesse, áreas tratadas e histórico anterior.' },
    { id: 'observacoes', title: 'Observações', description: 'Registro complementar, restrições e orientações internas.' },
];

export const procedimentoOptions = ['Limpeza de pele', 'Peeling', 'Microagulhamento', 'Laser', 'Botox', 'Preenchimento', 'Drenagem linfática', 'Massagem modeladora'];
export const areaOptions = ['Rosto', 'Pescoço', 'Colo', 'Abdômen', 'Costas', 'Braços', 'Pernas', 'Glúteos'];

export interface QuestaoSaude {
    campo: keyof AnamneseFormData;
    campoDescricao: keyof AnamneseFormData;
    label: string;
}

export const questoesSaude: QuestaoSaude[] = [
    { campo:'condicoesSaude', campoDescricao:'linhasExpressao', label:'Já tem ou teve linhas de expressão' },
    { campo:'rugas', campoDescricao:'rugasDescricao', label:'Já tem ou teve rugas' },
    { campo:'flacidez', campoDescricao:'flacidezDescricao', label:'Já tem ou teve flacidez' },
    { campo:'rosacea', campoDescricao:'rosaceaDescricao', label:'Já tem ou teve rosácea' },
    { campo:'melasma', campoDescricao:'melasmaDescricao', label:'Já tem ou teve melasma' },
    { campo:'manchas', campoDescricao:'manchasDescricao', label:'Já tem ou teve manchas' },
    { campo:'acne', campoDescricao:'acneDescricao', label:'Já tem ou teve acne' },
    { campo:'limpezaPele', campoDescricao:'limpezaPeleDescricao', label:'Realiza limpeza de pele com frequência' },
    { campo:'cosmeticos', campoDescricao:'cosmeticosDescricao', label:'Usa produtos cosméticos' },
    { campo:'protetorSolar', campoDescricao:'protetorSolarDescricao', label:'Usa protetor solar diariamente' },
    { campo:'tipoPele', campoDescricao:'tipoPeleDescricao', label:'Sabe seu tipo de pele' },
    { campo:'procedimentosEsteticos', campoDescricao:'procedimentosEsteticosDescricao', label:'Já realizou procedimentos estéticos anteriormente' },
    { campo:'menstruacao', campoDescricao:'menstruacaoDescricao', label:'Está em período menstrual' },
    { campo:'amamentando', campoDescricao:'amamentandoDescricao', label:'Está amamentando' },
    { campo:'gestante', campoDescricao:'gestanteDescricao', label:'Está gestante' },
    { campo:'cardiaco', campoDescricao:'cardiacoDescricao', label:'Tem problemas cardíacos' },
    { campo:'hipertensao', campoDescricao:'hipertensaoDescricao', label:'Possui hipertensão' },
    { campo:'diabetes', campoDescricao:'diabetesDescricao', label:'Possui diabetes' },
    { campo:'alergia', campoDescricao:'alergiaDescricao', label:'Possui alergia a algum produto, cosmético ou medicamento' },
    { campo:'medicamentos', campoDescricao:'medicamentosDescricao', label:'Faz uso de medicamentos contínuos' },
    { campo:'doencaCronica', campoDescricao:'doencaCronicaDescricao', label:'Possui alguma doença crônica' },
    { campo:'acompanhamentoMedico', campoDescricao:'acompanhamentoMedicoDescricao', label:'Está em tratamento médico atualmente' },
];

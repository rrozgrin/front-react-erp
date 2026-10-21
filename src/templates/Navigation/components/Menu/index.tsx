import { ReactElement } from 'react';
import { MenuColumn, MenuList, NavMenu } from './styled';
import { LinkMenu } from '../LinkMenu';
import { TitleMenu } from '../TitleMenu';
import { LinkComanda } from '../LinkComanda';

type Props = {
    open: boolean;
    setOpen: (param: boolean) => void;
};
export const Menu = ({ open, setOpen }: Props): ReactElement => {
    return (
        <>
            <NavMenu id="menu-collapse" $open={open}>
                    <MenuColumn xs={12} md={4} lg={2}>
                        <TitleMenu title="Administrar e Configurar" />
                        <MenuList>
                            <LinkMenu to='/clientes' title="Clientes" iconGf="group" setOpenMenu={setOpen} />
                            <LinkMenu to='/fornecedores' title="Fornecedores" iconGf="conveyor_belt" setOpenMenu={setOpen} />
                            <LinkMenu to='/funcionarios' title="Funcionários" iconGf="account_box" setOpenMenu={setOpen} />
                            <LinkMenu
                                to='/transportadoras'
                                title="Transportadoras"
                                iconGf="delivery_truck_speed"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu to='/produtos' title="Cadastro/Estoque Produtos" iconGf="box_add" setOpenMenu={setOpen} />
                            <LinkMenu to='/servicos' title="Serviços Oferecidos" iconGf="service_toolbox" setOpenMenu={setOpen} />
                            {/* <LinkMenu
                                to='/agendatel'
                                title="Agenda Telefônica"
                                iconGf="perm_contact_calendar"
                                setOpenMenu={setOpen}
                            /> */}
                            <LinkMenu
                                to='/agendacomp'
                                title="Agenda de Compromissos"
                                iconGf="event_upcoming"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu
                                to='/documentos'
                                title="Documentos Administrativos"
                                iconGf="note_alt"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu
                                to='/arquivos'
                                title="Arquivos e Pastas"
                                iconGf="folder_open"
                                setOpenMenu={setOpen}
                            />
                            {/* <LinkMenu
                                to='/emailintel'
                                title="E-mail Inteligente"
                                iconGf="mark_email_unread"
                                setOpenMenu={setOpen}
                            /> */}
                            <LinkMenu
                                to='/dadosempresariais'
                                title="Dados Empresariais"
                                iconGf="business_center"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu
                                to='/adminuser'
                                title="Administração de Usuários"
                                iconGf="manage_accounts"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu to='/configuracoes' title="Configurações do Sistema" iconGf="build" setOpenMenu={setOpen} />
                            <LinkMenu
                                to='/contador'
                                title="Acessar meu Contador"
                                iconGf="id_card"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu
                                to={`https://www.webcontrolempresas.com.br/download/AnyDesk.exe`}
                                title="Download AnyDesk"
                                iconGf="download"
                                setOpenMenu={setOpen}
                            />
                        </MenuList>
                    </MenuColumn>
                    <MenuColumn xs={12} md={4} lg={2}>
                        <TitleMenu title="Comercial e Financeiro" />
                        <MenuList>
                            <LinkMenu
                                to='/pedido'
                                title="Pedido"
                                iconGf="list_alt"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu
                                to='/orcamentos'
                                title="Orçamentos"
                                iconGf="history_edu"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu
                                to='/ordemdeservico'
                                title="Ordem de Serviço"
                                iconGf="edit_document"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu to='/assistenciatecnica' title="Assistência Técnica" iconGf="handyman" setOpenMenu={setOpen} />
                            <LinkMenu
                                to='/vendaconsignada'
                                title="Venda Consignada"
                                iconGf="price_check"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu to='/locacao' title="Locação" iconGf="approval_delegation" setOpenMenu={setOpen} />
                            <LinkMenu
                                to='/simularprevenda'
                                title="Simular Pré-Venda"
                                iconGf="contract_edit"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu to='/ordemdecompras' title="Ordem de Compras" iconGf="assignment_add" setOpenMenu={setOpen} />
                            {/* <LinkMenu to='/comanda' title="Comanda" iconGf="edit_square" setOpenMenu={setOpen} /> */}
                            <LinkComanda
                                to={`https://comanda.webcontrolempresas.com.br/`}
                                title="Comanda (Pizza / Restaurante)"
                                iconGf="local_pizza"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu to='/frente-caixa' title="Frente de Caixa" iconGf="point_of_sale" setOpenMenu={setOpen} />
                            <LinkMenu to='/relatoriosfinanceiros' title="Relatórios Financeiros" iconGf="finance" setOpenMenu={setOpen} />
                            <LinkMenu to='/mapeamentoentrega' title="Mapeamento de Entrega" iconGf="map" setOpenMenu={setOpen} />
                            <LinkMenu to='/financeiro/boleto' title="Vendas no Boleto" iconGf="barcode" setOpenMenu={setOpen} />
                            <LinkMenu
                                to='/financeiro/crediario'
                                title="Vendas no Crediário"
                                iconGf="account_balance_wallet"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu to='/financeiro/carne' title="Vendas no Carnê" iconGf="wallet" setOpenMenu={setOpen} />
                            <LinkMenu to='/financeiro/promissoria' title="Promissória" iconGf="checkbook" setOpenMenu={setOpen} />
                            {/* <LinkMenu to='/vendascheque' title="Cheque" iconGf="local_atm" setOpenMenu={setOpen} /> */}
                            {/* <LinkMenu to='/vendasdinheiro' title="Dinheiro" iconGf="payments" setOpenMenu={setOpen} /> */}
                            {/* <LinkMenu to='/transferencia' title="Transferência (DOC/TED)" iconGf="request_quote" setOpenMenu={setOpen} /> */}
                            {/* <LinkMenu
                                to='/cartaodebito'
                                title="Cartão de Débito"
                                iconGf="universal_currency_alt"
                                setOpenMenu={setOpen}
                            /> */}
                            {/* <LinkMenu to='/cartaocredito' title="Cartão de Crédito" iconGf="credit_card" setOpenMenu={setOpen} /> */}
                        </MenuList>
                    </MenuColumn>
                    <MenuColumn xs={12} md={4} lg={2}>
                        <TitleMenu title="Consultar e Localizar" />
                        <MenuList>
                            <LinkMenu to='/consultapf' title="Consulta Pessoa Física" iconGf="conditions" setOpenMenu={setOpen} />
                            <LinkMenu
                                to='/consultapj'
                                title="Consulta Pessoa Jurídica"
                                iconGf="content_paste_search"
                                setOpenMenu={setOpen}
                            />
                            {/* <LinkMenu to='/consultacheques' title="Consulta de Cheques" iconGf="find_in_page" setOpenMenu={setOpen} /> */}
                            <LinkMenu
                                to='/consultaveiculares'
                                title="Consulta Veiculares"
                                iconGf="directions_car"
                                setOpenMenu={setOpen}
                            />
                        </MenuList>
                    </MenuColumn>
                    <MenuColumn xs={12} md={4} lg={2}>
                        <TitleMenu title="Negativar e Receber" />
                        <MenuList>
                            <LinkMenu to='/recupere' title="Parcelar Débitos" iconGf="price_change" setOpenMenu={setOpen} />
                            {/* <LinkMenu to='/localizamax' title="Localizar Pessoas" iconGf="group_search" setOpenMenu={setOpen} /> */}
                            <LinkMenu to='/registro' title="Negativar Devedores" iconGf="person_remove" setOpenMenu={setOpen} />
                            <LinkMenu to='/protesto' title="Encaminhar para Protesto" iconGf="gavel" setOpenMenu={setOpen} />
                            {/* <LinkMenu to='/recomendo' title="Não Recomendar" iconGf="thumb_down" setOpenMenu={setOpen} /> */}
                        </MenuList>
                    </MenuColumn>

                    <MenuColumn xs={12} md={4} lg={2}>
                        <TitleMenu title="Crescimento Empresarial" />
                        <MenuList>
                            <LinkMenu
                                to='/maladireta'
                                title="Mala Direta | Novos Clientes"
                                iconGf="contact_mail"
                                setOpenMenu={setOpen}
                            />
                            <LinkMenu
                                to='/emailmarketing'
                                title="E-mail Marketing"
                                iconGf="stacked_inbox"
                                setOpenMenu={setOpen}
                            />
                            {/* <LinkMenu to='/torpedos' title="Torpedos" iconGf="sms" setOpenMenu={setOpen} /> */}
                            <LinkMenu to='/whatsapp' title="WhatsApp Marketing" iconGf="chat" setOpenMenu={setOpen} />
                            <LinkMenu to='/cartaofid' title="Cartão Fidelidade" iconGf="local_activity" setOpenMenu={setOpen} />
                            <LinkMenu to='/cupom_desconto' title="Cupom de Desconto" iconGf="loyalty" setOpenMenu={setOpen} />
                            {/* <LinkMenu to='/campanha_publicitaria' title="Campanha Publicitária" iconGf="campaign" setOpenMenu={setOpen} /> */}
                            <LinkMenu to='/whatsapp-manual' title="WhatsApp Manual" iconGf="" setOpenMenu={setOpen} />
                            <LinkMenu to={`https://meligue.ai/`} title="Me Ligue aí" iconGf="phone" setOpenMenu={setOpen} />
                        </MenuList>
                    </MenuColumn>
                    <MenuColumn xs={12} md={4} lg={2}>
                        <TitleMenu title="Comércio Online" />
                        <MenuList>

                            <LinkMenu
                                to='/minha-loja-virtual'
                                title="Minha Loja Virtual"
                                iconGf="storefront"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            />

                            {/* <NovosPedidosAlert
                baseUrl={baseUrl}
                endpoint={`${baseUrl}${NOVOS_PEDIDOS_ENDPOINT_PATH}`}
                to={novosPedidosUrl}
                onNavigate={handleOpenNovosPedidos}
              /> */}

                            <LinkMenu
                                to='/meu-site'
                                title="Meu Site"
                                iconGf="captive_portal"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            />

                            <LinkMenu
                                to='/catalogo'
                                title="Catálogo"
                                iconGf="book"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            />

                            <LinkMenu
                                to='mercado-livre'
                                title="Mercado Livre"
                                iconSrc="/mercado_livre_icon.png"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            />

                            {/* <LinkMenu
                                to='americanas-marketplace'
                                title="Americanas Marketplace"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            /> */}

                            {/* <LinkMenu
                                to='submarino-marketplace'
                                title="Submarino Marketplace"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            /> */}

                            {/* <LinkMenu
                                to='shoptime-marketplace'
                                title="Shoptime Marketplace"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            /> */}

                            {/* <LinkMenu
                                to='novos-pedidos-b2w'
                                title="Novos Pedidos B2W"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            /> */}

                            <LinkMenu
                                to='/shopee'
                                title="Shopee Marketplace"
                                iconSrc="/shopee_icon.png"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            />

                            <LinkMenu
                                to='/ifood'
                                title="iFood Marketplace"
                                iconSrc="/ifood_icon.png"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            />

                            <LinkMenu
                                to='/food99'
                                title="99 Food"
                                iconSrc="/99food_icon.png"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            />

                            {/* <LinkMenu
                                to='/magalu'
                                title="Magalu Marketplace"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            /> */}

                            {/* <LinkMenu
                                to='novos-pedidos-ifood'
                                title="Novos Pedidos iFood"
                                iconSrc="/ifood_icon.png"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            /> */}

                            <LinkMenu
                                to='/catalogodigital'
                                title="Catálogo Digital"
                                iconSrc="/catalogo_digital_icon.png"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            />

                            <LinkMenu
                                to='/melhorenvio'
                                title="Melhor Envio"
                                iconSrc="/melhor_envio_icon.png"
                                setOpenMenu={setOpen}
                                exigirModuloLoja
                            // moduloLoja={moduloLoja}
                            />

                        </MenuList>
                    </MenuColumn>

            </NavMenu>
        </>
    );
};

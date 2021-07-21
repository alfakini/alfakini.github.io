---
title: "Interoperabilidade em Saúde: construir pontes para uma medicina baseada em valor"
slug: interoperabilidade-saude
abstract: "Estamos passando por uma grande transformação digital no mercado de saúde. Provedores de saúde tradicionais melhoraram diversos processos, trocando arquivos de papel por processos eletrônicos. Mas ainda enfrentamos um grande problema: a interoperabilidade dos dados."
authors: Alan R. Fachini
date: 2021-07-12T13:17:13-03:00
category: essay
tags: ["heathtech", "interoperability", "health", "innovation"]
cover: ./cover.png
images: ["./banner.png"]
published: true
---

> Este texto apareceu primeiro no [blog da Magrathea](https://blog.magrathealabs.com/interoperabilidade-em-sa%C3%BAde-construir-pontes-para-uma-medicina-baseada-em-valor-acc87ce6df48).

Estamos passando por uma grande transformação digital no mercado de saúde. Provedores de saúde tradicionais melhoraram diversos processos, trocando arquivos de papel por processos eletrônicos. Uma onda de _healthtechs_ surgiu trazendo soluções inovadoras para o mercado.

Este movimento trouxe um avanço significativo. Porém, ainda enfrentamos barreiras de integração e padronização dos dados. Os vários sistemas disponíveis são desenvolvidos isoladamente, levando a comunicações conflituosas quando são integrados. Com tantos sistemas sendo desenvolvidos e integrados em rede, as questões de interoperabilidade devem ser priorizadas no desenvolvimento dos sistemas.

![Banner Interoperabilidade em Saúde](./banner.png)

Através da ponte da interoperabilidade, podemos desenvolver um ecossistema distribuído de serviços de saúde onde profissionais e pacientes podem facilmente trocar informações de prontuário e histórico de saúde, com a garantia de que estão corretas, completas e em um formato compatível. Nesse ambiente os pacientes podem ter controle dos seus dados e aprovar o que pode ser compartilhado com operadores de saúde. Um plano de saúde pode fazer a análise de dados do histórico de saúde do paciente, recomendando procedimentos que melhorem a sua saúde e diminuam os gastos futuros com intervenções.

Não existe uma definição única para interoperabilidade, muito menos interoperabilidade na área da saúde, por que seu significado depende do contexto em que a palavra está sendo usada. Uma definição geral usada é a da IEEE, que define interoperabilidade como a habilidade ou capacidade de dois ou mais sistemas trocarem e processarem informações entre si.

Podemos entender a **interoperabilidade em saúde como a capacidade de diferentes sistemas, dispositivos e aplicativos de acessar, trocar, integrar e usar cooperativamente os dados de forma coordenada**. O objetivo é fornecer portabilidade de informações, otimizar a saúde dos pacientes, reduzir os custos assistenciais e minimizar o retrabalho das equipes. Deseja-se que, com uma linguagem comum, clínicas, hospitais e farmácias se comuniquem em um mesmo padrão, facilitando o desenvolvimento de uma visão holística dos pacientes, apesar da variação nas tecnologias usadas.

### O problema

A dificuldade em integrar sistemas de saúde cria um sistema de desperdícios que contribui para o esgotamento clínico e desperdício de bilhões de dólares por ano. Apesar de muita inovação sendo desenvolvida no mercado de saúde, temos um crescimento dos custos assistenciais decorrentes da falta de visibilidade dos dados necessários para melhorar a tomada de decisão.

### Padrões de interoperabilidade (solução)

A HIMSS (_Healthcare Information and Management Systems Society_) define uma [classificação dos padrões](https://www.himss.org/resources/interoperability-healthcare) atualmente adotados ou em discussão. Os padrões fornecem uma linguagem comum e um conjunto de expectativas que permitem a interoperabilidade entre sistemas e dispositivos.

Os **padrões de conteúdo** definem a estrutura e organização da mensagem ou conteúdo do documento. O [FHIR](https://www.hl7.org/fhir/) (_Fast Healthcare Interoperability Resources_) é definido pela HL7 com essa finalidade. Define um conjunto de APIs para a web, incluindo o protocolo RESTful para representação de dados.

Recentemente, a Apple anunciou o suporte a registros eletrônicos de saúde em seu aplicativo de saúde, utilizando APIs no padrão FHIR para compartilhamentos de dados. Todos os dados coletados pela aplicação agora poderão ser compartilhados com outros sistemas de saúde. Os tipos de dados com suporte são alergias, condições, imunizações, resultados de laboratório, medicamentos, procedimentos e sinais vitais.

Os **padrões de terminologia** tratam da representação de conceitos de maneira a evitar ambiguidades entre um emissor e um receptor de informações. O [LOINC](https://loinc.org/) (_Logical Observation Identifiers Names and Codes_) é um sistema universal de códigos e identificadores de registros eletrônicos para identificar medições, observações, terminologias e documentos.

Imagine o problema que seria se um sistema representasse uma dose de um remédio em mg e o outro em mcg? Os prestadores de planos de saúde, por exemplo, frequentemente negociam contratos de reembolso de cuidados dos seus usuários fora da sua área de cobertura. Os relatórios de reembolso fazem uso de uma codificação exclusiva para acionar o pagamento de um sinistro.  Têm um padrão de códigos único e garantir a interoperabilidade deles pode representar um investimento significativo de trabalho humano e capital.

Os **padrões de transporte** tratam do formato das mensagens trocadas entre sistemas de computador, arquitetura de documentos, modelos clínicos e interface de usuário. O DICOM (_Digital Imaging and Communications in Medicine_) é aplicado especificamente para a comunicação e gerenciamento de informações de imagens médicas e dados relacionados. O DICOM permite a transferência de imagens médicas entre sistemas e facilita o desenvolvimento e a expansão de sistemas de comunicação e arquivamento de imagens.

Os **padrões de identificação** buscam solucionar o problema da identificação de pacientes e dispositivos. O padrão OID (_Object Identifier_) definido pela ISO é o mais popular atualmente.

Com o uso crescente de IoT e o desenvolvimento das tecnologias de blockchain e web 3, a W3C está desenvolvendo especificações para implementação de identidades únicas descentralizadas como proposto pelos [DIDs](https://www.w3.org/TR/did-core/) (_Decentralized Identifies_). Um DID é como se fosse um RG, CPF ou CNPJ, podendo identificar uma pessoa, organização, coisa, modelo de dados, entidade abstrata. Os DIDs foram projetados para que possam ser separados dos registros centralizados, provedores de identidade e autoridades de certificação. Dessa forma, pacientes podem ter controle sobre sua identidade, sendo responsáveis por dar permissão de leitura ou escrita dos seus dados para médicos, hospitais, clínicas e farmácias.

Os **padrões de privacidade** visam proteger o direito de um indivíduo (ou organização) de determinar se, o quê, quando, por quem e com que finalidade suas informações pessoais de saúde são coletadas, acessadas, usadas ou divulgadas. Os padrões de segurança definem um conjunto de ações administrativas, físicas e técnicas para proteger a confidencialidade, disponibilidade e integridade das informações de saúde.

No Brasil, podemos entender a Lei Geral de Proteção de Dados - LGPD, nº 13.709 como o padrão de segurança e privacidade para os dados de saúde. Embora tenha sido redigida para um contexto digital, a lei alcança os meios não digitais como os registros e prontuários médicos físicos. Na prática, o que deverá ser implementado por profissionais e organizações de saúde é a adequação e conformidade, o que significa dizer que deverão ser implementados registros, procedimentos, protocolos, sistemas e rotinas capazes de assegurar o devido cumprimento da Lei.

Além dos dados pessoais, deve-se considerar como dados sensíveis qualquer dado relacionado à prestação dos serviços de saúde, gerados por observação clínica ou por exame diagnóstico relacionados à pessoa. Na lei os dados de saúde são abordados de uma forma diferente dos dados pessoais padrões. Toda informação, seja de natureza diagnóstica ou terapêutica, desde que colhida nesses contextos, é considerada dado de saúde, sendo de responsabilidade de quem a colheu zelar pelos dados e buscar a conformidade para tratá-los de forma adequada com privacidade e segurança.

Além dos padrões descritos, existem iniciativas de padronização em camadas de aplicação. O [openEHR](http://openehr.org.br/) é um exemplo. Seu foco principal é em prontuários eletrônicos e sistemas de Registro Eletrônico de Saúde (EHR). O EHR é um registro eletrônico de informações que gira em torno da saúde das pessoas, ocasionando uma análise mais completa de seus históricos clínicos sobre os atendimentos de saúde prestados na rede do Sistema Único de Saúde – SUS e seus parceiros.

### Adoção dos padrões no Brasil

Embora ainda tenhamos muito espaço para melhorar, já temos progresso na indústria. No Brasil, a Política Nacional de Informação e Informática em Saúde (PNIIS) busca dar um norte neste sentido, focando na falta de padronização dos procedimentos para obtenção e tratamento dos dados em saúde. A interoperabilidade dos sistemas de saúde é condição central da política nacional, tendo em vista que só a partir desta integração será possível ter um processo de decisão coerente, alinhado com as necessidades da população.

Tecnicamente, o serviço público de saúde está executando sua estratégia de interoperabilidade através da [Rede Nacional de Dados em Saúde](https://rnds.saude.gov.br/solucao-tecnologica/) (RNDS), que funciona como uma camada de interoperabilidade mantida pelo DATASUS, operando de forma federada entre os estados. Em sua primeira fase, a RNDS permite compartilhamento de resultados de exames da COVID-19 realizados em qualquer lugar do país por meio de serviços desenvolvidos de acordo com o padrão FHIR e utilizando a terminologia LOINC, padrões de interoperabilidade usados mundialmente.

### Conclusão

Qualquer produto com foco no consumidor de saúde que não se integrar bem aos sistemas de saúde,  hospitais, ambulatórios e fluxos de trabalho de médicos estará condenado.

Não há nada de único na saúde que justifique a complexidade, alto custo e especialização tecnológica. Na realidade, existem diversos fluxos de trabalho que podem ser adaptados e otimizados com tecnologias comuns.

O lançamento recente da Apple representa um marco que deve levar outras plataformas a seguir o mesmo caminho, forçando o mercado a se interoperar para se comunicar com seus clientes. Esse tipo de aplicação coloca o histórico de saúde dos pacientes sob sua própria responsabilidade, seguindo a tendência de outras aplicações que rodam na web.

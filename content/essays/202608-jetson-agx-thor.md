---
title: 'Instalando o JetPack 7.2.1 na Jetson AGX Thor'
description: 'Por que o instalador termina em "Unsupported board!", como uma correção parcial pode deixar o NVMe sem boot e o caminho seguro pelo SDK Manager.'
published_at: '2026-08-29'
tags: ['nvidia', 'jetson', 'linux']
status: draft
locale: pt-BR
slug: jetson-agx-thor-jetpack-7-2-1
---

Instalar o JetPack 7.2.1 em um Jetson AGX Thor novo parece simples. A página oficial da NVIDIA oferece uma ISO para gravar em um pendrive, iniciar o kit e instalar o sistema no NVMe. Foi esse o caminho que tentei, mas o instalador retornou o seguinte erro:

```text
board='NVIDIA Jetson Thor Developer Kit'
...
Unsupported board!
```

O pendrive inicializava e o instalador identificava a placa, mas classificava o módulo como incompatível. O modelo registrado no meu equipamento é `NVIDIA Jetson Thor Developer Kit`. O script `/ai/jetsoniso_setup.bash`, incluído na ISO, procura por outra string: `NVIDIA Jetson AGX Thor Developer Kit`. Como o valor gravado no equipamento não contém `AGX`, o script termina com o erro `Unsupported board!` e aborta. Outro usuário reproduziu o mesmo comportamento no fórum da NVIDIA [^modelo].

Outro usuário do fórum alterou a verificação do modelo manualmente. O instalador avançou, mas um dos comandos finais terminou com o erro `No matching -nv DTB found for running board` [^dtb].

A instalação falha no fim. Parte do sistema já foi copiada para o NVMe, mas os comandos seguintes não rodam. Eles configuram a EFI, atualizam o bootloader e o firmware e preparam os pacotes. O NVMe fica com uma instalação incompleta e não inicializa.

O JetPack 7.2.1 inclui o Jetson Linux 39.2.1, publicado em 11 de agosto de 2026. Na data desta publicação, a página oficial ainda oferecia a ISO com esse problema e listava o Jetson AGX Thor como hardware compatível [^jetpack].

## O caminho seguro pelo SDK Manager

O SDK Manager oferece os métodos `Direct Flash` e `ISO Flash`. Para evitar o instalador autônomo com defeito, usei o `Direct Flash`, que a NVIDIA descreve como o método recomendado [^direct-flash]. O aplicativo pode solicitar um segundo pendrive durante o processo.

O SDK Manager exige autenticação como NVIDIA Developer e um host x86_64. Não consegui usar minha NVIDIA AGX Orion porque o host não pode ser arm64. A documentação recomenda o Ubuntu 24.04, mas concluí o procedimento com sucesso no Ubuntu 26.04 [^requisitos].

A conexão física entre o host e o Thor também exige atenção, porque as portas USB-C têm funções diferentes. Conecte a alimentação à porta 5b. Conecte o cabo de dados do host à porta 5a, ao lado da saída HDMI.

Baixei o pacote `.deb` do SDK Manager pela página oficial e instalei o pacote no Ubuntu: [^download]

```bash
sudo apt install ./sdkmanager_*.deb
sdkmanager
```

Depois do login, conecte a Thor via USB e siga essas etapas:

1. Selecionar a categoria de produto `Jetson`.
2. Selecionar `Jetson AGX Thor Developer Kit` como hardware de destino.
3. Selecionar o JetPack compatível e o método `Direct Flash`.
4. Revisar os componentes, aceitar as licenças e iniciar o download.
5. Quando solicitado, colocar o Thor em Force Recovery Mode.
6. Escolher o NVMe como armazenamento de destino e seguir as instruções para o pendrive adicional.
7. Concluir o flash e desligar completamente o Thor antes de ligá-lo novamente.
8. Finalizar a configuração inicial no monitor e, quando solicitado, informar as credenciais ao SDK Manager para instalar componentes adicionais.

Para entrar manualmente em Force Recovery Mode, mantenha o botão Recovery pressionado, pressione o botão Reset e solte o Recovery. Confira a conexão no host com o comando `lsusb`. O dispositivo em modo de recuperação deve aparecer como NVIDIA APX. Para o T5000, a documentação identifica o dispositivo USB como `0955:7026` [^flash].

Depois de instalar o sistema, desligue completamente o AGX Thor, incluindo a alimentação, antes de ligá-lo novamente.

## Validando a instalação

No primeiro boot, verifique a versão do Jetson Linux:

```bash
cat /etc/nv_tegra_release
```

Depois, use o comando `tegrastats` para confirmar que o sistema reconhece os recursos da plataforma:

```bash
sudo tegrastats
```

[^modelo]: Relato no fórum da NVIDIA com duas unidades novas: [Unsupported board installation issue: install script mismatch with JetPack r39.2.0](https://forums.developer.nvidia.com/t/unsupported-board-installation-issue-install-script-mismatch-with-jetpack-r39-2-0/373157)
[^dtb]: Resposta do engenheiro da NVIDIA: [JetPack 7.2.1 ISO on a new AGX Thor DevKit: after fixing "Unsupported board", install fails again at DTB matching](https://forums.developer.nvidia.com/t/jetpack-7-2-1-iso-on-a-new-agx-thor-devkit-after-fixing-unsupported-board-install-fails-again-at-dtb-matching-and-leaves-nvme-unbootable-workaro/380595)
[^jetpack]: Página oficial com os componentes e downloads do [JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads)
[^direct-flash]: Guia oficial do SDK Manager para [instalar o software Jetson com Direct Flash](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson-direct-flash/index.html)
[^requisitos]: Requisitos gerais do [SDK Manager](https://docs.nvidia.com/sdk-manager/system-requirements/index.html) e [matriz de compatibilidade dos SDKs](https://developer.nvidia.com/sdk-manager)
[^download]: Documentação oficial para [baixar e executar o SDK Manager](https://docs.nvidia.com/sdk-manager/download-run-sdkm/index.html)
[^flash]: Guia do Jetson Linux R39.2.1 sobre [flash com `Linux_for_Tegra` e initrd](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/SD/FlashingSupport.html)

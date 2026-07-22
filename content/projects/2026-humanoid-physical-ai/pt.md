---
title: Physical AI em humanoides
description: Investigação em teleoperação, coleta de demonstrações e modelos vision-language-action com o humanoide Unitree G1.
category: software
tags:
  - hardware
  - software
  - unitree-g1
  - physical-ai
  - machine-learning
institutions:
  - MobiLab UDESC
start_at: "2026"
end_at: null
gallery:
  - "./mobillab-humanoids.webp"
  - "./unitree-g1-first-teleoperation.webp"
  - "./unitree-g1-gort.webp"
  - "./unitree-g1-teleoperation-tests.webp"
links:
  - label: MobiLab UDESC
    href: https://mobilab.joinville.udesc.br/guides/unitree-g1
---

O trabalho com o [LeRobot](/projects/2025-physical-ai/) e braços robóticos educacionais foram o ponto de partida para investigar Physical AI em tarefas de manipulação em humanoides, trabalho que tenho feito em colaboração com o MobiLab da UDESC.

![Eu no MobiLab com robôs humanoides e quadrúpedes](./mobillab-humanoids.webp)

Nos últimos meses, tenho trabalhado com o G1 da Unitree. Esses robôs seguem um protocolo simples baseado em DDS e possuem bons SDKs. Mas fazer qualquer coisa neles, além de usar o controle remoto, é um desafio. Antes de enviar comandos, é preciso verificar sua máquina de estados. É necessário estar atento ao controle das juntas, à integração das câmeras e a uma conexão estável entre o computador de desenvolvimento e o robô. Não é apenas um computador, são diversos computadores trocando mensagens. Estou registrando esse processo na [wiki do MobiLab](https://mobilab.joinville.udesc.br/guides/unitree-g1).

![Primeiro teste de teleoperação do Unitree G1](./unitree-g1-first-teleoperation.webp)

Configurei uma primeira versão da teleoperação com um Meta Quest 3, câmeras RealSense e controle dos braços do G1. Com essa estrutura, já consigo gravar demonstrações de tarefas de manipulação. Cada gravação reúne os movimentos do operador, as imagens das câmeras e os comandos enviados ao robô. Ainda preciso melhorar a qualidade e a consistência dessas demonstrações. O vídeo abaixo mostra um dos primeiros testes.

![Primeiro teste de teleoperação do Unitree G1](/projects/2026-humanoid-physical-ai/unitree-g1-first-teleoperation.mp4)

Essas demonstrações serão usadas para testar modelos Vision-Language-Action, como o Isaac GR00T e o ACT. Primeiro, quero avaliar as políticas em simulação. Depois, vou testá-las no robô com limites de segurança e execução gradual. O problema mais prático que estou explorando é descobrir ou desenvolver métodos de teleoperação, treinamento e execução que sejam economicamente viáveis no Brasil.

![Segundo teste de teleoperação do Unitree G1, conduzido por Luca Mateo Rangel](/projects/2026-humanoid-physical-ai/unitree-g1-second-teleoperation.mp4)

No MobiLab, trabalho em parceria com Luca Mateo Rangel, que conheci durante o hackathon LeRobot. Nosso plano é documentar a configuração do G1 e transformar tarefas recorrentes em scripts e configurações reutilizáveis. Isso deve reduzir o tempo necessário para preparar o robô, iniciar a teleoperação e repetir os testes de coleta de dados em futuros projetos do laboratório.

![O G1 usado neste projeto se chama Gort](./unitree-g1-gort.webp)


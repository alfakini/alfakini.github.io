---
title: Open-source Physical AI
description: Experimentos em Physical AI, modelos vision-language-action e o framework LeRobot da Hugging Face.
category: hardware
tags:
  - robotics
  - physical-ai
  - vision-language-action
  - machine-learning
  - lerobot
  - hackathon
institutions:
  - Fab Lab Joinville
start_at: "2025"
end_at: null
gallery:
  - "./lerobot-arm-test.webp"
  - "./lerobot-arm-llama.webp"
  - "./lerobot-arm-workbench.webp"
  - "./lerobot-arm-team.webp"
links:
  - label: Fab Lab Joinville
    href: https://www.fablabjoinville.com.br/lerobot
  - label: LeRobot
    href: https://huggingface.co/lerobot
---

No fim de 2024, iniciei uma investigação sobre aplicações de machine learning na robótica ([Physical AI](https://www.nvidia.com/en-us/glossary/generative-physical-ai/)), com foco em modelos [vision-language-action (VLA)](https://en.wikipedia.org/wiki/Vision%E2%80%93language%E2%80%93action_model). Nesse contexto, conheci o [LeRobot](https://huggingface.co/lerobot), iniciativa open source da Hugging Face, e passei a usar o braço robótico SO-100 como plataforma de experimentação.

O LeRobot reúne modelos pré-treinados, conjuntos de dados e ferramentas para coletar demonstrações, treinar políticas de controle e operar braços robóticos. A plataforma torna mais acessível o processo de transformar demonstrações humanas em comportamentos reproduzíveis por uma máquina, embora os desafios da interação com o mundo físico permaneçam.

![Demonstração inicial do braço robótico SO-100 em operação](https://www.youtube.com/embed/JoBxtyoMcVU)

Os experimentos foram conduzidos em um notebook Avell equipado com uma GPU NVIDIA RTX 3070. A coleta de dados mostrou-se a etapa mais determinante do processo. Cada demonstração exigia movimentos consistentes, bom posicionamento das câmeras e execução precisa da tarefa. Variações aparentemente pequenas na trajetória, no enquadramento ou na manipulação dos objetos afetam diretamente a qualidade do conjunto de dados e, consequentemente, o comportamento aprendido pelo robô.

![Braço robótico SO-100 durante os testes de coleta de demonstrações](./lerobot-arm-test.webp)

Uma das aplicações investigadas surgiu em conversas com profissionais da indústria têxtil: treinar o braço para dobrar roupas. Embora seja uma tarefa cotidiana para uma pessoa, ela exige que o sistema lide com um objeto flexível, sujeito a variações de posição e de forma. O experimento foi um recorte útil para entender como uma atividade manual pode ser modelada, demonstrada e refinada com base em dados.

![Protótipos com o SO-100 explorando tarefas de manipulação](https://www.youtube.com/embed/r110BE01Lc4)

## Hackathon mundial

O [LeRobot Arm Hackathon](https://huggingface.co/LeRobot-worldwide-hackathon) foi um evento internacional promovido pela Hugging Face. Inscrevemos o Fab Lab Joinville para sediar a edição brasileira do evento. A iniciativa reuniu a comunidade de tecnologia de Joinville para um fim de semana de exploração prática da plataforma.

O vídeo abaixo registra os desafios, as equipes e as demonstrações que marcaram o evento:

![Resumo do LeRobot Arm Hackathon no Fab Lab Joinville](https://www.youtube.com/embed/D-8BeTLw0Ts)

### Projetos apresentados

As equipes exploraram aplicações distintas para o braço robótico, da interação lúdica à teleoperação e à manipulação de objetos. Abaixo estão alguns dos projetos apresentados que eu mais gostei, e seus vídeos finais.

**João Sem Braço**

Uma demonstração de interação lúdica em que o braço robótico participa de uma partida de UNO.

![Projeto João Sem Braço, braço robótico jogando UNO](https://www.youtube.com/embed/W44R6tbQoQQ)
**Sbórshchiki frúktov**

Proposta de colheita de maçãs, investigando como o braço pode identificar, alcançar e manipular frutas.

![Projeto Sbórshchiki frúktov, demonstração de colheita de maçãs](https://www.youtube.com/embed/Y59PQFnyhKA)

**L.A.E.L.E**

Experimento de force feedback para incorporar retorno tátil à operação do braço.

![Projeto L.A.E.L.E, demonstração de force feedback no braço robótico](https://www.youtube.com/embed/xiteXLiU1gY)

**LAPESP**

Controle do braço robótico diretamente pelo navegador, explorando uma interface web para operação remota.

![Projeto LAPESP, controle do braço robótico pelo navegador](https://www.youtube.com/embed/1fSqf7M4q1s)

O time que organizou o evento:

![Participantes do LeRobot Arm Hackathon reunidos no Ágora Tech Park](./lerobot-arm-team.webp)

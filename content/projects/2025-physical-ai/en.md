---
title: Open-source Physical AI
description: Experiments in Physical AI, vision-language-action models, and Hugging Face's LeRobot framework.
category: hardware
tags:
  - robotics
  - physical-ai
  - vision-language-action
  - machine-learning
  - lerobot
  - hackathon
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

At the end of 2024, I began investigating machine learning applications in robotics ([Physical AI](https://www.nvidia.com/en-us/glossary/generative-physical-ai/)), with a focus on [vision-language-action (VLA)](https://en.wikipedia.org/wiki/Vision%E2%80%93language%E2%80%93action_model) models. In that context, I discovered [LeRobot](https://huggingface.co/lerobot), Hugging Face's open-source initiative, and began using the SO-100 robotic arm as an experimental platform.

LeRobot brings together pre-trained models, datasets, and tools to collect demonstrations, train control policies, and operate robotic arms. The platform makes it more accessible to turn human demonstrations into behaviors that a machine can reproduce, though the challenges of interacting with the physical world remain.

![Initial demonstration of the SO-100 robotic arm in operation](https://www.youtube.com/embed/JoBxtyoMcVU)

The experiments were conducted on an Avell laptop equipped with an NVIDIA RTX 3070 GPU. Data collection proved to be the most critical stage of the process. Each demonstration required consistent movements, well-positioned cameras, and precise task execution. Seemingly small variations in trajectory, framing, or object handling directly affect dataset quality and, consequently, the robot's learned behavior.

![SO-100 robotic arm during demonstration collection tests](./lerobot-arm-test.webp)

One of the applications emerged from conversations with textile industry professionals: training the arm to fold clothes. Although it is an everyday task for people, it requires the system to handle a flexible object whose position and shape can vary. The experiment was a useful way to understand how a manual activity can be modeled, demonstrated, and refined with data.

![SO-100 prototypes exploring object-manipulation tasks](https://www.youtube.com/embed/r110BE01Lc4)

## Worldwide hackathon

The [LeRobot Arm Hackathon](https://huggingface.co/LeRobot-worldwide-hackathon) was an international event organized by Hugging Face. We registered Fab Lab Joinville to host the Brazilian edition. The initiative brought Joinville's technology community together for a weekend of hands-on exploration of the platform.

The video below captures the challenges, teams, and demonstrations that shaped the event:

![LeRobot Arm Hackathon recap at Fab Lab Joinville](https://www.youtube.com/embed/D-8BeTLw0Ts)

### Featured projects

The teams explored different applications for the robotic arm, from playful interaction to teleoperation and object manipulation. Below are some of the projects I enjoyed most, along with their final videos.

**João Sem Braço**

A playful interaction demonstration in which the robotic arm takes part in a game of UNO.

![João Sem Braço project, robotic arm playing UNO](https://www.youtube.com/embed/W44R6tbQoQQ)

**Sbórshchiki frúktov**

An apple-harvesting proposal that explores how the arm can identify, reach, and handle fruit.

![Sbórshchiki frúktov project, apple-harvesting demonstration](https://www.youtube.com/embed/Y59PQFnyhKA)

**L.A.E.L.E**

A force-feedback experiment that adds tactile feedback to operating the arm.

![L.A.E.L.E project, force-feedback demonstration with the robotic arm](https://www.youtube.com/embed/xiteXLiU1gY)

**LAPESP**

Control of the robotic arm directly from a browser, exploring a web interface for remote operation.

![LAPESP project, browser-based robotic arm control](https://www.youtube.com/embed/1fSqf7M4q1s)

The team that organized the event:

![LeRobot Arm Hackathon participants gathered at Agora Tech Park](./lerobot-arm-team.webp)

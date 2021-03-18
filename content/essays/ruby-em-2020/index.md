---
title: O Ruby em 2020
slug: ruby-em-2020
abstract: Ruby tem um histórico interessante de inovações que foram sendo absorvidas, e também criticadas, pela nossa indústria. Neste artigo falamos sobre o estado atual da linguagem de programação por trás do Ruby on Rails e sua comunidade.
authors: Alan R. Fachini
date: 2020-12-10T13:17:13-03:00
category: Software Engineering
tags: ["ruby", "programming"]
cover: ./cover.png
images: ["./banner.png"]
published: true
---

> Este texto apareceu primeiro na newsletter [The Magrathea Times](http://bit.ly/themagtim) e no [blog da Locaweb](https://blog.locaweb.com.br/desenvolvedores/ruby-3-0-o-que-sabemos-ate-agora/).

O final deste ano pede que a gente fale sobre a linguagem Ruby.

Em Outubro tivemos a tradicional [RubyConfBrasil](https://online.rubyconf.com.br/) e em Dezembro a [RubySummitBrasil](https://ruby.com.br/), um evento completamente organizado pela comunidade brasileira. Além disso, há a promessa de lançamento da versão estável do Ruby 3.0, um evento esperado a alguns anos.

![E o Ruby, como vai?](./banner.png)

Ruby tem um histórico interessante de inovações que foram sendo absorvidas, e também criticadas, pela nossa indústria. O grande atrativo do Ruby está na sua expressividade, o que dá uma grande velocidade de desenvolvimento, mas além disso, a sua missão de tornar a vida dos profissionais melhor. Tecnologia é difícil, e uma linguagem fácil de ler diminui o esforço cognitivo, fazendo com que a gente foque menos nas tecnicalidades e mais no valor que queremos gerar.

A linguagem ganhou popularidade por causa do seu uso no [framework Rails](https://rubyonrails.org/), lançado em 2003, apenas dois anos após o lançamento do [manifesto para desenvolvimento ágil de software](https://agilemanifesto.org/iso/ptbr/principles.html). Não existe coincidência aqui, os valores e princípios do movimento se refletem diretamente na forma de desenvolver software dentro da comunidade Ruby. Não só tecnicamente, mas também na busca por geração de valor. Não é a toa que muitos dos manifestantes originais abraçaram profissionalmente o Ruby on Rails.

> Contínua atenção à excelência técnica e design aumenta a agilidade.

Várias das práticas de qualidade que hoje são amplamente difundidas no nosso meio começaram a ser apresentadas para uma nova geração de desenvolvedores através do Ruby e do Rails. TDD, BDD, análise estática de código e integração contínua são alguns exemplos. Toda uma geração de desenvolvedores frustrados migrou de tecnologias baseadas na JVM para essa nova coleção de tecnologias muito mais conectada com o jeito de fazer as coisas do nosso tempo.

Nossa maior prioridade é satisfazer o cliente através da entrega contínua e adiantada de software com valor agregado.

Além das práticas de qualidade de desenvolvimento, a comunidade Ruby também puxou a ideia do foco na entrega de valor para o cliente. Diversos produtos digitais, como Resultados Digitais, Vindi, Rock Content, Shopify, Zendesk, Square, Heroku e o próprio GitHub, para citar alguns, são exemplos de sucesso no uso da tecnologia, não só para [maximizar a felicidade do profissional que desenvolve software](https://rubyonrails.org/doctrine/#optimize-for-programmer-happiness), mas também para maximizar a entrega de valor para o cliente.

Entregar frequentemente software funcionando, de poucas semanas a poucos meses, com preferência à menor escala de tempo.

Ideias como o [Convention over Configuration](https://rubyonrails.org/doctrine/#convention-over-configuration), Integração Contínua e Testes Automatizados hoje em dia nem são mais discutidas como algo que devemos ou não fazer, viraram um padrão intrínseco da nossa indústria. Junto com uma pitada de outras inovações, isso possibilita que hoje a gente faça a entrega da primeira versão de um sistema em 5 minutos usando um Platform as a Service como a Heroku. Em aproximadamente 10 anos movemos a nossa indústria de um padrão de entrega de meses para horas ou minutos.

## Um momento de incerteza

Em 2009 o Ruby sofreu a sua grande crise. O Twitter, antes desenvolvido inteiramente em Rails e outras tecnologias do ecossistema, anuncia que está migrando seu back-end de mensageria para tecnologias baseadas na JVM devido a problemas de escalabilidade. A mensagem foi mal interpretada, dando a entender que produtos desenvolvidos em Rails não pudessem escalar.

Nessa época estava acontecendo uma transformação que nossa indústria ainda não entendia muito bem. Falamos sobre ela na nossa [última newsletter](https://mailchi.mp/magrathealabs/the-magrathea-times-09?utm_source=medium&utm_medium=blogpost&utm_campaign=convite), onde trouxemos as mudanças arquitetônicas que surgiram nos últimos anos decorrente da grande quantidade de dados com a qual precisamos lidar atualmente. Para esses tipos de problemas, onde há processamento de quantidades massivas de dados em tempo real, existe toda uma outra categoria de tecnologias, majoritariamente desenvolvidas em cima da JVM. A escolha era óbvia.

Essa categoria de problemas enfrentados no desenvolvimento de produtos digitais é completamente diferente dos problemas endereçados por tecnologias como o Ruby e o Rails. O Rails está focado em entregar produtos na mão dos usuários, gerando o máximo de valor possível em ciclos de validação rápida.

Da influência do Ruby, e da necessidade em lidar problemas que exigem sistemas de baixa latência, distribuídos e tolerantes a falhas, nasce em 2011 a linguagem Elixir. Essa linguagem se inspira em muitos aspectos da expressividade da linguagem Ruby, com o poder da máquina virtual do Erlang. Elixir surge como uma alternativa para lidar com problemas de processamento massivo e streaming de dados.

## Onde estamos agora?

Colheu das críticas e inovações que saíram dele para melhorar. O Ruby 3, que sai daqui a algumas semanas, promete uma mudança arquitetural da linguagem que pode aumentar seu desempenho em até 3 vezes (projeto chamado de “Ruby 3x3”). O time de desenvolvimento vem trabalhando nos últimos anos no compilador just-in-time que gera código nativo.
Para os antigos problemas de concorrência, o Ruby está introduzindo a abstração de fibers, um jeito melhor para o controle de fluxos assíncronos. Recentemente foi incluída na distribuição padrão o [Ractor](https://github.com/ruby/ruby/blob/master/doc/ractor.md), uma biblioteca que implementa a abstração de Atores em Ruby. O modelo de atores foi uma das grandes sacadas do Erlang, e que ajuda no desenvolvimento de aplicações distribuídas.

A terceira grande inovação dessa versão está relacionada com a corretude de código, com a inclusão de um type profiler que irá auxiliar na checagem de erros em tempo de compilação.

Para quem desenvolve e mantém produtos digitais desenvolvidos em Ruby, as novas atualizações trazem mudanças que podem impactar significativamente o desenvolvimento. É cedo para dizer, mas com as mudanças que estão vindo, pode deixar de ser necessário recorrer a outras tecnologias para resolver alguns problemas, como os de concorrência.
Hoje várias das inovações que a comunidade Ruby trouxe estão difundidas em outras tecnologias. Apesar disso, o Ruby, o Rails e o ecossistema ao seu redor continuam sendo ótimas opções para criação de produtos digitais. Ruby é uma linguagem com capacidade de dinamismo e metaprogramação dificilmente superadas por outras tecnologias. Para velocidade de desenvolvimento, MVPs e validações rápidas, ainda consideramos ela uma das melhores opções.

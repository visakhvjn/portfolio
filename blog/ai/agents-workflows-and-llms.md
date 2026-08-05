---
title: Agents, Workflows, and Talking to LLMs
date: 2026-08-06
description: A story-style walkthrough of AI workflows vs agents, ChatGPT vs LLMs, open models, prompting, and structured outputs.
---

Imagine you open your laptop and decide to “learn AI.”

Within ten minutes you hear the same words over and over: *workflow*, *agent*, *ChatGPT*, *LLM*, *tools*. Everyone uses them casually. Nobody slows down to say what they actually mean. So let’s walk through them the way you might discover them in real life — one confusion at a time.

## The day you automate a boring task

You have a folder of files. Every week you open them, pull out the important bits, rewrite them into a short summary, and save the result somewhere. It is dull, but predictable.

So you write a little program:

receive the file → extract the text → ask AI to summarize → save the output.

That series of steps is a **workflow**. And because one of those steps uses AI, it is an **AI workflow**.

Notice what you still own: the plan. *You* decided the order. The computer follows your map. If step three fails, you know exactly where to look. Full control. That is the quiet power of workflows — they are boring in the best way.

## Then someone asks you to build support chat

A friend says, “Can you make a customer support bot? People will ask anything — refunds, shipping, product questions, random stuff.”

Suddenly your neat map falls apart. You cannot write one fixed path for every message. The user might need docs one minute and an order lookup the next.

So instead of scripting every step, you give the system a goal (“help the customer”) and a toolbox (search docs, check orders, escalate). Then you let it choose what to do next.

That is an **agent**.

An agentic workflow is still a kind of workflow — work still gets done — but you have traded some control for flexibility. The agent decides the route. That is why chat assistants like ChatGPT feel so open-ended: they are not walking a fixed hallway. They are wandering a room full of tools, picking what fits the moment.

If you want a simple gut check:

when the path is known, build a workflow. When the questions can go anywhere, you need an agent.

## Why beginners should not start with the flashiest library

It is tempting to jump straight into something like CrewAI because demos look magical. Multi-agent teams! Autonomous everything!

But the natural story of learning is quieter.

First you learn workflows: prompts, models, fixed pipelines, predictable outputs. Then you loosen the reins and add tools — that is agents. Only then do frameworks start to feel useful instead of mysterious. The library is not the beginning of the story. It is a later chapter.

## The moment you realize ChatGPT is not “the model”

You tell a colleague, “I asked ChatGPT.” They nod. Everyone knows what you mean.

But under the hood, ChatGPT is an **application**. The thing answering is an **LLM** — a large language model, the brain that predicts text. ChatGPT wraps that brain in a product: history, model pickers, memory, file uploads, a friendly interface.

So ChatGPT talks *to* an LLM. It is not the LLM itself.

That distinction matters the day you write your own app. You will call a model API and suddenly notice something strange: the model forgets you. Every request is a fresh meeting. No memory of yesterday unless *you* send the old messages back. ChatGPT felt like it remembered because the app remembered. The model was mostly **stateless** all along.

## Two doors: company models and models on your machine

Sooner or later you stand in front of two doors.

Behind the first door are **proprietary models** — huge, capable, owned by companies. You usually reach them through an API. You create an OpenAI account, get a key, and your code starts talking to their servers. You choose a model based on what it can do and what input/output tokens cost. It is convenient. It is also someone else’s computer, which means privacy is a real question.

Behind the second door are **open models**. Many of them you can run locally with tools like **Ollama**. They come in sizes — `1b`, `4b`, `7b`, and so on — and a rough rule of thumb is that you need about twice the model size in RAM to run it comfortably. A tiny model fits on a normal laptop. A giant one does not.

So you try the small door first:

```bash
ollama pull qwen3:0.6b
```

A model downloads. You chat with something that lives on your machine. No API key. No cloud round trip. Just you and a smaller brain that fits.

Google’s **Gemma** family lives in this open world too. Some models are heavy enough that people ship **quantized** versions — optimized so they need fewer resources. Quantization is basically: same idea, lighter suitcase.

## Your prompts start out vague

Early on, you write:

“Write a product description for headphones.”

The answer is fine. Also generic. It could belong to anyone.

Then someone shows you a trick. You include two or three examples of the style you want. Suddenly the model mirrors your pattern. That is **few-shot prompting**: teaching by showing, not only by asking.

You can even keep those examples in a file and paste them into the prompt with string concatenation. Same story — you are giving the model a short memory of “what good looks like” before it writes.

## APIs grow up while you are still reading tutorials

If you follow older guides, you meet **Chat Completions**, OpenAI’s classic API. Newer code often uses the **Responses** API instead — built to make images, tool calls, and richer interactions less awkward.

You do not need to memorize every endpoint on day one. Just know the plot twist: the platform moved on, and many tutorials are still living in the previous chapter.

## The last plot twist: “return JSON” is not a promise

One day your workflow needs data a program can trust — not a paragraph, a structure.

So you write, “return as JSON.”

Sometimes it works. Sometimes the model adds a friendly sentence. Sometimes the braces break. In production, “sometimes” is a villain.

**Structured outputs** are how the story gets a reliable ending. You define a JSON schema — the shape you expect — and the model is constrained to fill that shape. Now your pipeline can parse the answer without crossing its fingers.

## Where the story leaves you

You started with a folder of files and a fixed set of steps. That was a workflow.

You met open-ended chat and handed the model tools. That was an agent.

You learned that ChatGPT is the stage, the LLM is the actor, and memory is usually something the stage provides.

You pulled a tiny model with Ollama, got an API key for the big proprietary ones, improved prompts with examples, and stopped trusting “please return JSON” alone.

From here, libraries like CrewAI stop feeling like magic and start feeling like what they are: shortcuts on top of ideas you already understand.

And that is the real goal of this story — not to memorize terms, but to walk into the next tutorial and finally know who is who.

Started this project to learn TS, Nodejs, Nitro, Tailwind, Vue, Nuxt, Langchain and FastAPI

Core functionality: Building web applications with an visual interface, Export as casual Nuxtjs Application and generate json config with langgraph (https://github.com/svenhue/AgenticWebBuilder, based on the json config the app will be generated)


<img width="1505" alt="Bildschirmfoto 2025-07-01 um 09 07 44" src="https://github.com/user-attachments/assets/12e8fb57-87ab-4484-9ea5-7936b5a94a04" />


## Features

- configure you application by text input assisted by llm agents
- Export your created solution as an nuxtjs project (in the browser, with WebContainers!) - you will get an project with the common nuxtjs file structure with the difference that the views in the generated page files a rendererd dynamically based on the configuration (json) in AppConfigs/pages.ts
- Create as many pages as you want with the visual builder
- Custom theming
- Create events for components and let call an action (Control component, go to url, call function ...)
- Multilingualism
- The exported project can be served as SPA, MPA, PWA and with electron
- some other useful stuff

## Roadmap (potentially, if this repo gets some traction and users want it)

- bug fixes (undo/redo on global state, application export)
- evaluate a clear path for stylesheet approach (at the moment a mixture of quasar and tailwind)
- reduce dependencies 
- code refactoring of the modules Utils and HybridApplicationDevelopment
- convert the HybridApplicationModule into an reusable nuxtjs module so it can be integrated in any nuxtjs project
- implementing ai capabilities to use generative ai for the design (theming, layout)
- larger template library and marketplace with ready-to-use components for advanced websites
- implement versioning with github

## Bottleneck
- the solutions builds projects with an native node runtime in the browser with webcontainers, which means that everytime you export a project, all dependencies are fetched and installed. This can take some time and is not optimal for larger projects. There are multiple solutions for this problem, but I have to evaluate them first.

## Development

Before start, you need to install the dependencies of all modules and of Apps/NuxtApplicationSkeleton

cd Apps/NuxtApplicationSkeleton
npm run dev


## Build the project

cd Apps/NuxtApplicationSkeleton
npm run build

## Build and Export your solution

open http://localhost:3000/appdevelopment/development/"your solution name" 
open the download dialog on the top right corner and click on the "Bundle" or "Project" button. The bundle will return a ready to deploy nuxtjs project and the project will return a zip file with the project files and folders.

# ExpressExpo: Idea to Income in 24 hours

Last Updated: October 27, 2025 

# 🛠️ 1. Setup

## What this guide will cover

This guide will cover the steps to go from having an idea to developing, deploying and making an income from a mobile app.
You dont need to know how to code to follow this guide as it will leverage AI tools to help you with the coding and development process. 
Throughout the process you will learn concepts and overtime you will understand your code better and be able to improve on your work.

## What You Need and Why

| Item | Price | Why you need it |
| :--- | :------: | :------: |
| Github account | Free |  [For more information checkout the official github page](https:github.com) |
| Apple Developer account | (US$99/yr) | To release to the Apple Store |
| Google Play Developer account | (US$25 one‑time) | To release to the Play Store |
| Expo account | Generous free tier then usage based cost | For building and deploying your app |
| Firebase or Supabase account | Generous free tier then usage based cost | For backend and database |
| AI coding assistant (e.g., GitHub Copilot, ChatGPT, Claude Code) | Usage based cost | To expedite the development process |
| IDE (e.g., VSCode, Cursor, Webstorm ) | Free | This is what you use to edit your code. VSCode is reccomended to set up your coding assistant yourself or you can use Cursor which also comes with integrations with AI Coding assistants |

## Technology Stack

- **Expo (React Native)** for cross‑platform mobile apps
- **Firebase** or **Supabase** for backend and database
- **RevenueCat** for in‑app purchases or subscriptions
- **PostHog** for analytics

Assuming you've never built a mobile app before, or even written a line of code, this guide will walk you through the entire process step‑by‑step.
Lets imaging building a app like a resturant. A resturant has a front of house where customers interact with the menu, place orders and enjoy their meals. The back of house is where the chefs prepare the food, handle orders or even reaching out to external vendors to get more ingredients.

When you imagine it this way it makes it easier to understand the different components of a mobile app. The front of house is like the frontend of the app that users interact with, while the back of house is like the backend that handles data storage, user authentication, and other server‑side logic.

For our mobile app, we will use Expo (React Native) for the frontend, Firebase or Supabase for the backend.
We will have external services running in the app to handle payments (RevenueCat) and analytics (PostHog).

---

# 🎨 2. Design

- Curated **ChatGPT prompt templates** to ideate UI/UX and flows
- UI Kit: e.g., React Native UI Lib for consistent components
- Use chat gpt to genereate image + context profile
- Doing a static splash screen for minimal product + doing animations for it
- Theme selection and custom styling guidelines for both light and dark theme or using one set of color palette that doesnt switch

## Color Palette
- Use tools like [Coolors](https://coolors.co/) or [Adobe Color](https://color.adobe.com/create) to generate a cohesive color scheme
- Choose primary, secondary, accent, background, and text colors
- Ensure good contrast for readability and accessibility


## App Icon Design
- Tools like chatgpt can genrate images based on your app concept
- you can use a combiurastion of chatgpt genreated designs then impoirt into figma or canva to refine and finalize the design


## Styling and UI Library
- Think painting by hand using your own colors and brushes rather than using a paint by numbers kit
- obviously each have their own advantages and disadvantages. stylesheets give you more control and flexibility but take more time to set up and maintain. UI libraries give you a faster way to get started with pre built components but can be limiting in terms of customization and may lead to a less unique look and feel for your app.

## In App Content
- Use AI image generation (e.g., Midjourney, DALL·E) for custom graphics
- Ensure no copyright issues with generated images

## Animated Splash screen

- Set up lottie asset using chat gpt to get transparent background
- then split elements
- add to lottie lab with the moving element on top of the static one on elements
- do animation by changing the positions create animation keyframes
- install lottie react native and code up
- to avoid the flicker have the first frame as a static image and then animate from there

---

# 🧑‍💻 3. Development

## Core Practices

- Version control with Git/GitHub
- Use AI‑driven development agents
- Modular component structure for scalability
- Responsive design for various screen sizes
- Enforce security best practices (auth/authz, env vars)

## Quick start
- You can create a new expo project following the instructions on the expo website [here](https://docs.expo.dev/get-started/installation/) or clone the expressexpo template from github [here](https://github.com/DonMMK/expressexpo).
- If you create a new expo project you can go to the section Tooling - ExpoGo below to get started, but if you clone the expressexpo template you can skip to the section Creating your first Expo Development Build below as you cannot use expo go with the ExpressExpo template as it uses native code for some of the features.

## Tooling - ExpoGo


## Creating your first Expo Development Build
- Follow the instructions on the expo website [here](https://docs.expo.dev/development/introduction/) to set up your development environment and create your first development build.

## Feature Requests

- If you are using the expressexpo template this already has code for a basic app structure with auth, navigation, backend and some generic components so you can then build on top of this and add your own features. For example if you are making a budgeting app you can break down into creation budget feature, tracking expenses feature, viewing reports feature etc.
- Do it in chunks so you are not creating a massive PR that is hard to review or confusing the AI and writing code that is bloated and broken
- Create merge requests for each feature. This makes it easier to review changes and ensures that each feature is properly tested before being merged.
- Using Git / Github for this. Think of it like a save point in a game. If something goes wrong you can always go back to the last save point.

## Debugging & Logging

- UI add colors to different components to visually see where things are
- For backend use firebase logging and monitoring



## Environments

- When setting up the project ensure to set up different environments for development and production. This allows you to test features and changes in a safe environment before pushing them to production users who may be relying on the app. This also ensure you do not accidentally alter customer data or other important information.
- Multiple firebase projects for dev and prod. 
- Use of Expo config + AWS Key vault to manage different environment variables for dev and prod builds

## Authentication, Authorization & Security

- Think of this using a person trying to enter a building analogy and hotel room key analogy
- Authentication is like checking the ID of a person trying to enter a building. You want to make sure they are who they say they are before letting them in. This is typically done using usernames and passwords, or other methods such as social logins (Google, Facebook, Apple, etc.) or biometric authentication (fingerprint, face recognition, etc.)
- Authorization is like giving a person a key to a specific hotel room within the building. Even if they are allowed to enter the building, they may not have access to all areas within it.
- For authentication use Firebase Authentication or Supabase Auth. These services provide a secure and easy way to manage user authentication.
- For authorization, you need to do authz on all backend operations to ensure that users can only access their own data. This is especially important if you are dealing with sensitive information such as financial data, personal information, etc.

## Onboarding

- On first launch take user to onboarding flow design to maximize engagement
    - this is where you have the most attention from the user to highlight the app
    - you can even use this as an opportunity to give a preview of the app's features and then pop up with a paywall if you have one
    - include images that are attention grabbing


## Data & APIs

- Configure optimized CRUD + auth flow in Firebase
- Integrate external APIs (e.g., budgets, alerts) with secure tokens

---

# 🚀 4. Deployment

## 🧪 Testing & Debugging

- UI debugging tools (Reactotron, React Native Debugger)
- Test builds using TestFlight (iOS) and internal tracks (Android)
- Recruit ~20 testers via Reddit, X, etc.
- Test the UI and buttons and other stuff because Android and iOS have slight differences that cause things to work / not work

---

## 🧪 App Store Listing

### Listing page

- Screenshots
    
    Take screenshots on both an ipad and iphone
    
    Take preview by doing a screen recording on the device () 
    
    ffmpeg -i preview1.MOV \
    -r 30 -vf "fps=30,scale=886:1920:force_original_aspect_ratio=decrease,pad=886:1920:(ow-iw)/2:(oh-ih)/2" \
    -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart output.mov
    
    where input is 
    
    and output is 
    
    Run the `imagereszier` script
    
    Open up on [shots.so](http://shots.so/) or canva with the required sizes
    
    If any features have dramatically changed and the app screenshots need to be updated, do so.
    
    → This includes taking screenshots for all device sizes
    
    → get the psd file from local drive (psd)
    
    → add screenshots to mock phone and tablets. Use: Photopea | Online Photo Editor   for the ipad psd remove the background so it’s easier to add to canva
    
    → Adding to canva and exporting
    
    → Run resizing of images and upload to both store (from local scripts)
    
- Promotional text
    
    Refer to handy prompts section
    
    You are expert
    
    Context
    
    Input
    
    Output
    
    Plan steps before executing, accuracy and completeness are vital
    
    Ask questions for clarity
    
- Description
- General Information
- Keywords
- Add latest build
- Sign in and Testing Instructions

Playstore only

Create play store listing

- Create google cloud project
    - Create service account
        - give name
        - description
        - role is service account
        - rest is optional
        - actions ⇒ manage key ⇒ new key ⇒ add key ⇒ create
    - Go to google play
    - Invite users. Enter the email address of the account that you just created
    - Give app permiossion for the app that you are uploading
        - give all admin
    - Get the aab file from expo services and upload manually for the first time
- Set up details from dashboard

### App Information

- Name
- Subtitles
- 

### App privacy

add a privacy plicy url

add what is “collected” get started and go through it

### Pricing and Availability

add pricing if it’s free

add for all regions you want to add to - all 175 unless specifc reasons

---

## Apple / Play Store Rejections

- Using third party images ensure you get the approval for content
- App completeness
- Screenshots that are not the correct sizes
- 

---

## 📈 Analytics & Growth

- Add analytics using **PostHog** for event tracking
- Implement App Store Optimization (ASO)
- Build email system: welcome sequence + onboarding reminders

---

## ⚙️ Monetization

- Integrate **RevenueCat** to support:
    - Guest/free tier
    - In‑app subscriptions
    - One‑time purchases
    - Cancelations and refunds

## App Store Releases

- Expo build commands for iOS/Android using `eas`
- Submit to stores (via `eas submit`)
- App Store guidelines & rejection avoidance tips
- Generate assets (screenshots, previews) using [shots.so](https://shots.so/)

## Continuous Deployment Steps

```bash
# General:
# - bump version, update readme/about, tag release
git tag v1.0.0
git push --tags

# Android:
eas build --platform android && eas submit -p android --latest

# iOS:
eas build --platform ios && eas submit -p ios --latest

```

> 🔄 Note: Free Expo tiers include 3h build time per month
> 

---

# 🎓 4. Beyond Code: AI‑led Lessons

- Choosing a profitable app niche
- Rapid user testing with real feedback
- Pricing strategies that convert

---

# 📚 Bonus: Handy Commands

```bash
# Install dependencies
npm install

# Run Expo
npx expo start
npx expo start --tunnel

# Clean project
rm -rf node_modules package-lock.json .expo/

# Format all files
npx prettier --write .

# Create dev iOS build
npm install -g eas-cli
eas build:configure
eas build --profile development --platform ios

# Run dev client
npx expo start --dev-client
npx expo start --dev-client --tunnel

# Sanity check
npx expo-doctor@latest

```

---

# 📚 Bonus: LLM Prompting Commands

You are an expert on marketing
For the app "HouseDepositHero"
generate the content for the app store listing ensuring it is ASO optimised

Generate Promotional Text taking up 170 characters
Generate sutitles taking up 30 charatcesrs
description about 2000 charatces
and keywords upto 100 charaters seprated by commos and spaces

I want you to think through what a good
answer would be to elaborate on your reasoning before writing out the answer.
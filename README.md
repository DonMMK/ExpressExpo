# ExpressExpo: Idea to Income in 24 hours

Last Updated: October 8, 2025 

# 🛠️ 1. Setup

## What You Need and Why

| Item | Price | Why you need it |
| :--- | :------: | :------: |
| Github account | Free |  [For more information checkout the official github page](https:github.com) |
| Apple Developer account | (US$99/yr) | To release to |
| Google Play Developer account | (US$25 one‑time) | 0.75 |
| AI coding assistant (e.g., GitHub Copilot, ChatGPT, Claude Code) | 12 | 0.75 |
| IDE (e.g., VSCode, Cursor, Webstorm ) | Free | This is what you use to |

## Technology Stack

- **Expo (React Native)** for cross‑platform apps
- **Firebase** or **Supabase** for backend
- **RevenueCat** for monetization
- **PostHog** for analytics

---

# 🎨 2. Design

- Curated **ChatGPT prompt templates** to ideate UI/UX and flows
- UI Kit: e.g., React Native UI Lib for consistent components
- Use chat gpt to genereate image + context profile
- Doing a static splash screen for minimal product + doing animations for it
- Theme selection and custom styling guidelines for both light and dark theme or using one set of color palette that doesnt switch

---

# 🧑‍💻 3. Development

## Core Practices

- Version control with Git/GitHub
- Use AI‑driven development agents
- Enforce security best practices (auth/authz, env vars)

## Environments

- Dev vs Prod accounts (Firebase, backend)
- Env variables: use Expo config + secure storage (e.g., AWS Key Vault)

## Auth & Onboarding

- On first launch: landing page → sign in (Google, Apple) or Guest access
- Onboarding flow design to maximize engagement
    - Swipe to continue
    - include images that are attention grabbing
    - get started

### Animated Splash screen

- Set up lottie asset using chat gpt to get transparent background
- then split elements
- add to lottie lab with the moving element on top of the static one on elements
- do animation by changing the positions create animation keyframes
- install lottice react native and code up
- to avoid the flicker have the first frame as a static image and then animate from there

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
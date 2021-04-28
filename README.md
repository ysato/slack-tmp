# Getting Started ⚡️ Bolt for JavaScript

## Overview

## Running locally

### 1. Setup environment variables

```zsh
# Replace with your signing secret and token
export SLACK_BOT_TOKEN=<your-bot-token>
export SLACK_SIGNING_SECRET=<your-signing-secret>
```

### 2. Setup your local project

```zsh
# Clone this project onto your machine
git clone https://github.com/ysato/slack-tmp.git

# Change into the project
cd slack-tmp/

# Install the dependencies
npm install
```

### 3. Start servers

[Setup ngrok][1] to create a local requests URL for development.

```zsh
npm run ngrok
npm run local
```

## Deploy

```zsh
npx serverless deploy
```

[1]: https://slack.dev/bolt-js/tutorial/getting-started#setting-up-events
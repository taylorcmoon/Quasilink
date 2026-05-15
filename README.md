# Quasilink

Quasilink is a generative Tumblr-inspired feed that pulls related images, processes them for machine learning, and generates transcendental image compositions. Built with React, Python, and ML tools.

## Features
- Fetches posts from your Tumblr account using the Tumblr API.
- Preprocesses image data for training machine learning (GAN-based) models.
- React frontend to display a grid-style image feed.

## Structure
```
quasilink/
│
├── backend/                 # Backend for data fetching and preprocessing
│   └── tumblr_api_fetch.py  # Fetch data from Tumblr
│
├── frontend/                # React frontend for generative feed
│   └── src/
│       ├── ImageFeed.js     # React component for the feed
│       └── ImageFeed.css    # CSS for feed layout
│
├── ml/                      # ML scripts (preprocessing and training)
│   └── preprocess_and_train.py
│
└── README.md                # Project setup instructions
```

## Setup Instructions

### Backend
1. Install Python dependencies:
   ```bash
   pip install requests pillow torch torchvision
   ```
2. Replace `YOUR_API_KEY` in `tumblr_api_fetch.py` with your Tumblr API key.
3. Run the script to fetch and save images:
   ```bash
   python backend/tumblr_api_fetch.py
   ```

### Frontend
1. Navigate to the `frontend` folder and create a new React app:
   ```bash
   npx create-react-app .
   ```
2. Replace the `src` directory contents with `frontend/src` files provided.
3. Start the development server:
   ```bash
   npm start
   ```

### Machine Learning
1. Preprocess image data:
   ```bash
   python ml/preprocess_and_train.py --preprocess
   ```
2. Train the generative model (update the script with your own ML model).

### Deployment
- Deploy the React frontend using [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com).
- Deploy backend and ML pipelines using [Heroku](https://heroku.com) or [AWS](https://aws.amazon.com/).

---

Happy Generating!
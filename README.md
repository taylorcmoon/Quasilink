# ExplicitIOM

Quasilink is a generative feed that pulls related images, processes them for machine learning, and generates transcendental transformations to deliver intended compositions. compositions can be translated into class objects. subroutines are compiled and translated into OOP code that alligns with intent.

## Features
- React frontend to display and edit final images

## Structure
```
quasilink/
│
├── backend/                 # Backend for data fetching and preprocessing
│   └── fetch.py  # Fetch data from Tumblr
│
├── frontend/                # React frontend for generative elements
│   └── src/
│       ├── ImageFeed .js     # React component for the feed
│       └── ImageFeed.css    # CSS for feed layout
│
├── ml/                      # ML scripts (preprocessing and training)
│   └── NetTrain[.]
NetTrain
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
   python ml/train.py --preprocess
   ```
2. Train the generative model (update the script with your own ML model).

### Deployment
run: | 
   -cloud_autonoma_labs, google_cloud

---

Happy Generating!
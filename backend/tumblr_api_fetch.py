import os
import requests

API_KEY = 'YOUR_API_KEY'  # Replace with your Tumblr API key
BLOG_IDENTIFIER = 'your-blog.tumblr.com'  # Replace with your blog's identifier
OUTPUT_DIR = './data/images/'

def fetch_posts():
    url = f'https://api.tumblr.com/v2/blog/{BLOG_IDENTIFIER}/posts/photo'
    params = {"api_key": API_KEY, "limit": 20}  # Fetch 20 posts
    response = requests.get(url, params=params)

    if response.status_code == 200:
        posts = response.json().get("response", {}).get("posts", [])
        download_images(posts)
    else:
        print(f"Failed to fetch posts: {response.status_code}, {response.text}")

def download_images(posts):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Downloading images to {OUTPUT_DIR}...")

    for post in posts:
        for photo in post.get('photos', []):
            url = photo['original_size']['url']
            image_data = requests.get(url).content
            filename = os.path.basename(url)
            with open(os.path.join(OUTPUT_DIR, filename), 'wb') as f:
                f.write(image_data)
            print(f"Saved {filename}")

if __name__ == "__main__":
    fetch_posts()
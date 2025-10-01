---
title: Web Scraping Fundamentals
description: Learn the basics of web scraping using Python's Requests and BeautifulSoup libraries to extract data from websites.
navigation:
  order: 15
---

# Web Scraping Fundamentals (BeautifulSoup & Requests)

Web scraping allows you to extract data from websites programmatically. This lesson introduces the `requests` library for fetching web pages and `BeautifulSoup` for parsing HTML, enabling you to collect and process data efficiently.

## Learning Objectives
- Understand the basics of web scraping and its ethics.
- Use the `requests` library to fetch web pages.
- Parse HTML content with `BeautifulSoup` to extract data.
- Handle common web scraping challenges like errors and dynamic content.
- Build a real-world web scraping project.

## 1. Introduction to Web Scraping
Web scraping involves retrieving and parsing data from websites. Always check a website's `robots.txt` and terms of service to ensure scraping is allowed, and avoid overwhelming servers with too many requests.

**Prerequisites**:
Install the required libraries:
```bash
pip install requests beautifulsoup4
```

## 2. Fetching Web Pages with Requests
The `requests` library simplifies HTTP requests to fetch web page content.

**Example**:
```python
import requests

def fetch_page(url: str) -> str:
    """Fetch the content of a web page."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # Raise an error for bad status codes
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching page: {e}")
        return ""

# Example usage
url = "https://example.com"
content = fetch_page(url)
print(content[:200])  # Print first 200 characters
```

**Expected Output**:
```plaintext
<!doctype html>
<html>
<head>
    <title>Example Domain</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
```

## 3. Parsing HTML with BeautifulSoup
`BeautifulSoup` makes it easy to navigate and extract data from HTML.

**Example**:
```python
from bs4 import BeautifulSoup

def extract_title(html_content: str) -> str:
    """Extract the title from an HTML page."""
    soup = BeautifulSoup(html_content, 'html.parser')
    title = soup.find('title')
    return title.text if title else "No title found"

# Example usage
html_content = fetch_page("https://example.com")
title = extract_title(html_content)
print(f"Page Title: {title}")
```

**Expected Output**:
```plaintext
Page Title: Example Domain
```

## 4. Extracting Specific Data
Use `BeautifulSoup` to target specific HTML elements like headings, links, or tables.

**Example**:
```python
def extract_links(html_content: str) -> list:
    """Extract all links from an HTML page."""
    soup = BeautifulSoup(html_content, 'html.parser')
    links = soup.find_all('a')
    return [link.get('href') for link in links if link.get('href')]

# Example usage
links = extract_links(html_content)
for link in links:
    print(f"Found link: {link}")
```

**Expected Output**:
```plaintext
Found link: https://www.iana.org/domains/example
```

## 5. Handling Common Challenges
- **Timeouts and Errors**: Use try-except blocks and set timeouts in `requests`.
- **Dynamic Content**: Some websites load content with JavaScript, requiring tools like `selenium` (not covered here).
- **Rate Limiting**: Add delays between requests to avoid being blocked.

**Example with Delay**:
```python
import time

def fetch_with_delay(urls: list) -> list:
    """Fetch multiple pages with a delay to avoid rate limiting."""
    contents = []
    for url in urls:
        contents.append(fetch_page(url))
        time.sleep(1)  # 1-second delay between requests
    return contents
```

## Mini-Project: Quote Scraper
Build a web scraper to extract quotes from a sample website (e.g., `http://quotes.toscrape.com`).

**Code**:
```python
import requests
from bs4 import BeautifulSoup
import csv
import logging
from typing import List, Dict

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='quote_scraper.log'
)

def scrape_quotes(url: str) -> List[Dict]:
    """Scrape quotes and authors from a website."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        quotes = []
        for quote in soup.find_all('div', class_='quote'):
            text = quote.find('span', class_='text').text
            author = quote.find('small', class_='author').text
            quotes.append({"quote": text, "author": author})
            logging.info(f"Scraped quote by {author}")
        
        return quotes
    except requests.RequestException as e:
        logging.error(f"Error scraping {url}: {e}")
        return []

def save_to_csv(quotes: List[Dict], filename: str) -> None:
    """Save quotes to a CSV file."""
    try:
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=["quote", "author"])
            writer.writeheader()
            writer.writerows(quotes)
        logging.info(f"Saved {len(quotes)} quotes to {filename}")
    except Exception as e:
        logging.error(f"Error saving to CSV: {e}")

def main():
    """Main function to run the quote scraper."""
    url = "http://quotes.toscrape.com"
    quotes = scrape_quotes(url)
    
    if quotes:
        for quote in quotes:
            print(f"Quote: {quote['quote']} - {quote['author']}")
        save_to_csv(quotes, "quotes.csv")
    else:
        print("No quotes scraped.")

if __name__ == "__main__":
    main()
```

**Expected Output**:
```plaintext
Quote: “The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.” - Albert Einstein
Quote: “It is our choices, Harry, that show what we truly are, far more than our abilities.” - J.K. Rowling
...
```

**Log File (`quote_scraper.log`)**:
```plaintext
2025-09-30 23:24:45,123 - INFO - Scraped quote by Albert Einstein
2025-09-30 23:24:45,124 - INFO - Scraped quote by J.K. Rowling
2025-09-30 23:24:45,125 - INFO - Saved 10 quotes to quotes.csv
```

**Output File (`quotes.csv`)**:
```plaintext
quote,author
"The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.","Albert Einstein"
"It is our choices, Harry, that show what we truly are, far more than our abilities.","J.K. Rowling"
...
```

## Best Practices
- **Check Permissions**: Always review `robots.txt` and terms of service.
- **Handle Errors Gracefully**: Use try-except to manage network issues.
- **Add Delays**: Prevent overwhelming servers with `time.sleep`.
- **Use Logging**: Log scraping activities for debugging and monitoring.
- **Validate Data**: Ensure extracted data is clean and usable.

## Key Takeaways

| Concept | Description |
|---------|-------------|
| Requests | Fetches web page content via HTTP requests. |
| BeautifulSoup | Parses HTML to extract specific elements. |
| Ethics | Respect website rules and avoid excessive requests. |
| Error Handling | Use try-except for robust scraping. |
| Data Storage | Save scraped data to formats like CSV for analysis. |

## What's Next?
Explore **API Development Basics (Flask/FastAPI)** (Lesson 16) to learn how to create APIs for serving data programmatically.


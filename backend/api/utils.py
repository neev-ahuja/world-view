import urllib.request
import json
from google import genai
from pydantic import BaseModel, Field
from django.conf import settings

GNEWS_KEY = settings.GNEWS_KEY
GEMINI_KEY = settings.GEMINI_KEY


class KeyVal(BaseModel):
    source: str
    isPositiveAboutTheTopic: bool

class Data(BaseModel):
    NoOfArticles: int
    summary: str
    main_points: list[str]
    sources: int
    sentiment_score: int
    neutral_coverage: int
    top_source: list[KeyVal]

def gnewsCall(query, country):
    try:
        apikey = GNEWS_KEY
        url = f"https://gnews.io/api/v4/search?q={query}&lang=en&{country}=us&max=10&apikey={apikey}"

        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode("utf-8"))
            articles = data["articles"]
            return json.dumps(articles)
        
    except Exception as e:
        raise f'"error2": {str(e)}' 
    
def callGemini(content):

    content = content + '''Given the following JSON of news articles, provide a summarized analysis with this provided structure.

 The summary should give a concise overview of the topic discussed across the articles.
 main points should highlight key events or facts.
 Use sentiment analysis to calculate the sentiment-score based on article tone.
 Use article tone to identify how many are neutral in neutral-coverage.
 For top-sources, include the most frequently appearing sources with their stance (positive/negative/neutral, use neutral as false).

Then, output the result in proper JSON format'''

    try:
        client = genai.Client(api_key=GEMINI_KEY)

        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=content,
            config={
                "response_mime_type": "application/json",
                "response_schema": list[Data],
            },
        )

        return response.text
    except Exception as e:
        raise Exception(f'"error3": {str(e)}')
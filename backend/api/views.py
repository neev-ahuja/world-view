import json
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import utils

class Query(APIView):
    def post(self, request):
        try: 
            query_data = request.data
            
            if 'query' not in query_data:
                return Response(
                    {"error": "Missing 'query' field in request"}, status=status.HTTP_400_BAD_REQUEST
                )
                
            query = query_data['query']
            country = query_data['country'] or 'us'

            articles = utils.gnewsCall(query, country)
            content = utils.callGemini(articles)
            parsed_content = json.loads(content)  
            
            return Response({
                "status": "success",
                "content": parsed_content
            })
            
        except Exception as e:
            return Response(
                {"error1": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
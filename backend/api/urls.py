from django.urls import path
from .views import Query

urlpatterns = [
    path('query/', Query.as_view(), name='query'),
]

import json

from django.http.response import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view

from api.serializers.folder_serializer import FolderSerializer

@api_view(['POST'])
def create(request):
  serializer = FolderSerializer(data=json.loads(request.body))
  if serializer.is_valid(raise_exception=True):
    serializer.create(serializer.data)

  return JsonResponse(serializer.data, status=status.HTTP_200_OK)

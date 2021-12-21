import json

from django.http.response import JsonResponse
from django.core import serializers
from django.forms.models import model_to_dict

from rest_framework import status
from rest_framework.decorators import api_view

from api.serializers.folder_serializer import FolderSerializer

@api_view(['POST'])
def create(request):
  serializer = FolderSerializer(data=json.loads(request.body))
  if serializer.is_valid(raise_exception=True):
    new_folder = serializer.create(serializer.data)

  return JsonResponse(model_to_dict(new_folder), status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete(request, id):
  print(id)
  

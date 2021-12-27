import json

from django.http.response import HttpResponse, JsonResponse
from django.core import serializers
from django.forms.models import model_to_dict

from rest_framework import status
from rest_framework.decorators import api_view

from api.serializers.folder_serializer import FolderSerializer
from api.models import Folder

@api_view(['POST'])
def create(request):
  serializer = FolderSerializer(data=json.loads(request.body))
  if serializer.is_valid(raise_exception=True):
    new_folder = serializer.create(serializer.data)

  return JsonResponse(model_to_dict(new_folder), status=status.HTTP_200_OK)

@api_view(['PUT'])
def update(request, folder_id):
  serializer = FolderSerializer(data=json.loads(request.body))
  if serializer.is_valid(raise_exception=True):
    updated_folder = serializer.update(serializer.data)
    
  return JsonResponse(model_to_dict(updated_folder), status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete(request, folder_id):
  Folder.objects.get(id=folder_id).delete()
  return HttpResponse(folder_id, status=status.HTTP_200_OK)
